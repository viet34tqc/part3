(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},20:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(13),c=n.n(o),u=(n(20),n(14)),i=n(2),l=function(t){var e=t.toggleImportance,n=t.note,r=n.important?"make not important":"make important";return a.a.createElement("li",null,n.content,a.a.createElement("button",{onClick:e},r))},f=function(t){var e=t.message;return null===e?null:a.a.createElement("div",{className:"error"},e)},m=function(){return a.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},a.a.createElement("br",null),a.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2019"))},p=n(3),s=n.n(p),b=function(){return s.a.get("/notes").then((function(t){return t.data}))},O=function(t){return s.a.post("/notes",t).then((function(t){return t.data}))},d=function(t,e){return s.a.put("".concat("/notes","/").concat(t),e).then((function(t){return t.data}))};function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var E=function(){var t=Object(r.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],c=Object(r.useState)(""),p=Object(i.a)(c,2),s=p[0],E=p[1],g=Object(r.useState)(!0),h=Object(i.a)(g,2),j=h[0],y=h[1],S=Object(r.useState)(""),w=Object(i.a)(S,2),k=w[0],P=w[1];Object(r.useEffect)((function(){b().then((function(t){o(t)}))}),[]);var D=j?n:n.filter((function(t){return t.important})),C=function(t){var e=n.find((function(e){return e.id===t})),r=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(n,!0).forEach((function(e){Object(u.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e,{important:!e.important});d(t,r).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(r){P("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){P(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))};return a.a.createElement("div",null,a.a.createElement("h1",null,"Notes"),k?a.a.createElement(f,{message:k}):"",a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return y(!j)}},"show ",j?"important":"all")),a.a.createElement("ul",null,D.map((function(t){return a.a.createElement(l,{toggleImportance:function(){return C(t.id)},key:t.id,note:t})}))),a.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:(new Date).toISOString(),important:Math.random()>.5,id:n.length+1};O(e).then((function(t){o(n.concat(t)),E("")}))}},a.a.createElement("input",{value:s,onChange:function(t){E(t.target.value)}}),a.a.createElement("button",{type:"submit"},"save")),a.a.createElement(m,null))};c.a.render(a.a.createElement(E,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.af600936.chunk.js.map