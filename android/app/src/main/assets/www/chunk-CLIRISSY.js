import{a as p,c as m}from"./chunk-4PGTP63H.js";import{d as b,f as u,i as x}from"./chunk-DKMOIDJO.js";import"./chunk-DQW5JFLC.js";import"./chunk-XDLFVO2Q.js";import{a as l,c as r}from"./chunk-G4KMZYVE.js";import{b as a,c as E,d,f as e,g as f,j as S,k as y}from"./chunk-BV6CMKRI.js";import{f as c}from"./chunk-RW4GY4BD.js";var T="ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}",k=T,z=(()=>{let t=class{constructor(i){a(this,i),this.ionInfinite=y(this,"ionInfinite",7),this.thrPx=0,this.thrPc=0,this.didFire=!1,this.isBusy=!1,this.onScroll=()=>{let n=this.scrollEl;if(!n||!this.canStart())return 1;let s=this.el.offsetHeight;if(s===0)return 2;let o=n.scrollTop,v=n.scrollHeight,h=n.offsetHeight,g=this.thrPc!==0?h*this.thrPc:this.thrPx;return(this.position==="bottom"?v-s-o-g-h:o-s-g)<0&&!this.didFire?(this.isLoading=!0,this.didFire=!0,this.ionInfinite.emit(),3):4},this.isLoading=!1,this.threshold="15%",this.disabled=!1,this.position="bottom"}thresholdChanged(){let i=this.threshold;i.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(i)/100):(this.thrPx=parseFloat(i),this.thrPc=0)}disabledChanged(){let i=this.disabled;i&&(this.isLoading=!1,this.isBusy=!1),this.enableScrollEvents(!i)}connectedCallback(){return c(this,null,function*(){let i=u(this.el);if(!i){x(this.el);return}this.scrollEl=yield b(i),this.thresholdChanged(),this.disabledChanged(),this.position==="top"&&d(()=>{this.scrollEl&&(this.scrollEl.scrollTop=this.scrollEl.scrollHeight-this.scrollEl.clientHeight)})})}disconnectedCallback(){this.enableScrollEvents(!1),this.scrollEl=void 0}complete(){return c(this,null,function*(){let i=this.scrollEl;if(!(!this.isLoading||!i))if(this.isLoading=!1,this.position==="top"){this.isBusy=!0;let n=i.scrollHeight-i.scrollTop;requestAnimationFrame(()=>{E(()=>{let o=i.scrollHeight-n;requestAnimationFrame(()=>{d(()=>{i.scrollTop=o,this.isBusy=!1,this.didFire=!1})})})})}else this.didFire=!1})}canStart(){return!this.disabled&&!this.isBusy&&!!this.scrollEl&&!this.isLoading}enableScrollEvents(i){this.scrollEl&&(i?this.scrollEl.addEventListener("scroll",this.onScroll):this.scrollEl.removeEventListener("scroll",this.onScroll))}render(){let i=r(this),n=this.disabled;return e(f,{key:"e844956795f69be33396ce4480aa7a54ad01b28c",class:{[i]:!0,"infinite-scroll-loading":this.isLoading,"infinite-scroll-enabled":!n}})}get el(){return S(this)}static get watchers(){return{threshold:["thresholdChanged"],disabled:["disabledChanged"]}}};return t.style=k,t})(),I="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}",C=I,L="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}",H=L,D=(()=>{let t=class{constructor(i){a(this,i),this.customHTMLEnabled=l.get("innerHTMLTemplatesEnabled",m),this.loadingSpinner=void 0,this.loadingText=void 0}componentDidLoad(){if(this.loadingSpinner===void 0){let i=r(this);this.loadingSpinner=l.get("infiniteLoadingSpinner",l.get("spinner",i==="ios"?"lines":"crescent"))}}renderLoadingText(){let{customHTMLEnabled:i,loadingText:n}=this;return i?e("div",{class:"infinite-loading-text",innerHTML:p(n)}):e("div",{class:"infinite-loading-text"},this.loadingText)}render(){let i=r(this);return e(f,{key:"7c16060dcfe2a0b0fb3e2f8f4c449589a76f1baa",class:{[i]:!0,[`infinite-scroll-content-${i}`]:!0}},e("div",{key:"a94f4d8746e053dc718f97520bd7e48cb316443a",class:"infinite-loading"},this.loadingSpinner&&e("div",{key:"10143d5d2a50a2a2bc5de1cee8e7ab51263bcf23",class:"infinite-loading-spinner"},e("ion-spinner",{key:"8846e88191690d9c61a0b462889ed56fbfed8b0d",name:this.loadingSpinner})),this.loadingText!==void 0&&this.renderLoadingText()))}};return t.style={ios:C,md:H},t})();export{z as ion_infinite_scroll,D as ion_infinite_scroll_content};
