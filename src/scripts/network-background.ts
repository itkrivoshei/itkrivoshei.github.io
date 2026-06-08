import type { VantaNetEffect, VantaNetOptions } from "vanta/src/vanta.net.js";

interface NetworkRuntimeConfig {
  backgroundAlpha: number;
  gyroControls: boolean;
  maxDistance: number;
  mouseControls: boolean;
  points: number;
  provider: "vanta-net";
  spacing: number;
  touchControls: boolean;
}

const networkOptions = {
  backgroundAlpha: 0,
  backgroundColor: 0x020617,
  gyroControls: false,
  maxDistance: 20,
  mouseControls: true,
  points: 7,
  scale: 1,
  showDots: true,
  spacing: 24,
  touchControls: false,
} satisfies Omit<VantaNetOptions, "THREE" | "color" | "el">;

const networkColor = 0x89b4fa;

const background = document.querySelector<HTMLElement>("[data-network-background]");
const networkLayer = background?.querySelector<HTMLElement>("[data-network-effect]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopWidthQuery = window.matchMedia("(min-width: 1024px)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
let network: VantaNetEffect | undefined;
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
    maxDistance: networkOptions.maxDistance,
    mouseControls: networkOptions.mouseControls,
    points: networkOptions.points,
    provider: "vanta-net",
    spacing: networkOptions.spacing,
    touchControls: networkOptions.touchControls,
  };

  background.setAttribute("data-network-config", JSON.stringify(config));
  background.setAttribute("data-network-provider", config.provider);
};

const destroyNetwork = () => {
  network?.destroy();
  network = undefined;
  networkLayer?.replaceChildren();
  background?.removeAttribute("data-network-ready");
  background?.removeAttribute("data-network-config");
  background?.removeAttribute("data-network-provider");
};

const syncNetwork = async () => {
  const currentVersion = ++syncVersion;

  if (!background || !networkLayer || !shouldAnimate()) {
    destroyNetwork();
    background?.setAttribute("data-network-mode", "static");
    return;
  }

  background.setAttribute("data-network-mode", "animated");

  if (network) return;

  destroyNetwork();

  try {
    const [{ default: createVantaNet }, THREE] = await Promise.all([
      import("vanta/src/vanta.net.js"),
      import("./vanta-three"),
    ]);

    if (currentVersion !== syncVersion || !shouldAnimate()) return;

    const loadedNetwork = createVantaNet({
      ...networkOptions,
      THREE,
      color: networkColor,
      el: networkLayer,
    });

    if (
      currentVersion !== syncVersion ||
      !shouldAnimate() ||
      !networkLayer.querySelector(".vanta-canvas")
    ) {
      loadedNetwork.destroy();
      return;
    }

    network = loadedNetwork;
    publishNetworkConfig();

    window.requestAnimationFrame(() => {
      if (network === loadedNetwork && shouldAnimate()) {
        background.setAttribute("data-network-ready", "true");
      }
    });
  } catch {
    destroyNetwork();
    background?.setAttribute("data-network-mode", "static");
  }
};

const scheduleSync = () => {
  void syncNetwork();
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
