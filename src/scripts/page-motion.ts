import type Lenis from "lenis";

const body = document.body;
const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopWidthQuery = window.matchMedia("(min-width: 1024px)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
const hasMotionTargets = revealTargets.length > 0;
let motionVersion = 0;
let documentLoaded = document.readyState === "complete";
let cleanupMotion: (() => void) | undefined;

const shouldEnableMotion = () =>
  hasMotionTargets &&
  documentLoaded &&
  !document.hidden &&
  !reducedMotionQuery.matches &&
  desktopWidthQuery.matches &&
  finePointerQuery.matches;

const clearRuntimeAttributes = () => {
  body.removeAttribute("data-motion-mode");
  body.removeAttribute("data-lenis-ready");
  body.removeAttribute("data-scrolltrigger-ready");
};

const destroyMotion = () => {
  motionVersion += 1;
  cleanupMotion?.();
  cleanupMotion = undefined;
  clearRuntimeAttributes();
};

const initializeMotion = async () => {
  const currentVersion = ++motionVersion;
  let cleanupInitializedMotion: (() => void) | undefined;

  cleanupMotion?.();
  cleanupMotion = undefined;
  clearRuntimeAttributes();

  if (!shouldEnableMotion()) {
    body.setAttribute("data-motion-mode", "static");
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
      autoRaf: false,
      autoToggle: true,
      lerp: 0.14,
      overscroll: false,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });
    const syncScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", syncScrollTrigger);
    gsap.ticker.add(updateLenis);

    const runtime: { context?: ReturnType<typeof gsap.context> } = {};
    cleanupInitializedMotion = () => {
      runtime.context?.revert();
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };

    runtime.context = gsap.context(() => {
      revealTargets.forEach((target) => {
        if (target.getBoundingClientRect().top <= window.innerHeight * 0.78) return;

        const isCard = target.dataset.reveal === "card";
        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: isCard ? 8 : 10,
          },
          {
            clearProps: "opacity,transform",
            duration: isCard ? 0.48 : 0.56,
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
    });

    ScrollTrigger.refresh();
    body.setAttribute("data-motion-mode", "desktop");
    body.setAttribute("data-lenis-ready", "true");
    body.setAttribute("data-scrolltrigger-ready", "true");

    cleanupMotion = cleanupInitializedMotion;
  } catch {
    cleanupInitializedMotion?.();
    clearRuntimeAttributes();
    body.setAttribute("data-motion-mode", "static");
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

const handleVisibilityChange = () => {
  if (document.hidden) {
    destroyMotion();
  } else {
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
document.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("pageshow", handlePageShow);
window.addEventListener("pagehide", handlePageHide);
