import type { Container, Engine, ISourceOptions, RangeValue } from "@tsparticles/engine";
import type { BackgroundTheme } from "../types/background";

interface NetworkRuntimeConfig {
  bubble?: {
    distance: number;
    opacity?: number;
    size?: number;
  };
  clickEnabled: boolean;
  clickModes: string[];
  hoverModes: string[];
  linkWarp: boolean;
  moveDecay: RangeValue;
  moveSpeed: RangeValue;
  outMode: string;
  particleCount: number;
  refillCount: number;
  repulse?: {
    distance: number;
    factor: number;
    maxSpeed: number;
    restore: {
      delay: number;
      enable: boolean;
      follow: boolean;
      speed: number;
    };
    speed: number;
  };
  targetParticles: number;
  warp: boolean;
}

type NetworkContainer = Container & {
  actualOptions: Container["actualOptions"] & {
    interactivity?: {
      events: {
        onClick: {
          enable: boolean;
          mode: string | string[];
        };
        onHover: {
          mode: string | string[];
        };
      };
      modes: {
        bubble?: NetworkRuntimeConfig["bubble"];
        repulse?: NetworkRuntimeConfig["repulse"];
      };
    };
    particles: Container["actualOptions"]["particles"] & {
      links: {
        warp: boolean;
      };
    };
  };
};

type ParticleEngineEvent = {
  container?: Container;
};

const particleRefillDelay = 300;
const background = document.querySelector<HTMLElement>("[data-network-background]");
const particleLayer = background?.querySelector<HTMLElement>("[data-network-particles]");
const spotlight = background?.querySelector<HTMLElement>("[data-cursor-spotlight]");
const themeTargets = Array.from(
  document.querySelectorAll<HTMLElement>("[data-background-theme]:not([data-network-background])"),
);
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopWidthQuery = window.matchMedia("(min-width: 1024px)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
let container: Container | undefined;
let engine: Engine | undefined;
let particlePluginsLoaded = false;
let particleRefillId = 0;
let particleRefillListenerActive = false;
let particleRefillCount = 0;
let targetParticleCount = 0;
let syncVersion = 0;
let themeObserver: IntersectionObserver | undefined;
let interactiveListenersActive = false;
let spotlightFrameId = 0;
let spotlightLastFrame = 0;
let spotlightInitialized = false;
const spotlightCurrent = { x: 0, y: 0 };
const spotlightTarget = { x: 0, y: 0 };

const createOptions = () =>
  ({
    autoPlay: true,
    background: {
      color: {
        value: "transparent",
      },
    },
    clear: true,
    detectRetina: true,
    fpsLimit: 30,
    fullScreen: {
      enable: false,
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: false,
          mode: [],
        },
        onHover: {
          enable: true,
          mode: ["repulse", "bubble"],
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        bubble: {
          distance: 82,
          duration: 0.6,
          opacity: 0.64,
          size: 3.3,
        },
        repulse: {
          distance: 165,
          easing: "ease-out-quad",
          factor: 6,
          maxSpeed: 1.1,
          restore: {
            delay: 0,
            enable: true,
            follow: true,
            speed: 0.03,
          },
          speed: 0.22,
        },
      },
    },
    particles: {
      color: {
        value: ["#89b4fa", "#89b4fa", "#89b4fa", "#94e2d5", "#a6e3a1"],
      },
      links: {
        color: "#89b4fa",
        distance: 148,
        enable: true,
        opacity: 0.24,
        warp: false,
        width: 1,
      },
      move: {
        decay: 0,
        direction: "none",
        enable: true,
        outModes: {
          default: "destroy",
        },
        random: false,
        speed: {
          min: 0.06,
          max: 0.18,
        },
        straight: false,
        warp: false,
      },
      number: {
        density: {
          enable: true,
          height: 720,
          width: 1040,
        },
        value: 46,
      },
      opacity: {
        value: {
          min: 0.32,
          max: 0.58,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: 1.2,
          max: 3,
        },
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
  }) satisfies ISourceOptions;

const publishNetworkConfig = (activeContainer: NetworkContainer) => {
  if (!background || activeContainer.destroyed) return;

  const options = activeContainer.actualOptions;
  const interactivity = options.interactivity;
  const clickModes = interactivity?.events.onClick.mode ?? [];
  const hoverModes = interactivity?.events.onHover.mode ?? [];
  const config: NetworkRuntimeConfig = {
    bubble: interactivity?.modes.bubble,
    clickEnabled: interactivity?.events.onClick.enable ?? false,
    clickModes: Array.isArray(clickModes) ? clickModes : [clickModes],
    hoverModes: Array.isArray(hoverModes) ? hoverModes : [hoverModes],
    linkWarp: options.particles.links.warp,
    moveDecay: options.particles.move.decay,
    moveSpeed: options.particles.move.speed,
    outMode: String(options.particles.move.outModes.default),
    particleCount: activeContainer.particles.count,
    refillCount: particleRefillCount,
    repulse: interactivity?.modes.repulse,
    targetParticles: targetParticleCount,
    warp: options.particles.move.warp,
  };

  background.setAttribute("data-network-config", JSON.stringify(config));
};

const clearParticleRefill = () => {
  window.clearTimeout(particleRefillId);
  particleRefillId = 0;
};

const handleParticleRemoved = (event?: ParticleEngineEvent) => {
  const activeContainer = container;

  if (
    !activeContainer ||
    activeContainer.destroyed ||
    event?.container !== activeContainer ||
    !shouldAnimate()
  ) {
    return;
  }

  clearParticleRefill();
  particleRefillId = window.setTimeout(() => {
    particleRefillId = 0;

    if (container !== activeContainer || activeContainer.destroyed || !shouldAnimate()) {
      return;
    }

    activeContainer.particles.setDensity();
    particleRefillCount += 1;
    publishNetworkConfig(activeContainer as NetworkContainer);
  }, particleRefillDelay);
};

const stopParticleRefill = () => {
  clearParticleRefill();

  if (engine && particleRefillListenerActive) {
    engine.removeEventListener("particleRemoved", handleParticleRemoved);
    particleRefillListenerActive = false;
  }

  particleRefillCount = 0;
  targetParticleCount = 0;
};

const startParticleRefill = (activeContainer: NetworkContainer) => {
  stopParticleRefill();
  activeContainer.particles.setDensity();
  targetParticleCount = activeContainer.particles.count;
  engine?.addEventListener("particleRemoved", handleParticleRemoved);
  particleRefillListenerActive = Boolean(engine);
};

const destroyNetwork = () => {
  stopParticleRefill();
  container?.destroy();
  container = undefined;
  background?.removeAttribute("data-network-ready");
  background?.removeAttribute("data-network-config");
};

const shouldAnimate = () =>
  Boolean(
    background &&
    particleLayer &&
    !reducedMotionQuery.matches &&
    desktopWidthQuery.matches &&
    finePointerQuery.matches,
  );

const setBackgroundTheme = (theme: BackgroundTheme) => {
  background?.setAttribute("data-background-theme", theme);
};

const syncBackgroundTheme = () => {
  const viewportCenter = window.innerHeight / 2;
  const nearestTarget = themeTargets.reduce<HTMLElement | undefined>((nearest, target) => {
    if (!nearest) return target;

    const targetRect = target.getBoundingClientRect();
    const nearestRect = nearest.getBoundingClientRect();
    const targetDistance = Math.abs(targetRect.top + targetRect.height / 2 - viewportCenter);
    const nearestDistance = Math.abs(nearestRect.top + nearestRect.height / 2 - viewportCenter);

    return targetDistance < nearestDistance ? target : nearest;
  }, undefined);

  const theme = nearestTarget?.dataset.backgroundTheme as BackgroundTheme | undefined;
  setBackgroundTheme(theme ?? "hero");
};

const stopThemeObserver = () => {
  themeObserver?.disconnect();
  themeObserver = undefined;
};

const startThemeObserver = () => {
  stopThemeObserver();

  if (!shouldAnimate() || !("IntersectionObserver" in window)) {
    setBackgroundTheme("hero");
    return;
  }

  themeObserver = new IntersectionObserver(syncBackgroundTheme, {
    rootMargin: "-42% 0px -42% 0px",
    threshold: 0,
  });
  themeTargets.forEach((target) => themeObserver?.observe(target));
  syncBackgroundTheme();
};

const setSpotlightActive = (active: boolean) => {
  background?.setAttribute("data-spotlight-active", String(active));
};

const stopSpotlightFrame = () => {
  if (spotlightFrameId) {
    window.cancelAnimationFrame(spotlightFrameId);
    spotlightFrameId = 0;
  }

  spotlightLastFrame = 0;
};

const hideSpotlight = () => {
  setSpotlightActive(false);
  stopSpotlightFrame();
};

const animateSpotlight = (timestamp: number) => {
  if (!spotlight || !shouldAnimate()) {
    hideSpotlight();
    return;
  }

  const elapsed = spotlightLastFrame ? timestamp - spotlightLastFrame : 16;
  const progress = 1 - Math.exp(-elapsed / 120);
  spotlightLastFrame = timestamp;
  spotlightCurrent.x += (spotlightTarget.x - spotlightCurrent.x) * progress;
  spotlightCurrent.y += (spotlightTarget.y - spotlightCurrent.y) * progress;
  spotlight.style.transform = `translate3d(${spotlightCurrent.x}px, ${spotlightCurrent.y}px, 0) translate(-50%, -50%)`;

  const remainingDistance = Math.hypot(
    spotlightTarget.x - spotlightCurrent.x,
    spotlightTarget.y - spotlightCurrent.y,
  );

  if (remainingDistance > 0.35) {
    spotlightFrameId = window.requestAnimationFrame(animateSpotlight);
    return;
  }

  spotlightCurrent.x = spotlightTarget.x;
  spotlightCurrent.y = spotlightTarget.y;
  spotlightFrameId = 0;
  spotlightLastFrame = 0;
};

const scheduleSpotlightFrame = () => {
  if (!spotlightFrameId) {
    spotlightFrameId = window.requestAnimationFrame(animateSpotlight);
  }
};

const handlePointerMove = (event: PointerEvent) => {
  if (!shouldAnimate() || !spotlight) return;

  spotlightTarget.x = event.clientX;
  spotlightTarget.y = event.clientY;

  if (!spotlightInitialized) {
    spotlightCurrent.x = event.clientX;
    spotlightCurrent.y = event.clientY;
    spotlightInitialized = true;
  }

  setSpotlightActive(true);
  scheduleSpotlightFrame();
};

const handlePointerExit = (event: PointerEvent) => {
  if (!event.relatedTarget) hideSpotlight();
};

const startInteractiveListeners = () => {
  if (interactiveListenersActive || !shouldAnimate()) return;

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerout", handlePointerExit);
  window.addEventListener("blur", hideSpotlight);
  interactiveListenersActive = true;
  startThemeObserver();
};

const stopInteractiveListeners = () => {
  if (interactiveListenersActive) {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerout", handlePointerExit);
    window.removeEventListener("blur", hideSpotlight);
    interactiveListenersActive = false;
  }

  spotlightInitialized = false;
  hideSpotlight();
  stopThemeObserver();
  setBackgroundTheme("hero");
};

const syncNetwork = async () => {
  const currentVersion = ++syncVersion;

  if (!background || !particleLayer || !shouldAnimate()) {
    destroyNetwork();
    background?.setAttribute("data-network-mode", "static");
    return;
  }

  background.setAttribute("data-network-mode", "animated");

  if (container && !container.destroyed) {
    return;
  }

  destroyNetwork();

  try {
    const [
      { tsParticles },
      { loadBasic },
      { loadExternalBubbleInteraction },
      { loadExternalRepulseInteraction },
      { loadParticlesLinksInteraction },
      { loadEasingQuadPlugin },
      { loadInteractivityPlugin },
    ] = await Promise.all([
      import("@tsparticles/engine"),
      import("@tsparticles/basic"),
      import("@tsparticles/interaction-external-bubble"),
      import("@tsparticles/interaction-external-repulse"),
      import("@tsparticles/interaction-particles-links"),
      import("@tsparticles/plugin-easing-quad"),
      import("@tsparticles/plugin-interactivity"),
    ]);

    if (currentVersion !== syncVersion || !shouldAnimate()) {
      return;
    }

    engine = tsParticles;

    if (!particlePluginsLoaded) {
      await Promise.all([loadBasic(engine), loadEasingQuadPlugin(engine)]);
      await loadInteractivityPlugin(engine);
      await Promise.all([
        loadExternalBubbleInteraction(engine),
        loadExternalRepulseInteraction(engine),
        loadParticlesLinksInteraction(engine),
      ]);
      particlePluginsLoaded = true;
    }

    if (currentVersion !== syncVersion || !shouldAnimate() || !background) {
      return;
    }

    const loadedContainer = await engine.load({
      element: particleLayer,
      id: "network-background",
      options: createOptions(),
    });

    if (!loadedContainer || currentVersion !== syncVersion || !shouldAnimate()) {
      loadedContainer?.destroy();
      return;
    }

    container = loadedContainer;
    startParticleRefill(loadedContainer as NetworkContainer);

    window.requestAnimationFrame(() => {
      if (container === loadedContainer && !loadedContainer.destroyed) {
        const networkContainer = loadedContainer as NetworkContainer;
        publishNetworkConfig(networkContainer);
        background.setAttribute("data-network-ready", "true");
      }
    });
  } catch {
    destroyNetwork();
    background?.setAttribute("data-network-mode", "static");
  }
};

const scheduleSync = () => {
  if (shouldAnimate()) {
    startInteractiveListeners();
  } else {
    stopInteractiveListeners();
  }

  void syncNetwork();
};

const syncVisibility = () => {
  background?.toggleAttribute("data-background-paused", document.hidden);
  if (document.hidden) hideSpotlight();
};

scheduleSync();
syncVisibility();
reducedMotionQuery.addEventListener("change", scheduleSync);
desktopWidthQuery.addEventListener("change", scheduleSync);
finePointerQuery.addEventListener("change", scheduleSync);
document.addEventListener("visibilitychange", syncVisibility);
window.addEventListener("pagehide", () => {
  syncVersion += 1;
  stopInteractiveListeners();
  destroyNetwork();
});
