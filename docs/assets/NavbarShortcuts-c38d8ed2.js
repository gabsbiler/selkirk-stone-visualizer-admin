import{d as _,j as x,r as h,o,b as r,w as e,p as t,C as n,H as g,q as u,P as V,c as C,F as v,a as A,s as S,m,x as d}from"./index-9510cab1.js";import{V as I}from"./VMenu-6969fae2.js";import{V as k,a as w,b as B}from"./VCard-b6045d41.js";import{V as y}from"./VDivider-9e04f256.js";import{V as z,a as D}from"./VRow-03043ba9.js";import{V as N}from"./VAvatar-afd8700b.js";import"./forwardRefs-a29b5f65.js";import"./VOverlay-c50331c2.js";import"./lazy-968f07e2.js";import"./easing-9f15041e.js";import"./transition-82bf665e.js";import"./VImg-ca4c240b.js";const F={class:"text-base font-weight-semibold mt-2 mb-0"},M={class:"text-sm"},P=_({__name:"Shortcuts",props:{togglerIcon:{default:"bx-customize"},shortcuts:null},setup(l){const s=l,c=x();return(b,i)=>{const p=h("IconBtn");return o(),r(p,null,{default:e(()=>[t(n,{size:"22",icon:s.togglerIcon},null,8,["icon"]),t(I,{activator:"parent",offset:"14px",location:"bottom end"},{default:e(()=>[t(k,{width:"340","max-height":"560",class:"d-flex flex-column"},{default:e(()=>[t(w,{class:"py-4"},{append:e(()=>[t(p,null,{default:e(()=>[t(n,{icon:"bx-customize"})]),_:1})]),default:e(()=>[t(B,null,{default:e(()=>[g("Shortcuts")]),_:1})]),_:1}),t(y),t(u(V),{options:{wheelPropagation:!1}},{default:e(()=>[t(z,{class:"ma-0 mt-n1"},{default:e(()=>[(o(!0),C(v,null,A(s.shortcuts,(a,f)=>(o(),r(D,{key:a.title,cols:"6",class:S(["text-center border-t cursor-pointer pa-4",(f+1)%2?"border-e":""]),onClick:$=>u(c).push(a.to)},{default:e(()=>[t(N,{variant:"tonal",size:"48"},{default:e(()=>[t(n,{icon:a.icon},null,8,["icon"])]),_:2},1024),m("h6",F,d(a.title),1),m("span",M,d(a.subtitle),1)]),_:2},1032,["class","onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}}),O=_({__name:"NavbarShortcuts",setup(l){const s=[{icon:"bx-calendar",title:"Calendar",subtitle:"Appointments",to:{name:"apps-calendar"}},{icon:"bx-file",title:"Invoice App",subtitle:"Manage Accounts",to:{name:"apps-invoice-list"}},{icon:"bx-user",title:"Users",subtitle:"Manage Users",to:{name:"apps-user-list"}},{icon:"bx-grid-alt",title:"Dashboard",subtitle:"Dashboard Analytics",to:{name:"dashboards-analytics"}},{icon:"bx-cog",title:"Settings",subtitle:"Account Settings",to:{name:"pages-account-settings-tab",params:{tab:"account"}}},{icon:"bx-help-circle",title:"Help Center",subtitle:"FAQs & Articles",to:{name:"pages-help-center"}}];return(c,b)=>{const i=P;return o(),r(i,{shortcuts:s})}}});export{O as default};
