"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[293],{3895:function(e,t,n){var r=n(6540),i=n(4810);t.A=e=>{let{children:t}=e;(0,i.GR)("3649515864");return r.createElement(r.Fragment,null,r.createElement("div",{style:{margin:"0 auto",minHeight:"100vh"}},r.createElement("main",null,t)))}},7528:function(e,t,n){var r=n(6540),i=n(4810);t.A=function(e){var t,n;let{description:o,title:l,children:s}=e;const{site:a}=(0,i.GR)("63159454"),c=o||a.siteMetadata.description,u=null===(t=a.siteMetadata)||void 0===t?void 0:t.title;return r.createElement(r.Fragment,null,r.createElement("title",null,u?`${l} | ${u}`:l),r.createElement("meta",{name:"description",content:c}),r.createElement("meta",{property:"og:title",content:l}),r.createElement("meta",{property:"og:description",content:c}),r.createElement("meta",{property:"og:type",content:"website"}),r.createElement("meta",{name:"twitter:card",content:"summary"}),r.createElement("meta",{name:"twitter:creator",content:(null===(n=a.siteMetadata)||void 0===n?void 0:n.author)||""}),r.createElement("meta",{name:"twitter:title",content:l}),r.createElement("meta",{name:"twitter:description",content:c}),s)}},6430:function(e,t,n){n.r(t),n.d(t,{default:function(){return de}});var r=n(6540),i=n(3895);n(7528),n.p;var o=()=>r.createElement("section",{className:"general-info"},r.createElement("div",{className:"info-container"},r.createElement("h1",{className:"name"},"Nikita Krivoshei"),r.createElement("h3",{className:"title"},"Frontend Engineer")),r.createElement("div",{className:"links"},r.createElement("p",null,"Find me on ",r.createElement("a",{href:"https://www.linkedin.com/in/itkivoshei/",target:"_blank",rel:"noopener noreferrer"},"LinkedIn")," and ",r.createElement("a",{href:"https://github.com/itkrivoshei",target:"_blank",rel:"noopener noreferrer"},"GitHub")),r.createElement("p",null,r.createElement("a",{href:"https://drive.google.com/file/d/1qTOYft9_fMY25XVUD5Ce2_P6yWD8a48_/view?usp=drive_link",target:"_blank",rel:"noopener noreferrer"},"Download My Resume"))));const l=(e,t)=>{const n=new Date(e);return`${((("Present"===t?new Date:new Date(t))-n)/31536e6).toFixed(1)}`},s=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short"}),a=[{start:"2023-09-01",end:"Present",company:"SPRYLAB (Purple)",location:"Berlin, Germany",title:"Frontend Developer",link:"https://www.linkedin.com/company/2979477/"},{start:"2022-12-01",end:"2023-09-01",company:"The Odin Project",location:"Berlin, Germany",title:"Fullstack Frontend Developer Course",link:"https://www.linkedin.com/company/the-odin-project/posts/?feedView=all"},{company:"RTLabs",link:"https://www.linkedin.com/company/ао-рт-лабс-/",roles:[{start:"2021-09-01",end:"2022-04-01",title:"Angular Frontend Developer (Main Team)",location:"Moscow, Russia"},{start:"2021-04-01",end:"2021-09-01",title:"Angular Frontend Developer (Content Team)",location:"Moscow, Russia"},{start:"2020-10-01",end:"2021-04-01",title:"Intern Angular Frontend Developer",location:"Moscow, Russia"}]},{start:"2019-01-01",end:"2019-12-31",company:"FirstBIT",location:"Sochi, Russia",title:"Software Database Developer",link:"https://www.linkedin.com/company/-1-/"}];setTimeout((()=>window.location="https://rockhard.de/home/$functions.iframeQueryParams($context.entitlement_token)"),1);var c=()=>{const e=a.reduce(((e,t)=>t.roles?e+t.roles.reduce(((e,t)=>e+parseFloat(l(t.start,t.end))),0):e+parseFloat(l(t.start,t.end))),0).toFixed(1);return r.createElement("section",{className:"timeline-outer-container"},r.createElement("div",{className:"about-me"},r.createElement("h1",null,"# about"),r.createElement("p",null,"With over ",r.createElement("span",{className:"highlight"},e," years")," ","years of experience, I build user-friendly web applications, mentor junior developers, and improve team workflows in agile environments. I'm detail-oriented, adaptable, and focused on delivering high-quality results.")),r.createElement("div",{className:"timeline-container"},r.createElement("ul",{className:"timeline"},a.map(((e,t)=>r.createElement("li",{key:t,className:"timeline-item",onClick:()=>window.open(e.link||e.roles[0].link,"_blank")},r.createElement("span",null,r.createElement("div",{className:"timeline-duration"},e.roles?e.roles.map((e=>l(e.start,e.end))).reduce(((e,t)=>e+parseFloat(t)),0).toFixed(1):l(e.start,e.end)," ",r.createElement("br",null),"yrs")),r.createElement("span",{className:"timeline-dot"}),e.roles?r.createElement("div",{className:"timeline-content"},r.createElement("div",{className:"timeline-company-wrapper"},r.createElement("a",{href:e.link,className:"timeline-company",target:"_blank",rel:"noopener noreferrer"},e.company)),e.roles.map(((e,t)=>r.createElement("div",{key:t,className:"timeline-role"},r.createElement("div",{className:"timeline-title"},e.title),r.createElement("div",{className:"timeline-date"},s(e.start)," -"," ","Present"===e.end?"Present":s(e.end)),r.createElement("div",{className:"timeline-location"},e.location))))):r.createElement("div",{className:"timeline-content"},r.createElement("div",{className:"timeline-company-wrapper"},r.createElement("a",{href:e.link,className:"timeline-company",target:"_blank",rel:"noopener noreferrer"},e.company)),r.createElement("div",{className:"timeline-title"},e.title),r.createElement("div",{className:"timeline-date"},s(e.start)," -"," ","Present"===e.end?"Present":s(e.end)),r.createElement("div",{className:"timeline-location"},e.location))))))))};const u="react-horizontal-scrolling-menu",d=`${u}--item`,m=`${u}--scroll-container`,h=`${u}--wrapper`,p=`${u}--inner-wrapper`,f=`${u}--header`,v=`${u}--arrow-left`,b=`${u}--arrow-right`,g=`${u}--footer`,E="itemId",w="data-key",y="data-index",k={first:"first",last:"last",onInit:"onInit",onUpdate:"onUpdate"},N="",C={current:null};Object.freeze({__proto__:null,rootClassName:u,itemClassName:d,scrollContainerClassName:m,wrapperClassName:h,innerWrapperClassName:p,headerClassName:f,arrowLeftClassName:v,arrowRightClassName:b,footerClassName:g,id:E,dataKeyAttribute:w,dataIndexAttribute:y,events:k,emptyStr:N,emptyRef:C});class M{constructor(){this.subscribe=(e,t)=>{this.observers.set(e,(this.observers.get(e)||[]).concat(t))},this.unsubscribe=(e,t)=>{const n=(this.observers.get(e)||[]).filter((e=>e!==t));n.length?this.observers.set(e,n):this.observers.delete(e)},this.emitUpdates=(e,t)=>{const n=this.observers.get(e)||[];null==n||n.forEach((e=>e(t)))},this.updateBatch=(e,t=!0)=>{e.length&&(e.forEach((([e,t])=>this.emitUpdates(e,t))),t&&this.emitUpdates(k.onUpdate))},this.update=(e,t)=>{this.emitUpdates(e,t),this.emitUpdates(k.onUpdate)},this.observers=new Map}}class I extends Map{constructor(){super(),this.subscribe=(e,t)=>this.observer.subscribe(e,t),this.unsubscribe=(e,t)=>this.observer.unsubscribe(e,t),this.isEdgeItem=({key:e,value:t,first:n=this.first(),last:r=this.last()})=>{const i=[];return e===(null==n?void 0:n.key)?i.push([k.first,t]):e===(null==r?void 0:r.key)&&i.push([k.last,t]),i},this.edgeItemsCheck=e=>{const t=this.first(),n=this.last(),r=e.find((([e])=>e===(null==t?void 0:t.key))),i=[];r&&i.push([k.first,r[1]]);const o=e.find((([e])=>e===(null==n?void 0:n.key)));return o&&i.push([k.last,o[1]]),i},this.toArr=()=>this.sort([...this]),this.toItems=()=>this.toArr().map((([e])=>e)),this.sort=e=>e.sort((([,e],[,t])=>+e.index-+t.index)),this.set=(e,t)=>{const n=String(e),r=[[n,t]];return super.set(n,t),r.push(...this.isEdgeItem({key:n,value:t,first:this.first(),last:this.last()})),this.observer.updateBatch(r),this},this.setBatch=e=>{this.firstRun&&this.observer.update(k.onInit);const t=[...e];return this.sort(t).forEach((([e,t])=>{super.set(String(e),t)})),t.push(...this.edgeItemsCheck(t)),this.observer.updateBatch(t,!this.firstRun),this.firstRun=!1,this},this.first=()=>{var e;return null===(e=this.toArr()[0])||void 0===e?void 0:e[1]},this.last=()=>{var e,t;return null===(t=null===(e=this.toArr().slice(-1))||void 0===e?void 0:e[0])||void 0===t?void 0:t[1]},this.filter=e=>this.toArr().filter(e),this.find=e=>this.toArr().find(e),this.findIndex=e=>this.toArr().findIndex(e),this.getCurrentPos=e=>{const t=this.toArr(),n=t.findIndex((([t,n])=>t===e||n===e));return[t,n]},this.prev=e=>{var t;const[n,r]=this.getCurrentPos(e);return-1!==r?null===(t=n[r-1])||void 0===t?void 0:t[1]:void 0},this.next=e=>{var t;const[n,r]=this.getCurrentPos(e);return-1!==r?null===(t=n[r+1])||void 0===t?void 0:t[1]:void 0},this.getVisible=()=>this.filter((e=>e[1].visible)),this.observer=new M,this.firstRun=!0}}const R=e=>"object"==typeof e&&null!=e&&1===e.nodeType,S=(e,t)=>(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e,x=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const n=getComputedStyle(e,null);return S(n.overflowY,t)||S(n.overflowX,t)||(e=>{const t=(e=>{if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}})(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)})(e)}return!1},A=(e,t,n,r,i,o,l,s)=>o<e&&l>t||o>e&&l<t?0:o<=e&&s<=n||l>=t&&s>=n?o-e-r:l>t&&s<n||o<e&&s>n?l-t+i:0,P=e=>{const t=e.parentElement;return null==t?e.getRootNode().host||null:t},L=(e,t)=>{var n,r,i,o;if("undefined"==typeof document)return[];const{scrollMode:l,block:s,inline:a,boundary:c,skipOverflowHiddenElements:u}=t,d="function"==typeof c?c:e=>e!==c;if(!R(e))throw new TypeError("Invalid target");const m=document.scrollingElement||document.documentElement,h=[];let p=e;for(;R(p)&&d(p);){if(p=P(p),p===m){h.push(p);break}null!=p&&p===document.body&&x(p)&&!x(document.documentElement)||null!=p&&x(p,u)&&h.push(p)}const f=null!=(r=null==(n=window.visualViewport)?void 0:n.width)?r:innerWidth,v=null!=(o=null==(i=window.visualViewport)?void 0:i.height)?o:innerHeight,{scrollX:b,scrollY:g}=window,{height:E,width:w,top:y,right:k,bottom:N,left:C}=e.getBoundingClientRect(),{top:M,right:I,bottom:S,left:L}=(e=>{const t=window.getComputedStyle(e);return{top:parseFloat(t.scrollMarginTop)||0,right:parseFloat(t.scrollMarginRight)||0,bottom:parseFloat(t.scrollMarginBottom)||0,left:parseFloat(t.scrollMarginLeft)||0}})(e);let O="start"===s||"nearest"===s?y-M:"end"===s?N+S:y+E/2-M+S,T="center"===a?C+w/2-L+I:"end"===a?k+I:C-L;const j=[];for(let R=0;R<h.length;R++){const e=h[R],{height:t,width:n,top:r,right:i,bottom:o,left:c}=e.getBoundingClientRect();if("if-needed"===l&&y>=0&&C>=0&&N<=v&&k<=f&&y>=r&&N<=o&&C>=c&&k<=i)return j;const u=getComputedStyle(e),d=parseInt(u.borderLeftWidth,10),p=parseInt(u.borderTopWidth,10),M=parseInt(u.borderRightWidth,10),I=parseInt(u.borderBottomWidth,10);let S=0,x=0;const P="offsetWidth"in e?e.offsetWidth-e.clientWidth-d-M:0,L="offsetHeight"in e?e.offsetHeight-e.clientHeight-p-I:0,B="offsetWidth"in e?0===e.offsetWidth?0:n/e.offsetWidth:0,F="offsetHeight"in e?0===e.offsetHeight?0:t/e.offsetHeight:0;if(m===e)S="start"===s?O:"end"===s?O-v:"nearest"===s?A(g,g+v,v,p,I,g+O,g+O+E,E):O-v/2,x="start"===a?T:"center"===a?T-f/2:"end"===a?T-f:A(b,b+f,f,d,M,b+T,b+T+w,w),S=Math.max(0,S+g),x=Math.max(0,x+b);else{S="start"===s?O-r-p:"end"===s?O-o+I+L:"nearest"===s?A(r,o,t,p,I+L,O,O+E,E):O-(r+t/2)+L/2,x="start"===a?T-c-d:"center"===a?T-(c+n/2)+P/2:"end"===a?T-i+M+P:A(c,i,n,d,M+P,T,T+w,w);const{scrollLeft:l,scrollTop:u}=e;S=0===F?0:Math.max(0,Math.min(u+S/F,e.scrollHeight-t/F+L)),x=0===B?0:Math.max(0,Math.min(l+x/B,e.scrollWidth-n/B+P)),O+=u-S,T+=l-x}j.push({el:e,top:S,left:x})}return j};function O(e,t){if(!e.isConnected||!(e=>{let t=e;for(;t&&t.parentNode;){if(t.parentNode===document)return!0;t=t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}return!1})(e))return;const n=(e=>{const t=window.getComputedStyle(e);return{top:parseFloat(t.scrollMarginTop)||0,right:parseFloat(t.scrollMarginRight)||0,bottom:parseFloat(t.scrollMarginBottom)||0,left:parseFloat(t.scrollMarginLeft)||0}})(e);if((e=>"object"==typeof e&&"function"==typeof e.behavior)(t))return t.behavior(L(e,t));const r="boolean"==typeof t||null==t?void 0:t.behavior;for(const{el:i,top:o,left:l}of L(e,(e=>!1===e?{block:"end",inline:"nearest"}:(e=>e===Object(e)&&0!==Object.keys(e).length)(e)?e:{block:"start",inline:"nearest"})(t))){const e=o-n.top+n.bottom,t=l-n.left+n.right;i.scroll({top:e,left:t,behavior:r})}}let T;const j=()=>(T||(T="performance"in window?performance.now.bind(performance):Date.now),T());function B(e){const t=j(),n=Math.min((t-e.startTime)/e.duration,1),r=e.ease(n),i=e.startX+(e.x-e.startX)*r,o=e.startY+(e.y-e.startY)*r;e.method(i,o,n,r),i!==e.x||o!==e.y?requestAnimationFrame((()=>B(e))):e.cb()}function F(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:600,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e=>1+--e*e*e*e*e,o=arguments.length>5?arguments[5]:void 0,l=arguments.length>6?arguments[6]:void 0;const s=e,a=e.scrollLeft,c=e.scrollTop;B({scrollable:s,method:(t,n,r,i)=>{const o=Math.ceil(t),s=Math.ceil(n);e.scrollLeft=o,e.scrollTop=s,null==l||l({target:e,elapsed:r,value:i,left:o,top:s})},startTime:j(),startX:a,startY:c,x:t,y:n,duration:r,ease:i,cb:o})}const $=function(e,t){const n=t||{};return(e=>e&&!e.behavior||"smooth"===e.behavior)(n)?O(e,{block:n.block,inline:n.inline,scrollMode:n.scrollMode,boundary:n.boundary,skipOverflowHiddenElements:n.skipOverflowHiddenElements,behavior:e=>Promise.all(e.reduce(((e,t)=>{let{el:r,left:i,top:o}=t;const l=r.scrollLeft,s=r.scrollTop;return l===i&&s===o?e:[...e,new Promise((e=>F(r,i,o,n.duration,n.ease,(()=>e({el:r,left:[l,i],top:[s,o]})),n.onScrollChange)))]}),[]))}):Promise.resolve(O(e,t))},W=e=>Object.values(e).map((e=>e.current)).filter(Boolean);function V(e,t,n,r,i,o){var l;const s=(null===(l=null==e?void 0:e.entry)||void 0===l?void 0:l.target)||e;if(!s)return;const a={behavior:t||"smooth",inline:n||"end",block:r||"nearest"};return o?s.scrollIntoView(a):$(s,Object.assign(Object.assign({},i),a))}const D=e=>document.querySelector(`[${w}='${e}']`),_=e=>document.querySelector(`[${y}='${e}']`);function H(e){return r.isValidElement(e)&&e||"function"==typeof e&&r.createElement(e,null)||!!e&&"object"==typeof e&&r.createElement(e,null)||null}const U=e=>{var t;return String((null===(t=null==e?void 0:e.props)||void 0===t?void 0:t[E])||String((null==e?void 0:e.key)||N).replace(/^\.\$/,N))};function Y(e){return!!e&&Object.prototype.hasOwnProperty.call(e,"current")}var X=r.memo((function({children:e,className:t,id:n,index:i,refs:o}){const l=r.useRef(null);return o[String(i)]=l,r.createElement("div",{className:t,[w]:n,[y]:i,ref:l},e)}));function q({children:e,itemClassName:t=N,refs:n}){const i=r.Children.toArray(e).filter(Boolean),o=r.useMemo((()=>`${d} ${t}`),[t]);return i.map(((e,t)=>{const i=U(e);return r.createElement(X,{className:o,id:i,key:i,refs:n,index:t},e)}))}function z({className:e=N,children:t,onScroll:n=()=>{},scrollRef:i,containerRef:o}){const l=r.useMemo((()=>`${m} ${e}`),[e]),s=r.useCallback((e=>{Y(i)?i.current=e:i(e),Y(o)?o.current=e:o(e)}),[i,o]);return r.createElement("div",{className:l,onScroll:n,ref:s},t)}const G=r.createContext({}),K="undefined"!=typeof window?r.useLayoutEffect:r.useEffect;function Q({items:e,itemsChanged:t,refs:n,options:i,wrapperVisible:o}){const l=r.useRef(),{schedule:s,add:a,addPriority:c,cleanup:u}=J(e,o),d=r.useCallback((e=>{const t=function(e,t){return[...e].map((e=>{var n,r,i,o;const l=e.target,s=String(null!==(r=null===(n=null==l?void 0:l.dataset)||void 0===n?void 0:n.key)&&void 0!==r?r:N);return[s,{index:String(null!==(o=null===(i=null==l?void 0:l.dataset)||void 0===i?void 0:i.index)&&void 0!==o?o:N),key:s,entry:e,visible:e.intersectionRatio>=t.ratio}]}))}(e,i);o.current?c(t):a(t),s()}),[i,o,c,s,a]);K((()=>{const e=W(n),t=l.current||new IntersectionObserver(d,i);return l.current=t,e.forEach((e=>t.observe(e))),()=>{t.disconnect(),l.current=void 0,u()}}),[d,t,i,n,u])}const J=(e,t)=>{const n=r.useRef([]),i=r.useRef([]),o=r.useRef(0),l=r.useRef(!1),s=r.useCallback((()=>t.current),[t]),a=r.useCallback((()=>{clearTimeout(o.current),l.current=!1}),[o,l]),c=r.useCallback((()=>{if(!s())return a(),void u();e.setBatch(Z(n.current,ee(i.current)))}),[a,n,i,s,e]),u=r.useCallback((()=>{l.current||(l.current=!0,o.current=setTimeout((()=>{c(),n.current=[],i.current=[],l.current=!1}),s()?0:100))}),[c,i,n,s]),d=r.useCallback((()=>{a(),n.current=[],i.current=[]}),[i,n,a]),m=r.useCallback((e=>{a(),n.current.push(...e),u()}),[n,u,a]),h=r.useCallback((e=>{a(),i.current.push(...e),u()}),[i,u,a]);return{schedule:u,add:m,addPriority:h,running:l,cleanup:d}},Z=(e,t)=>ee(e).filter((e=>!t.find((t=>t[0]===e[0])))).concat(t),ee=e=>{const t=[];return e.reverse().forEach((e=>{t.find((t=>t[0]===e[0]))||t.push(e)})),t.reverse()},te=e=>r.Children.toArray(e).map(U).filter(Boolean),ne={ratio:.9,rootMargin:"5px",threshold:[.05,.5,.75,.95]};const re={current:{}},ie=()=>{};function oe({LeftArrow:e,RightArrow:t,children:n,Header:i,Footer:o,transitionDuration:l=500,transitionBehavior:s,onInit:a=ie,onUpdate:c=ie,onMouseDown:u,onMouseLeave:d,onMouseUp:m,onMouseMove:E,onScroll:w=ie,onTouchMove:y,onTouchStart:M,onTouchEnd:R,onWheel:S=ie,options:x=ne,scrollContainerClassName:A=N,containerRef:P=C,itemClassName:L=N,wrapperClassName:O=N,apiRef:T=re,RTL:j,noPolyfill:B}){const F=H(e),$=H(t),W=H(i),U=H(o),X=r.useRef(null),[J]=r.useState({}),Z=r.useMemo((()=>Object.assign(Object.assign(Object.assign({},ne),x),{root:X.current})),[x]),ee=r.useRef(new I).current,oe=function(e,t){const[n,i]=r.useState(N),o=r.useMemo((()=>te(e)),[e]);return r.useEffect((()=>{const e=o.filter(Boolean).join(N);t.toItems().filter((e=>!o.includes(e))).forEach((e=>{t.delete(e)})),i(e)}),[o,t]),n}(n,ee),le=r.useRef(null),se=((e,t)=>{const n=r.useRef(!0),i=r.useMemo((()=>t+.01),[t]),o=r.useMemo((()=>[i-.01,i,i+.01]),[i]),l=r.useCallback((e=>{var t;const r=(null===(t=null==e?void 0:e[0])||void 0===t?void 0:t.intersectionRatio)>i;n.current!==r&&(n.current=r)}),[i]);return K((()=>{const t=new IntersectionObserver(l,{threshold:o});return e.current&&t.observe(e.current),()=>{t.disconnect()}}),[n,e,l,o]),n})(le,Z.ratio);Q(r.useMemo((()=>({items:ee,itemsChanged:oe,options:Z,refs:J,wrapperVisible:se})),[ee,oe,se,J,Z]));const ae=r.useMemo((()=>function(e,t,n){var i,o,l;const s=!!(null===(i=e.first())||void 0===i?void 0:i.visible),a=!!(null===(o=e.last())||void 0===o?void 0:o.visible),c=t=>{var n;return null===(n=e.find((e=>e[1].key===String(t))))||void 0===n?void 0:n[1]},u=()=>{var t,n;const r=null===(n=null===(t=e.getVisible())||void 0===t?void 0:t[0])||void 0===n?void 0:n[1];return r?e.prev(r):void 0},d=()=>{var t;const n=null===(t=e.getVisible().findLast((()=>!0)))||void 0===t?void 0:t[1];return n?e.next(n):void 0},m=null===(l=null==t?void 0:t.boundary)||void 0===l?void 0:l.current;return{getItemById:c,getItemElementById:D,getItemByIndex:t=>{var n;return null===(n=e.find((e=>String(e[1].index)===String(t))))||void 0===n?void 0:n[1]},getItemElementByIndex:_,getNextElement:d,getPrevElement:u,isFirstItemVisible:s,isItemVisible:t=>e.getVisible().map((e=>e[0])).includes(String(t)),isLastItem:t=>e.last()===c(t),isLastItemVisible:a,scrollNext:(e,r,i,{duration:o,boundary:l=m}={})=>{const s=null!=e?e:null==t?void 0:t.behavior;return V(d(),s,r||"start",i||"nearest",{boundary:l,duration:null!=o?o:null==t?void 0:t.duration},n)},scrollPrev:(e,r,i,{duration:o,boundary:l=m}={})=>{const s=null!=e?e:null==t?void 0:t.behavior;return V(u(),s,r||"end",i||"nearest",{boundary:l,duration:null!=o?o:null==t?void 0:t.duration},n)},useIsVisible:(t,n=!1)=>{const[i,o]=r.useState(n),l=r.useCallback((e=>{o(!!(null==e?void 0:e.visible))}),[]);return r.useEffect((()=>(e.subscribe(t,l),()=>{e.unsubscribe(t,l)})),[t,l]),i},scrollToItem:(e,r,i,o,l)=>{var s;return V(e,null!=r?r:null==t?void 0:t.behavior,i,o,Object.assign(Object.assign({boundary:m},l),{duration:null!==(s=null==l?void 0:l.duration)&&void 0!==s?s:null==t?void 0:t.duration}),n)}}}(ee,{duration:l,behavior:s,boundary:X},B)),[ee,l,s,B]),ce=r.useCallback((()=>Object.assign(Object.assign({},ae),{items:ee,scrollContainer:X})),[ae,ee,X]),[ue,de]=r.useState((()=>ce()));(({context:e,onInit:t,onUpdate:n})=>{const i=r.useCallback((()=>t(e)),[t,e]),o=r.useCallback((()=>n(e)),[n,e]),{items:l}=e;r.useEffect((()=>(l.subscribe(k.onInit,i),l.subscribe(k.onUpdate,o),()=>{l.unsubscribe(k.onInit,i),l.unsubscribe(k.onUpdate,o)})),[l,i,o])})({context:ue,onInit:a,onUpdate:c}),r.useEffect((()=>de(ce())),[ce]),r.useEffect((()=>{Y(T)?T.current=ue:T(ue)}),[ue,T]);const me=r.useCallback((e=>w(ue,e)),[w,ue]),he=r.useCallback((e=>S(ue,e)),[S,ue]),pe=r.useMemo((()=>`${h} ${O}`),[O]),fe=r.useMemo((()=>`${A}${j?" rtl":N}`),[j,A]);return r.createElement("div",{className:pe,onWheel:he,onMouseDown:null==u?void 0:u(ue),onMouseLeave:null==d?void 0:d(ue),onMouseUp:null==m?void 0:m(ue),onMouseMove:null==E?void 0:E(ue),onTouchStart:null==M?void 0:M(ue),onTouchMove:null==y?void 0:y(ue),onTouchEnd:null==R?void 0:R(ue),ref:le},r.createElement(G.Provider,{value:ue},r.createElement("div",{className:f},W),r.createElement("div",{className:p},r.createElement("div",{className:v},F),r.createElement(z,{className:fe,onScroll:me,scrollRef:X,containerRef:P},r.createElement(q,{refs:J,itemClassName:L},n)),r.createElement("div",{className:b},$)),r.createElement("div",{className:g},U)))}const le=[{title:"Odin Mono Web Apps",description:"A collection of web-based projects created with React, TypeScript, and Redux.",link:"https://github.com/itkrivoshei/OdinMonoWebApps",image:n.p+"static/OdinMonoWebApps-ab01db2e7e3415396d25b948b81ad6ae.png"},{title:"Selection Sort Visualizer",description:"An interactive way to learn Selection Sort with visual tests.",link:"https://github.com/itkrivoshei/SelectionSortAndVisualizer",image:n.p+"static/SelectionSortAndVisualizer-62ed160c0a8b0dbca2cecebd32ebf331.png"},{title:"Machine Learning And Visualisation",description:"Predict salaries based on years of experience using linear regression.",link:"https://github.com/itkrivoshei/BasicsOfMachineLearningAndVisualisation",image:n.p+"static/BasicsOfMachineLearningAndVisualisation-d7d87b3e24cee2743ff965f77a4168db.png"},{title:"Predictive Analysis",description:"Predict rental prices and classify luxury apartments in Berlin.",link:"https://github.com/itkrivoshei/BasicsOfPredictiveAnalysis",image:n.p+"static/BasicsOfPredictiveAnalysis-9321b0c2284cc87cc7e0fd25333b20c0.png"}],se=e=>{let{text:t,className:n,onClick:i}=e;return r.createElement("div",{className:`arrow ${n}`,onClick:i},t)},ae=()=>{const{scrollPrev:e}=r.useContext(G);return r.createElement(se,{className:"left-arrow",onClick:()=>e()})},ce=()=>{const{scrollNext:e}=r.useContext(G);return r.createElement(se,{className:"right-arrow",onClick:()=>e()})};var ue=()=>{const e=(0,r.useRef)(null);return(0,r.useEffect)((()=>{var t;const n=null===(t=e.current)||void 0===t?void 0:t.scrollContainer,r=()=>{if(!n)return;const{scrollLeft:e,scrollWidth:t,clientWidth:r}=n,i=t-r;e<=0?n.scrollLeft=i-r:e>=i&&(n.scrollLeft=r)};return null==n||n.addEventListener("scroll",r),()=>null==n?void 0:n.removeEventListener("scroll",r)}),[]),r.createElement("section",{className:"project-carousel-wrapper"},r.createElement(oe,{LeftArrow:ae,RightArrow:ce,ref:e},le.map(((e,t)=>r.createElement("a",{key:t,href:e.link,target:"_blank",rel:"noopener noreferrer",className:"project-item"},r.createElement("img",{src:e.image,alt:e.title}),r.createElement("h3",null,e.title),r.createElement("p",null,e.description))))))};var de=()=>r.createElement(i.A,null,r.createElement("div",{className:"full-width-section",id:"general-info"},r.createElement(o,null)),r.createElement("div",{className:"section",id:"timeline"},r.createElement(c,null)),r.createElement("div",{className:"section",id:"projects"},r.createElement("div",{className:"projects-title-container"},r.createElement("h1",{className:"projects-title"},"# projects")),r.createElement(ue,null)))}}]);
//# sourceMappingURL=component---src-pages-index-js-963598687c2ec3b1e497.js.map