declare module "vanta/src/vanta.net.js" {
  import type * as Three from "three";

  export interface VantaNetOptions {
    THREE: typeof Three | object;
    backgroundAlpha: number;
    backgroundColor: number;
    color: number;
    el: HTMLElement;
    gyroControls: boolean;
    maxDistance: number;
    mouseControls: boolean;
    mouseEase?: boolean;
    points: number;
    scale: number;
    showDots: boolean;
    spacing: number;
    touchControls: boolean;
  }

  export interface VantaNetEffect {
    destroy(): void;
    setOptions(options: Partial<VantaNetOptions>): void;
  }

  const createVantaNet: (options: VantaNetOptions) => VantaNetEffect;

  export default createVantaNet;
}
