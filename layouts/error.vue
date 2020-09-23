<template>
  <div class="h-screen pb-12 flex justify-center items-center flex-col">
    <h1 v-if="error.statusCode === 404" class="message">
      Página não encontrada :(
    </h1>
    <h1 v-else class="message">
      Houve um erro :(
    </h1>
    <nuxt-link to="/" class="link"> Voltar para a página inicial </nuxt-link>
  </div>
</template>

<style lang="postcss" scoped>
.message {
  @apply font-display text-blue-900 font-bold;
}
.link {
  @apply mt-8 font-medium;
  border-bottom: 4px solid theme('colors.blue.500');
  &:hover,
  &:focus {
    border-bottom: 4px solid theme('colors.blue.800');
  }
}
</style>

<script>
export default {
  // props: ['error'],
  layout: 'default'
}
</script>
