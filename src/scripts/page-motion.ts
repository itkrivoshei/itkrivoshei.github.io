import type { AtroposInstance } from "atropos";
import type Lenis from "lenis";
import {
  backgroundThemeChangeEvent,
  type BackgroundTheme,
  type BackgroundThemeChangeDetail,
} from "../types/background";

const body = document.body;
const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
const themeTargets = Array.from(
  document.querySelectorAll<HTMLElement>("[data-background-theme]:not([data-network-background])"),
);
const featuredCards = Array.from(document.querySelectorAll<HTMLElement>("[data-atropos-card]"));
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopWidthQuery = window.matchMedia("(min-width: 1024px)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
const hasMotionTargets =
  revealTargets.length > 0 || themeTargets.length > 0 || featuredCards.length > 0;
let motionVersion = 0;
let documentLoaded = document.readyState === "complete";
let cleanupMotion: (() => void) | undefined;

const shouldEnableMotion = () =>
  hasMotionTargets &&
  documentLoaded &&
  !reducedMotionQuery.matches &&
  desktopWidthQuery.matches &&
  finePointerQuery.matches;

const setBackgroundTheme = (theme: BackgroundTheme) => {
  window.dispatchEvent(
    new CustomEvent<BackgroundThemeChangeDetail>(backgroundThemeChangeEvent, {
      detail: { theme },
    }),
  );
};

const clearRuntimeAttributes = () => {
  body.removeAttribute("data-motion-mode");
  body.removeAttribute("data-lenis-ready");
  body.removeAttribute("data-scrolltrigger-ready");
  featuredCards.forEach((card) => card.removeAttribute("data-atropos-ready"));
};

const destroyMotion = () => {
  motionVersion += 1;
  cleanupMotion?.();
  cleanupMotion = undefined;
  clearRuntimeAttributes();
  setBackgroundTheme("hero");
};

const initializeMotion = async () => {
  const currentVersion = ++motionVersion;
  let cleanupInitializedMotion: (() => void) | undefined;

  cleanupMotion?.();
  cleanupMotion = undefined;
  clearRuntimeAttributes();

  if (!shouldEnableMotion()) {
    body.setAttribute("data-motion-mode", "static");
    setBackgroundTheme("hero");
    return;
  }

  body.setAttribute("data-motion-mode", "loading");

  try {
    const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]);

    if (currentVersion !== motionVersion || !shouldEnableMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis: Lenis = new Lenis({
      anchors: {
        duration: 0.72,
      },
      autoRaf: true,
      autoToggle: true,
      lerp: 0.14,
      overscroll: false,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });
    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", syncScrollTrigger);

    const context = gsap.context(() => {
      revealTargets.forEach((target) => {
        if (target.getBoundingClientRect().top <= window.innerHeight * 0.78) return;

        const isCard = target.dataset.reveal === "card";
        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: isCard ? 9 : 14,
          },
          {
            clearProps: "opacity,transform",
            duration: isCard ? 0.52 : 0.64,
            ease: "power2.out",
            opacity: 1,
            scrollTrigger: {
              once: true,
              start: "top 90%",
              trigger: target,
            },
            y: 0,
          },
        );
      });

      themeTargets.forEach((target) => {
        const theme = target.dataset.backgroundTheme as BackgroundTheme | undefined;
        if (!theme) return;

        ScrollTrigger.create({
          end: "bottom center",
          onEnter: () => setBackgroundTheme(theme),
          onEnterBack: () => setBackgroundTheme(theme),
          start: "top center",
          trigger: target,
        });
      });
    });

    const atroposInstances: AtroposInstance[] = [];
    cleanupInitializedMotion = () => {
      atroposInstances.forEach((instance) => {
        instance.destroy();
        instance.el.classList.remove("atropos-active");
        instance.el
          .querySelectorAll<HTMLElement>(".atropos-shadow, .atropos-highlight")
          .forEach((element) => element.remove());
        instance.el
          .querySelectorAll<HTMLElement>(".atropos-scale, .atropos-rotate, .atropos-inner")
          .forEach((element) => element.removeAttribute("style"));
      });
      context.revert();
      lenis.off("scroll", syncScrollTrigger);
      lenis.destroy();
    };

    if (featuredCards.length > 0) {
      const { default: Atropos } = await import("atropos");

      if (currentVersion !== motionVersion || !shouldEnableMotion()) {
        cleanupInitializedMotion();
        return;
      }

      featuredCards.forEach((card) => {
        atroposInstances.push(
          Atropos({
            activeOffset: 1,
            commonOrigin: true,
            duration: 650,
            el: card,
            highlight: false,
            rotateTouch: false,
            rotateXMax: 1.1,
            rotateYMax: 1.5,
            shadow: true,
            shadowOffset: 10,
            shadowScale: 1.01,
          }),
        );
        card.setAttribute("data-atropos-ready", "true");
      });
    }

    ScrollTrigger.refresh();
    body.setAttribute("data-motion-mode", "desktop");
    body.setAttribute("data-lenis-ready", "true");
    body.setAttribute("data-scrolltrigger-ready", "true");

    cleanupMotion = cleanupInitializedMotion;
  } catch {
    cleanupInitializedMotion?.();
    clearRuntimeAttributes();
    body.setAttribute("data-motion-mode", "static");
    setBackgroundTheme("hero");
  }
};

const scheduleMotion = () => {
  void initializeMotion();
};

const handleLoad = () => {
  documentLoaded = true;
  scheduleMotion();
};

const handlePageHide = () => {
  destroyMotion();
};

const handlePageShow = (event: PageTransitionEvent) => {
  if (event.persisted) {
    documentLoaded = true;
    scheduleMotion();
  }
};

if (documentLoaded) {
  scheduleMotion();
} else {
  window.addEventListener("load", handleLoad, { once: true });
}

reducedMotionQuery.addEventListener("change", scheduleMotion);
desktopWidthQuery.addEventListener("change", scheduleMotion);
finePointerQuery.addEventListener("change", scheduleMotion);
window.addEventListener("pageshow", handlePageShow);
window.addEventListener("pagehide", handlePageHide);
