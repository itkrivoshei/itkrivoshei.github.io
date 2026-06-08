interface NetworkRuntimeConfig {
  backgroundAlpha: number;
  gyroControls: boolean;
  linkDistance: number;
  mouseControls: boolean;
  pointCount: number;
  provider: "canvas-repulse-network";
  repulseRadius: number;
  touchControls: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface PointerState {
  active: boolean;
  x: number;
  y: number;
}

interface NetworkRuntime {
  canvas: HTMLCanvasElement;
  destroy: () => void;
}

const networkOptions = {
  backgroundAlpha: 0,
  gyroControls: false,
  linkDistance: 150,
  mouseControls: true,
  pointCount: 82,
  repulseRadius: 132,
  repulseStrength: 58,
  speed: 0.22,
  touchControls: false,
};

const background = document.querySelector<HTMLElement>("[data-network-background]");
const networkLayer = background?.querySelector<HTMLElement>("[data-network-effect]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopWidthQuery = window.matchMedia("(min-width: 1024px)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
let network: NetworkRuntime | undefined;
let syncVersion = 0;

const shouldAnimate = () =>
  Boolean(
    background &&
      networkLayer &&
      !document.hidden &&
      !reducedMotionQuery.matches &&
      desktopWidthQuery.matches &&
      finePointerQuery.matches,
  );

const publishNetworkConfig = () => {
  if (!background) return;

  const config: NetworkRuntimeConfig = {
    backgroundAlpha: networkOptions.backgroundAlpha,
    gyroControls: networkOptions.gyroControls,
    linkDistance: networkOptions.linkDistance,
    mouseControls: networkOptions.mouseControls,
    pointCount: networkOptions.pointCount,
    provider: "canvas-repulse-network",
    repulseRadius: networkOptions.repulseRadius,
    touchControls: networkOptions.touchControls,
  };

  background.setAttribute("data-network-config", JSON.stringify(config));
  background.setAttribute("data-network-provider", config.provider);
};

const createParticles = (width: number, height: number) => {
  const areaFactor = Math.round((width * height) / 18_000);
  const count = Math.min(networkOptions.pointCount, Math.max(58, areaFactor));

  return Array.from({ length: count }, (_, index): Particle => {
    const column = index % 12;
    const row = Math.floor(index / 12);
    const jitterX = Math.random() * 64 - 32;
    const jitterY = Math.random() * 64 - 32;

    return {
      x: ((column + 0.5) / 12) * width + jitterX,
      y: ((row + 0.5) / Math.ceil(count / 12)) * height + jitterY,
      vx: (Math.random() - 0.5) * networkOptions.speed,
      vy: (Math.random() - 0.5) * networkOptions.speed,
      radius: 0.9 + Math.random() * 1.2,
    };
  });
};

const getRepulsedPoint = (particle: Particle, pointer: PointerState) => {
  if (!pointer.active) return particle;

  const dx = particle.x - pointer.x;
  const dy = particle.y - pointer.y;
  const distance = Math.hypot(dx, dy);

  if (distance <= 0 || distance >= networkOptions.repulseRadius) return particle;

  const force = (1 - distance / networkOptions.repulseRadius) ** 2;
  const offset = force * networkOptions.repulseStrength;

  return {
    ...particle,
    x: particle.x + (dx / distance) * offset,
    y: particle.y + (dy / distance) * offset,
  };
};

const createNetwork = (): NetworkRuntime | undefined => {
  if (!networkLayer) return undefined;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });

  if (!context) return undefined;

  canvas.className = "repulse-network-canvas";
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    display: "block",
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    filter: "saturate(0.9) brightness(0.92)",
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
  });
  networkLayer.replaceChildren(canvas);

  const pointer: PointerState = {
    active: false,
    x: 0,
    y: 0,
  };

  let animationFrame = 0;
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];

  const resize = () => {
    const rect = networkLayer.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(rect.width));
    const nextHeight = Math.max(1, Math.round(rect.height));
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);

    width = nextWidth;
    height = nextHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = createParticles(width, height);
  };

  const setPointer = (event: PointerEvent) => {
    pointer.active = true;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };

  const clearPointer = () => {
    pointer.active = false;
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);

    const renderedParticles = particles.map((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      return getRepulsedPoint(particle, pointer);
    });

    for (let i = 0; i < renderedParticles.length; i += 1) {
      for (let j = i + 1; j < renderedParticles.length; j += 1) {
        const first = renderedParticles[i];
        const second = renderedParticles[j];
        const distance = Math.hypot(first.x - second.x, first.y - second.y);

        if (distance > networkOptions.linkDistance) continue;

        const midpointDistance = pointer.active
          ? Math.hypot((first.x + second.x) / 2 - pointer.x, (first.y + second.y) / 2 - pointer.y)
          : Infinity;
        const cursorBoost = Math.max(0, 1 - midpointDistance / (networkOptions.repulseRadius * 1.6));
        const opacity = (1 - distance / networkOptions.linkDistance) * (0.16 + cursorBoost * 0.12);

        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.strokeStyle = `rgba(137, 180, 250, ${opacity.toFixed(3)})`;
        context.lineWidth = 1;
        context.stroke();
      }
    }

    for (const particle of renderedParticles) {
      const cursorDistance = pointer.active ? Math.hypot(particle.x - pointer.x, particle.y - pointer.y) : Infinity;
      const cursorBoost = Math.max(0, 1 - cursorDistance / networkOptions.repulseRadius);

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius + cursorBoost * 0.55, 0, Math.PI * 2);
      context.fillStyle = `rgba(203, 213, 225, ${(0.42 + cursorBoost * 0.24).toFixed(3)})`;
      context.fill();
    }

    animationFrame = window.requestAnimationFrame(draw);
  };

  const resizeObserver = new ResizeObserver(resize);

  resize();
  resizeObserver.observe(networkLayer);
  window.addEventListener("pointermove", setPointer, { passive: true });
  window.addEventListener("pointerleave", clearPointer);
  window.addEventListener("blur", clearPointer);
  animationFrame = window.requestAnimationFrame(draw);

  return {
    canvas,
    destroy: () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
      canvas.remove();
    },
  };
};

const destroyNetwork = () => {
  network?.destroy();
  network = undefined;
  networkLayer?.replaceChildren();
  background?.removeAttribute("data-network-ready");
  background?.removeAttribute("data-network-config");
  background?.removeAttribute("data-network-provider");
};

const syncNetwork = () => {
  const currentVersion = ++syncVersion;

  if (!background || !networkLayer || !shouldAnimate()) {
    destroyNetwork();
    background?.setAttribute("data-network-mode", "static");
    return;
  }

  background.setAttribute("data-network-mode", "animated");

  if (network) return;

  destroyNetwork();

  const loadedNetwork = createNetwork();

  if (currentVersion !== syncVersion || !loadedNetwork || !shouldAnimate()) {
    loadedNetwork?.destroy();
    background?.setAttribute("data-network-mode", "static");
    return;
  }

  network = loadedNetwork;
  publishNetworkConfig();

  window.requestAnimationFrame(() => {
    if (network === loadedNetwork && shouldAnimate()) {
      background.setAttribute("data-network-ready", "true");
      loadedNetwork.canvas.style.opacity = "0.46";
    }
  });
};

const scheduleSync = () => {
  syncNetwork();
};

const syncVisibility = () => {
  if (document.hidden) {
    syncVersion += 1;
    destroyNetwork();
    background?.setAttribute("data-network-mode", "static");
  } else {
    scheduleSync();
  }
};

const handlePageShow = (event: PageTransitionEvent) => {
  if (event.persisted) scheduleSync();
};

const handlePageHide = () => {
  syncVersion += 1;
  destroyNetwork();
  background?.setAttribute("data-network-mode", "static");
};

syncVisibility();
reducedMotionQuery.addEventListener("change", scheduleSync);
desktopWidthQuery.addEventListener("change", scheduleSync);
finePointerQuery.addEventListener("change", scheduleSync);
document.addEventListener("visibilitychange", syncVisibility);
window.addEventListener("pageshow", handlePageShow);
window.addEventListener("pagehide", handlePageHide);
