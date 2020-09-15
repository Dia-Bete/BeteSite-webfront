<template>
  <div>
    <!-- TODO: mover classes CSS para vue-formulate.js e forms.css -->
    <div v-for="option in context.options" v-bind:key="option.id" class="custom-radio">
      <input
        type="radio"
        :id="option.id"
        :name="context.name"
        :value="option.value"
        v-model="radioModel"
        v-on="$listeners"
        @blur="context.blurHandler"
      />
      <label :class="context.classes.decorator" :for="option.id" />
      <label class="radio-label" :for="option.id">{{option.label}}</label>
    </div>
    <input
      type="text"
      :id="`${context.id}_text`"
      :name="context.name"
      :class="context.classes.input"
      v-model="textModel"
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
      required: true,
    },
  },
  data() {
    return { radioModel: '', textModel: '' }
  },
  watch: {
    radioModel(newVal) {
      if (newVal === '') return
      this.textModel = ''
      this.context.model = newVal
    },
    textModel(newVal) {
      this.radioModel = ''
      this.context.model = newVal
    },
  },
}
</script>
