export default class WebGPURenderer {
  public constructor(canvas: HTMLCanvasElement) {
    // set canvas size to css size * device pixel ratio
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  }

  public start(): void {
    // do nothing yet
  }
}
