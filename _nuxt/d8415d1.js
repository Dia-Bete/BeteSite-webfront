(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{282:function(e,t,n){"use strict";n.r(t);n(35);var r=n(2),l=n(0).a.extend({data:function(){return{form:{},alert:"",schema:[{type:"email",name:"email",label:"E-mail",validation:"required",validationName:"e-mail"},{type:"password",name:"password",label:"Senha",validation:"required",validationName:"senha"},{component:"div",class:"w-full flex justify-center mt-6",children:[{type:"submit",label:"Entrar",inputClass:"btn btn-primary px-16"}]}]}},methods:{submit:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,l,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.email,l=e.password,n.prev=1,n.next=4,t.$axios.$post("/signin",{email:r,password:l});case 4:o=n.sent,t.$store.commit("signIn",o.user),n.next=12;break;case 8:if(n.prev=8,n.t0=n.catch(1),n.t0.response&&401===n.t0.response.status){n.next=12;break}throw n.t0;case 12:case"end":return n.stop()}}),n,null,[[1,8]])})))()}}}),o=n(6),component=Object(o.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"shadow-md bg-blue-200 rounded z-20 px-4 pt-6 self-center w-10/12 max-w-xs mt-32 lg:mt-56"},[n("h2",{staticClass:"font-display font-semibold text-2xl leading-6 pb-6 text-center"},[e._v("\n    Login\n  ")]),e._v(" "),e.alert?n("span",[e._v(e._s(e.alert))]):e._e(),e._v(" "),n("FormulateForm",{staticClass:"w-full",attrs:{schema:e.schema},on:{submit:e.submit},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}})],1)}),[],!1,null,"46500ad4",null);t.default=component.exports}}]);