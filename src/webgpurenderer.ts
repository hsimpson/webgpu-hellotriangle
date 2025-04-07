import { mat4, vec3 } from 'wgpu-matrix';

/*
          C
          /\
         /  \
        /    \
       /      \
    B /________\ A
*/

const POSITIONS = new Float32Array([
  // A
  1.0, -1.0, 0.0,
  // B
  -1.0, -1.0, 0.0,
  // C
  0.0, 1.0, 0.0,
]);

const COLORS = new Float32Array([
  // A (red)
  1.0, 0.0, 0.0, 1.0,
  // B (green)
  0.0, 1.0, 0.0, 1.0,
  // C (blue)
  0.0, 0.0, 1.0, 1.0,
]);

// add an additional 4th index for padding, because when the buffer is created via device.createBuffer() and
// If mappedAtCreation is true, the byte size must be a multiple of 4
const INDICES = new Uint16Array([0, 1, 2, 0]);

export default class WebGPURenderer {
  private device!: GPUDevice;
  private queue!: GPUQueue;

  private presentationContext!: GPUCanvasContext;
  private presentationSize!: GPUExtent3DDict;
  private presentationFormat!: GPUTextureFormat;

  // buffers
  private positionBuffer!: GPUBuffer;
  private colorBuffer!: GPUBuffer;
  private indexBuffer!: GPUBuffer;
  private uniformBuffer!: GPUBuffer;

  // shader modules
  private vertexModule!: GPUShaderModule;
  private fragmentModule!: GPUShaderModule;

  private renderTarget!: GPUTexture;
  private renderTargetView!: GPUTextureView;

  private depthTarget!: GPUTexture;
  private depthTargetView!: GPUTextureView;

  private renderPipeline!: GPURenderPipeline;

  private commandEncoder!: GPUCommandEncoder;
  private passEncoder!: GPURenderPassEncoder;

  private modelMatrix = mat4.identity();
  private viewMatrix = mat4.identity();
  private perspectiveMatrix = mat4.identity();
  private eye = vec3.create(0, 0, 5);
  private readonly zNear = 0.1;
  private readonly zFar = 1000;
  private readonly sampleCount = 4;

  private uniformBindGroup!: GPUBindGroup;

  public constructor(private canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.updateViewMatrix();
    this.updatePerspectiveMatrix();
  }

  private updatePerspectiveMatrix() {
    const aspectRatio = this.canvas.width / this.canvas.height;
    const fov = (45 * Math.PI) / 180;
    this.perspectiveMatrix = mat4.perspective(fov, aspectRatio, this.zNear, this.zFar);
  }

  private updateViewMatrix() {
    const target = vec3.create(0, 0, 0);
    const up = vec3.create(0, 1, 0);
    this.viewMatrix = mat4.lookAt(this.eye, target, up);
  }

  private resize(width: number, height: number): void {
    if (width !== this.presentationSize.width || height !== this.presentationSize.height) {
      this.canvas.width = width;
      this.canvas.height = height;

      this.presentationSize = {
        width,
        height,
        depthOrArrayLayers: 1,
      };

      this.updatePerspectiveMatrix();
      this.resizeSwapchain();
    }
  }

  private async initialize(): Promise<boolean> {
    const gpu: GPU = navigator.gpu;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!gpu) {
      console.error('No WebGPU support navigator.gpu not available!');
      return false;
    }

    const adapter = await gpu.requestAdapter();
    if (!adapter) {
      console.error('failed to get GPUAdapter, gpu: ', gpu);
      return false;
    }
    console.log(adapter.limits);

    this.device = await adapter.requestDevice();

    this.queue = this.device.queue;

    // display canvas
    this.canvas.style.display = 'block';

    this.canvas.addEventListener('wheel', this.onMouseWheel);

    this.presentationSize = {
      width: this.canvas.width,
      height: this.canvas.height,
      depthOrArrayLayers: 1,
    };

    const gpuCanvasContext = this.canvas.getContext('webgpu');
    if (!gpuCanvasContext) {
      console.error('failed to get GPUCanvasContext');
      return false;
    }
    this.presentationContext = gpuCanvasContext;
    this.presentationFormat = gpu.getPreferredCanvasFormat();

    this.presentationContext.configure({
      device: this.device,
      format: this.presentationFormat,
      alphaMode: 'opaque',
    });

    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) {
        return;
      }
      this.resize(
        entries[0].contentRect.width * window.devicePixelRatio,
        entries[0].contentRect.height * window.devicePixelRatio,
      );
    });
    resizeObserver.observe(this.canvas);

    return true;
  }

  private onMouseWheel = (event: WheelEvent): void => {
    let z = (this.eye[2] += event.deltaY * 0.01);
    z = Math.max(this.zNear, Math.min(this.zFar, z));
    this.eye[2] = z;
  };

  private createBuffer(arr: Float32Array | Uint16Array, usage: GPUBufferUsageFlags): GPUBuffer {
    try {
      const buffer = this.device.createBuffer({
        mappedAtCreation: true,
        size: arr.byteLength,
        usage,
      });

      const bufferMapped = buffer.getMappedRange();

      const writeArray =
        arr instanceof Float32Array
          ? new Float32Array(bufferMapped)
          : new Uint16Array(bufferMapped);
      writeArray.set(arr);
      buffer.unmap();

      return buffer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private createUBOArray(): Float32Array {
    const uboArray = new Float32Array(16 * 3);
    uboArray.set(this.modelMatrix);
    uboArray.set(this.viewMatrix, 16);
    uboArray.set(this.perspectiveMatrix, 32);
    return uboArray;
    // return new Float32Array([...this.modelMatrix, ...this.cameraMatrix, ...this.perspectiveMatrix]);
  }

  private updateUniformBuffer(): void {
    this.updateViewMatrix();
    const uboArray = this.createUBOArray();

    this.queue.writeBuffer(this.uniformBuffer, 0, uboArray.buffer);
  }

  private async loadShader(path: string): Promise<GPUShaderModule> {
    const response = await fetch(path);
    const code = await response.text();
    const shaderModule = this.device.createShaderModule({ code });

    return shaderModule;
  }

  private resizeSwapchain(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.renderTarget !== undefined) {
      this.renderTarget.destroy();
      this.depthTarget.destroy();
    }

    /* render target */
    this.renderTarget = this.device.createTexture({
      size: this.presentationSize,
      sampleCount: this.sampleCount,
      format: this.presentationFormat,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    this.renderTargetView = this.renderTarget.createView();

    /* depth target */
    this.depthTarget = this.device.createTexture({
      size: this.presentationSize,
      sampleCount: this.sampleCount,
      format: 'depth24plus-stencil8',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    this.depthTargetView = this.depthTarget.createView();
  }

  private encodeCommands(): void {
    const colorAttachment: GPURenderPassColorAttachment = {
      view: this.presentationContext.getCurrentTexture().createView(),
      clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
      loadOp: 'clear',
      storeOp: 'store',
    };

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.sampleCount > 1) {
      colorAttachment.view = this.renderTargetView;
      colorAttachment.resolveTarget = this.presentationContext.getCurrentTexture().createView();
    }

    const depthAttachment: GPURenderPassDepthStencilAttachment = {
      view: this.depthTargetView,

      depthLoadOp: 'clear',
      depthClearValue: 1.0,
      depthStoreOp: 'store',

      stencilLoadOp: 'clear',
      stencilClearValue: 0,
      stencilStoreOp: 'store',
    };

    const renderPassDesc: GPURenderPassDescriptor = {
      colorAttachments: [colorAttachment],
      depthStencilAttachment: depthAttachment,
    };

    this.commandEncoder = this.device.createCommandEncoder();

    this.passEncoder = this.commandEncoder.beginRenderPass(renderPassDesc);
    this.passEncoder.setPipeline(this.renderPipeline);
    this.passEncoder.setBindGroup(0, this.uniformBindGroup);
    this.passEncoder.setViewport(0, 0, this.canvas.width, this.canvas.height, 0, 1);
    this.passEncoder.setScissorRect(0, 0, this.canvas.width, this.canvas.height);
    this.passEncoder.setVertexBuffer(0, this.positionBuffer);
    this.passEncoder.setVertexBuffer(1, this.colorBuffer);
    this.passEncoder.setIndexBuffer(this.indexBuffer, 'uint16');
    this.passEncoder.drawIndexed(3, 1, 0, 0, 0);
    this.passEncoder.end();

    this.queue.submit([this.commandEncoder.finish()]);
  }

  private async initializeResources(): Promise<void> {
    // create buffers
    this.positionBuffer = this.createBuffer(POSITIONS, GPUBufferUsage.VERTEX);
    this.colorBuffer = this.createBuffer(COLORS, GPUBufferUsage.VERTEX);
    this.indexBuffer = this.createBuffer(INDICES, GPUBufferUsage.INDEX);

    const uboArray = this.createUBOArray();
    this.uniformBuffer = this.createBuffer(
      uboArray,
      GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    );

    // create shader modules
    this.vertexModule = await this.loadShader('./shaders/basic.vert.wgsl');
    this.fragmentModule = await this.loadShader('./shaders/basic.frag.wgsl');

    const positionAttribute: GPUVertexAttribute = {
      shaderLocation: 0,
      offset: 0,
      format: 'float32x3',
    };

    const colorAttribute: GPUVertexAttribute = {
      shaderLocation: 1,
      offset: 0,
      format: 'float32x4',
    };

    const positionBufferLayout: GPUVertexBufferLayout = {
      attributes: [positionAttribute],
      arrayStride: 4 * 3, // size of Float32 = 4 bytes * count of elements
      stepMode: 'vertex',
    };

    const colorBufferLayout: GPUVertexBufferLayout = {
      attributes: [colorAttribute],
      arrayStride: 4 * 4, // size of Float32 = 4 bytes * count of elements
      stepMode: 'vertex',
    };

    // const vertexState: GPUVertexState = {
    //   indexFormat: 'uint16',
    //   vertexBuffers: [positionBufferLayout, colorBufferLayout],
    // };

    const depthStencilState: GPUDepthStencilState = {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus-stencil8',
    };

    const uniformBindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          buffer: {
            type: 'uniform',
          },
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

    const layout = this.device.createPipelineLayout({
      bindGroupLayouts: [uniformBindGroupLayout],
    });

    const vertexState: GPUVertexState = {
      module: this.vertexModule,
      entryPoint: 'main',
      buffers: [positionBufferLayout, colorBufferLayout],
    };

    const colorState: GPUColorTargetState = {
      format: 'bgra8unorm',
      blend: {
        alpha: {
          srcFactor: 'src-alpha',
          dstFactor: 'one-minus-src-alpha',
          operation: 'add',
        },
        color: {
          srcFactor: 'src-alpha',
          dstFactor: 'one-minus-src-alpha',
          operation: 'add',
        },
      },
      writeMask: GPUColorWrite.ALL,
    };

    const fragmentState: GPUFragmentState = {
      module: this.fragmentModule,
      entryPoint: 'main',
      targets: [colorState],
    };

    const pipelineDesc: GPURenderPipelineDescriptor = {
      layout,
      vertex: vertexState,
      fragment: fragmentState,
      primitive: {
        topology: 'triangle-list',
        frontFace: 'cw',
        cullMode: 'none',
      },
      depthStencil: depthStencilState,
      multisample: {
        count: this.sampleCount,
      },
    };

    this.renderPipeline = this.device.createRenderPipeline(pipelineDesc);
  }

  private render = (): void => {
    const rotation = (0.5 * Math.PI) / 180;
    mat4.rotateZ(this.modelMatrix, rotation, this.modelMatrix);

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
      if (errorEl) {
        errorEl.style.display = 'block';
      }
    }
  }
}
