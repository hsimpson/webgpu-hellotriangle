var D=Object.defineProperty;var I=(e,t,r)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var o=(e,t,r)=>(I(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var L=function(){if(typeof Map<"u")return Map;function e(t,r){var n=-1;return t.some(function(i,s){return i[0]===r?(n=s,!0):!1}),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),i=this.__entries__[n];return i&&i[1]},t.prototype.set=function(r,n){var i=e(this.__entries__,r);~i?this.__entries__[i][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,i=e(n,r);~i&&n.splice(i,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var i=0,s=this.__entries__;i<s.length;i++){var a=s[i];r.call(n,a[1],a[0])}},t}()}(),x=typeof window<"u"&&typeof document<"u"&&window.document===document,g=function(){return typeof global<"u"&&global.Math===Math?global:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()}(),N=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(g):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}}(),q=2;function W(e,t){var r=!1,n=!1,i=0;function s(){r&&(r=!1,e()),n&&c()}function a(){N(s)}function c(){var h=Date.now();if(r){if(h-i<q)return;n=!0}else r=!0,n=!1,setTimeout(a,t);i=h}return c}var j=20,k=["top","right","bottom","left","width","height","size","weight"],H=typeof MutationObserver<"u",Y=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=W(this.refresh.bind(this),j)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!x||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),H?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!x||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,i=k.some(function(s){return!!~n.indexOf(s)});i&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),F=function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var i=n[r];Object.defineProperty(e,i,{value:t[i],enumerable:!1,writable:!1,configurable:!0})}return e},v=function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||g},G=_(0,0,0,0);function w(e){return parseFloat(e)||0}function B(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,i){var s=e["border-"+i+"-width"];return n+w(s)},0)}function X(e){for(var t=["top","right","bottom","left"],r={},n=0,i=t;n<i.length;n++){var s=i[n],a=e["padding-"+s];r[s]=w(a)}return r}function K(e){var t=e.getBBox();return _(0,0,t.width,t.height)}function $(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return G;var n=v(e).getComputedStyle(e),i=X(n),s=i.left+i.right,a=i.top+i.bottom,c=w(n.width),h=w(n.height);if(n.boxSizing==="border-box"&&(Math.round(c+s)!==t&&(c-=B(n,"left","right")+s),Math.round(h+a)!==r&&(h-=B(n,"top","bottom")+a)),!J(e)){var d=Math.round(c+s)-t,u=Math.round(h+a)-r;Math.abs(d)!==1&&(c-=d),Math.abs(u)!==1&&(h-=u)}return _(i.left,i.top,c,h)}var Z=function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof v(e).SVGGraphicsElement}:function(e){return e instanceof v(e).SVGElement&&typeof e.getBBox=="function"}}();function J(e){return e===v(e).document.documentElement}function Q(e){return x?Z(e)?K(e):$(e):G}function ee(e){var t=e.x,r=e.y,n=e.width,i=e.height,s=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,a=Object.create(s.prototype);return F(a,{x:t,y:r,width:n,height:i,top:r,right:t+n,bottom:i+r,left:t}),a}function _(e,t,r,n){return{x:e,y:t,width:r,height:n}}var te=function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=_(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=Q(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e}(),re=function(){function e(t,r){var n=ee(r);F(this,{target:t,contentRect:n})}return e}(),ne=function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new L,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof v(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new te(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof v(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;!r.has(t)||(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(!!this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new re(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),V=typeof WeakMap<"u"?new WeakMap:new L,U=function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=Y.getInstance(),n=new ne(t,r,this);V.set(this,n)}return e}();["observe","unobserve","disconnect"].forEach(function(e){U.prototype[e]=function(){var t;return(t=V.get(this))[e].apply(t,arguments)}});var ie=function(){return typeof g.ResizeObserver<"u"?g.ResizeObserver:U}(),E=1e-6,C=typeof Float32Array<"u"?Float32Array:Array,se=Math.PI/180;function P(e){return e*se}Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});function M(){var e=new C(16);return C!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function ae(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function oe(e,t,r){var n=Math.sin(r),i=Math.cos(r),s=t[0],a=t[1],c=t[2],h=t[3],d=t[4],u=t[5],l=t[6],p=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*i+d*n,e[1]=a*i+u*n,e[2]=c*i+l*n,e[3]=h*i+p*n,e[4]=d*i-s*n,e[5]=u*i-a*n,e[6]=l*i-c*n,e[7]=p*i-h*n,e}function ce(e,t,r,n,i){var s=1/Math.tan(t/2),a;return e[0]=s/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0?(a=1/(n-i),e[10]=(i+n)*a,e[14]=2*i*n*a):(e[10]=-1,e[14]=-2*n),e}var he=ce;function fe(e,t,r,n){var i,s,a,c,h,d,u,l,p,f,m=t[0],y=t[1],b=t[2],O=n[0],A=n[1],R=n[2],T=r[0],z=r[1],S=r[2];return Math.abs(m-T)<E&&Math.abs(y-z)<E&&Math.abs(b-S)<E?ae(e):(u=m-T,l=y-z,p=b-S,f=1/Math.hypot(u,l,p),u*=f,l*=f,p*=f,i=A*p-R*l,s=R*u-O*p,a=O*l-A*u,f=Math.hypot(i,s,a),f?(f=1/f,i*=f,s*=f,a*=f):(i=0,s=0,a=0),c=l*a-p*s,h=p*i-u*a,d=u*s-l*i,f=Math.hypot(c,h,d),f?(f=1/f,c*=f,h*=f,d*=f):(c=0,h=0,d=0),e[0]=i,e[1]=c,e[2]=u,e[3]=0,e[4]=s,e[5]=h,e[6]=l,e[7]=0,e[8]=a,e[9]=d,e[10]=p,e[11]=0,e[12]=-(i*m+s*y+a*b),e[13]=-(c*m+h*y+d*b),e[14]=-(u*m+l*y+p*b),e[15]=1,e)}const ue=new Float32Array([1,-1,0,-1,-1,0,0,1,0]),de=new Float32Array([1,0,0,1,0,1,0,1,0,0,1,1]),le=new Uint16Array([0,1,2,0]);class pe{constructor(t){o(this,"canvas");o(this,"device");o(this,"queue");o(this,"presentationContext");o(this,"presentationSize");o(this,"presentationFormat");o(this,"positionBuffer");o(this,"colorBuffer");o(this,"indexBuffer");o(this,"uniformBuffer");o(this,"vertexModule");o(this,"fragmentModule");o(this,"renderTarget");o(this,"renderTargetView");o(this,"depthTarget");o(this,"depthTargetView");o(this,"renderPipeline");o(this,"commandEncoder");o(this,"passEncoder");o(this,"modelMatrix");o(this,"viewMatrix");o(this,"projectionMatrix");o(this,"viewTranslation",[0,0,5]);o(this,"zNear",.1);o(this,"zFar",1e3);o(this,"sampleCount",4);o(this,"uniformBindGroup");o(this,"onMouseWheel",t=>{let r=this.viewTranslation[2]+=t.deltaY*.01;r=Math.max(this.zNear,Math.min(this.zFar,r)),this.viewTranslation[2]=r});o(this,"render",()=>{oe(this.modelMatrix,this.modelMatrix,P(.5)),this.updateUniformBuffer(),this.encodeCommands(),requestAnimationFrame(this.render)});this.canvas=t,this.modelMatrix=M(),this.viewMatrix=this.createViewMat(),this.projectionMatrix=this.createPerspectiveMat()}createPerspectiveMat(){const t=M(),r=this.canvas.width/this.canvas.height;return he(t,P(45),r,this.zNear,this.zFar),t}createViewMat(){const t=M();return fe(t,this.viewTranslation,[0,0,0],[0,1,0]),t}resize(t,r){(t!==this.presentationSize.width||r!==this.presentationSize.height)&&(this.canvas.width=t,this.canvas.height=r,this.presentationSize={width:t,height:r,depthOrArrayLayers:1},this.projectionMatrix=this.createPerspectiveMat(),this.resizeSwapchain())}async initialize(){const t=navigator.gpu;if(!t)return console.error("No WebGPU support navigator.gpu not available!"),!1;const r=await t.requestAdapter();return console.log(r.limits),this.device=await r.requestDevice(),this.queue=this.device.queue,this.canvas.style.display="block",this.canvas.addEventListener("wheel",this.onMouseWheel),this.presentationSize={width:this.canvas.width,height:this.canvas.height,depthOrArrayLayers:1},this.presentationContext=this.canvas.getContext("webgpu"),this.presentationFormat=t.getPreferredCanvasFormat(),this.presentationContext.configure({device:this.device,format:this.presentationFormat,alphaMode:"opaque"}),new ie(i=>{!Array.isArray(i)||this.resize(i[0].contentRect.width*window.devicePixelRatio,i[0].contentRect.height*window.devicePixelRatio)}).observe(this.canvas),!0}createBuffer(t,r){try{const n=this.device.createBuffer({mappedAtCreation:!0,size:t.byteLength,usage:r}),i=n.getMappedRange();return(t instanceof Float32Array?new Float32Array(i):new Uint16Array(i)).set(t),n.unmap(),n}catch(n){console.error(n)}}updateUniformBuffer(){const t=new Float32Array([...this.modelMatrix,...this.createViewMat(),...this.projectionMatrix]);this.queue.writeBuffer(this.uniformBuffer,0,t.buffer)}async loadShader(t){const r=await fetch(t);return this.device.createShaderModule({code:await r.text()})}resizeSwapchain(){this.renderTarget!==void 0&&(this.renderTarget.destroy(),this.depthTarget.destroy()),this.renderTarget=this.device.createTexture({size:this.presentationSize,sampleCount:this.sampleCount,format:this.presentationFormat,usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.renderTargetView=this.renderTarget.createView(),this.depthTarget=this.device.createTexture({size:this.presentationSize,sampleCount:this.sampleCount,format:"depth24plus-stencil8",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.depthTargetView=this.depthTarget.createView()}encodeCommands(){const t={view:this.presentationContext.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"};this.sampleCount>1&&(t.view=this.renderTargetView,t.resolveTarget=this.presentationContext.getCurrentTexture().createView());const r={view:this.depthTargetView,depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store",stencilLoadOp:"clear",stencilClearValue:0,stencilStoreOp:"store"},n={colorAttachments:[t],depthStencilAttachment:r};this.commandEncoder=this.device.createCommandEncoder(),this.passEncoder=this.commandEncoder.beginRenderPass(n),this.passEncoder.setPipeline(this.renderPipeline),this.passEncoder.setBindGroup(0,this.uniformBindGroup),this.passEncoder.setViewport(0,0,this.canvas.width,this.canvas.height,0,1),this.passEncoder.setScissorRect(0,0,this.canvas.width,this.canvas.height),this.passEncoder.setVertexBuffer(0,this.positionBuffer),this.passEncoder.setVertexBuffer(1,this.colorBuffer),this.passEncoder.setIndexBuffer(this.indexBuffer,"uint16"),this.passEncoder.drawIndexed(3,1,0,0,0),this.passEncoder.end(),this.queue.submit([this.commandEncoder.finish()])}async initializeResources(){this.positionBuffer=this.createBuffer(ue,GPUBufferUsage.VERTEX),this.colorBuffer=this.createBuffer(de,GPUBufferUsage.VERTEX),this.indexBuffer=this.createBuffer(le,GPUBufferUsage.INDEX);const t=new Float32Array([...this.modelMatrix,...this.viewMatrix,...this.projectionMatrix]);this.uniformBuffer=this.createBuffer(t,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST),this.vertexModule=await this.loadShader("./shaders/basic.vert.wgsl"),this.fragmentModule=await this.loadShader("./shaders/basic.frag.wgsl");const r={shaderLocation:0,offset:0,format:"float32x3"},n={shaderLocation:1,offset:0,format:"float32x4"},i={attributes:[r],arrayStride:4*3,stepMode:"vertex"},s={attributes:[n],arrayStride:4*4,stepMode:"vertex"},a={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus-stencil8"},c=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this.uniformBindGroup=this.device.createBindGroup({layout:c,entries:[{binding:0,resource:{buffer:this.uniformBuffer}}]});const h={bindGroupLayouts:[c]},d=this.device.createPipelineLayout(h),u={module:this.vertexModule,entryPoint:"main",buffers:[i,s]},l={format:"bgra8unorm",blend:{alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},writeMask:GPUColorWrite.ALL},p={module:this.fragmentModule,entryPoint:"main",targets:[l]},f={layout:d,vertex:u,fragment:p,primitive:{topology:"triangle-list",frontFace:"cw",cullMode:"none"},depthStencil:a,multisample:{count:this.sampleCount}};this.renderPipeline=this.device.createRenderPipeline(f)}async start(){if(await this.initialize())this.resizeSwapchain(),await this.initializeResources(),this.render();else{const t=document.getElementById("error");t.style.display="block"}}}const ve=document.getElementById("webgpu_canvas"),me=new pe(ve);me.start();