<template>
  <header
    class="fixed inset-x-0 top-0 z-40 bg-blue-200 py-3 pl-2 pr-4 flex flex-row flex-no-wrap items-center shadow-md"
  >
    <div class="inline-flex gap-2 items-center">
      <Logo class="animate__animated animate__slower" onmouseenter="this.classList.toggle('animate__tada')" />
      <nuxt-link to="/">
        <h1 class="font-display font-bold text-3xl text-center text-blue-900 cursor-pointer">Bete</h1>
      </nuxt-link>
    </div>
    <nav
      class="flex-grow inline-flex justify-end"
      aria-label="Navegação Principal"
      role="navigation"
    >
      <button class="px-2 py-1 lg:hidden" @click="open = !open">
        <font-awesome-icon
          icon="bars"
          class="text-3xl transition duration-150 delay-50 transform"
          :class="{'rotate-90':open}"
        />
      </button>
      <ul
        ref="navlist"
        :aria-expanded="open? 'true' : 'false'"
        class="fixed lg:static shadow-lg lg:shadow-none w-32 lg:w-auto pt-2 pb-4 lg:py-0 lg:flex flex-col lg:flex-row-reverse lg:items-center text-right lg:text-center navlist animate__animated animate__faster animate__fadeInRightBig"
        :class="open? 'flex':'hidden'"
      >
        <Divider />
        <li>
          <nuxt-link to="/cadastro" class="text-blue-900 font-semibold">
            Cadastro
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dieta">Dieta</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/duvidas">Dúvidas</nuxt-link>
        </li>
        <!-- <li>
          <nuxt-link to="/minha-saude"> Minha Saúde </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tabela-calorias"> Tabela de Calorias </nuxt-link>
        </li> -->
      </ul>
    </nav>
  </header>
</template>

<style lang="postcss">
.navlist {
  @apply bg-blue-200 right-0 rounded-bl-xl leading-8;
  top: theme('spacing.16');

  & li {
    @apply whitespace-nowrap font-medium font-display text-lg pr-6;
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
import Divider from '~/components/Divider.vue'

export default Vue.extend({
  components: { Divider },
  data: () => ({
    open: false
  }),
  mounted () {
    window.addEventListener('click', this.checkClickOutside, { passive: true })
    this.$el.addEventListener('mouseleave', this.mouseLeft, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('click', this.checkClickOutside)
    this.$el.removeEventListener('mouseleave', this.mouseLeft)
  },
  methods: {
    mouseLeft () {
      this.open = false
    },
    checkClickOutside (ev: MouseEvent) {
      if (!ev.relatedTarget && this.$el.contains(ev.target as Node)) {
        return
      }

      this.open = false
    }
  }
})
</script>
