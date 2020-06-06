// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/@webgpu/types/dist/index.d.ts" />

import ResizeObserver from 'resize-observer-polyfill';
import { glMatrix, mat4, vec3 } from 'gl-matrix';

/*
          C
          /\
         /  \
        /    \
       /      \
    B /________\ A
*/

const POSITIONS = new Float32Array([
  1.0,
  -1.0,
  0.0, // A
  -1.0,
  -1.0,
  0.0, // B
  0.0,
  1.0,
  0.0, // C
]);

const COLORS = new Float32Array([
  1.0,
  0.0,
  0.0, // A (red)
  0.0,
  1.0,
  0.0, // B (green)
  0.0,
  0.0,
  1.0, // C (blue)
]);

const INDICES = new Uint16Array([0, 1, 2]);

export default class WebGPURenderer {
  private canvas: HTMLCanvasElement;
  private adapter: GPUAdapter;
  private device: GPUDevice;
  private queue: GPUQueue;

  // buffers
  private positionBuffer: GPUBuffer;
  private colorBuffer: GPUBuffer;
  private indexBuffer: GPUBuffer;
  private uniformBuffer: GPUBuffer;

  // shader modules
  private vertexModule: GPUShaderModule;
  private fragmentModule: GPUShaderModule;

  private pipeline: GPURenderPipeline;
  private swapchain: GPUSwapChain;
  private colorTexture: GPUTexture;
  private colorTextureView: GPUTextureView;
  private depthTexture: GPUTexture;
  private depthTextureView: GPUTextureView;

  private commandEncoder: GPUCommandEncoder;
  private passEncoder: GPURenderPassEncoder;

  private modelMatrix: mat4;
  private viewMatrix: mat4;
  private projectionMatrix: mat4;
  private viewTranslation: vec3 = [0, 0, 5];

  private uniformBindGroup: GPUBindGroup;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.modelMatrix = mat4.create();
    this.viewMatrix = this.createViewMat();
    this.projectionMatrix = this.createPerspectiveMat();
  }

  private createPerspectiveMat(): mat4 {
    const mat = mat4.create();
    const aspectRatio = this.canvas.width / this.canvas.height;
    mat4.perspective(mat, glMatrix.toRadian(45), aspectRatio, 0.1, 1000);
    return mat;
  }

  private createViewMat(): mat4 {
    const mat = mat4.create();
    mat4.lookAt(mat, this.viewTranslation, [0, 0, 0], [0, 1, 0]);
    return mat;
  }

  private resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.projectionMatrix = this.createPerspectiveMat();
    //console.log(`canvas size: ${this.canvas.width}, ${this.canvas.height}`);
    this.resizeSwapchain();
  }

  private async initialize(): Promise<boolean> {
    const gpu: GPU = navigator.gpu;
    if (!gpu) {
      return false;
    }

    this.adapter = await gpu.requestAdapter();

    this.device = await this.adapter.requestDevice();

    this.queue = this.device.defaultQueue;

    // display canvas
    this.canvas.style.display = 'block';

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

    return true;
  }

  private createBuffer(arr: Float32Array | Uint16Array, usage: GPUBufferUsageFlags): GPUBuffer {
    const [buffer, bufferMapped] = this.device.createBufferMapped({
      size: arr.byteLength,
      usage,
    });
    const writeArray = arr instanceof Float32Array ? new Float32Array(bufferMapped) : new Uint16Array(bufferMapped);
    writeArray.set(arr);
    buffer.unmap();

    return buffer;
  }

  private updateUniformBuffer(): void {
    const uboArray = new Float32Array([...this.modelMatrix, ...this.createViewMat(), ...this.projectionMatrix]);
    /*

    const bufferMapped = await this.uniformBuffer.mapWriteAsync();
    const writeArray = new Float32Array(bufferMapped);
    writeArray.set(uboArray);
    this.uniformBuffer.unmap();
    */
    this.queue.writeBuffer(this.uniformBuffer, 0, uboArray.buffer);
  }

  private async loadShader(path: string): Promise<GPUShaderModule> {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();

    const shaderModule = this.device.createShaderModule({
      code: new Uint32Array(buffer),
    });

    return shaderModule;
  }

  private resizeSwapchain(): void {
    if (!this.swapchain) {
      const context: GPUCanvasContext = this.canvas.getContext('gpupresent') as any;
      const swapChainDesc: GPUSwapChainDescriptor = {
        device: this.device,
        format: 'bgra8unorm',
        usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC,
      };
      this.swapchain = context.configureSwapChain(swapChainDesc);
    }

    const depthSize: GPUExtent3D = {
      width: this.canvas.width,
      height: this.canvas.height,
      depth: 1,
    };

    const depthTextureDesc: GPUTextureDescriptor = {
      size: depthSize,
      //arrayLayerCount: 1, // FIXME: possible move to GPUTextureViewDescriptor?!
      mipLevelCount: 1,
      sampleCount: 1,
      dimension: '2d',
      format: 'depth24plus-stencil8',
      usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC,
    };

    this.depthTexture = this.device.createTexture(depthTextureDesc);
    this.depthTextureView = this.depthTexture.createView();
  }

  private encodeCommands(): void {
    const colorAttachment: GPURenderPassColorAttachmentDescriptor = {
      attachment: this.colorTextureView,
      loadValue: { r: 0, g: 0, b: 0, a: 1 },
      storeOp: 'store',
    };

    const depthAttachment: GPURenderPassDepthStencilAttachmentDescriptor = {
      attachment: this.depthTextureView,
      depthLoadValue: 1,
      depthStoreOp: 'store',
      stencilLoadValue: 'load',
      stencilStoreOp: 'store',
    };

    const renderPassDesc: GPURenderPassDescriptor = {
      colorAttachments: [colorAttachment],
      depthStencilAttachment: depthAttachment,
    };

    this.commandEncoder = this.device.createCommandEncoder();

    this.passEncoder = this.commandEncoder.beginRenderPass(renderPassDesc);
    this.passEncoder.setPipeline(this.pipeline);
    this.passEncoder.setBindGroup(0, this.uniformBindGroup);
    this.passEncoder.setViewport(0, 0, this.canvas.width, this.canvas.height, 0, 1);
    this.passEncoder.setScissorRect(0, 0, this.canvas.width, this.canvas.height);
    this.passEncoder.setVertexBuffer(0, this.positionBuffer);
    this.passEncoder.setVertexBuffer(1, this.colorBuffer);
    this.passEncoder.setIndexBuffer(this.indexBuffer);
    this.passEncoder.drawIndexed(3, 1, 0, 0, 0);
    this.passEncoder.endPass();

    this.queue.submit([this.commandEncoder.finish()]);
  }

  private async initializeResources(): Promise<void> {
    // create buffers
    this.positionBuffer = this.createBuffer(POSITIONS, GPUBufferUsage.VERTEX);
    this.colorBuffer = this.createBuffer(COLORS, GPUBufferUsage.VERTEX);
    this.indexBuffer = this.createBuffer(INDICES, GPUBufferUsage.INDEX);

    const uboArray = new Float32Array([...this.modelMatrix, ...this.viewMatrix, ...this.projectionMatrix]);
    this.uniformBuffer = this.createBuffer(uboArray, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);

    // create shader modules
    this.vertexModule = await this.loadShader('basic.vert.spv');
    this.fragmentModule = await this.loadShader('basic.frag.spv');

    const positionAttributeDesc: GPUVertexAttributeDescriptor = {
      shaderLocation: 0,
      offset: 0,
      format: 'float3',
    };

    const colorAttributeDesc: GPUVertexAttributeDescriptor = {
      shaderLocation: 1,
      offset: 0,
      format: 'float3',
    };

    const positionBufferDesc: GPUVertexBufferLayoutDescriptor = {
      attributes: [positionAttributeDesc],
      arrayStride: 4 * 3, // size of Float32 = 4 bytes * count of elements
      stepMode: 'vertex',
    };

    const colorBufferDesc: GPUVertexBufferLayoutDescriptor = {
      attributes: [colorAttributeDesc],
      arrayStride: 4 * 3, // size of Float32 = 4 bytes * count of elements
      stepMode: 'vertex',
    };

    const vertexState: GPUVertexStateDescriptor = {
      indexFormat: 'uint16',
      vertexBuffers: [positionBufferDesc, colorBufferDesc],
    };

    const depthStencilState: GPUDepthStencilStateDescriptor = {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus-stencil8',
    };

    const uniformBindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          type: 'uniform-buffer',
        },
      ],
    });

    this.uniformBindGroup = this.device.createBindGroup({
      layout: uniformBindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: {
            buffer: this.uniformBuffer,
          },
        },
      ],
    });

    const piplineLayoutDesc: GPUPipelineLayoutDescriptor = { bindGroupLayouts: [uniformBindGroupLayout] };
    const layout = this.device.createPipelineLayout(piplineLayoutDesc);

    const vertexStage: GPUProgrammableStageDescriptor = {
      module: this.vertexModule,
      entryPoint: 'main',
    };

    const fragmentStage: GPUProgrammableStageDescriptor = {
      module: this.fragmentModule,
      entryPoint: 'main',
    };

    const colorState: GPUColorStateDescriptor = {
      format: 'bgra8unorm',
      alphaBlend: {
        srcFactor: 'src-alpha',
        dstFactor: 'one-minus-src-alpha',
        operation: 'add',
      },
      colorBlend: {
        srcFactor: 'src-alpha',
        dstFactor: 'one-minus-src-alpha',
        operation: 'add',
      },
      writeMask: GPUColorWrite.ALL,
    };

    const rasterizationState: GPURasterizationStateDescriptor = {
      frontFace: 'cw',
      cullMode: 'none',
    };

    const pipelineDesc: GPURenderPipelineDescriptor = {
      layout,
      vertexStage,
      fragmentStage,
      primitiveTopology: 'triangle-list',
      colorStates: [colorState],
      depthStencilState,
      vertexState,
      rasterizationState,
    };

    this.pipeline = this.device.createRenderPipeline(pipelineDesc);
  }

  private render = (): void => {
    this.colorTexture = this.swapchain.getCurrentTexture();
    this.colorTextureView = this.colorTexture.createView();

    this.viewTranslation[2] = this.viewTranslation[2] + 0.1;

    this.updateUniformBuffer();
    this.encodeCommands();

    requestAnimationFrame(this.render);
  };

  public async start(): Promise<void> {
    if (await this.initialize()) {
      this.resizeSwapchain();
      await this.initializeResources();
      this.render();
    } else {
      // no WebGPU support
      const errorEl = document.getElementById('error');
      errorEl.style.display = 'block';
    }
  }
}
