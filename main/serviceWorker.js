if(!self.define){let e,t={};const n=(n,r)=>(n=new URL(n+".js",r).href,t[n]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=t,document.head.appendChild(e)}else e=n,importScripts(n),t()})).then((()=>{let e=t[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,i)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(t[s])return;let o={};const d=e=>n(e,s),c={module:{uri:s},exports:o,require:d};t[s]=Promise.all(r.map((e=>c[e]||d(e)))).then((e=>(i(...e),o)))}}define(["./workbox-9d146cca"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/kutil/main/bundle.js",revision:"4b2a5b9e19ffbe909eac9af6fed5a941"}],{})}));