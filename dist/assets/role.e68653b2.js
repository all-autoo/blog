import{f as V,r as n,ae as y,g as R,ao as L,o as d,m as f,p as t,P as u,k as x,ap as A,a3 as U,aN as w,an as c,cI as N,bm as $,bv as q,bw as K,U as S}from"./index.a7d776d7.js";import{E as h}from"./overlay.cbad9685.js";/* empty css               */import{E as H,a as M}from"./form-item.2e6d27d6.js";import{u as O}from"./role.37267f67.js";import"./refs.24712170.js";const P=c("\u53D6\u6D88"),T=c("\u786E\u5B9A"),Y=V({__name:"role",emits:["refreshDataList"],setup(j,{expose:_,emit:v}){const s=n(!1),m=n([]),r=n(),a=y({userId:"",roleIds:[]}),E=R(()=>{var o;return(o=L.userStore)==null?void 0:o.user.userId}),I=o=>{s.value=!0,a.userId=o,r.value&&r.value.resetFields(),b()},b=()=>O({queryUserId:E.value}).then(o=>{m.value=o.data.userRoles}),F=n({roleIds:[{required:!0,message:"\u5FC5\u586B\u9879\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]}),i=()=>{r.value.validate(o=>{if(!o)return!1;N(a).then(()=>{$.success({message:"\u64CD\u4F5C\u6210\u529F",duration:500,onClose:()=>{s.value=!1,v("refreshDataList")}})})})};return _({init:I}),(o,e)=>{const D=q,g=K,k=H,B=M,p=S,C=h;return d(),f(C,{modelValue:s.value,"onUpdate:modelValue":e[4]||(e[4]=l=>s.value=l),title:"\u8BBE\u7F6E\u7528\u6237\u89D2\u8272","close-on-click-modal":!1},{footer:t(()=>[u(p,{onClick:e[2]||(e[2]=l=>s.value=!1)},{default:t(()=>[P]),_:1}),u(p,{type:"primary",onClick:e[3]||(e[3]=l=>i())},{default:t(()=>[T]),_:1})]),default:t(()=>[u(B,{ref_key:"dataFormRef",ref:r,model:a,rules:F.value,"label-width":"120px",onKeyup:e[1]||(e[1]=w(l=>i(),["enter"]))},{default:t(()=>[u(k,{label:"\u89D2\u8272",prop:"roleIds"},{default:t(()=>[u(g,{modelValue:a.roleIds,"onUpdate:modelValue":e[0]||(e[0]=l=>a.roleIds=l),placeholder:"\u8BF7\u9009\u62E9\u89D2\u8272",multiple:"",clearable:""},{default:t(()=>[(d(!0),x(U,null,A(m.value,l=>(d(),f(D,{key:l.roleId,label:l.roleName,value:l.roleId},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])}}});export{Y as default};