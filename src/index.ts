import './style.css';
import WebGPURenderer from './webgpurenderer';

const canvas: HTMLCanvasElement = document.getElementById('webgpu_canvas') as HTMLCanvasElement;

const renderer = new WebGPURenderer(canvas);
console.log(`canvas size: ${canvas.width}, ${canvas.height}`);
renderer.start();
