/*! For license information please see 4.0e1439eb.chunk.js.LICENSE.txt */
(this.webpackJsonptwitter=this.webpackJsonptwitter||[]).push([[4],{117:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,a=!1,c=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done)&&(r.push(o.value),!e||r.length!==e);n=!0);}catch(s){a=!0,c=s}finally{try{n||null==i.return||i.return()}finally{if(a)throw c}}return r}}(t,e)||function(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(e,"a",(function(){return a}))},120:function(t,e,r){},122:function(t,e,r){(function(t,n){var a;!function(c){var o=e,i=(t&&t.exports,"object"==typeof n&&n);i.global!==i&&i.window;var s=function(t){this.message=t};(s.prototype=new Error).name="InvalidCharacterError";var u=function(t){throw new s(t)},l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h=/[\t\n\f\r ]/g,d={encode:function(t){t=String(t),/[^\0-\xFF]/.test(t)&&u("The string to be encoded contains characters outside of the Latin1 range.");for(var e,r,n,a,c=t.length%3,o="",i=-1,s=t.length-c;++i<s;)e=t.charCodeAt(i)<<16,r=t.charCodeAt(++i)<<8,n=t.charCodeAt(++i),o+=l.charAt((a=e+r+n)>>18&63)+l.charAt(a>>12&63)+l.charAt(a>>6&63)+l.charAt(63&a);return 2==c?(e=t.charCodeAt(i)<<8,r=t.charCodeAt(++i),o+=l.charAt((a=e+r)>>10)+l.charAt(a>>4&63)+l.charAt(a<<2&63)+"="):1==c&&(a=t.charCodeAt(i),o+=l.charAt(a>>2)+l.charAt(a<<4&63)+"=="),o},decode:function(t){var e=(t=String(t).replace(h,"")).length;e%4==0&&(e=(t=t.replace(/==?$/,"")).length),(e%4==1||/[^+a-zA-Z0-9/]/.test(t))&&u("Invalid character: the string to be decoded is not correctly encoded.");for(var r,n,a=0,c="",o=-1;++o<e;)n=l.indexOf(t.charAt(o)),r=a%4?64*r+n:n,a++%4&&(c+=String.fromCharCode(255&r>>(-2*a&6)));return c},version:"1.0.0"};void 0===(a=function(){return d}.call(e,r,e,t))||(t.exports=a)}()}).call(this,r(123)(t),r(40))},123:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},131:function(t,e,r){"use strict";r.r(e);var n=r(117),a=r(1),c=r(14),o=r(6),i=(r(120),r(122)),s=r(24),u=r(25),l=r(28),h=r(16),d=r.n(h),f=r(2),p=void 0,b=new s.a;e.default=Object(u.b)((function(t){return{users:t.users.payload.data}}),(function(t){return{dispatch_authedUser:function(e){return t(Object(l.a)(e))}}}))(Object(o.g)((function(t){var e=Object(a.useState)("Guest"),r=Object(n.a)(e,2),o=r[0],s=r[1],u=Object(a.useState)(""),h=Object(n.a)(u,2),j=h[0],m=h[1],g=Object(a.useState)(!1),v=Object(n.a)(g,2),y=v[0],O=v[1],x=function(e){var r=e.split("/")[2];r&&d.a.get("".concat("https://wouldyouratherapplication.herokuapp.com","/polls/fetch/").concat(r.trim())).then((function(r){t.history.push(e,{question:r.data,users:t.users})})).catch(t.history.push("/page-not-found-return-home",!0))};return Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("div",{className:"container",children:Object(f.jsx)("div",{className:"d-flex justify-content-center h-100",children:Object(f.jsxs)("div",{className:"card",children:[Object(f.jsx)("div",{className:"card-header",children:Object(f.jsx)("h3",{children:t.location.state?t.location.state.desc:"sign in"})}),Object(f.jsx)("div",{className:"card-body",children:Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault();var r=Object(i.encode)(o+":"+j);Object(l.c)(r).then((function(e){if(200===parseInt(e.status)){if(!b.get("authedUser")){var r=new Date;r.setTime(r.getTime()+36e5),b.set("authedUser",e.name,{path:"/"})}t.dispatch_authedUser(e.name),alert(e.message);var n=t.history.location.state.prevPath,a=t.history.location.state.questionPath,c=t.history.location.state.directPath;"REPLACE"===t.history.action&&n?t.history.push(n,!0):"REPLACE"===t.history.action&&a?(console.log(a),x(a)):"REPLACE"===t.history.action&&c?x(c):t.history.push("/",!0)}else 401===parseInt(e.status)&&alert(e.message)})).catch((function(t){console.log(t)}))}.bind(p),children:[Object(f.jsx)("div",{className:"input-group form-group",children:Object(f.jsx)("input",{onChange:function(t){s(t.target.value)}.bind(p),type:"text",className:"form-control",placeholder:"username"})}),Object(f.jsx)("div",{className:"input-group form-group",children:Object(f.jsx)("input",{onChange:function(t){m(t.target.value)}.bind(p),type:"password",className:"form-control",placeholder:"password"})}),Object(f.jsxs)("div",{className:"row align-items-center remember",children:[Object(f.jsx)("input",{onChange:function(t){O(t.target.checked),y&&console.log("remember")},type:"checkbox"}),"Remember Me"]}),Object(f.jsx)("div",{className:"form-group",children:Object(f.jsx)("input",{type:"submit",value:"Login",className:"btn float-right login_btn"})})]})}),Object(f.jsx)("div",{className:"card-footer",children:Object(f.jsxs)("div",{className:"d-flex justify-content-center links",children:["Don't have an account?",Object(f.jsx)(c.b,{to:{pathname:"/users/signup",state:{desc:"sign up"}},children:"Sign Up"})]})})]})})})})})))}}]);
//# sourceMappingURL=4.0e1439eb.chunk.js.map