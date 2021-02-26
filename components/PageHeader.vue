<template>
  <header class="py-4 bg-white rounded-lg z-30 shadow-lg">
    <div class="px-4 flex flex-row justify-between items-center">
      <h2 class="font-display">
        {{ title }}
      </h2>
      <button class="pl-2" @click="helpText = !helpText">
        <font-awesome-icon
          icon="chevron-down"
          class="text-blue-900 text-xl transition duration-300 transform"
          :class="helpText? '-rotate-180' : ''"
        />
      </button>
    </div>
    <div class="overflow-hidden">
      <transition
        enter-active-class="animate__animated animate__slideInDown"
        leave-active-class="animate__animated animate__slideOutUp"
      >
        <div v-show="helpText">
          <div style="height: 2px" class="w-full bg-gray-300 my-4"></div>
          <p class="px-4">
            {{ description }}
          </p>
        </div>
      </transition>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n' +
  'dolore magna aliqua.\n' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
  'consequat.'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: lorem
    }
  },
  data: () => ({
    helpText: false
  })
})
</script>
