if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,c,s)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const d={uri:location.origin+r.slice(1)};return Promise.all(c.map(r=>{switch(r){case"exports":return i;case"module":return d;default:return e(r)}})).then(e=>{const r=s(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"icon_512x512.9cc1b3d70d7efee57427a6cdca1835c1.png",revision:"9cc1b3d70d7efee57427a6cdca1835c1"},{url:"index.html",revision:"a14f92046c1a46ffbbe21e6d63288dd9"},{url:"main.js",revision:"ec18dec6f4aa53b357de8bc742a93cdb"},{url:"manifest.f4bed892da1d95ce603b8d5fd43454b9.json",revision:"f4bed892da1d95ce603b8d5fd43454b9"}],{})}));