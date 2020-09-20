<template>
  <header
    class="fixed z-40 top-0 w-screen bg-blue-200 py-2 px-2 grid grid-cols-3 grid-flow-col col-gap-1 items-baseline shadow-md"
  >
    <Logo />
    <h1 class="font-display font-bold text-3xl text-center text-blue-900">Bete</h1>
    <nav class="flex justify-end">
      <button class="px-2 py-1 lg:hidden" @click="toggleNavbar">
        <font-awesome-icon icon="bars" class="text-3xl" />
      </button>
      <ul class="hidden lg:flex items-baseline text-left lg:text-center navlist" ref="navlist">
        <li>
          <nuxt-link to="/cadastro" class="text-blue-900 font-semibold">Cadastro</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dieta">Dieta</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/minha-saude">Minha Saúde</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tabela-calorias">Tabela de Calorias</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="postcss" scoped>
.navlist {
  &[aria-expanded='true'] {
    @apply fixed bg-blue-200 right-0 py-2 px-4 rounded rounded-t-none leading-8;
    top: theme('spacing.16');
    box-shadow: 0px 10px 10px hsla(0, 0%, 0%, 0.12),
      0px 4px 4px -1px hsla(0, 0%, 0%, 0.2), 0px 5px 5px hsla(0, 0%, 0%, 0.14);
  }
  & li {
    @apply ml-3 whitespace-no-wrap font-medium font-display text-lg tracking-tight;
  }
  & a:hover,
  & a:focus {
    text-decoration: underline solid theme('colors.blue.600') 4px;
  }
  & .nuxt-link-active {
    @apply font-semibold;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    toggleNavbar() {
      if (this.$refs.navlist) {
        const navlist = this.$refs.navlist as HTMLUListElement
        const visible = !navlist.classList.toggle('hidden')
        navlist.setAttribute('aria-expanded', `${visible}`)
      }
    },
  },
})
</script>
