<template>
  <article class="bg-white shadow rounded-lg pb-4 hover:shadow-lg transition-shadow duration-150 flex-grow max-w-sm md:max-w-md">
    <header class="bg-blue-200 py-3 px-4 rounded-t">
      <h3 class="font-display font-medium text-xl text-center">
        {{ title }}
      </h3>
    </header>
    <img :src="iconSrc" class="h-24 mx-auto mt-4 mb-6" alt="ícone" />
    <p class="mx-4 mb-4 h-12">
      {{ description }}
    </p>
    <nuxt-link :to="anchor" class="mx-4 text-center px-2 py-3 block btn-secondary rounded-lg">
      {{ action }}
    </nuxt-link>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    action: { type: String, required: true },
    iconSrc: { type: String, required: true },
    anchor: { type: String, required: true }
  }
})
</script>
