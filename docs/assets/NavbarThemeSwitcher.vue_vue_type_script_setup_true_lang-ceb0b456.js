import{d as i,t as d,W as x,z as f,r as T,o as p,b as h,w as c,p as m,C,q as r,m as v,x as w}from"./index-9510cab1.js";import{V as N}from"./VTooltip-c6480feb.js";const V={class:"text-capitalize"},g=i({__name:"ThemeSwitcher",props:{themes:null},setup(s){const e=s,{theme:t}=d(),{state:a,next:o,index:l}=x(e.themes.map(n=>n.name),{initialValue:t.value}),_=()=>{t.value=o()};return f(t,n=>{a.value=n}),(n,B)=>{const u=T("IconBtn");return p(),h(u,{onClick:_},{default:c(()=>[m(C,{size:"22",icon:e.themes[r(l)].icon},null,8,["icon"]),m(N,{activator:"parent","open-delay":"1000"},{default:c(()=>[v("span",V,w(r(a)),1)]),_:1})]),_:1})}}}),y=i({__name:"NavbarThemeSwitcher",setup(s){const e=[{name:"system",icon:"mdi-laptop"},{name:"light",icon:"bx-sun"},{name:"dark",icon:"bx-moon"}];return(t,a)=>{const o=g;return p(),h(o,{themes:e})}}});export{y as _};
