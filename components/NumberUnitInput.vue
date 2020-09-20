<template>
  <div :class="elementClasses" :data-type="context.type">
    <input
      type="number"
      v-model="context.model"
      v-bind="context.attributes"
      :style="`padding-right: ${unit.length+2}ch`"
      @blur="context.blurHandler"
      v-on="$listeners"
    />
    <label
      :for="context.name"
      class="relative text-blue-700 font-medium self-center"
      :style="`right: ${unit.length+1}ch`"
    >{{unit}}</label>
  </div>
</template>

<style lang="postcss">
[data-type='numberunit'] {
  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & input {
    @apply text-right;

    -moz-appearance: textfield;

    & label {
      right: 0;
    }
  }
}
</style>

<script>
export default {
  name: 'NumberUnitInput',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // TODO: Fazer isso direito com slotProps depois
    unit() {
      return this.context.attributes.unit
    },
    elementClasses() {
      const local = 'flex flex-no-wrap'
      if (this.context.classes.element) return local + ' ' + context.classes.element
      else return local
    },
  },
}
</script>