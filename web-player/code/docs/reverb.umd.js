/**
 * @logue/reverb
 *
 * @description JavaScript Reverb effect class
 * @author Logue <logue@hotmail.co.jp>
 * @copyright 2019-2023 By Masashi Yoshikawa All rights reserved.
 * @license MIT
 * @version 1.2.7
 * @see {@link https://github.com/logue/Reverb.js}
 */

(function(h,u){typeof exports=="object"&&typeof module<"u"?module.exports=u():typeof define=="function"&&define.amd?define(u):(h=typeof globalThis<"u"?globalThis:h||self,h.Reverb=u())})(this,function(){"use strict";const h=23283064365386963e-26;class u{float(e=1){return this.int()*h*e}norm(e=1){return(this.int()*h-.5)*2*e}minmax(e,s){return this.float()*(s-e)+e}minmaxInt(e,s){return e|=0,s|=0,e+(this.float()*(s-e)|0)}}const b=Math.random;class x extends u{int(){return b()*4294967296>>>0}float(e=1){return b()*e}norm(e=1){return(b()-.5)*2*e}}const w=new x,A={noise:"white",scale:1,peaks:2,randomAlgorithm:w,decay:2,delay:0,reverse:!1,time:2,filterType:"allpass",filterFreq:2200,filterQ:1,mix:.5,once:!1},g={version:"1.2.7",date:"2023-03-10T12:39:30.673Z"},d={BLUE:"blue",GREEN:"green",PINK:"pink",RED:"red",VIOLET:"violet",WHITE:"white",BROWN:"red"},p={bins:2,scale:1,rnd:w},y=(t,e,s)=>{const n=new Array(t);for(let i=0;i<t;i++)n[i]=s.norm(e);return n},N=t=>t.reduce((e,s)=>e+s,0);function*I(t,e){const s=[t[Symbol.iterator](),e[Symbol.iterator]()];for(let n=0;;n^=1){const i=s[n].next();if(i.done)return;yield i.value}}function*v(t){const{bins:e,scale:s,rnd:n}={...p,...t},i=y(e,s,n);i.forEach((r,a)=>i[a]=a&1?r:-r);const c=1/e;let o=N(i);for(let r=0,a=-1;;++r>=e&&(r=0))o-=i[r],o+=i[r]=a*n.norm(s),a^=4294967294,yield a*o*c}const F=t=>I(v(t),v(t)),C=t=>{let e=32;return t&=-t,t&&e--,t&65535&&(e-=16),t&16711935&&(e-=8),t&252645135&&(e-=4),t&858993459&&(e-=2),t&1431655765&&(e-=1),e};function*j(t){const{bins:e,scale:s,rnd:n}={...p,bins:8,...t},i=y(e,s,n),c=1/e;let o=N(i);for(let r=0;;r=r+1>>>0){const a=C(r)%e;o-=i[a],o+=i[a]=n.norm(s),yield o*c}}function*R(t){const{bins:e,scale:s,rnd:n}={...p,...t},i=y(e,s,n),c=1/e;let o=N(i);for(let r=0;;++r>=e&&(r=0))o-=i[r],o+=i[r]=n.norm(s),yield o*c}const D=t=>I(R(t),R(t));function*E(t){const{scale:e,rnd:s}={...p,...t};for(;;)yield s.norm(e)}const L=(t,e)=>t!=null&&typeof t[e]=="function",S=t=>L(t,"xform")?t.xform():t,q=t=>t!=null&&typeof t[Symbol.iterator]=="function";class f{constructor(e){this.value=e}deref(){return this.value}}const B=t=>new f(t),O=t=>t instanceof f,Q=t=>t instanceof f?t:new f(t),T=t=>t instanceof f?t.deref():t,M=(t,e)=>[t,s=>s,e];function W(t){return t?[...t]:M(()=>[],(e,s)=>(e.push(s),e))}function*P(t,e){const s=S(t)(W()),n=s[1],i=s[2];for(let c of e){const o=i([],c);if(O(o)){yield*T(n(o.deref()));return}o.length&&(yield*o)}yield*T(n([]))}const U=(t,e)=>[t[0],t[1],e];function G(t,e){return q(e)?P(G(t),e):s=>{const n=s[2];let i=t;return U(s,(c,o)=>--i>0?n(c,o):i===0?Q(n(c,o)):B(c))}}class k{static version=g.version;static build=g.date;ctx;wetGainNode;dryGainNode;filterNode;convolverNode;outputNode;options;isConnected;noise=E;constructor(e,s){this.ctx=e,this.options={...A,...s},this.wetGainNode=this.ctx.createGain(),this.dryGainNode=this.ctx.createGain(),this.filterNode=this.ctx.createBiquadFilter(),this.convolverNode=this.ctx.createConvolver(),this.outputNode=this.ctx.createGain(),this.isConnected=!1,this.filterType(this.options.filterType),this.setNoise(this.options.noise),this.buildImpulse(),this.mix(this.options.mix)}connect(e){return this.isConnected&&this.options.once?(this.isConnected=!1,this.outputNode):(this.convolverNode.connect(this.filterNode),this.filterNode.connect(this.wetGainNode),e.connect(this.convolverNode),e.connect(this.dryGainNode).connect(this.outputNode),e.connect(this.wetGainNode).connect(this.outputNode),this.isConnected=!0,this.outputNode)}disconnect(e){return this.isConnected&&(this.convolverNode.disconnect(this.filterNode),this.filterNode.disconnect(this.wetGainNode)),this.isConnected=!1,e}mix(e){if(!this.inRange(e,0,1))throw new RangeError("[Reverb.js] Dry/Wet ratio must be between 0 to 1.");this.options.mix=e,this.dryGainNode.gain.value=1-this.options.mix,this.wetGainNode.gain.value=this.options.mix}time(e){if(!this.inRange(e,1,50))throw new RangeError("[Reverb.js] Time length of inpulse response must be less than 50sec.");this.options.time=e,this.buildImpulse()}decay(e){if(!this.inRange(e,0,100))throw new RangeError("[Reverb.js] Inpulse Response decay level must be less than 100.");this.options.decay=e,this.buildImpulse()}delay(e){if(!this.inRange(e,0,100))throw new RangeError("[Reverb.js] Inpulse Response delay time must be less than 100.");this.options.delay=e,this.buildImpulse()}reverse(e){this.options.reverse=e,this.buildImpulse()}filterType(e="allpass"){this.filterNode.type=this.options.filterType=e}filterFreq(e){if(!this.inRange(e,20,2e4))throw new RangeError("[Reverb.js] Filter frequrncy must be between 20 and 20000.");this.options.filterFreq=e,this.filterNode.frequency.value=this.options.filterFreq}filterQ(e){if(!this.inRange(e,0,10))throw new RangeError("[Reverb.js] Filter quality value must be between 0 and 10.");this.options.filterQ=e,this.filterNode.Q.value=this.options.filterQ}peaks(e){this.options.peaks=e,this.buildImpulse()}scale(e){this.options.scale=e,this.buildImpulse()}randomAlgorithm(e){this.options.randomAlgorithm=e,this.buildImpulse()}setNoise(e){switch(this.options.noise=e,e){case d.BLUE:this.noise=v;break;case d.GREEN:this.noise=F;break;case d.PINK:this.noise=j;break;case d.RED:case d.BROWN:this.noise=R;break;case d.VIOLET:this.noise=D;break;default:this.noise=E}this.buildImpulse()}setRandomAlgorythm(e){this.options.randomAlgorithm=e,this.buildImpulse()}inRange(e,s,n){return(e-s)*(e-n)<=0}buildImpulse(){const e=this.ctx.sampleRate,s=Math.max(e*this.options.time,1),n=e*this.options.delay,i=this.ctx.createBuffer(2,s,e),c=new Float32Array(s),o=new Float32Array(s),r=this.getNoise(s),a=this.getNoise(s);for(let l=0;l<s;l++){let m=0;l<n?(c[l]=0,o[l]=0,m=this.options.reverse?s-(l-n):l-n):m=this.options.reverse?s-l:l,c[l]=r[l]*(1-m/s)**this.options.decay,o[l]=a[l]*(1-m/s)**this.options.decay}i.getChannelData(0).set(c),i.getChannelData(1).set(o),this.convolverNode.buffer=i}getNoise(e){return[...G(e,this.noise(this.options.peaks,this.options.scale,this.options.randomAlgorithm))]}}return window.Reverb||(window.Reverb=k),k});
