type Particle = [
  x: number,
  y: number,
  vx: number,
  vy: number,
  radius: number,
  offsetX: number,
  offsetY: number,
  offsetVX: number,
  offsetVY: number,
];

type RenderPoint = [x: number, y: number, radius: number];

const POINTS = 124;
const MIN_POINTS = 88;
const COLUMNS = 14;
const LINK_DISTANCE = 230;
const REPULSE_RADIUS = 205;
const REPULSE_STRENGTH = 5;
const SPEED = 0.35;
const POINTER_LERP = 0.15;
const SPRING = 0.035;
const DAMPING = 0.92;
const LINE_BASE_OPACITY = 0.38;
const LINE_CURSOR_BOOST = 0.55;
const NODE_BASE_OPACITY = 0.38;
const NODE_CURSOR_BOOST = 0.55;

const root = document.documentElement;
const background = document.querySelector<HTMLElement>("[data-network-background]");
const layer = background?.querySelector<HTMLElement>("[data-network-effect]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktop = window.matchMedia("(min-width: 1024px)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

let canvas: HTMLCanvasElement | undefined;
let context: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let frame = 0;
let scrollFrame = 0;
let width = 0;
let height = 0;
let pointerActive = false;
let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;

const canAnimate = () =>
  Boolean(background && layer && !document.hidden && !reducedMotion.matches && desktop.matches && finePointer.matches);

const syncScrollDepth = () => {
  scrollFrame = 0;
  const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
  root.style.setProperty("--scroll-depth", Math.min(1, Math.max(0, window.scrollY / maxScroll)).toFixed(3));
};

const scheduleScrollDepth = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(syncScrollDepth);
};

const resize = () => {
  if (!canvas) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(POINTS, Math.max(MIN_POINTS, Math.round((width * height) / 14_000)));
  const rows = Math.ceil(count / COLUMNS);
  particles = [];

  for (let index = 0; index < count; index += 1) {
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);

    particles.push([
      ((column + 0.5) / COLUMNS) * width + Math.random() * 78 - 39,
      ((row + 0.5) / rows) * height + Math.random() * 78 - 39,
      (Math.random() - 0.5) * SPEED,
      (Math.random() - 0.5) * SPEED,
      1.15 + Math.random() * 1.55,
      0,
      0,
      0,
      0,
    ]);
  }
};

const movePointer = (event: PointerEvent) => {
  if (!pointerActive) {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }

  pointerActive = true;
  targetX = event.clientX;
  targetY = event.clientY;
};

const clearPointer = () => {
  pointerActive = false;
};

const draw = () => {
  if (!context) return;

  if (pointerActive) {
    pointerX += (targetX - pointerX) * POINTER_LERP;
    pointerY += (targetY - pointerY) * POINTER_LERP;
  }

  context.clearRect(0, 0, width, height);

  const points: RenderPoint[] = particles.map((particle) => {
    particle[0] += particle[2];
    particle[1] += particle[3];

    if (particle[0] < -20) particle[0] = width + 20;
    if (particle[0] > width + 20) particle[0] = -20;
    if (particle[1] < -20) particle[1] = height + 20;
    if (particle[1] > height + 20) particle[1] = -20;

    const dx = particle[0] - pointerX;
    const dy = particle[1] - pointerY;
    const distance = pointerActive ? Math.hypot(dx, dy) : Infinity;
    const force = distance > 0 && distance < REPULSE_RADIUS ? (1 - distance / REPULSE_RADIUS) ** 2 : 0;
    const targetOffsetX = force ? (dx / distance) * force * REPULSE_STRENGTH : 0;
    const targetOffsetY = force ? (dy / distance) * force * REPULSE_STRENGTH : 0;

    particle[7] = (particle[7] + (targetOffsetX - particle[5]) * SPRING) * DAMPING;
    particle[8] = (particle[8] + (targetOffsetY - particle[6]) * SPRING) * DAMPING;
    particle[5] += particle[7];
    particle[6] += particle[8];

    return [particle[0] + particle[5], particle[1] + particle[6], particle[4]];
  });

  for (let firstIndex = 0; firstIndex < points.length; firstIndex += 1) {
    const first = points[firstIndex];

    for (let secondIndex = firstIndex + 1; secondIndex < points.length; secondIndex += 1) {
      const second = points[secondIndex];
      const distance = Math.hypot(first[0] - second[0], first[1] - second[1]);

      if (distance > LINK_DISTANCE) continue;

      const midpointDistance = pointerActive
        ? Math.hypot((first[0] + second[0]) / 2 - pointerX, (first[1] + second[1]) / 2 - pointerY)
        : Infinity;
      const cursorBoost = Math.max(0, 1 - midpointDistance / (REPULSE_RADIUS * 1.55));
      const opacity = (1 - distance / LINK_DISTANCE) * (LINE_BASE_OPACITY + cursorBoost * LINE_CURSOR_BOOST);

      context.beginPath();
      context.moveTo(first[0], first[1]);
      context.lineTo(second[0], second[1]);
      context.strokeStyle = `rgba(137, 180, 250, ${opacity.toFixed(3)})`;
      context.lineWidth = 1;
      context.stroke();
    }
  }

  for (const point of points) {
    const cursorDistance = pointerActive ? Math.hypot(point[0] - pointerX, point[1] - pointerY) : Infinity;
    const cursorBoost = Math.max(0, 1 - cursorDistance / REPULSE_RADIUS);

    context.beginPath();
    context.arc(point[0], point[1], point[2] + cursorBoost * 0.55, 0, Math.PI * 2);
    context.fillStyle = `rgba(226, 232, 240, ${(NODE_BASE_OPACITY + cursorBoost * NODE_CURSOR_BOOST).toFixed(3)})`;
    context.fill();
  }

  frame = window.requestAnimationFrame(draw);
};

const destroyNetwork = () => {
  if (frame) window.cancelAnimationFrame(frame);
  frame = 0;
  window.removeEventListener("pointermove", movePointer);
  window.removeEventListener("pointerleave", clearPointer);
  window.removeEventListener("blur", clearPointer);
  canvas?.remove();
  canvas = undefined;
  context = null;
  particles = [];
  background?.removeAttribute("data-network-ready");
  background?.setAttribute("data-network-mode", "static");
};

const createNetwork = () => {
  if (!layer || canvas) return;

  canvas = document.createElement("canvas");
  context = canvas.getContext("2d", { alpha: true });

  if (!context) {
    canvas = undefined;
    return;
  }

  canvas.className = "repulse-network-canvas";
  canvas.setAttribute("aria-hidden", "true");
  layer.replaceChildren(canvas);
  resize();
  window.addEventListener("pointermove", movePointer, { passive: true });
  window.addEventListener("pointerleave", clearPointer);
  window.addEventListener("blur", clearPointer);
  frame = window.requestAnimationFrame(draw);
};

const syncNetwork = () => {
  if (!canAnimate()) {
    destroyNetwork();
    return;
  }

  background?.setAttribute("data-network-mode", "animated");
  createNetwork();

  window.requestAnimationFrame(() => {
    if (canvas && canAnimate()) background?.setAttribute("data-network-ready", "true");
  });
};

const hideNetwork = () => {
  destroyNetwork();
};

syncScrollDepth();
syncNetwork();
reducedMotion.addEventListener("change", syncNetwork);
desktop.addEventListener("change", syncNetwork);
finePointer.addEventListener("change", syncNetwork);
document.addEventListener("visibilitychange", syncNetwork);
window.addEventListener("scroll", scheduleScrollDepth, { passive: true });
window.addEventListener("resize", () => {
  scheduleScrollDepth();
  resize();
});
window.addEventListener("pagehide", hideNetwork);
window.addEventListener("pageshow", syncNetwork);
