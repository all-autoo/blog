var f=Object.defineProperty,y=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var d=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var r=(s,e,t)=>e in s?f(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,l=(s,e)=>{for(var t in e||(e={}))d.call(e,t)&&r(s,t,e[t]);if(a)for(var t of a(e))m.call(e,t)&&r(s,t,e[t]);return s},i=(s,e)=>y(s,w(e));import{b as g,f as j,u as b,g as u,x as v,o as x,m as _,p as C,s as R,t as S,l as o,n as h,q as k,_ as $,v as z}from"./index.062059f7.js";const E=Symbol("rowContextKey"),B=["start","center","end","space-around","space-between","space-evenly"],K=["top","middle","bottom"],N=g({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:B,default:"start"},align:{type:String,values:K,default:"top"}}),P={name:"ElRow"},q=j(i(l({},P),{props:N,setup(s){const e=s,t=b("row"),c=u(()=>e.gutter);v(E,{gutter:c});const p=u(()=>{const n={};return e.gutter&&(n.marginRight=n.marginLeft=`-${e.gutter/2}px`),n});return(n,D)=>(x(),_(k(n.tag),{class:S([o(t).b(),o(t).is(`justify-${e.justify}`,n.justify!=="start"),o(t).is(`align-${e.align}`,n.align!=="top")]),style:h(o(p))},{default:C(()=>[R(n.$slots,"default")]),_:3},8,["class","style"]))}}));var A=$(q,[["__file","/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);const L=z(A);export{L as E,E as r};
