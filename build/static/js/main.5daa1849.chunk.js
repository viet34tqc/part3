(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),u=n.n(o),c=n(14),i=n(3),l=function(e){var t=e.handleInputFilter;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{type:"text",onChange:t}))},d=function(e){var t=e.addPerson,n=e.handleInputText,a=e.newName,o=e.newPhone;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"name:"," ",r.a.createElement("input",{onChange:function(e){return n(e,"name")},value:a})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{onChange:function(e){return n(e,"phone")},value:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=function(e){var t=e.handleDelete,n=e.person;return r.a.createElement("li",null,n.name," - ",n.phone,r.a.createElement("button",{onClick:function(){return t(n.id)}},"Delete"))},m=function(e){var t=e.handleDelete,n=e.persons,a=e.filterText,o=n.filter((function(e){return e.name.toLowerCase().includes(a.toLowerCase())}));return r.a.createElement("ul",null,o.map((function(e){return r.a.createElement(f,{handleDelete:t,key:e.name,person:e})})))},h=n(2),p=n.n(h),s="http://localhost:3001/api/persons",v=function(){return p.a.get(s).then((function(e){return e.data}))},E=function(e){return p.a.post(s,e).then((function(e){return e.data}))},b=function(e,t){return p.a.put("".concat(s,"/").concat(e),t).then((function(e){return e.data}))},w=function(e){return p.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},T=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],u=Object(a.useState)(""),f=Object(i.a)(u,2),h=f[0],p=f[1],s=Object(a.useState)(""),T=Object(i.a)(s,2),O=T[0],j=T[1],g=Object(a.useState)(""),x=Object(i.a)(g,2),y=x[0],P=x[1];Object(a.useEffect)((function(){v().then((function(e){o(e)}))}),[]);var k=function(e){o([].concat(Object(c.a)(n),[e])),j(""),P("")},C=function(e){o(n.map((function(t){return t.id!==e.id?t:e})))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(l,{handleInputFilter:function(e){var t=e.target.value;p(t)}}),r.a.createElement(d,{addPerson:function(e){e.preventDefault();var t=function(){var e=n.find((function(e,t){return e.name===O}));return e||!1}();if(t){if(window.confirm("".concat(O," is already added to phonebook, replace the old number with the new one"))){var a={id:t.id,name:t.name,phone:y};return void b(t.id,a).then((function(e){return C(e)}))}}else E({name:O,phone:y}).then((function(e){k(e)}))},handleInputText:function(e,t){var n=e.target.value;"name"===t?j(n):P(n)},newName:O,newPhone:y}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:n,filterText:h,handleDelete:function(e){w(e).then((function(){var t=n.filter((function(t){return t.id!==e}));o(t)}))}}))};u.a.render(r.a.createElement(T,{notes:[{id:1,content:"HTML is easy",date:"2019-05-30T17:30:31.098Z",important:!0},{id:2,content:"Browser can execute only Javascript",date:"2019-05-30T18:39:34.091Z",important:!1},{id:3,content:"GET and POST are the most important methods of HTTP protocol",date:"2019-05-30T19:20:14.298Z",important:!0}]}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.5daa1849.chunk.js.map