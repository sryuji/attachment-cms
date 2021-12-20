var ie=Object.defineProperty;var se=(a,o,l)=>o in a?ie(a,o,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[o]=l;var d=(a,o,l)=>(se(a,typeof o!="symbol"?o+"":o,l),l);(function(a,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(a=typeof globalThis!="undefined"?globalThis:a||self,o(a.AttachmentCMS={}))})(this,function(a){"use strict";var o=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},l="Expected a function",C=0/0,B="[object Symbol]",$=/^\s+|\s+$/g,H=/^[-+]0x[0-9a-f]+$/i,R=/^0b[01]+$/i,P=/^0o[0-7]+$/i,N=parseInt,_=typeof o=="object"&&o&&o.Object===Object&&o,q=typeof self=="object"&&self&&self.Object===Object&&self,U=_||q||Function("return this")(),F=Object.prototype,D=F.toString,W=Math.max,G=Math.min,E=function(){return U.Date.now()};function Q(n,e,t){var r,i,u,m,c,h,p=0,A=!1,y=!1,T=!0;if(typeof n!="function")throw new TypeError(l);e=k(e)||0,b(t)&&(A=!!t.leading,y="maxWait"in t,u=y?W(k(t.maxWait)||0,e):u,T="trailing"in t?!!t.trailing:T);function v(s){var f=r,g=i;return r=i=void 0,p=s,m=n.apply(g,f),m}function ee(s){return p=s,c=setTimeout(w,e),A?v(s):m}function te(s){var f=s-h,g=s-p,O=e-f;return y?G(O,u-g):O}function j(s){var f=s-h,g=s-p;return h===void 0||f>=e||f<0||y&&g>=u}function w(){var s=E();if(j(s))return I(s);c=setTimeout(w,te(s))}function I(s){return c=void 0,T&&r?v(s):(r=i=void 0,m)}function ne(){c!==void 0&&clearTimeout(c),p=0,r=h=i=c=void 0}function re(){return c===void 0?m:I(E())}function x(){var s=E(),f=j(s);if(r=arguments,i=this,h=s,f){if(c===void 0)return ee(h);if(y)return c=setTimeout(w,e),v(h)}return c===void 0&&(c=setTimeout(w,e)),m}return x.cancel=ne,x.flush=re,x}function Y(n,e,t){var r=!0,i=!0;if(typeof n!="function")throw new TypeError(l);return b(t)&&(r="leading"in t?!!t.leading:r,i="trailing"in t?!!t.trailing:i),Q(n,e,{leading:r,maxWait:e,trailing:i})}function b(n){var e=typeof n;return!!n&&(e=="object"||e=="function")}function K(n){return!!n&&typeof n=="object"}function X(n){return typeof n=="symbol"||K(n)&&D.call(n)==B}function k(n){if(typeof n=="number")return n;if(X(n))return C;if(b(n)){var e=typeof n.valueOf=="function"?n.valueOf():n;n=b(e)?e+"":e}if(typeof n!="string")return n===0?n:+n;n=n.replace($,"");var t=R.test(n);return t||P.test(n)?N(n.slice(2),t?2:8):H.test(n)?C:+n}var z=Y;function J(){window.history.pushState=new Proxy(window.history.pushState,{apply:(n,e,t)=>{const r=new Event("pushstate"),i=n.apply(e,t);return window.dispatchEvent(r),i}}),window.history.replaceState=new Proxy(window.history.replaceState,{apply:(n,e,t)=>{const r=new Event("replacestate"),i=n.apply(e,t);return window.dispatchEvent(r),i}})}const S="acms-content",L="acmsLib",V=["PluginContentHistory","ReleaseContentHistory"];function Z(){return sessionStorage.getItem(L)}class M{constructor(e){d(this,"baseUrl");d(this,"defaultToken");d(this,"queryToken");d(this,"contents");d(this,"id");d(this,"contentsResponse");d(this,"throttleApplyContents");d(this,"isExtension");if(!e||!e.token)throw new Error("Required acmst query parameter as token.");this.isExtension=e.isExtension===!0,this.baseUrl=e&&e.baseUrl||"https://api.attachment-cms.dev",this.defaultToken=e.token,this.id=e&&e.id||null,this.throttleApplyContents=z(this.applyContents,e&&e.throttleMs||200)}get isServer(){return typeof window=="undefined"}get url(){return this.queryToken?`${this.baseUrl}/contents/limited`:`${this.baseUrl}/contents`}get token(){return this.queryToken||this.defaultToken}async run(){this.isServer||(this.markAttachmentType(),this.queryToken=this.getQueryToken(),this.showLimitedMode(),this.contentsResponse=await this.fetchContents(),this.contents=this.extractMatchedContents(this.contentsResponse.contents),document.readyState==="loading"?window.addEventListener("DOMContentLoaded",()=>{this.applyContents(),this.observeElement(),this.observeHistoryState()}):(this.applyContents(),this.observeElement(),this.observeHistoryState()))}load(e){if(!e||!e.contents)throw new Error("Need 1 argument. Please pass response data.");this.contentsResponse=e}pick(e){return Object.values(this.contentsResponse.contents).flat().find(r=>r.id===e)}markAttachmentType(){sessionStorage.setItem(L,this.isExtension?"extension":"officail")}getQueryToken(){let e=sessionStorage.getItem("acmst");return e||(e=new URLSearchParams(window.location.search).get("acmst"),e&&sessionStorage.setItem("acmst",e),e)}showLimitedMode(){if(!this.queryToken)return;const e=document.getElementsByTagName("body")[0],t=`<div id="${S}-limited-mark" style="position: fixed; bottom: 20px; right: 30px;background-color: #46F28D; box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5); border-radius: 6px;">
    <p style="padding: 10px; font-weight: 600;">\u9650\u5B9A\u516C\u958B<br/>by attachment CMS</p>
    </div>`;this.insertLastChildToElement(e,t)}async fetchContents(){const e=`${this.url}?token=${this.token}`;return(await fetch(e)).json()}extractMatchedContents(e){if(!e)return[];const t=Object.keys(e),r=window.location.pathname.replace(/\/$/,"");return t.filter(i=>{i=i.replace(/\/$/,"");const u=new RegExp(String.raw`^${i}$`,"i");return r.match(u)}).map(i=>e[i]).flat().sort((i,u)=>this.calcContentIndex(i.type)-this.calcContentIndex(u.type))}calcContentIndex(e){let t=V.indexOf(e);return t=t===-1?999:t,t}observeElement(){const e=this.id?document.getElementById(this.id):document.getElementsByTagName("body")[0];if(!e)throw this.id&&console.warn(`No exists html element. id: ${this.id}`),new Error("No found observed element.");const t=new MutationObserver(()=>{this.throttleApplyContents()}),r={attributes:!1,characterData:!0,childList:!0,subtree:!0};t.observe(e,r)}applyContents(){this.contents.forEach(e=>{const t=document.querySelector(e.selector);if(!t)return;const r=`${S}-${e.id}`;if(!document.getElementById(r))switch(e.action){case"innerHTML":t.innerHTML=e.content;break;case"remove":this.removeElement(t,r);break;case"insertBefore":this.insertBeforeElement(t,e.content);break;case"insertChildAfterBegin":this.insertFirstChildToElement(t,e.content);break;case"insertChildBeforeEnd":this.insertLastChildToElement(t,e.content);break;case"insertAfter":this.insertAfterElement(t,e.content);break}})}removeElement(e,t){e.id=t,e.setAttribute("style","display: none;")}insertBeforeElement(e,t){e.insertAdjacentHTML("beforebegin",t)}insertFirstChildToElement(e,t){e.insertAdjacentHTML("afterbegin",t)}insertLastChildToElement(e,t){e.insertAdjacentHTML("beforeend",t)}insertAfterElement(e,t){e.insertAdjacentHTML("afterend",t)}observeHistoryState(){J();const e=()=>{this.contents=this.extractMatchedContents(this.contentsResponse.contents)};window.addEventListener("popstate",e),window.addEventListener("pushstate",e),window.addEventListener("replacestate",e)}}typeof window!="undefined"&&window.AttachmentConfig&&new M(window.AttachmentConfig).run(),a.AttachmentCMS=M,a.getLoadedStatus=Z,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});
