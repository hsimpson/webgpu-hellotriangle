(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();let T=1e-6;const ze=new Map([[Float32Array,()=>new Float32Array(12)],[Float64Array,()=>new Float64Array(12)],[Array,()=>new Array(12).fill(0)]]);ze.get(Float32Array);let x=Float32Array;function ve(n){const e=x;return x=n,e}function I(n,e,o){const t=new x(3);return n!==void 0&&(t[0]=n,e!==void 0&&(t[1]=e,o!==void 0&&(t[2]=o))),t}const Se=I;function Te(n,e){return e=e||new x(3),e[0]=Math.ceil(n[0]),e[1]=Math.ceil(n[1]),e[2]=Math.ceil(n[2]),e}function Be(n,e){return e=e||new x(3),e[0]=Math.floor(n[0]),e[1]=Math.floor(n[1]),e[2]=Math.floor(n[2]),e}function Pe(n,e){return e=e||new x(3),e[0]=Math.round(n[0]),e[1]=Math.round(n[1]),e[2]=Math.round(n[2]),e}function qe(n,e=0,o=1,t){return t=t||new x(3),t[0]=Math.min(o,Math.max(e,n[0])),t[1]=Math.min(o,Math.max(e,n[1])),t[2]=Math.min(o,Math.max(e,n[2])),t}function Ee(n,e,o){return o=o||new x(3),o[0]=n[0]+e[0],o[1]=n[1]+e[1],o[2]=n[2]+e[2],o}function Ce(n,e,o,t){return t=t||new x(3),t[0]=n[0]+e[0]*o,t[1]=n[1]+e[1]*o,t[2]=n[2]+e[2]*o,t}function Oe(n,e){const o=n[0],t=n[1],r=n[2],i=n[0],c=n[1],f=n[2],l=Math.sqrt(o*o+t*t+r*r),s=Math.sqrt(i*i+c*c+f*f),h=l*s,a=h&&ue(n,e)/h;return Math.acos(a)}function ee(n,e,o){return o=o||new x(3),o[0]=n[0]-e[0],o[1]=n[1]-e[1],o[2]=n[2]-e[2],o}const Ue=ee;function me(n,e){return Math.abs(n[0]-e[0])<T&&Math.abs(n[1]-e[1])<T&&Math.abs(n[2]-e[2])<T}function Fe(n,e){return n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2]}function Ve(n,e,o,t){return t=t||new x(3),t[0]=n[0]+o*(e[0]-n[0]),t[1]=n[1]+o*(e[1]-n[1]),t[2]=n[2]+o*(e[2]-n[2]),t}function Le(n,e,o,t){return t=t||new x(3),t[0]=n[0]+o[0]*(e[0]-n[0]),t[1]=n[1]+o[1]*(e[1]-n[1]),t[2]=n[2]+o[2]*(e[2]-n[2]),t}function Ge(n,e,o){return o=o||new x(3),o[0]=Math.max(n[0],e[0]),o[1]=Math.max(n[1],e[1]),o[2]=Math.max(n[2],e[2]),o}function Re(n,e,o){return o=o||new x(3),o[0]=Math.min(n[0],e[0]),o[1]=Math.min(n[1],e[1]),o[2]=Math.min(n[2],e[2]),o}function ie(n,e,o){return o=o||new x(3),o[0]=n[0]*e,o[1]=n[1]*e,o[2]=n[2]*e,o}const Ne=ie;function De(n,e,o){return o=o||new x(3),o[0]=n[0]/e,o[1]=n[1]/e,o[2]=n[2]/e,o}function ae(n,e){return e=e||new x(3),e[0]=1/n[0],e[1]=1/n[1],e[2]=1/n[2],e}const _e=ae;function d(n,e,o){o=o||new x(3);const t=n[2]*e[0]-n[0]*e[2],r=n[0]*e[1]-n[1]*e[0];return o[0]=n[1]*e[2]-n[2]*e[1],o[1]=t,o[2]=r,o}function ue(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function he(n){const e=n[0],o=n[1],t=n[2];return Math.sqrt(e*e+o*o+t*t)}const Ie=he;function fe(n){const e=n[0],o=n[1],t=n[2];return e*e+o*o+t*t}const Xe=fe;function le(n,e){const o=n[0]-e[0],t=n[1]-e[1],r=n[2]-e[2];return Math.sqrt(o*o+t*t+r*r)}const We=le;function se(n,e){const o=n[0]-e[0],t=n[1]-e[1],r=n[2]-e[2];return o*o+t*t+r*r}const Ye=se;function Q(n,e){e=e||new x(3);const o=n[0],t=n[1],r=n[2],i=Math.sqrt(o*o+t*t+r*r);return i>1e-5?(e[0]=o/i,e[1]=t/i,e[2]=r/i):(e[0]=0,e[1]=0,e[2]=0),e}function Ze(n,e){return e=e||new x(3),e[0]=-n[0],e[1]=-n[1],e[2]=-n[2],e}function pe(n,e){return e=e||new x(3),e[0]=n[0],e[1]=n[1],e[2]=n[2],e}const be=pe;function Me(n,e,o){return o=o||new x(3),o[0]=n[0]*e[0],o[1]=n[1]*e[1],o[2]=n[2]*e[2],o}const je=Me;function ye(n,e,o){return o=o||new x(3),o[0]=n[0]/e[0],o[1]=n[1]/e[1],o[2]=n[2]/e[2],o}const He=ye;function Ke(n=1,e){e=e||new x(3);const o=Math.random()*2*Math.PI,t=Math.random()*2-1,r=Math.sqrt(1-t*t)*n;return e[0]=Math.cos(o)*r,e[1]=Math.sin(o)*r,e[2]=t*n,e}function Je(n){return n=n||new x(3),n[0]=0,n[1]=0,n[2]=0,n}function Qe(n,e,o){o=o||new x(3);const t=n[0],r=n[1],i=n[2],c=e[3]*t+e[7]*r+e[11]*i+e[15]||1;return o[0]=(e[0]*t+e[4]*r+e[8]*i+e[12])/c,o[1]=(e[1]*t+e[5]*r+e[9]*i+e[13])/c,o[2]=(e[2]*t+e[6]*r+e[10]*i+e[14])/c,o}function ke(n,e,o){o=o||new x(3);const t=n[0],r=n[1],i=n[2];return o[0]=t*e[0*4+0]+r*e[1*4+0]+i*e[2*4+0],o[1]=t*e[0*4+1]+r*e[1*4+1]+i*e[2*4+1],o[2]=t*e[0*4+2]+r*e[1*4+2]+i*e[2*4+2],o}function de(n,e,o){o=o||new x(3);const t=n[0],r=n[1],i=n[2];return o[0]=t*e[0]+r*e[4]+i*e[8],o[1]=t*e[1]+r*e[5]+i*e[9],o[2]=t*e[2]+r*e[6]+i*e[10],o}var k=Object.freeze({__proto__:null,create:I,setDefaultType:ve,fromValues:Se,ceil:Te,floor:Be,round:Pe,clamp:qe,add:Ee,addScaled:Ce,angle:Oe,subtract:ee,sub:Ue,equalsApproximately:me,equals:Fe,lerp:Ve,lerpV:Le,max:Ge,min:Re,mulScalar:ie,scale:Ne,divScalar:De,inverse:ae,invert:_e,cross:d,dot:ue,length:he,len:Ie,lengthSq:fe,lenSq:Xe,distance:le,dist:We,distanceSq:se,distSq:Ye,normalize:Q,negate:Ze,copy:pe,clone:be,multiply:Me,mul:je,divide:ye,div:He,random:Ke,zero:Je,transformMat4:Qe,transformMat4Upper3x3:ke,transformMat3:de});let $=Float32Array;function en(n){const e=$;return $=n,e}function nn(n,e,o,t,r,i,c,f,l,s,h,a,u,y,M,g){const p=new $(16);return n!==void 0&&(p[0]=n,e!==void 0&&(p[1]=e,o!==void 0&&(p[2]=o,t!==void 0&&(p[3]=t,r!==void 0&&(p[4]=r,i!==void 0&&(p[5]=i,c!==void 0&&(p[6]=c,f!==void 0&&(p[7]=f,l!==void 0&&(p[8]=l,s!==void 0&&(p[9]=s,h!==void 0&&(p[10]=h,a!==void 0&&(p[11]=a,u!==void 0&&(p[12]=u,y!==void 0&&(p[13]=y,M!==void 0&&(p[14]=M,g!==void 0&&(p[15]=g)))))))))))))))),p}function on(n,e){return e=e||new $(16),e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=0,e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=0,e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function tn(n,e){return e=e||new $(16),e[0]=-n[0],e[1]=-n[1],e[2]=-n[2],e[3]=-n[3],e[4]=-n[4],e[5]=-n[5],e[6]=-n[6],e[7]=-n[7],e[8]=-n[8],e[9]=-n[9],e[10]=-n[10],e[11]=-n[11],e[12]=-n[12],e[13]=-n[13],e[14]=-n[14],e[15]=-n[15],e}function ne(n,e){return e=e||new $(16),e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e}const rn=ne;function cn(n,e){return Math.abs(n[0]-e[0])<T&&Math.abs(n[1]-e[1])<T&&Math.abs(n[2]-e[2])<T&&Math.abs(n[3]-e[3])<T&&Math.abs(n[4]-e[4])<T&&Math.abs(n[5]-e[5])<T&&Math.abs(n[6]-e[6])<T&&Math.abs(n[7]-e[7])<T&&Math.abs(n[8]-e[8])<T&&Math.abs(n[9]-e[9])<T&&Math.abs(n[10]-e[10])<T&&Math.abs(n[11]-e[11])<T&&Math.abs(n[12]-e[12])<T&&Math.abs(n[13]-e[13])<T&&Math.abs(n[14]-e[14])<T&&Math.abs(n[15]-e[15])<T}function an(n,e){return n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2]&&n[3]===e[3]&&n[4]===e[4]&&n[5]===e[5]&&n[6]===e[6]&&n[7]===e[7]&&n[8]===e[8]&&n[9]===e[9]&&n[10]===e[10]&&n[11]===e[11]&&n[12]===e[12]&&n[13]===e[13]&&n[14]===e[14]&&n[15]===e[15]}function we(n){return n=n||new $(16),n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function un(n,e){if(e=e||new $(16),e===n){let w;return w=n[1],n[1]=n[4],n[4]=w,w=n[2],n[2]=n[8],n[8]=w,w=n[3],n[3]=n[12],n[12]=w,w=n[6],n[6]=n[9],n[9]=w,w=n[7],n[7]=n[13],n[13]=w,w=n[11],n[11]=n[14],n[14]=w,e}const o=n[0*4+0],t=n[0*4+1],r=n[0*4+2],i=n[0*4+3],c=n[1*4+0],f=n[1*4+1],l=n[1*4+2],s=n[1*4+3],h=n[2*4+0],a=n[2*4+1],u=n[2*4+2],y=n[2*4+3],M=n[3*4+0],g=n[3*4+1],p=n[3*4+2],A=n[3*4+3];return e[0]=o,e[1]=c,e[2]=h,e[3]=M,e[4]=t,e[5]=f,e[6]=a,e[7]=g,e[8]=r,e[9]=l,e[10]=u,e[11]=p,e[12]=i,e[13]=s,e[14]=y,e[15]=A,e}function ge(n,e){e=e||new $(16);const o=n[0*4+0],t=n[0*4+1],r=n[0*4+2],i=n[0*4+3],c=n[1*4+0],f=n[1*4+1],l=n[1*4+2],s=n[1*4+3],h=n[2*4+0],a=n[2*4+1],u=n[2*4+2],y=n[2*4+3],M=n[3*4+0],g=n[3*4+1],p=n[3*4+2],A=n[3*4+3],w=u*A,z=p*y,v=l*A,S=p*s,B=l*y,P=u*s,q=r*A,E=p*i,C=r*y,O=u*i,U=r*s,F=l*i,V=h*g,L=M*a,G=c*g,R=M*f,N=c*a,Y=h*f,Z=o*g,b=M*t,j=o*a,H=h*t,K=o*f,J=c*t,oe=w*f+S*a+B*g-(z*f+v*a+P*g),te=z*t+q*a+O*g-(w*t+E*a+C*g),re=v*t+E*f+U*g-(S*t+q*f+F*g),ce=P*t+C*f+F*a-(B*t+O*f+U*a),m=1/(o*oe+c*te+h*re+M*ce);return e[0]=m*oe,e[1]=m*te,e[2]=m*re,e[3]=m*ce,e[4]=m*(z*c+v*h+P*M-(w*c+S*h+B*M)),e[5]=m*(w*o+E*h+C*M-(z*o+q*h+O*M)),e[6]=m*(S*o+q*c+F*M-(v*o+E*c+U*M)),e[7]=m*(B*o+O*c+U*h-(P*o+C*c+F*h)),e[8]=m*(V*s+R*y+N*A-(L*s+G*y+Y*A)),e[9]=m*(L*i+Z*y+H*A-(V*i+b*y+j*A)),e[10]=m*(G*i+b*s+K*A-(R*i+Z*s+J*A)),e[11]=m*(Y*i+j*s+J*y-(N*i+H*s+K*y)),e[12]=m*(G*u+Y*p+L*l-(N*p+V*l+R*u)),e[13]=m*(j*p+V*r+b*u-(Z*u+H*p+L*r)),e[14]=m*(Z*l+J*p+R*r-(K*p+G*r+b*l)),e[15]=m*(K*u+N*r+H*l-(j*l+J*u+Y*r)),e}function hn(n){const e=n[0],o=n[0*4+1],t=n[0*4+2],r=n[0*4+3],i=n[1*4+0],c=n[1*4+1],f=n[1*4+2],l=n[1*4+3],s=n[2*4+0],h=n[2*4+1],a=n[2*4+2],u=n[2*4+3],y=n[3*4+0],M=n[3*4+1],g=n[3*4+2],p=n[3*4+3],A=a*p,w=g*u,z=f*p,v=g*l,S=f*u,B=a*l,P=t*p,q=g*r,E=t*u,C=a*r,O=t*l,U=f*r,F=A*c+v*h+S*M-(w*c+z*h+B*M),V=w*o+P*h+C*M-(A*o+q*h+E*M),L=z*o+q*c+O*M-(v*o+P*c+U*M),G=B*o+E*c+U*h-(S*o+C*c+O*h);return e*F+i*V+s*L+y*G}const fn=ge;function xe(n,e,o){o=o||new $(16);const t=n[0],r=n[1],i=n[2],c=n[3],f=n[4+0],l=n[4+1],s=n[4+2],h=n[4+3],a=n[8+0],u=n[8+1],y=n[8+2],M=n[8+3],g=n[12+0],p=n[12+1],A=n[12+2],w=n[12+3],z=e[0],v=e[1],S=e[2],B=e[3],P=e[4+0],q=e[4+1],E=e[4+2],C=e[4+3],O=e[8+0],U=e[8+1],F=e[8+2],V=e[8+3],L=e[12+0],G=e[12+1],R=e[12+2],N=e[12+3];return o[0]=t*z+f*v+a*S+g*B,o[1]=r*z+l*v+u*S+p*B,o[2]=i*z+s*v+y*S+A*B,o[3]=c*z+h*v+M*S+w*B,o[4]=t*P+f*q+a*E+g*C,o[5]=r*P+l*q+u*E+p*C,o[6]=i*P+s*q+y*E+A*C,o[7]=c*P+h*q+M*E+w*C,o[8]=t*O+f*U+a*F+g*V,o[9]=r*O+l*U+u*F+p*V,o[10]=i*O+s*U+y*F+A*V,o[11]=c*O+h*U+M*F+w*V,o[12]=t*L+f*G+a*R+g*N,o[13]=r*L+l*G+u*R+p*N,o[14]=i*L+s*G+y*R+A*N,o[15]=c*L+h*G+M*R+w*N,o}const ln=xe;function sn(n,e,o){return o=o||we(),n!==o&&(o[0]=n[0],o[1]=n[1],o[2]=n[2],o[3]=n[3],o[4]=n[4],o[5]=n[5],o[6]=n[6],o[7]=n[7],o[8]=n[8],o[9]=n[9],o[10]=n[10],o[11]=n[11]),o[12]=e[0],o[13]=e[1],o[14]=e[2],o[15]=1,o}function pn(n,e){return e=e||I(),e[0]=n[12],e[1]=n[13],e[2]=n[14],e}function Mn(n,e,o){o=o||I();const t=e*4;return o[0]=n[t+0],o[1]=n[t+1],o[2]=n[t+2],o}function yn(n,e,o,t){t!==n&&(t=ne(n,t));const r=o*4;return t[r+0]=e[0],t[r+1]=e[1],t[r+2]=e[2],t}function wn(n,e){e=e||I();const o=n[0],t=n[1],r=n[2],i=n[4],c=n[5],f=n[6],l=n[8],s=n[9],h=n[10];return e[0]=Math.sqrt(o*o+t*t+r*r),e[1]=Math.sqrt(i*i+c*c+f*f),e[2]=Math.sqrt(l*l+s*s+h*h),e}function gn(n,e,o,t,r){r=r||new $(16);const i=Math.tan(Math.PI*.5-.5*n),c=1/(o-t);return r[0]=i/e,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=i,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=t*c,r[11]=-1,r[12]=0,r[13]=0,r[14]=o*t*c,r[15]=0,r}function xn(n,e,o,t,r,i,c){return c=c||new $(16),c[0]=2/(e-n),c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=2/(t-o),c[6]=0,c[7]=0,c[8]=0,c[9]=0,c[10]=1/(r-i),c[11]=0,c[12]=(e+n)/(n-e),c[13]=(t+o)/(o-t),c[14]=r/(r-i),c[15]=1,c}function An(n,e,o,t,r,i,c){c=c||new $(16);const f=e-n,l=t-o,s=r-i;return c[0]=2*r/f,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=2*r/l,c[6]=0,c[7]=0,c[8]=(n+e)/f,c[9]=(t+o)/l,c[10]=i/s,c[11]=-1,c[12]=0,c[13]=0,c[14]=r*i/s,c[15]=0,c}let _,X,D;function $n(n,e,o,t){return t=t||new $(16),_=_||I(),X=X||I(),D=D||I(),Q(ee(n,e,D),D),Q(d(o,D,_),_),Q(d(D,_,X),X),t[0]=_[0],t[1]=_[1],t[2]=_[2],t[3]=0,t[4]=X[0],t[5]=X[1],t[6]=X[2],t[7]=0,t[8]=D[0],t[9]=D[1],t[10]=D[2],t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function zn(n,e){return e=e||new $(16),e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=n[0],e[13]=n[1],e[14]=n[2],e[15]=1,e}function vn(n,e,o){o=o||new $(16);const t=e[0],r=e[1],i=e[2],c=n[0],f=n[1],l=n[2],s=n[3],h=n[1*4+0],a=n[1*4+1],u=n[1*4+2],y=n[1*4+3],M=n[2*4+0],g=n[2*4+1],p=n[2*4+2],A=n[2*4+3],w=n[3*4+0],z=n[3*4+1],v=n[3*4+2],S=n[3*4+3];return n!==o&&(o[0]=c,o[1]=f,o[2]=l,o[3]=s,o[4]=h,o[5]=a,o[6]=u,o[7]=y,o[8]=M,o[9]=g,o[10]=p,o[11]=A),o[12]=c*t+h*r+M*i+w,o[13]=f*t+a*r+g*i+z,o[14]=l*t+u*r+p*i+v,o[15]=s*t+y*r+A*i+S,o}function Sn(n,e){e=e||new $(16);const o=Math.cos(n),t=Math.sin(n);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=t,e[7]=0,e[8]=0,e[9]=-t,e[10]=o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Tn(n,e,o){o=o||new $(16);const t=n[4],r=n[5],i=n[6],c=n[7],f=n[8],l=n[9],s=n[10],h=n[11],a=Math.cos(e),u=Math.sin(e);return o[4]=a*t+u*f,o[5]=a*r+u*l,o[6]=a*i+u*s,o[7]=a*c+u*h,o[8]=a*f-u*t,o[9]=a*l-u*r,o[10]=a*s-u*i,o[11]=a*h-u*c,n!==o&&(o[0]=n[0],o[1]=n[1],o[2]=n[2],o[3]=n[3],o[12]=n[12],o[13]=n[13],o[14]=n[14],o[15]=n[15]),o}function Bn(n,e){e=e||new $(16);const o=Math.cos(n),t=Math.sin(n);return e[0]=o,e[1]=0,e[2]=-t,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=t,e[9]=0,e[10]=o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Pn(n,e,o){o=o||new $(16);const t=n[0*4+0],r=n[0*4+1],i=n[0*4+2],c=n[0*4+3],f=n[2*4+0],l=n[2*4+1],s=n[2*4+2],h=n[2*4+3],a=Math.cos(e),u=Math.sin(e);return o[0]=a*t-u*f,o[1]=a*r-u*l,o[2]=a*i-u*s,o[3]=a*c-u*h,o[8]=a*f+u*t,o[9]=a*l+u*r,o[10]=a*s+u*i,o[11]=a*h+u*c,n!==o&&(o[4]=n[4],o[5]=n[5],o[6]=n[6],o[7]=n[7],o[12]=n[12],o[13]=n[13],o[14]=n[14],o[15]=n[15]),o}function qn(n,e){e=e||new $(16);const o=Math.cos(n),t=Math.sin(n);return e[0]=o,e[1]=t,e[2]=0,e[3]=0,e[4]=-t,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function En(n,e,o){o=o||new $(16);const t=n[0*4+0],r=n[0*4+1],i=n[0*4+2],c=n[0*4+3],f=n[1*4+0],l=n[1*4+1],s=n[1*4+2],h=n[1*4+3],a=Math.cos(e),u=Math.sin(e);return o[0]=a*t+u*f,o[1]=a*r+u*l,o[2]=a*i+u*s,o[3]=a*c+u*h,o[4]=a*f-u*t,o[5]=a*l-u*r,o[6]=a*s-u*i,o[7]=a*h-u*c,n!==o&&(o[8]=n[8],o[9]=n[9],o[10]=n[10],o[11]=n[11],o[12]=n[12],o[13]=n[13],o[14]=n[14],o[15]=n[15]),o}function Ae(n,e,o){o=o||new $(16);let t=n[0],r=n[1],i=n[2];const c=Math.sqrt(t*t+r*r+i*i);t/=c,r/=c,i/=c;const f=t*t,l=r*r,s=i*i,h=Math.cos(e),a=Math.sin(e),u=1-h;return o[0]=f+(1-f)*h,o[1]=t*r*u+i*a,o[2]=t*i*u-r*a,o[3]=0,o[4]=t*r*u-i*a,o[5]=l+(1-l)*h,o[6]=r*i*u+t*a,o[7]=0,o[8]=t*i*u+r*a,o[9]=r*i*u-t*a,o[10]=s+(1-s)*h,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,o}const Cn=Ae;function $e(n,e,o,t){t=t||new $(16);let r=e[0],i=e[1],c=e[2];const f=Math.sqrt(r*r+i*i+c*c);r/=f,i/=f,c/=f;const l=r*r,s=i*i,h=c*c,a=Math.cos(o),u=Math.sin(o),y=1-a,M=l+(1-l)*a,g=r*i*y+c*u,p=r*c*y-i*u,A=r*i*y-c*u,w=s+(1-s)*a,z=i*c*y+r*u,v=r*c*y+i*u,S=i*c*y-r*u,B=h+(1-h)*a,P=n[0],q=n[1],E=n[2],C=n[3],O=n[4],U=n[5],F=n[6],V=n[7],L=n[8],G=n[9],R=n[10],N=n[11];return t[0]=M*P+g*O+p*L,t[1]=M*q+g*U+p*G,t[2]=M*E+g*F+p*R,t[3]=M*C+g*V+p*N,t[4]=A*P+w*O+z*L,t[5]=A*q+w*U+z*G,t[6]=A*E+w*F+z*R,t[7]=A*C+w*V+z*N,t[8]=v*P+S*O+B*L,t[9]=v*q+S*U+B*G,t[10]=v*E+S*F+B*R,t[11]=v*C+S*V+B*N,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t}const On=$e;function Un(n,e){return e=e||new $(16),e[0]=n[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=n[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function mn(n,e,o){o=o||new $(16);const t=e[0],r=e[1],i=e[2];return o[0]=t*n[0*4+0],o[1]=t*n[0*4+1],o[2]=t*n[0*4+2],o[3]=t*n[0*4+3],o[4]=r*n[1*4+0],o[5]=r*n[1*4+1],o[6]=r*n[1*4+2],o[7]=r*n[1*4+3],o[8]=i*n[2*4+0],o[9]=i*n[2*4+1],o[10]=i*n[2*4+2],o[11]=i*n[2*4+3],n!==o&&(o[12]=n[12],o[13]=n[13],o[14]=n[14],o[15]=n[15]),o}var W=Object.freeze({__proto__:null,setDefaultType:en,create:nn,fromMat3:on,negate:tn,copy:ne,clone:rn,equalsApproximately:cn,equals:an,identity:we,transpose:un,inverse:ge,determinant:hn,invert:fn,multiply:xe,mul:ln,setTranslation:sn,getTranslation:pn,getAxis:Mn,setAxis:yn,getScaling:wn,perspective:gn,ortho:xn,frustum:An,lookAt:$n,translation:zn,translate:vn,rotationX:Sn,rotateX:Tn,rotationY:Bn,rotateY:Pn,rotationZ:qn,rotateZ:En,axisRotation:Ae,rotation:Cn,axisRotate:$e,rotate:On,scaling:Un,scale:mn});const Fn=new Float32Array([1,-1,0,-1,-1,0,0,1,0]),Vn=new Float32Array([1,0,0,1,0,1,0,1,0,0,1,1]),Ln=new Uint16Array([0,1,2,0]);class Gn{constructor(e){this.modelMatrix=W.identity(),this.viewMatrix=W.identity(),this.perspectiveMatrix=W.identity(),this.eye=k.create(0,0,5),this.zNear=.1,this.zFar=1e3,this.sampleCount=4,this.onMouseWheel=o=>{let t=this.eye[2]+=o.deltaY*.01;t=Math.max(this.zNear,Math.min(this.zFar,t)),this.eye[2]=t},this.render=()=>{const o=.5*Math.PI/180;W.rotateZ(this.modelMatrix,o,this.modelMatrix),this.updateUniformBuffer(),this.encodeCommands(),requestAnimationFrame(this.render)},this.canvas=e,this.updateViewMatrix(),this.updatePerspectiveMatrix()}updatePerspectiveMatrix(){const e=this.canvas.width/this.canvas.height,o=45*Math.PI/180;this.perspectiveMatrix=W.perspective(o,e,this.zNear,this.zFar)}updateViewMatrix(){const e=k.create(0,0,0),o=k.create(0,1,0),t=W.lookAt(this.eye,e,o);this.viewMatrix=W.inverse(t)}resize(e,o){(e!==this.presentationSize.width||o!==this.presentationSize.height)&&(this.canvas.width=e,this.canvas.height=o,this.presentationSize={width:e,height:o,depthOrArrayLayers:1},this.updatePerspectiveMatrix(),this.resizeSwapchain())}async initialize(){const e=navigator.gpu;if(!e)return console.error("No WebGPU support navigator.gpu not available!"),!1;const o=await e.requestAdapter();return console.log(o.limits),this.device=await o.requestDevice(),this.queue=this.device.queue,this.canvas.style.display="block",this.canvas.addEventListener("wheel",this.onMouseWheel),this.presentationSize={width:this.canvas.width,height:this.canvas.height,depthOrArrayLayers:1},this.presentationContext=this.canvas.getContext("webgpu"),this.presentationFormat=e.getPreferredCanvasFormat(),this.presentationContext.configure({device:this.device,format:this.presentationFormat,alphaMode:"opaque"}),new ResizeObserver(r=>{Array.isArray(r)&&this.resize(r[0].contentRect.width*window.devicePixelRatio,r[0].contentRect.height*window.devicePixelRatio)}).observe(this.canvas),!0}createBuffer(e,o){try{const t=this.device.createBuffer({mappedAtCreation:!0,size:e.byteLength,usage:o}),r=t.getMappedRange();return(e instanceof Float32Array?new Float32Array(r):new Uint16Array(r)).set(e),t.unmap(),t}catch(t){console.error(t)}}createUBOArray(){const e=new Float32Array(48);return e.set(this.modelMatrix),e.set(this.viewMatrix,16),e.set(this.perspectiveMatrix,32),e}updateUniformBuffer(){this.updateViewMatrix();const e=this.createUBOArray();this.queue.writeBuffer(this.uniformBuffer,0,e.buffer)}async loadShader(e){const o=await fetch(e);return this.device.createShaderModule({code:await o.text()})}resizeSwapchain(){this.renderTarget!==void 0&&(this.renderTarget.destroy(),this.depthTarget.destroy()),this.renderTarget=this.device.createTexture({size:this.presentationSize,sampleCount:this.sampleCount,format:this.presentationFormat,usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.renderTargetView=this.renderTarget.createView(),this.depthTarget=this.device.createTexture({size:this.presentationSize,sampleCount:this.sampleCount,format:"depth24plus-stencil8",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.depthTargetView=this.depthTarget.createView()}encodeCommands(){const e={view:this.presentationContext.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"};this.sampleCount>1&&(e.view=this.renderTargetView,e.resolveTarget=this.presentationContext.getCurrentTexture().createView());const o={view:this.depthTargetView,depthLoadOp:"clear",depthClearValue:1,depthStoreOp:"store",stencilLoadOp:"clear",stencilClearValue:0,stencilStoreOp:"store"},t={colorAttachments:[e],depthStencilAttachment:o};this.commandEncoder=this.device.createCommandEncoder(),this.passEncoder=this.commandEncoder.beginRenderPass(t),this.passEncoder.setPipeline(this.renderPipeline),this.passEncoder.setBindGroup(0,this.uniformBindGroup),this.passEncoder.setViewport(0,0,this.canvas.width,this.canvas.height,0,1),this.passEncoder.setScissorRect(0,0,this.canvas.width,this.canvas.height),this.passEncoder.setVertexBuffer(0,this.positionBuffer),this.passEncoder.setVertexBuffer(1,this.colorBuffer),this.passEncoder.setIndexBuffer(this.indexBuffer,"uint16"),this.passEncoder.drawIndexed(3,1,0,0,0),this.passEncoder.end(),this.queue.submit([this.commandEncoder.finish()])}async initializeResources(){this.positionBuffer=this.createBuffer(Fn,GPUBufferUsage.VERTEX),this.colorBuffer=this.createBuffer(Vn,GPUBufferUsage.VERTEX),this.indexBuffer=this.createBuffer(Ln,GPUBufferUsage.INDEX);const e=this.createUBOArray();this.uniformBuffer=this.createBuffer(e,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST),this.vertexModule=await this.loadShader("./shaders/basic.vert.wgsl"),this.fragmentModule=await this.loadShader("./shaders/basic.frag.wgsl");const o={shaderLocation:0,offset:0,format:"float32x3"},t={shaderLocation:1,offset:0,format:"float32x4"},r={attributes:[o],arrayStride:4*3,stepMode:"vertex"},i={attributes:[t],arrayStride:4*4,stepMode:"vertex"},c={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus-stencil8"},f=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this.uniformBindGroup=this.device.createBindGroup({layout:f,entries:[{binding:0,resource:{buffer:this.uniformBuffer}}]});const l={bindGroupLayouts:[f]},s=this.device.createPipelineLayout(l),h={module:this.vertexModule,entryPoint:"main",buffers:[r,i]},a={format:"bgra8unorm",blend:{alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},writeMask:GPUColorWrite.ALL},u={module:this.fragmentModule,entryPoint:"main",targets:[a]},y={layout:s,vertex:h,fragment:u,primitive:{topology:"triangle-list",frontFace:"cw",cullMode:"none"},depthStencil:c,multisample:{count:this.sampleCount}};this.renderPipeline=this.device.createRenderPipeline(y)}async start(){if(await this.initialize())this.resizeSwapchain(),await this.initializeResources(),this.render();else{const e=document.getElementById("error");e.style.display="block"}}}const Rn=document.getElementById("webgpu_canvas"),Nn=new Gn(Rn);Nn.start();
