import type Lenis from "lenis";

type Cleanup = () => void;

const body = document.body;
const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopWidthQuery = window.matchMedia("(min-width: 1024px)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
const hasMotionTargets = revealTargets.length > 0;
const revealStart = "top 92%";
let motionVersion = 0;
let documentLoaded = document.readyState === "complete";
let cleanupMotion: Cleanup | undefined;

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

const clearRevealStyles = (target: HTMLElement) => {
  target.style.removeProperty("opacity");
  target.style.removeProperty("visibility");
  target.style.removeProperty("transform");
};

const markTargetVisible = (target: HTMLElement) => {
  clearRevealStyles(target);
  target.dataset.revealState = "visible";
  target.dataset.revealed = "true";
};

const resetTransientRevealState = () => {
  revealTargets.forEach((target) => {
    if (target.dataset.revealState === "hidden" || target.dataset.revealState === "revealing") {
      clearRevealStyles(target);
      target.dataset.revealState = "visible";
    }
  });
};

const revealAll = () => {
  revealTargets.forEach(markTargetVisible);
};

const destroyMotion = () => {
  motionVersion += 1;
  cleanupMotion?.();
  cleanupMotion = undefined;
  revealAll();
  clearRuntimeAttributes();
};

const initializeMotion = async () => {
  const currentVersion = ++motionVersion;
  let cleanupInitializedMotion: Cleanup | undefined;

  cleanupMotion?.();
  cleanupMotion = undefined;
  resetTransientRevealState();
  clearRuntimeAttributes();

  if (!shouldEnableMotion()) {
    revealAll();
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
    gsap.ticker.lagSmoothing(0);

    const revealTriggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    revealTargets.forEach((target) => {
      if (target.dataset.revealed === "true") return;

      const isCard = target.dataset.reveal === "card";
      const initialY = isCard ? 10 : 12;

      if (target.getBoundingClientRect().top <= window.innerHeight) {
        markTargetVisible(target);
        return;
      }

      target.dataset.revealState = "hidden";
      gsap.set(target, {
        force3D: true,
        opacity: 0,
        y: initialY,
      });

      const trigger = ScrollTrigger.create({
        once: true,
        start: revealStart,
        trigger: target,
        onEnter: () => {
          target.dataset.revealState = "revealing";

          gsap.to(target, {
            clearProps: "opacity,transform",
            duration: isCard ? 0.48 : 0.56,
            ease: "power2.out",
            opacity: 1,
            overwrite: "auto",
            y: 0,
            onComplete: () => {
              markTargetVisible(target);
            },
          });
        },
      });

      revealTriggers.push(trigger);
    });

    cleanupInitializedMotion = () => {
      revealTriggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf(revealTargets);
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };

    ScrollTrigger.refresh();
    body.setAttribute("data-motion-mode", "desktop");
    body.setAttribute("data-lenis-ready", "true");
    body.setAttribute("data-scrolltrigger-ready", "true");

    cleanupMotion = cleanupInitializedMotion;
  } catch {
    cleanupInitializedMotion?.();
    revealAll();
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
  if (event.persisted || !body.hasAttribute("data-motion-mode")) {
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
