<template>
  <header
    class="fixed inset-x-0 top-0 z-40 bg-blue-200 py-2 px-2 flex flex-row flex-no-wrap items-center shadow-md"
  >
    <div class="inline-flex gap-2">
      <Logo />
      <h1 class="font-display font-bold text-3xl text-center text-blue-900">
        <nuxt-link to="/"> Bete </nuxt-link>
      </h1>
    </div>
    <nav class="flex-grow inline-flex justify-end">
      <button class="px-2 py-1 lg:hidden" @click="toggleNavbar">
        <font-awesome-icon icon="bars" class="text-3xl" />
      </button>
      <ul
        ref="navlist"
        class="hidden lg:inline-flex items-baseline text-left lg:text-center navlist"
      >
        <li>
          <nuxt-link to="/cadastro" class="text-blue-900 font-semibold">
            Cadastro
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login"> Login </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dieta"> Dieta </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/minha-saude"> Minha Saúde </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tabela-calorias"> Tabela de Calorias </nuxt-link>
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
  & .nuxt-link-active {
    @apply font-bold;
  }
  & a:hover,
  & a:focus {
    text-decoration: underline solid theme('colors.blue.600');
    text-decoration: underline solid theme('colors.blue.600') 4px;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    toggleNavbar () {
      if (this.$refs.navlist) {
        const navlist = this.$refs.navlist as HTMLUListElement
        const visible = !navlist.classList.toggle('hidden')
        navlist.setAttribute('aria-expanded', `${visible}`)
      }
    }
  }
})
</script>
