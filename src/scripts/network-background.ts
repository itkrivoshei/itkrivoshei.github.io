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
  offsetX: number;
  offsetY: number;
  offsetVX: number;
  offsetVY: number;
}

interface PointerState {
  active: boolean;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
}

interface RenderedParticle {
  x: number;
  y: number;
  radius: number;
}

interface NetworkRuntime {
  canvas: HTMLCanvasElement;
  destroy: () => void;
}

const networkOptions = {
  backgroundAlpha: 0,
  damping: 0.88,
  gyroControls: false,
  linkDistance: 230,
  lineBaseOpacity: 0.22,
  lineCursorBoost: 0.18,
  mouseControls: true,
  nodeBaseOpacity: 0.54,
  nodeCursorBoost: 0.18,
  pointCount: 124,
  pointerLerp: 0.14,
  repulseRadius: 205,
  repulseStrength: 26,
  speed: 0.13,
  spring: 0.035,
  touchControls: false,
};

const background = document.querySelector<HTMLElement>("[data-network-background]");
const networkLayer = background?.querySelector<HTMLElement>("[data-network-effect]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopWidthQuery = window.matchMedia("(min-width: 1024px)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
let network: NetworkRuntime | undefined;
let syncVersion = 0;

networkLayer?.style.setProperty("pointer-events", "none");

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
  const areaFactor = Math.round((width * height) / 14_000);
  const count = Math.min(networkOptions.pointCount, Math.max(88, areaFactor));
  const columns = 14;
  const rows = Math.ceil(count / columns);

  return Array.from({ length: count }, (_, index): Particle => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const jitterX = Math.random() * 78 - 39;
    const jitterY = Math.random() * 78 - 39;

    return {
      x: ((column + 0.5) / columns) * width + jitterX,
      y: ((row + 0.5) / rows) * height + jitterY,
      vx: (Math.random() - 0.5) * networkOptions.speed,
      vy: (Math.random() - 0.5) * networkOptions.speed,
      radius: 1.15 + Math.random() * 1.55,
      offsetX: 0,
      offsetY: 0,
      offsetVX: 0,
      offsetVY: 0,
    };
  });
};

const syncPointer = (pointer: PointerState) => {
  if (!pointer.active) return;

  pointer.x += (pointer.targetX - pointer.x) * networkOptions.pointerLerp;
  pointer.y += (pointer.targetY - pointer.y) * networkOptions.pointerLerp;
};

const getTargetOffset = (particle: Particle, pointer: PointerState) => {
  if (!pointer.active) return { x: 0, y: 0 };

  const dx = particle.x - pointer.x;
  const dy = particle.y - pointer.y;
  const distance = Math.hypot(dx, dy);

  if (distance <= 0 || distance >= networkOptions.repulseRadius) return { x: 0, y: 0 };

  const force = (1 - distance / networkOptions.repulseRadius) ** 2;
  const offset = force * networkOptions.repulseStrength;

  return {
    x: (dx / distance) * offset,
    y: (dy / distance) * offset,
  };
};

const updateParticleOffset = (particle: Particle, pointer: PointerState) => {
  const targetOffset = getTargetOffset(particle, pointer);

  particle.offsetVX += (targetOffset.x - particle.offsetX) * networkOptions.spring;
  particle.offsetVY += (targetOffset.y - particle.offsetY) * networkOptions.spring;
  particle.offsetVX *= networkOptions.damping;
  particle.offsetVY *= networkOptions.damping;
  particle.offsetX += particle.offsetVX;
  particle.offsetY += particle.offsetVY;
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
    filter: "saturate(0.92) brightness(0.94)",
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
  });
  networkLayer.replaceChildren(canvas);

  const pointer: PointerState = {
    active: false,
    targetX: 0,
    targetY: 0,
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
    if (!pointer.active) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    pointer.active = true;
    pointer.targetX = event.clientX;
    pointer.targetY = event.clientY;
  };

  const clearPointer = () => {
    pointer.active = false;
  };

  const draw = () => {
    syncPointer(pointer);
    context.clearRect(0, 0, width, height);

    const renderedParticles: RenderedParticle[] = particles.map((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      updateParticleOffset(particle, pointer);

      return {
        x: particle.x + particle.offsetX,
        y: particle.y + particle.offsetY,
        radius: particle.radius,
      };
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
        const cursorBoost = Math.max(0, 1 - midpointDistance / (networkOptions.repulseRadius * 1.55));
        const opacity =
          (1 - distance / networkOptions.linkDistance) *
          (networkOptions.lineBaseOpacity + cursorBoost * networkOptions.lineCursorBoost);

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
      context.fillStyle = `rgba(226, 232, 240, ${(
        networkOptions.nodeBaseOpacity +
        cursorBoost * networkOptions.nodeCursorBoost
      ).toFixed(3)})`;
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
      loadedNetwork.canvas.style.opacity = "0.58";
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
