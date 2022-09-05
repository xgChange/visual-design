import{d as S,L as l,c as Y,r as C,h as ne,g as We,e as h,p as kt,v as ve,a as Dt,u as $,w as we,o as Ot,k as xe,M as It,n as Ge,N as pe,y as He,O as ge,z as Xe,P as te,Q as Pt,R as Je,S as ae,U as Qe,V as qe,W as Ze,m as Nt,X as At,Y as Ke,Z as Rt,T as $t,_ as Vt,i as Tt,$ as Ft,a0 as jt}from"./vue.a5281014.js";import{N as ce,a as Lt,b as zt,c as Mt,d as Ut,e as Z,f as Wt,g as Gt,h as Ht,i as Xt,j as Jt,k as Qt,l as ye,m as qt,n as Ae,o as Zt}from"./naive-ui.06b1f7f0.js";import{d as Kt,c as Yt,s as Ye}from"./pinia.6fcff660.js";import{V as be}from"./vuedraggable.5baeaa8d.js";import{l as Re}from"./lodash.0efbc13f.js";const en=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerpolicy&&(r.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?r.credentials="include":a.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}};en();const tn="_options-btns_1twsd_1";var nn={optionsBtns:tn},an=S({name:"HeaderBase",setup(){function e(){console.log("save")}function t(){console.log("import json")}function n(){console.log("redo")}return()=>l("div",null,[l("div",{class:nn.optionsBtns},[l(ce,{strong:!0,secondary:!0,type:"primary",onClick:e},{default:()=>[Y("\u4FDD\u5B58")]}),l(ce,{strong:!0,secondary:!0,type:"primary",onClick:t},{default:()=>[Y("\u5BFC\u5165JSON")]}),l(ce,{strong:!0,secondary:!0,type:"primary",onClick:n},{default:()=>[Y("\u91CD\u505A")]})])])}}),O=(e=>(e.INPUT="input",e.INPUTNUMBER="inputNumber",e.COLOR="color",e.SELECT="select",e.SWITCH="switch",e.CONTROLLINPUT="controllInput",e))(O||{});const on="positionGroup",et=Object.assign,tt=typeof window!="undefined";function $e(e,t){const n=t.split(".");let o=e;return n.forEach(a=>{var r;o=(r=o[a])!=null?r:""}),o}const A=[Number,String],Se={type:Boolean,default:!0},P=e=>({type:String,default:e});var rn=typeof window!="undefined",se,he;function ln(){if(!se&&(se=C(0),he=C(0),rn)){const e=()=>{se.value=window.innerWidth,he.value=window.innerHeight};e(),window.addEventListener("resize",e,{passive:!0}),window.addEventListener("orientationchange",e,{passive:!0})}return{width:se,height:he}}const G=e=>e!=null,sn=e=>typeof e=="function",un=e=>e!==null&&typeof e=="object",nt=e=>typeof e=="number"||/^\d+(\.\d+)?$/.test(e),cn=()=>tt?/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()):!1;cn();const dn=e=>e.stopPropagation();function fn(e,t){(typeof e.cancelable!="boolean"||e.cancelable)&&e.preventDefault(),t&&dn(e)}ln();function N(e){if(G(e))return nt(e)?`${e}px`:String(e)}function vn(e){if(G(e)){if(Array.isArray(e))return{width:N(e[0]),height:N(e[1])};const t=N(e);return{width:t,height:t}}}const pn=/-(\w)/g,at=e=>e.replace(pn,(t,n)=>n.toUpperCase()),gn=e=>e.replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,""),{hasOwnProperty:mn}=Object.prototype;function yn(e,t,n){const o=t[n];!G(o)||(!mn.call(e,n)||!un(o)?e[n]=o:e[n]=ot(Object(e[n]),o))}function ot(e,t){return Object.keys(t).forEach(n=>{yn(e,t,n)}),e}var hn={name:"\u59D3\u540D",tel:"\u7535\u8BDD",save:"\u4FDD\u5B58",confirm:"\u786E\u8BA4",cancel:"\u53D6\u6D88",delete:"\u5220\u9664",loading:"\u52A0\u8F7D\u4E2D...",noCoupon:"\u6682\u65E0\u4F18\u60E0\u5238",nameEmpty:"\u8BF7\u586B\u5199\u59D3\u540D",addContact:"\u6DFB\u52A0\u8054\u7CFB\u4EBA",telInvalid:"\u8BF7\u586B\u5199\u6B63\u786E\u7684\u7535\u8BDD",vanCalendar:{end:"\u7ED3\u675F",start:"\u5F00\u59CB",title:"\u65E5\u671F\u9009\u62E9",weekdays:["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],monthTitle:(e,t)=>`${e}\u5E74${t}\u6708`,rangePrompt:e=>`\u6700\u591A\u9009\u62E9 ${e} \u5929`},vanCascader:{select:"\u8BF7\u9009\u62E9"},vanPagination:{prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875"},vanPullRefresh:{pulling:"\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",loosing:"\u91CA\u653E\u5373\u53EF\u5237\u65B0..."},vanSubmitBar:{label:"\u5408\u8BA1:"},vanCoupon:{unlimited:"\u65E0\u95E8\u69DB",discount:e=>`${e}\u6298`,condition:e=>`\u6EE1${e}\u5143\u53EF\u7528`},vanCouponCell:{title:"\u4F18\u60E0\u5238",count:e=>`${e}\u5F20\u53EF\u7528`},vanCouponList:{exchange:"\u5151\u6362",close:"\u4E0D\u4F7F\u7528",enable:"\u53EF\u7528",disabled:"\u4E0D\u53EF\u7528",placeholder:"\u8F93\u5165\u4F18\u60E0\u7801"},vanAddressEdit:{area:"\u5730\u533A",postal:"\u90AE\u653F\u7F16\u7801",areaEmpty:"\u8BF7\u9009\u62E9\u5730\u533A",addressEmpty:"\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",postalEmpty:"\u90AE\u653F\u7F16\u7801\u4E0D\u6B63\u786E",addressDetail:"\u8BE6\u7EC6\u5730\u5740",defaultAddress:"\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740"},vanAddressList:{add:"\u65B0\u589E\u5730\u5740"}};const Ve=C("zh-CN"),Te=ne({"zh-CN":hn}),_n={messages(){return Te[Ve.value]},use(e,t){Ve.value=e,this.add({[e]:t})},add(e={}){ot(Te,e)}};var bn=_n;function Sn(e){const t=at(e)+".";return(n,...o)=>{const a=bn.messages(),r=$e(a,t+n)||$e(a,n);return sn(r)?r(...o):r}}function Ce(e,t){return t?typeof t=="string"?` ${e}--${t}`:Array.isArray(t)?t.reduce((n,o)=>n+Ce(e,o),""):Object.keys(t).reduce((n,o)=>n+(t[o]?Ce(e,o):""),""):""}function Cn(e){return(t,n)=>(t&&typeof t!="string"&&(n=t,t=""),t=t?`${e}__${t}`:e,`${t}${Ce(t,n)}`)}function H(e){const t=`van-${e}`;return[t,Cn(t),Sn(t)]}const En="van-hairline",Bn=`${En}--surround`;function oe(e){return e.install=t=>{const{name:n}=e;n&&(t.component(n,e),t.component(at(`-${n}`),e))},e}const wn={to:[String,Object],url:String,replace:Boolean};function xn({to:e,url:t,replace:n,$router:o}){e&&o?o[n?"replace":"push"](e):t&&(n?location.replace(t):location.href=t)}function kn(){const e=We().proxy;return()=>xn(e)}const[Dn,Fe]=H("badge"),On={dot:Boolean,max:A,tag:P("div"),color:String,offset:Array,content:A,showZero:Se,position:P("top-right")};var In=S({name:Dn,props:On,setup(e,{slots:t}){const n=()=>{if(t.content)return!0;const{content:s,showZero:i}=e;return G(s)&&s!==""&&(i||s!==0&&s!=="0")},o=()=>{const{dot:s,max:i,content:d}=e;if(!s&&n())return t.content?t.content():G(i)&&nt(d)&&+d>i?`${i}+`:d},a=h(()=>{const s={background:e.color};if(e.offset){const[i,d]=e.offset;t.default?(s.top=N(d),typeof i=="number"?s.right=N(-i):s.right=i.startsWith("-")?i.replace("-",""):`-${i}`):(s.marginTop=N(d),s.marginLeft=N(i))}return s}),r=()=>{if(n()||e.dot)return l("div",{class:Fe([e.position,{dot:e.dot,fixed:!!t.default}]),style:a.value},[o()])};return()=>{if(t.default){const{tag:s}=e;return l(s,{class:Fe("wrapper")},{default:()=>[t.default(),r()]})}return r()}}});const Pn=oe(In),Nn=e=>{},[rt,An]=H("config-provider"),lt=Symbol(rt),Rn={tag:P("div"),zIndex:Number,themeVars:Object,iconPrefix:String};function $n(e){const t={};return Object.keys(e).forEach(n=>{t[`--van-${gn(n)}`]=e[n]}),t}S({name:rt,props:Rn,setup(e,{slots:t}){const n=h(()=>{if(e.themeVars)return $n(e.themeVars)});return kt(lt,e),ve(()=>{e.zIndex!==void 0&&Nn(e.zIndex)}),()=>l(e.tag,{class:An(),style:n.value},{default:()=>{var o;return[(o=t.default)==null?void 0:o.call(t)]}})}});const[Vn,je]=H("icon"),Tn=e=>e==null?void 0:e.includes("/"),Fn={dot:Boolean,tag:P("i"),name:String,size:A,badge:A,color:String,badgeProps:Object,classPrefix:String};var jn=S({name:Vn,props:Fn,setup(e,{slots:t}){const n=Dt(lt,null),o=h(()=>e.classPrefix||(n==null?void 0:n.iconPrefix)||je());return()=>{const{tag:a,dot:r,name:s,size:i,badge:d,color:g}=e,f=Tn(s);return l(Pn,$({dot:r,tag:a,class:[o.value,f?"":`${o.value}-${s}`],style:{color:g,fontSize:N(i)},content:d},e.badgeProps),{default:()=>{var p;return[(p=t.default)==null?void 0:p.call(t),f&&l("img",{class:je("image"),src:s},null)]}})}}});const st=oe(jn),[Ln,ee]=H("loading"),zn=Array(12).fill(null).map((e,t)=>l("i",{class:ee("line",String(t+1))},null)),Mn=l("svg",{class:ee("circular"),viewBox:"25 25 50 50"},[l("circle",{cx:"50",cy:"50",r:"20",fill:"none"},null)]),Un={size:A,type:P("circular"),color:String,vertical:Boolean,textSize:A,textColor:String};var Wn=S({name:Ln,props:Un,setup(e,{slots:t}){const n=h(()=>et({color:e.color},vn(e.size))),o=()=>{var a;if(t.default)return l("span",{class:ee("text"),style:{fontSize:N(e.textSize),color:(a=e.textColor)!=null?a:e.color}},[t.default()])};return()=>{const{type:a,vertical:r}=e;return l("div",{class:ee([a,{vertical:r}]),"aria-live":"polite","aria-busy":!0},[l("span",{class:ee("spinner",a),style:n.value},[a==="spinner"?zn:Mn]),o()])}}});const Gn=oe(Wn),[Hn,M]=H("button"),Xn=et({},wn,{tag:P("button"),text:String,icon:String,type:P("default"),size:P("normal"),color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:P("button"),loadingSize:A,loadingText:String,loadingType:String,iconPosition:P("left")});var Jn=S({name:Hn,props:Xn,emits:["click"],setup(e,{emit:t,slots:n}){const o=kn(),a=()=>n.loading?n.loading():l(Gn,{size:e.loadingSize,type:e.loadingType,class:M("loading")},null),r=()=>{if(e.loading)return a();if(n.icon)return l("div",{class:M("icon")},[n.icon()]);if(e.icon)return l(st,{name:e.icon,class:M("icon"),classPrefix:e.iconPrefix},null)},s=()=>{let g;if(e.loading?g=e.loadingText:g=n.default?n.default():e.text,g)return l("span",{class:M("text")},[g])},i=()=>{const{color:g,plain:f}=e;if(g){const p={color:f?g:"white"};return f||(p.background=g),g.includes("gradient")?p.border=0:p.borderColor=g,p}},d=g=>{e.loading?fn(g):e.disabled||(t("click",g),o())};return()=>{const{tag:g,type:f,size:p,block:B,round:v,plain:m,square:c,loading:_,disabled:b,hairline:w,nativeType:E,iconPosition:I}=e,F=[M([f,p,{plain:m,block:B,round:v,square:c,loading:_,disabled:b,hairline:w}]),{[Bn]:w}];return l(g,{type:E,class:F,style:i(),disabled:b,onClick:d},{default:()=>[l("div",{class:M("content")},[I==="left"&&r(),s(),I==="right"&&r()])]})}}});const Qn=oe(Jn);var Ee=Qn;function z(e,t,n){let o=String;return e.type?o=e.type:typeof e=="function"&&(o=e),(...a)=>({type:o,alias:t,unit:n,defaultValue:a[0],widgetType:a[1],options:a[2]})}function qn(e,t){return e.map((n,o,a)=>t(n,o,a))}const ke={label:{type:String,default:"\u6309\u94AE"}},Zn={...ke},ue={...ke,...Ee.props},Kn={label:z(ue.label,"\u6309\u94AE\u5185\u5BB9")(ke.label.default,O.INPUT),type:z(ue.type,"\u6309\u94AE\u7C7B\u578B")(ue.type.default,O.SELECT,qn(["primary","success","warning","danger","default"],e=>({label:e,value:e}))),color:z(ue.color,"\u6309\u94AE\u989C\u8272")("",O.COLOR)},Yn={width:z({type:Number},"\u5BBD\u5EA6","px")(60,O.INPUTNUMBER),height:z({type:Number},"\u9AD8\u5EA6","px")(44,O.INPUTNUMBER),positionGroup:z({type:Object},"\u4F4D\u7F6E","px")(void 0,O.CONTROLLINPUT)},ea=S({name:"Button",props:Zn,inheritAttrs:!1,preview:()=>l(Ee,{type:"primary",size:"small"},{default:()=>[Y("\u6309\u94AE")]}),setup(e,{slots:t,attrs:n}){return()=>{const{label:o,...a}=e,r={...t,default:o?()=>o:t.default};return l(Ee,$(a,n),r)}},slots:[{type:"default",alias:"\u6309\u94AE\u5185\u5BB9"},{type:"icon",alias:"\u81EA\u5B9A\u4E49\u56FE\u6807"},{type:"loading",alias:"\u81EA\u5B9A\u4E49\u52A0\u8F7D\u56FE\u6807"}],events:[{type:"click",alias:"\u70B9\u51FB\u4E8B\u4EF6"}],editorProps:Kn,editorStyles:Yn});var ut="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAiCAYAAAAUAipQAAAEfUlEQVRYhe2Y20sbSxyAv9ToxhhthNYkSoy63iDaBOuFVo2gIBgQnwSh9Enwjyr0qT4IpSBoFEqb+GKkWilRK1IjGlGMMcELalgl2T6Ie7omOee0cDxE8r3NZec33+z8ZofVfP36VeYB8uj/nsB/RU4s28iJZRs5sWwjJ5ZtPFgx7a+Fg4MDpqamVB3y8vIYHR0FYGJigoaGBrRaLc3NzQAsLy9TUlJCXV2d6rnx8XFGRkbQav8KEYvF+PDhw7+a2MjICCUlJQDMzc1RUVGhirGxsUEkEsHlcv2zGEBbWxtOp5PZ2Vncbjcej0fV3tjYiM/nQxRF9Ho99fX1TE5OUlxcjNlsVvrJsoxGo0kJWFVVRX9/P7Is8/HjR5xOJyaTSdXnbsw/IUXs9PSU1dVVAObn51VtyWSSwsJC3G63UldcXExPTw/BYFAllkwm04oBXF9f4/P5CIVChEIhVdvw8PCf2/xCitjjx49pbm5mb2+Pzs5OPB4PMzMz7O3tAfDmzRsA7HY7nZ2dAFRWVlJZWamMIcsykiQRj8cpKipKCbqwsABAdXU1L168QBAEvn37hl6vp7S0NO1EfT4fPp8vpX5jYwMAi8XC4OBgZrGlpSWWlpYUiV9z7O3bt7x+/ZqCggIA3r9/z/HxMaIo0tfXp4xxeXkJQDQaTSvmcrmIx+Ps7Ozg9XoRBIH8/HzMZjPxeDytWG9vL7W1tWnb0qESs1gsjI2NIcuykmO3XFxckEgkiEajlJeXAzfbZn9/X1m1W2KxGAaDgcPDQ2w2m6rtduyioiLKyspwu91otVrC4TA/fvwgEAjw6JH6sE4mkyl1vyW2tbXF58+flfLtthsbGyMcDmMymdjd3VXEMhEMBnn+/DmBQIC2tjZVrmk0GgYGBgDwer3Mz89jNBoxm83KCXf38JAkiU+fPqWN9erVq7S7QiUmiiJWqxVJkvB6vXR0dHB1dYUkSWxtbdHa2orf76e9vT1lBQ8ODvj+/Tvt7e2Ew2G6u7uJRCJsb29TU1OTdlK9vb1cX18TjUa5uLjIuFAnJycMDw+n5N+7d+8yPqMS8/v9bG5uotPp0Ol0BAIBdDodiUSCs7MzKioqsFqtrK6u4nA4gJsturu7y9HRES6Xi7m5ORwOB/n5+TidTqamprBYLBQWFqoCT0xMYDQaMZlMmEymlC17SzgcJpFIYDQaM0qkQ7XsoijS1NTE06dPaWlpoby8HEmSWFxc5OXLlwA4nU7W1taIRCIACIJATU0NQ0NDrKysoNfrsdvtwM2nwOFwMDs7y/n5uSrw0NAQDocDQRAIBoNMT0/z5csXVZ9EIoHf7+fZs2cZPx2ZUL2xzc1NmpqaWFlZ4cmTJ1itVgwGA8fHx0pe6XQ6urq62N7epqysDJvNhs1mIxQKIQgCPT09qgB2u52rqyvW19cRRZGdnR0ld+9ydHREIBBQyqenpxgMBuWW8zto7vMvVSwWY3l5mf7+/r/t5/F46O7uVq5Uf8K9it0nD/Z2nxPLNnJi2UZOLNvIiWUbD1bsJ6O7p3GKJuQcAAAAAElFTkSuQmCC";const[ta,U]=H("image"),na={src:String,alt:String,fit:String,position:String,round:Boolean,width:A,height:A,radius:A,lazyLoad:Boolean,iconSize:A,showError:Se,errorIcon:P("photo-fail"),iconPrefix:String,showLoading:Se,loadingIcon:P("photo")};var aa=S({name:ta,props:na,emits:["load","error"],setup(e,{emit:t,slots:n}){const o=C(!1),a=C(!0),r=C(),{$Lazyload:s}=We().proxy,i=h(()=>{const c={width:N(e.width),height:N(e.height)};return G(e.radius)&&(c.overflow="hidden",c.borderRadius=N(e.radius)),c});we(()=>e.src,()=>{o.value=!1,a.value=!0});const d=c=>{a.value=!1,t("load",c)},g=c=>{o.value=!0,a.value=!1,t("error",c)},f=(c,_,b)=>b?b():l(st,{name:c,size:e.iconSize,class:_,classPrefix:e.iconPrefix},null),p=()=>{if(a.value&&e.showLoading)return l("div",{class:U("loading")},[f(e.loadingIcon,U("loading-icon"),n.loading)]);if(o.value&&e.showError)return l("div",{class:U("error")},[f(e.errorIcon,U("error-icon"),n.error)])},B=()=>{if(o.value||!e.src)return;const c={alt:e.alt,class:U("img"),style:{objectFit:e.fit,objectPosition:e.position}};return e.lazyLoad?xe(l("img",$({ref:r},c),null),[[It("lazy"),e.src]]):l("img",$({src:e.src,onLoad:d,onError:g},c),null)},v=({el:c})=>{const _=()=>{c===r.value&&a.value&&d()};r.value?_():Ge(_)},m=({el:c})=>{c===r.value&&!o.value&&g()};return s&&tt&&(s.$on("loaded",v),s.$on("error",m),Ot(()=>{s.$off("loaded",v),s.$off("error",m)})),()=>{var c;return l("div",{class:U({round:e.round}),style:i.value},[B(),p(),(c=n.default)==null?void 0:c.call(n)])}}});const oa=oe(aa);var Le=oa;const ra={src:{type:String,default:ut}},la={...ra},sa=S({name:"Image",props:la,inheritAttrs:!1,preview:()=>l(Le,{src:ut},null),setup(e,{slots:t,attrs:n}){return()=>{const{...o}=e,a={...t};return l(Le,$(o,n),a)}},slots:[{type:"default",alias:"\u56FE\u7247\u4E0B\u65B9\u5185\u5BB9"},{type:"loading",alias:"\u52A0\u8F7D\u4E2D\u7684\u63D0\u793A\u5185\u5BB9"},{type:"error",alias:"\u52A0\u8F7D\u5931\u8D25\u7684\u63D0\u793A\u5185\u5BB9"}],events:[{type:"click",alias:"\u70B9\u51FB\u4E8B\u4EF6"}]});var ze={VButton:ea,VImage:sa};const ua=Object.keys(ze).map(e=>ze[e]);let ia=e=>crypto.getRandomValues(new Uint8Array(e)),ca=(e,t,n)=>{let o=(2<<Math.log(e.length-1)/Math.LN2)-1,a=-~(1.6*o*t/e.length);return(r=t)=>{let s="";for(;;){let i=n(a),d=a;for(;d--;)if(s+=e[i[d]&o]||"",s.length===r)return s}}},da=(e,t=21)=>ca(e,t,ia);const it=e=>e!=null&&e.length?e:[],de=da("1234567890abcdef",10),K=()=>{},ct=(e,t)=>{let n=t;if(Array.isArray(n)&&(n=n[0]),n===Number){if(isNaN(Number(e)))return}else if(n===String){if(String(e)!==e)return}else if(n===Boolean&&isNaN(Number(e)))return;return n(e)},Be="ComponentGroup";var L=(e=>(e.COMPONENT="component",e.PAGESETTING="page_setting",e))(L||{});const dt={component:"\u57FA\u7840\u7EC4\u4EF6",page_setting:"\u9875\u9762\u8BBE\u7F6E"},fa={Button:"\u6309\u94AE",Image:"\u56FE\u7247"},va="_material-panel_ogvw2_1",pa="_item_ogvw2_1",ga="_item-header_ogvw2_4",ma="_component_ogvw2_8",ya="_component-item_ogvw2_12",ha="_dragging_ogvw2_29",_a="_content_ogvw2_49",ba="_text-tips_ogvw2_53";var T={materialPanel:va,item:pa,itemHeader:ga,component:ma,componentItem:ya,dragging:ha,content:_a,textTips:ba};function Me(e){const t=typeof e=="function"?e():e,n=C(t);function o(a){n.value=a}return[n,o]}const De=Kt("visualEditorConfig",()=>{const e=ne({pageConfig:{style:{backgroundColor:z({},"\u80CC\u666F\u989C\u8272")("#fff",O.COLOR)}},page:{"/":{blocks:[],path:"/",title:"\u9996\u9875"}}}),t=C("/"),[n,o]=Me("default"),[a,r]=Me(),s=h(()=>{var p;return(p=e==null?void 0:e.page)==null?void 0:p[t.value]}),i=h(()=>{var p;return(p=s.value)==null?void 0:p.blocks}),d=h(()=>e.pageConfig);function g(p,B){var c,_;const v=(c=i.value)==null?void 0:c.length;let m=v;if(B===void 0&&(m=v),i.value&&B===void 0&&m!==void 0&&(i.value[m]||(i.value[m]={coms:pe(it()),key:de()}),i.value[m].coms.value.push(p)),i.value&&B){const b=i.value.find(w=>w.key===B);b&&((_=b.coms)==null||_.value.push(p))}}function f(p){s.value&&(s.value.blocks=p)}return{visualEditorData:e,visualPageConfig:d,curPageInfo:s,selectPath:t,curPageBlocks:i,editorDragType:n,selectedComInfo:a,addCurPageComponentByBlock:g,setCurPageBlock:f,setEditorDragType:o,setSelectedComInfo:r}});var Sa=Yt();function Ca(){const e={[L.COMPONENT]:ua,[L.PAGESETTING]:[]},t=Object.keys(e).map(n=>({type:n,alias:dt[n],data:e[n]}));return{panelData:e,panelArrData:t}}const Ea=e=>()=>l("div",{class:T.itemHeader},[e]);var Ba=S({name:"MaterialsPanel",setup(){const{panelData:e}=Ca(),t=De(),n=h(()=>t.editorDragType==="nested"),o=[L.COMPONENT],a=C(e[L.COMPONENT]),r=C(!1),s=h(()=>({animation:200,disabled:!1}));function i(){r.value=!0}function d(){r.value=!1}function g(f){if(n.value){const B=Object.assign(Re.exports.cloneDeep(f),{key:de()});return console.log("clone",B),B}const p={key:de(),coms:pe(it([Object.assign(Re.exports.cloneDeep(f),{key:de()})]))};return console.log("clone",p),p}return()=>l(Lt,{class:T.materialPanel,defaultExpandedNames:o,displayDirective:"show",arrowPlacement:"left"},{default:()=>[l(zt,{class:T.item,name:L.COMPONENT},{default:()=>[l(be,$({class:T.component,modelValue:a.value,"onUpdate:modelValue":f=>a.value=f,itemKey:"name",group:{name:Be,pull:"clone",put:!1},clone:g,onStart:i,onEnd:d},s.value),{item:({element:f})=>l(He,{tag:"div",name:"flip-list",class:[T.componentItem,r.value?T.dragging:""]},{default:()=>[l(f.preview,{class:T.content,key:f.name},null),l("div",{class:T.textTips,key:f.name},[fa[f.name]])]})})],header:Ea(dt[L.COMPONENT])})]})}}),wa=S({name:"SiderbarBase",setup(){return()=>l("div",null,[l(Ia,null,null),l(Ba,{style:{marginTop:"10px"}},null)])}});var Oe=(e,t)=>{const n=e.__vccOpts||e;for(const[o,a]of t)n[o]=a;return n};const xa=e=>(Qe("data-v-2f7fcbdb"),e=e(),qe(),e),ka=xa(()=>te("div",{class:"logo"},null,-1)),Da={name:"LogoWrapper"},Oa=S({...Da,props:{slogan:{default:""}},setup(e){const n=["logo-wrapper",{"no-slogan":!e.slogan}];return(o,a)=>(ae(),ge("div",{class:Je(n)},[ka,xe(te("div",{class:"slogan"},Pt(e.slogan),513),[[Xe,e.slogan]])]))}});var Ia=Oe(Oa,[["__scopeId","data-v-2f7fcbdb"]]);const Pa=S({__name:"MaskLayer",props:{cursor:{default:"default"},unlock:{type:Boolean,default:!1}},setup(e){return Ze(t=>({"584ef52a":e.cursor})),(t,n)=>(ae(),ge("div",{class:Je(["mask-layer",{"mask-layer--unlock":e.unlock}])},[Nt(t.$slots,"default",{},void 0,!0)],2))}});var Na=Oe(Pa,[["__scopeId","data-v-3c3d21fe"]]);const Aa={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 48 48"},Ra=te("g",{fill:"none"},[te("path",{d:"M34.985 22.5l-7.061 7.061a1.25 1.25 0 0 0 1.666 1.86l.102-.092l9.192-9.192a1.25 1.25 0 0 0 .091-1.666l-.091-.102l-9.192-9.192a1.25 1.25 0 0 0-1.86 1.666l.092.101L34.98 20H26c-3.254 0-6.28.721-8.904 2.1l-.41.223a16.513 16.513 0 0 0-6.364 6.363C8.798 31.403 8 34.576 8 38a1.25 1.25 0 1 0 2.5 0c0-3.005.692-5.756 2.003-8.092a14.012 14.012 0 0 1 5.405-5.406c2.207-1.237 4.783-1.924 7.594-1.996L26 22.5h8.985z",fill:"currentColor"})],-1),$a=[Ra];var Va=S({name:"ArrowForward48Regular",render:function(t,n){return ae(),ge("svg",Aa,$a)}});const Ta=e=>(Qe("data-v-d23ad4c0"),e=e(),qe(),e),Fa={class:"guide-drag_box"},ja=Ta(()=>te("div",{class:"guide-drag_tip"},"\u5C06\u7EC4\u4EF6\u62D6\u62FD\u5230\u8FD9\u91CC\u54E6",-1)),La=S({__name:"GuideDrag",props:{position:{default:"relative"},iconSize:{default:40}},setup(e){return Ze(t=>({"28bcfdf8":e.position})),(t,n)=>{const o=Mt;return ae(),ge("div",Fa,[ja,l(o,{size:e.iconSize,class:"guide-icon"},{default:At(()=>[l(Ke(Va),{class:"guide_arrow"})]),_:1},8,["size"])])}}});var za=Oe(La,[["__scopeId","data-v-d23ad4c0"]]);const Ma="_com-render-box_1np6s_1",Ua="_com-render-box--disabled_1np6s_10",Wa="_com-render-box--selected_1np6s_13",Ga="_com_operation-area_1np6s_19";var fe={comRenderBox:Ma,comRenderBoxDisabled:Ua,comRenderBoxSelected:Wa,comOperationArea:Ga};const Ha=S({emits:["insert"],setup(e,{emit:t}){function n(){t("insert",r.value.type),r.value.type==="insert"?r.value=a:r.value=o}const o={text:"\u63D2\u5165\u7EC4\u4EF6",type:"insert"},a={text:"\u5B8C\u6210",type:"finish"},r=C(o);return()=>l("div",{class:fe.comOperationArea},[l(ce,{type:"info",size:"tiny",onClick:n},{default:()=>[r.value.text]})])}}),Xa=S({name:"BlockRender",props:{disabled:{type:Boolean,default:!1},selected:{type:Boolean,default:!1},onInsert:{type:Function,default:K}},emits:["insert"],setup(e,{slots:t}){const n=C(!0);function o(a){a==="insert"?n.value=!1:n.value=!0,e.onInsert(a)}return()=>{var a;return l("div",{class:[fe.comRenderBox,{[`${fe.comRenderBoxDisabled}`]:e.disabled,[`${fe.comRenderBoxSelected}`]:e.selected}],style:{cursor:n.value?"move":"default"}},[n.value?l(Na,{cursor:"move"},{default:()=>{var r;return[(r=t.default)==null?void 0:r.call(t)]}}):(a=t==null?void 0:t.default)==null?void 0:a.call(t),xe(l(Ha,{onInsert:o},null),[[Xe,e.selected]])])}}});function Ja(e){const t=C("");function n(o){t.value=o}return we(e,(o,a)=>{if(o.length!==a.length&&o.length){const r=o.length;t.value=o[r-1].key}}),{selectedBlockKey:t,setSelectedKey:n}}const Qa="_visual-editor_egwdj_1",qa="_visual-blocks_egwdj_1",Za="_place-blocks_egwdj_4",Ka="_ghost-com_egwdj_10",Ya="_visual-drag-coms_egwdj_16",eo="_com-wrapper_egwdj_19",to="_com-wrapper--selected_egwdj_32";var Q={visualEditor:Qa,visualBlocks:qa,placeBlocks:Za,ghostCom:Ka,visualDragComs:Ya,comWrapper:eo,comWrapperSelected:to};function no(e){const t=C(new Set),n=h(()=>Array.from(t.value).find(r=>r==null?void 0:r.selected)),o=h(()=>{if(n.value){const r=n.value.$el.getBoundingClientRect();return{x:r.x,y:r.y}}return null}),a=h(()=>n.value&&e.value);return{selectedBlockRefClientRect:o,showGuidTips:a,blockRefs:t}}function ao(e,t,n,o,a){const r=C(0),s=C(0),i=C(!1);function d(f,p){p&&(f.preventDefault(),i.value=!1,Ge().then(()=>{i.value=!0,r.value=f.clientX,s.value=f.clientY}))}function g(f){var p,B,v;typeof f=="string"&&(e.value||(t.value=t.value.filter(m=>m.key!==n.value),console.log(t.value)),e.value&&a.value&&a.value.coms&&(a.value.coms=pe(((v=(B=(p=a.value)==null?void 0:p.coms)==null?void 0:B.value)==null?void 0:v.filter(m=>m.key!==o.value))||[]),console.log("after delete com: ",a.value.coms))),i.value=!1}return{xRef:r,yRef:s,showDropdownRef:i,handleContextMenu:d,handleSelectContextOption:g}}function oo(e,t,n){const o=e.unit;return o?t===on?Object.keys(n).reduce((a,r)=>(a[r]=`${n[r]}${o}`,a),{}):`${n}${o}`:n}function ro(e){return Object.keys(e).forEach(t=>{typeof e[t]=="object"&&(Object.keys(e[t]).forEach(n=>{e[n]=e[t][n]}),delete e[t])}),e}const lo={position:"relative"},ft=["top","bottom","left","right","cursor"];function so(e){const t={};return ft.forEach(n=>{t[n]=e[n]}),t}function uo(e){const t={};return Object.keys(e).forEach(n=>{ft.includes(n)||(t[n]=e[n])}),t}function io(e,t){let n=K,o=K,a=K,r=K;const s=C(ne({})),i=2,d=C({x:0}),g=h(()=>{var m,c,_;const v=(m=e.value)==null?void 0:m.$el;return d.value.x+((_=(c=v==null?void 0:v.getBoundingClientRect)==null?void 0:c.call(v))==null?void 0:_.width)>>0||0}),f=C(!1);function p(v,m){return v>=m[0]&&v<=m[1]}function B(v,m){const[c,_]=v;for(let b=0,w=m.length;b<=w;b++){const E=m[b];if(E!=null&&E.length&&p(c,E[0])&&p(_,E[1]))return!0}return!1}return ve(()=>{var m;const v=t?t.value:(m=e.value)==null?void 0:m.$el;if(s.value={},d.value={x:0},console.log("watch",v),v){const c=function(){var X;const _=t?t.value:(X=e.value)==null?void 0:X.$el,{x:b,width:w,y:E,height:I}=_.getBoundingClientRect(),F=[[b,b+w],[E-i,E+i]],me=[[F[0][1]-i,F[0][1]+i],[E,E+I]];return{topSide:F,rightSide:me}};n=_=>{const{x:b,y:w}=_,E=c().topSide,I=c().rightSide;B([b,w],[E,I])&&(f.value=!0,v.setAttribute("draggable",!1))},o=_=>{const{x:b,y:w}=_,E=c().topSide,I=c().rightSide;B([b,w],[E,I])?s.value.cursor="e-resize":s.value.cursor="move"},a=()=>{f.value&&(f.value=!1,v.setAttribute("draggable",!0))},r=_=>{var w;const b=(w=e.value)==null?void 0:w.$el;if(b){const E=b.getBoundingClientRect(),I=E.x+E.width;f.value&&(d.value.x=_.x-I),s.value.width=g.value}},v.addEventListener("mousedown",n),v.addEventListener("mousemove",o),document.addEventListener("mouseup",a),document.addEventListener("mousemove",r)}}),Rt(()=>{var m;console.log("dispose",e.value);const v=(m=e.value)==null?void 0:m.$el;v.removeEventListener("mousedown",n),v.removeEventListener("mousemove",o),document.removeEventListener("mouseup",a),document.removeEventListener("mouseMove",r)}),{dragStyle:s,moveAfterWidth:g,isSetSizeDrag:f,moveOffset:d}}const co=[{label:"\u5220\u9664",key:"delete"}];var fo=S({name:"VisualEditor",setup(){const e=De(),{editorDragType:t,selectedComInfo:n,curPageBlocks:o,visualPageConfig:a}=Ye(e),r=C(!1),s=C(new Map),i=pe([]),d=h(()=>{var u;return(u=n.value)==null?void 0:u.key}),g=h(()=>s.value.get(d.value)),f=h(()=>{var u,y;return(y=(u=s.value.get(d.value))==null?void 0:u.$el)==null?void 0:y.parentNode}),p=h(()=>{var u;return(u=o.value)==null?void 0:u.find(y=>y.key===_.value)});function B(u,y){return Object.keys(u).reduce((x,D)=>{const R=u[D].defaultValue,k=u[D].type,V=ct(k(R),k);return y=="style"?x[D]=oo(u[D],D,V):x[D]=V,x},{})}const v=h(()=>{var x,D;return(((D=(x=o.value)==null?void 0:x.map(R=>R.coms))==null?void 0:D.flat())||[]).reduce((R,k)=>{var j,J;const V=((j=d.value===(k==null?void 0:k.key)?n.value:k)==null?void 0:j.editorProps)||{},le=((J=d.value===(k==null?void 0:k.key)?n.value:k)==null?void 0:J.editorStyles)||{};return R.props[k.key]=B(V),R.styles[k.key]=ro(Object.assign(B(le,"style"),lo)),R},{props:{},styles:ne({})})}),m=h(()=>{var y;const u=((y=a.value)==null?void 0:y.style)||{};return a.value?Object.keys(u).reduce((x,D)=>(x[D]=u[D].defaultValue,x),{}):{}}),c=h(()=>t.value==="nested"),{selectedBlockKey:_,setSelectedKey:b}=Ja(i),{blockRefs:w,showGuidTips:E,selectedBlockRefClientRect:I}=no(c),{xRef:F,yRef:me,handleContextMenu:X,handleSelectContextOption:vt,showDropdownRef:Ie}=ao(c,i,_,d,p),{dragStyle:pt,moveAfterWidth:gt,isSetSizeDrag:mt,moveOffset:yt}=io(g,f),Pe=h(()=>Vt({key:d,moveAfterWidth:gt,isSetSizeDrag:mt,dragStyle:pt,moveOffset:yt}));function ht(u){var k;const y=((k=n.value)==null?void 0:k.editorStyles)||{},x=v.value.styles[d.value],D=u.moveOffset,R=u.isSetSizeDrag;for(const V in u.dragStyle){const le=u.dragStyle[V],j=y[V];if(j){const J=[le,j.defaultValue];R&&(D.x>0?j.defaultValue=Math.max.apply(null,J):D.x<0&&(j.defaultValue=Math.min.apply(null,J)))}else x&&(x[V]=le)}}ve(()=>{d.value===Pe.value.key&&ht(Pe.value)}),we(i,u=>{e.setCurPageBlock(u)}),ve(()=>{c.value||e.setSelectedComInfo(void 0)});const _t=h(()=>({animation:200,disabled:c.value,ghostClass:"ghost-editor"}));function bt(u){return h(()=>({animation:200,disabled:!(u===_.value&&c.value),ghostClass:"ghost-editor"}))}function Ne(u){u==="start"?r.value=!0:r.value=!1}function St(u){c.value||b(u)}function Ct(u){b(u.draggedContext.element.key)}function Et(u){console.log(u),u==="insert"?e.setEditorDragType("nested"):e.setEditorDragType("default")}function re(u){return _.value===u}function Bt(u){return d.value===u}function wt(u){u.key!==d.value&&e.setSelectedComInfo(u)}function xt(u,y){c.value&&re(y)&&u()}return()=>l("div",{style:m.value,class:Q.visualEditor},[E.value&&l($t,{to:"body"},{default:()=>[l(za,{position:"fixed",style:{top:I.value.y+"px",left:I.value.x-80+"px"}},null)]}),l(Ut,{placement:"bottom-start",trigger:"manual",x:F.value,y:me.value,options:co,show:Ie.value,onClickoutside:()=>Ie.value=!1,onSelect:vt},null),l(be,$({modelValue:i.value,"onUpdate:modelValue":u=>i.value=u,itemKey:"key",group:Be,onStart:()=>Ne("start"),onEnd:()=>Ne("end"),move:Ct,class:[Q.visualBlocks]},_t.value),{item:({element:u})=>l(He,{tag:"div",name:"flip-list"},{default:()=>[l(Xa,{key:u.key,disabled:r.value||c.value&&!re(u.key),selected:re(u.key),onClick:()=>St(u.key),onInsert:y=>Et(y),oncontextmenu:y=>X(y,!c.value&&re(u.key)),ref:y=>{w.value.add(y)}},{default:()=>[l(be,$({class:Q.visualDragComs,modelValue:u.coms.value,"onUpdate:modelValue":y=>u.coms.value=y,itemKey:"key",group:Be},bt(u.key).value),{item:({element:y})=>l("div",{onClick:()=>xt(()=>wt(y),u.key),oncontextmenu:x=>X(x,c.value&&Bt(y.key)),class:[Q.comWrapper,{[`${Q.comWrapperSelected}`]:d.value===y.key}],style:so(Object.assign(v.value.styles[y.key]))},[l(y,$({ref:x=>{s.value.set(y.key,x)}},v.value.props[y.key]||{},{style:Object.assign(uo(Object.assign(v.value.styles[y.key])))}),null)])})]})]})})])}});const vo="_content-container_1xmu8_1",po="_visual-editor-wrapper_1xmu8_1";var Ue={contentContainer:vo,visualEditorWrapper:po},go=S({name:"ContentBase",setup(){return()=>l("div",{class:Ue.contentContainer},[l(fo,{class:Ue.visualEditorWrapper},null)])}});const mo="_position-controller-container_16g8w_1",yo="_top_16g8w_6",ho="_left_16g8w_9",_o="_right_16g8w_12",bo="_bottom_16g8w_15";var q={positionControllerContainer:mo,top:yo,left:ho,right:_o,bottom:bo},So=S({name:"PositionController",props:{positionData:{type:Object,default(){return{top:0,left:0,right:0,bottom:0}}}},emits:["update:positionData"],setup(e,{emit:t}){const n=h({get(){return e.positionData},set(a){t("update:positionData",a)}});function o(a,r){a!==null&&(n.value={...n.value,[r]:a})}return()=>l("div",{class:q.positionControllerContainer},[l(Z,{placeholder:"top px",class:q.top,value:n.value.top,onUpdateValue:a=>o(a,"top")},null),l(Z,{placeholder:"left px",class:q.left,value:n.value.left,onUpdateValue:a=>o(a,"left")},null),l(Z,{placeholder:"right px",class:q.right,value:n.value.right,onUpdateValue:a=>o(a,"right")},null),l(Z,{placeholder:"bottom px",class:q.bottom,value:n.value.bottom,onUpdateValue:a=>o(a,"bottom")},null)])}});function Co(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!Tt(e)}const Eo={data:{type:Object,default:()=>({})}};var _e=S({name:"PropForm",props:Eo,setup(e){function t(o,a){const r=e.data[a.key];switch(o){case O.INPUT:return l(Jt,{value:r.defaultValue,"onUpdate:value":s=>r.defaultValue=s},null);case O.COLOR:return l(Xt,{size:"large",modes:["hex"],showAlpha:!1,actions:["confirm"],value:r.defaultValue,"onUpdate:value":s=>r.defaultValue=s,renderLabel:()=>`\u8BF7\u9009\u62E9${a.alias}`,onConfirm:s=>{console.log(s)}},null);case O.INPUTNUMBER:return l(Z,{value:r.defaultValue,"onUpdate:value":s=>r.defaultValue=s},null);case O.CONTROLLINPUT:return l(So,{positionData:r.defaultValue,"onUpdate:positionData":s=>r.defaultValue=s},null);case O.SELECT:return l(Ht,{options:a.options,value:r.defaultValue,"onUpdate:value":s=>r.defaultValue=s,virtualScroll:!1},null);case O.SWITCH:return l(Gt,{value:r.defaultValue,"onUpdate:value":s=>r.defaultValue=s},null);default:return null}}const n=h(()=>{const o=e.data;return ne(Object.keys(o).map(a=>{const r={[a]:[{trigger:["input","blur"],validator(s,i){const d=o[a].type;if(!ct(i,d)){if(d===Number)return new Error("\u8BE5\u5B57\u6BB5\u7C7B\u578B\u662F\u6570\u5B57");if(d===String)return new Error("\u8BE5\u5B57\u6BB5\u7C7B\u578B\u662F\u5B57\u7B26\u4E32");if(d===Boolean)return new Error("\u8BE5\u5B57\u6BB5\u7C7B\u578B\u662F\u5E03\u5C14\u7C7B\u578B")}return!0}}]};return{defaultValue:o[a].defaultValue,widgetType:o[a].widgetType,options:o[a].options,alias:o[a].alias,key:a,rule:r}}))});return()=>l("div",{style:{padding:"12px"}},[n.value.map(o=>{let a;return l(Wt,{key:o.key,label:o.alias,rule:o.rule},Co(a=t(o.widgetType,o))?a:{default:()=>[a]})})])}});const Bo="_sider-right-base_1iqcq_1";var ie={siderRightBase:Bo},wo=S({name:"SiderRightBase",setup(){const e=De(),{selectedComInfo:t,visualPageConfig:n}=Ye(e),o=h(()=>{var s;return((s=t.value)==null?void 0:s.editorProps)||{}}),a=h(()=>{var s;return((s=t.value)==null?void 0:s.editorStyles)||{}}),r=h(()=>{var s;return((s=n.value)==null?void 0:s.style)||{}});return()=>l(Qt,{defaultValue:"props",justifyContent:"space-evenly",type:"line",class:ie.siderRightBase},{default:()=>[l(ye,{name:"props",tab:"\u5C5E\u6027",class:ie.tabItemWrapper},{default:()=>[l(_e,{data:o.value},null),l(_e,{data:a.value},null)]}),l(ye,{name:"event",tab:"\u4E8B\u4EF6",class:ie.tabItemWrapper},{default:()=>[Y("\u4E8B\u4EF6")]}),l(ye,{name:"pageSetting",tab:"\u9875\u9762\u8BBE\u7F6E",class:ie.tabItemWrapper},{default:()=>[l(_e,{data:r.value},null)]})]})}});const xo="_layout-container_jgfrw_1",ko="_left_jgfrw_5",Do="_middle_jgfrw_10",Oo="_ml-header_jgfrw_14",Io="_ml-content_jgfrw_19",Po="_right_jgfrw_23";var W={layoutContainer:xo,left:ko,middle:Do,mlHeader:Oo,mlContent:Io,right:Po},No=S({name:"BaseLayout",setup(){return()=>l(qt,{hasSider:!0,class:W.layoutContainer},{default:()=>[l(Ae,{bordered:!0,class:W.left},{default:()=>[l(wa,null,null)]}),l(Zt,{class:W.middle},{default:()=>[l(an,{class:W.mlHeader},null),l(go,{class:W.mlContent},null)]}),l(Ae,{class:W.right},{default:()=>[l(wo,null,null)]})]})}});const Ao=S({__name:"App",setup(e){return(t,n)=>(ae(),Ft(Ke(No)))}});jt(Ao).use(Sa).mount("#app");