<template>
  <div
    class="shadow-md bg-blue-200 rounded z-20 px-4 pt-6 self-center w-10/12 max-w-xs"
  >
    <h2 class="font-display font-semibold text-2xl leading-6 pb-6 text-center">
      Login
    </h2>
    <span v-if="alert">{{ alert }}</span>
    <FormulateForm v-model="form" :schema="schema" class="w-full" @submit="submit" />
  </div>
</template>

<style lang="postcss" scoped>
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      form: {},
      alert: '',
      schema: [
        {
          type: 'email',
          name: 'email',
          label: 'E-mail',
          validation: 'required',
          validationName: 'e-mail'
        },
        {
          type: 'password',
          name: 'password',
          label: 'Senha',
          validation: 'required',
          validationName: 'senha'
        },
        {
          component: 'div',
          class: 'w-full flex justify-center mt-6',
          children: [
            {
              type: 'submit',
              label: 'Entrar',
              inputClass: 'btn btn-primary px-16'
            }
          ]
        }
      ]
    }
  },
  methods: {
    async submit (data: FormData) {
      try {
        const response = await this.$axios.post('/signin_api', data)
        console.debug(response)
        // TODO: Navegar para tela interna de perfil
      } catch (error) {
        this.alert = error.alert
      }
    }
  }
})
</script>
