<!-- TODO: mover classes CSS para vue-formulate.js e forms.css -->
<template>
  <div>
    <div
      v-for="option in context.options"
      :key="option.id"
      class="custom-radio"
    >
      <input
        :id="option.id"
        v-model="radioModel"
        type="radio"
        :name="context.name"
        :value="option.value"
        v-on="$listeners"
        @blur="context.blurHandler"
      />
      <label :class="context.classes.decorator" :for="option.id"></label>
      <label class="radio-label" :for="option.id">{{ option.label }}</label>
    </div>
    <input
      :id="`${context.id}_text`"
      v-model="textModel"
      type="text"
      :name="context.name"
      :class="context.classes.input"
      :placeholder="context.attributes.placeholder"
      @blur="context.blurHandler"
    />
  </div>
</template>

<script>
export default {
  name: 'MixedRadioInput',
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  data () {
    return { radioModel: '', textModel: '' }
  },
  watch: {
    radioModel (newVal) {
      if (newVal === '') { return }
      this.textModel = ''
      this.context.model = newVal
    },
    textModel (newVal) {
      this.radioModel = ''
      this.context.model = newVal
    }
  }
}
</script>
