(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{738:function(t,e,r){"use strict";r.r(e);var o={props:["error"]},n=r(31),component=Object(n.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",{staticClass:"text-danger"},[this._v(this._s(this.error))])])}),[],!1,null,null,null);e.default=component.exports},754:function(t,e,r){"use strict";r.r(e);r(83);var o=r(28),n={head:function(){return{title:"Forget password"}},data:function(){return{errors:{},loading:!1,message:null}},methods:{resetPassword:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var form,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return form=new FormData(event.target),e.prev=1,t.loading=!0,e.next=5,axios.post("/forgetpassword",form);case 5:r=e.sent,t.loading=!1,t.message=r.data.message,t.errors={},e.next=16;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),t.loading=!1,e.t0.response?422==e.t0.response.status?(t.$notify({group:"foo",text:e.t0.response.data.message,type:"error"}),t.errors=e.t0.response.data.errors):400==e.t0.response.status?(t.errors={},t.error=!0,t.$notify({group:"foo",text:e.t0.response.data.message,type:"error"})):(t.errors={},t.$notify({group:"foo",text:e.t0.response.statusText,type:"error"})):t.$notify({group:"foo",text:"No internet access",type:"error"});case 16:case"end":return e.stop()}}),e,null,[[1,11]])})))()}}},l=r(31),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bg-gradient-primary h-100 w-100",staticStyle:{position:"fixed",overflow:"scroll"}},[r("div",{staticClass:"container"},[r("div",{staticClass:"row justify-content-center"},[r("div",{staticClass:"col-md-6 col-12 col-sm-10"},[r("div",{staticClass:"card mt-6"},[r("div",{staticClass:"card-body shadow"},[r("form",{attrs:{role:"form",autocomplete:"off"},on:{submit:function(e){return e.preventDefault(),t.resetPassword(e)}}},[r("h1",{staticClass:"text-muted"},[t._v("Reset password")]),t._v(" "),r("div",{staticClass:"form-group mb-3"},[r("div",{staticClass:"input-group input-group-merge input-group-alternative"},[t._m(0),t._v(" "),r("input",{staticClass:"form-control",attrs:{id:"email",placeholder:"Email",name:"email",type:"email",disabled:!!t.message}})]),t._v(" "),t._l(t.errors.email,(function(t,e){return r("error",{key:e,attrs:{error:t}})}))],2),t._v(" "),t.message?r("div",{staticClass:"alert alert-success"},[t._v(t._s(t.message))]):t._e(),t._v(" "),r("div",{staticClass:"justify-content-between align-items-center d-flex"},[r("div",[r("button",{staticClass:"btn btn-primary my-4",attrs:{type:"submit",disabled:t.loading}},[t._v("Reset password")])]),t._v(" "),r("div",[r("router-link",{staticClass:"btn btn-default",attrs:{to:"/login"}},[t._v("Login")])],1)])])])])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text"},[e("i",{staticClass:"ni ni-email-83"})])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{Error:r(738).default})}}]);