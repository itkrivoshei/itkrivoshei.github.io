import {
  backgroundThemeChangeEvent,
  type BackgroundTheme,
  type BackgroundThemeChangeDetail,
} from "../types/background";
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
  maxDistance: 18,
  mouseControls: true,
  mouseEase: true,
  points: 7,
  scale: 1,
  showDots: true,
  spacing: 23,
  touchControls: false,
} satisfies Omit<VantaNetOptions, "THREE" | "color" | "el">;

const themeColors: Record<BackgroundTheme, number> = {
  hero: 0x89b4fa,
  about: 0x94e2d5,
  skills: 0x74c7ec,
  experience: 0x89b4fa,
  projects: 0xa6e3a1,
};

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

const setBackgroundTheme = (theme: BackgroundTheme) => {
  const color = themeColors[theme];
  background?.setAttribute("data-background-theme", theme);
  background?.setAttribute("data-network-color", `#${color.toString(16).padStart(6, "0")}`);
  network?.setOptions({ color });
};

const handleBackgroundThemeChange = (event: Event) => {
  const theme = (event as CustomEvent<BackgroundThemeChangeDetail>).detail?.theme;
  if (theme && themeColors[theme]) setBackgroundTheme(theme);
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
      color:
        themeColors[(background.dataset.backgroundTheme as BackgroundTheme | undefined) ?? "hero"],
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
  background?.toggleAttribute("data-background-paused", document.hidden);
};

const handlePageShow = (event: PageTransitionEvent) => {
  if (event.persisted) scheduleSync();
};

const handlePageHide = () => {
  syncVersion += 1;
  setBackgroundTheme("hero");
  destroyNetwork();
  background?.setAttribute("data-network-mode", "static");
};

setBackgroundTheme("hero");
scheduleSync();
syncVisibility();
reducedMotionQuery.addEventListener("change", scheduleSync);
desktopWidthQuery.addEventListener("change", scheduleSync);
finePointerQuery.addEventListener("change", scheduleSync);
document.addEventListener("visibilitychange", syncVisibility);
window.addEventListener(backgroundThemeChangeEvent, handleBackgroundThemeChange);
window.addEventListener("pageshow", handlePageShow);
window.addEventListener("pagehide", handlePageHide);
