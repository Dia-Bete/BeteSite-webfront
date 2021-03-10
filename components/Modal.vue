<template>
  <div
    v-show="show"
    class="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
    role="dialog"
    aria-modal="true"
    aria-describedby="portion-modal-header"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: [Boolean, Object],
      required: true
    },
    describedby: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
