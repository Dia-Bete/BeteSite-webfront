<template>
  <section class="mx-auto w-full max-w-lg flex flex-col items-stretch gap-5">
    <header class="py-4 bg-white rounded-lg shadow w-full">
      <div class="px-4 flex flex-row justify-between items-center">
        <h2 class="font-display">
          Dúvidas - Perguntas e Respostas
        </h2>
        <button class="pl-2" @click="helpText = !helpText">
          <font-awesome-icon icon="chevron-left" class="text-blue-900 text-xl transition duration-300 transform" :class="helpText? '-rotate-90' : ''" />
        </button>
      </div>
      <div class="overflow-hidden">
        <transition enter-active-class="animate__animated animate__slideInDown" leave-active-class="animate__animated animate__slideOutUp">
          <div v-show="helpText">
            <div style="height: 2px" class="w-full bg-gray-300 my-4"></div>
            <p class="px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </transition>
      </div>
    </header>
    <form
      class="p-4 bg-blue-700 rounded shadow-md flex flex-row gap-2 justify-between items-center"
      @submit.prevent="submit"
    >
      <input
        v-model.trim="query"
        tabindex="0"
        type="search"
        placeholder="O que você gostaria de saber?"
        class="flex-grow"
      />
      <button
        type="submit"
        class="btn rounded-md w-10 h-10 hover:shadow-lg"
        :class="query ? 'bg-white' : 'bg-gray-400'"
        :disabled="!query"
      >
        <font-awesome-icon icon="search" class="text-blue-800" size="lg" />
      </button>
    </form>
    <div v-show="answers" class="grid grid-cols-1 grid-flow-row gap-4">
      <div v-for="answer in answers" :key="answer.index" class="bg-white rounded shadow overflow-y-hidden">
        <div class="px-4 pt-4 mb-6 flex flex-col gap-6">
          <blockquote class="flex flex-col gap-4">
            <p v-for="(paragraph, index) in answer.a" :key="index">
              {{ paragraph }}
            </p>
          </blockquote>
          <div class="flex justify-between">
            <h4 class="font-display">
              Essa resposta é relevante?
            </h4>
            <button
              v-for="(option, index) in [['SIM', 'like'], ['NÃO', 'dislike']]"
              :key="index"
              class="btn btn-tertiary rounded-lg"
              :class="answer.feedback === option[1] && ['used']"
              :disabled="answer.feedback"
              @click="feedback(option[1],answer.index)"
            >
              {{ option[0] }}
            </button>
          </div>
        </div>
        <footer class="bg-blue-200 px-4 py-3 font-display text-blue-900 text-sm">
          Confiança nesta resposta: {{ answer.score.toFixed(2).toLocaleString() }}
        </footer>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
  .used {
    @apply bg-blue-700 text-gray-200
  }
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      helpText: false,
      query: '',
      answers: [] as Array<{a: Array<string>, index: number, score: number, feedback?: 'like'|'dislike'}>
    }
  },
  computed: {},
  methods: {
    async submit () {
      try {
        const response = await this.$axios.get('https://diabeteqa.rj.r.appspot.com/qa/' + this.query)
        this.answers = response.data.answers
      } catch (error) {
        alert('Perdão, houve um erro :/')
        this.answers = []
      }
    },
    feedback (action: 'like'|'dislike', answerIndex: number) {
      const index = this.answers.findIndex(a => a.index === answerIndex)!
      const answer = this.answers[index]
      answer.feedback = action
      this.$set(this.answers, index, answer)
      this.$axios.post(`https://diabeteqa.rj.r.appspot.com/${action}`, {
        candidate: this.query,
        idx: answerIndex
      })
    }
  }
})
</script>
