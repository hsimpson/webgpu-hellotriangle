import ResizeObserver from 'resize-observer-polyfill';

export default class WebGPURenderer {
  private canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // set canvas size to css size * device pixel ratio
    //this.canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    //this.canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  }

  private resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    console.log(`canvas size: ${this.canvas.width}, ${this.canvas.height}`);
  }

  private initialize(): void {
    const ro = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) {
        return;
      }
      this.resize(
        entries[0].contentRect.width * window.devicePixelRatio,
        entries[0].contentRect.height * window.devicePixelRatio
      );
    });

    ro.observe(this.canvas);
  }

  public start(): void {
    this.initialize();
  }
}
