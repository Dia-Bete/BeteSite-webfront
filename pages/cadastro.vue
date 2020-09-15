<template>
  <fieldset class="elevation-1 rounded z-20 p-4 pt-6 bg-blue-200">
    <div>
      <legend class="font-display font-semibold text-xl leading-6 pb-6">Informações de Cadastro</legend>
    </div>
    <no-ssr>
      <FormulateForm v-model="form" :schema="schema1" />
    </no-ssr>
    <p class="mx-auto text-center font-display font-semibold text-lg">{{greeting}}</p>
  </fieldset>
</template>

<style lang="postcss" scoped>
fieldset {
  max-width: 50ch;
  @apply mx-4;

  @screen md {
    @apply mx-auto;
  }
}
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      form: {},
      schema1: [
        {
          type: 'text',
          name: 'name',
          validationName: ' ',
          label: 'Nome',
          validation: 'required',
        },
        {
          type: 'email',
          name: 'email',
          validationName: 'e-mail',
          label: 'E-mail',
          validation: 'required|email',
        },
        {
          type: 'password',
          name: 'password',
          validationName: 'senha',
          label: 'Senha',
          validation: 'required',
        },
        {
          type: 'password',
          name: 'password_confirm',
          label: 'Confirme sua senha',
          validation: '^required|confirm:password',
          validationName: 'Confirmação de senha',
        },
        {
          type: 'mixedradio',
          name: 'pronoun',
          options: { o: 'Masculino (-o)', a: 'Feminino (-a)' },
          label: 'Quais pronomes você utiliza?',
          validation: 'required',
          validationName: 'Pronome',
          placeholder: 'Outros',
        },
      ],
    }
  },
  computed: {
    greeting() {
      const { name, pronoun } = this.form
      if (!(name && pronoun)) return

      return `Seja bem vind${pronoun}, ${name}!`
    },
  },
})
</script>