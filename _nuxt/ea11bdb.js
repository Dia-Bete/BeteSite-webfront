(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{228:function(e,t,n){var content=n(230);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(13).default)("0b4b59a7",content,!0,{sourceMap:!1})},229:function(e,t,n){"use strict";var r=n(228);n.n(r).a},230:function(e,t,n){(t=n(12)(!1)).push([e.i,"fieldset[data-v-d9c31c32]{max-width:50ch;border-radius:.25rem;z-index:20;padding:1.5rem 1rem 1rem;--bg-opacity:1;background-color:#bee3f8;background-color:rgba(190,227,248,var(--bg-opacity));box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);flex-grow:1;justify-self:center;width:100%}fieldset legend[data-v-d9c31c32]{font-family:Montserrat,sans-serif;font-weight:600;font-size:1.25rem;line-height:1.5rem;padding-bottom:1.5rem}.double-line[data-v-d9c31c32]{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:stretch;grid-gap:1rem;gap:1rem}@media (min-width:768px){.double-line[data-v-d9c31c32]{grid-gap:2rem;gap:2rem}}",""]),e.exports=t},236:function(e,t,n){"use strict";n.r(t);n(70),n(28),n(31),n(51);var r=n(37),o=(n(29),n(30),n(11),n(24),n(2));n(89),n(25);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d=n(0).a.extend({data:function(){return{form:{},schema_account:[{type:"text",name:"name",label:"Nome",validation:"required",validationName:"Nome"},{type:"email",name:"email",label:"E-mail",validation:"required|email",validationName:"e-mail"},{type:"password",name:"password",label:"Senha",validation:"required|min:8,length",validationName:"senha"},{type:"password",name:"confirm_password",label:"Confirme sua senha",validation:"^required|confirm:password",validationName:"Confirmação de senha"}],schema_numbers:[[{type:"select",name:"race",options:{black:"Negra",brown:"Parda",indigenous:"Indígena",yellow:"Amarela",white:"Branca"},label:"Raça",placeholder:"escolha...",validation:"required",validationName:"Raça"},{type:"numberunit",name:"age",unit:"anos",label:"Idade",validation:"required|number|between:0,100",validationName:"Idade"}],[{type:"numberunit",name:"height",unit:"cm",label:"Altura",validation:"required|number|between:0,250",validationName:"Altura"},{type:"numberunit",name:"weight",unit:"kg",label:"Peso",validation:"required|number|between:0,250",validationName:"Idade"}]],schema_conditions:[{type:"checkbox",name:"physically_inactive",label:"Sou portador de deficiência física"},{type:"checkbox",name:"is_diabetic",label:"Tenho diabetes"}]}},computed:{greeting:function(){var e=this.form,t=e.name,n=e.pronoun;if(t&&n)return"Seja bem vind".concat(n,", ").concat(t.split(" ")[0],"!")}},methods:{submit:function(data){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=(parseFloat(data.height)/100).toString(10),t.prev=1,t.next=4,e.$axios.post("/signup",c(c({},data),{},{height:n}));case 4:201===t.sent.status&&alert("Conta criada com sucesso!"),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),alert("Perdão, houve um erro :/"),console.debug(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))()}}}),m=(n(229),n(7)),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("FormulateForm",{staticClass:"mx-4 flex gap-6 flex-col items-center",on:{submit:e.submit},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[n("fieldset",[n("div",[n("legend",[e._v("Informações de Cadastro")])]),e._v(" "),e._l(e.schema_account,(function(input){return n("FormulateInput",e._b({key:input.name},"FormulateInput",input,!1))})),e._v(" "),n("client-only",[n("FormulateInput",{attrs:{type:"mixedradio",name:"pronoun",options:{o:"Masculino (-o)",a:"Feminino (-a)"},label:"Quais pronomes você utiliza?",validation:"required",validationName:"Pronome",placeholder:"Outros"}})],1),e._v(" "),n("p",{staticClass:"mx-auto text-center font-display font-semibold text-lg"},[e._v(e._s(e.greeting))])],2),e._v(" "),n("fieldset",[n("div",[n("legend",[e._v("Informações Pessoais")])]),e._v(" "),n("FormulateInput",{attrs:{type:"select",name:"sex",options:{male:"Masculino",female:"Feminino"},label:"Sexo",validation:"required",validationName:"Sexo",placeholder:"escolha..."}}),e._v(" "),"female"===e.form.sex?n("div",[n("FormulateInput",{attrs:{type:"checkbox",name:"is_pregnant",label:"Estou grávid"+(e.form.pronoun||"a(o)")}}),e._v(" "),n("FormulateInput",{attrs:{type:"checkbox",name:"is_breast_feeding",label:"Estou amamentando"}})],1):e._e(),e._v(" "),n("client-only",e._l(e.schema_numbers,(function(line,t){return n("div",{key:t,staticClass:"double-line"},e._l(line,(function(input){return n("FormulateInput",e._b({key:input.name},"FormulateInput",input,!1))})),1)})),0),e._v(" "),n("FormulateInput",{attrs:{type:"select",name:"activity_level",options:{sedentary:"Sedentário",lightly_active:"Pouco Ativo",moderately_active:"Moderadamente Ativo",very_active:"Muito Ativo",extra_active:"Extremamente Ativo"},label:"Nível de Atividade",validation:"required",validationName:"Atividade",placeholder:"escolha..."}}),e._v(" "),e._l(e.schema_conditions,(function(input){return n("FormulateInput",e._b({key:input.name},"FormulateInput",input,!1))}))],2),e._v(" "),n("fieldset",[n("div",[n("legend",[e._v("Consentimento")])]),e._v(" "),n("FormulateInput",{attrs:{type:"checkbox",name:"data_consent",label:"Autorizo o uso dos dados etc.",validation:"required"}}),e._v(" "),n("div",{staticClass:"w-full flex justify-center"},[n("input",{staticClass:"btn btn-primary px-16",attrs:{type:"submit",disabled:!e.form.data_consent,value:"Cadastrar"}})])],1)])}),[],!1,null,"d9c31c32",null);t.default=component.exports}}]);