var p=(e,t=0)=>new Promise(n=>{d(e,t,n)}),d=(e,t=0,n)=>{let a,r,i={passive:!0},c=500,u=()=>{a&&a()},s=o=>{(o===void 0||e===o.target)&&(u(),n(o))};return e&&(e.addEventListener("webkitTransitionEnd",s,i),e.addEventListener("transitionend",s,i),r=setTimeout(s,t+c),a=()=>{r!==void 0&&(clearTimeout(r),r=void 0),e.removeEventListener("webkitTransitionEnd",s,i),e.removeEventListener("transitionend",s,i)}),u},E=(e,t)=>{e.componentOnReady?e.componentOnReady().then(n=>t(n)):b(()=>t(e))},g=e=>e.componentOnReady!==void 0,l=(e,t=[])=>{let n={};return t.forEach(a=>{e.hasAttribute(a)&&(e.getAttribute(a)!==null&&(n[a]=e.getAttribute(a)),e.removeAttribute(a))}),n},f=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"],y=(e,t)=>{let n=f;return t&&t.length>0&&(n=n.filter(a=>!t.includes(a))),l(e,n)},v=(e,t,n,a)=>e.addEventListener(t,n,a),w=(e,t,n,a)=>e.removeEventListener(t,n,a),T=(e,t=e)=>e.shadowRoot||t,b=e=>typeof __zone_symbol__requestAnimationFrame=="function"?__zone_symbol__requestAnimationFrame(e):typeof requestAnimationFrame=="function"?requestAnimationFrame(e):setTimeout(e),m=e=>!!e.shadowRoot&&!!e.attachShadow,x=e=>{if(e.focus(),e.classList.contains("ion-focusable")){let t=e.closest("ion-app");t&&t.setFocus([e])}},A=(e,t,n,a,r)=>{if(e||m(t)){let i=t.querySelector("input.aux-input");i||(i=t.ownerDocument.createElement("input"),i.type="hidden",i.classList.add("aux-input"),t.appendChild(i)),i.disabled=r,i.name=n,i.value=a||""}},_=(e,t,n)=>Math.max(e,Math.min(t,n)),L=(e,t)=>{if(!e){let n="ASSERT: "+t;console.error(n);debugger;throw new Error(n)}},O=e=>{if(e){let t=e.changedTouches;if(t&&t.length>0){let n=t[0];return{x:n.clientX,y:n.clientY}}if(e.pageX!==void 0)return{x:e.pageX,y:e.pageY}}return{x:0,y:0}},S=e=>{let t=document.dir==="rtl";switch(e){case"start":return t;case"end":return!t;default:throw new Error(`"${e}" is not a valid value for [side]. Use "start" or "end" instead.`)}},R=(e,t)=>{let n=e._original||e;return{_original:e,emit:h(n.emit.bind(n),t)}},h=(e,t=0)=>{let n;return(...a)=>{clearTimeout(n),n=setTimeout(e,t,...a)}},N=(e,t)=>{if(e!=null||(e={}),t!=null||(t={}),e===t)return!0;let n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let a of n)if(!(a in t)||e[a]!==t[a])return!1;return!0},k=e=>{let t=e.nextSibling;for(;t;){if(t.nodeType===Node.ELEMENT_NODE&&t!==null)return t;t=t.nextSibling}return null},q=e=>typeof e=="number"&&!isNaN(e)&&isFinite(e);export{p as a,E as b,g as c,l as d,y as e,v as f,w as g,T as h,b as i,m as j,x as k,A as l,_ as m,L as n,O as o,S as p,R as q,h as r,N as s,k as t,q as u};
