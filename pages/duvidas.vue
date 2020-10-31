<template>
  <section class="mx-auto w-full max-w-lg flex flex-col items-stretch gap-5">
    <header class="p-4 bg-white rounded-lg shadow w-full flex flex-row justify-between items-center gap-2">
      <h2 class="font-display">
        Dúvidas - Perguntas e Respostas
      </h2>
      <font-awesome-icon icon="chevron-left" class="text-blue-900 text-xl" />
    </header>
    <form
      class="p-4 bg-blue-700 rounded shadow-md flex flex-row gap-2 justify-between items-center"
      @submit.prevent="submit"
    >
      <input
        v-model.trim="query"
        tabindex="1"
        type="search"
        placeholder="O que você gostaria de saber?"
        class="flex-grow"
      />
      <button
        type="submit"
        class="btn bg-white rounded-md w-10 h-10 hover:shadow-lg"
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
            <button class="btn btn-tertiary" @click="feedback('like',answer.index)">
              SIM
            </button>
            <button class="btn btn-tertiary" @click="feedback('dislike',answer.index)">
              NÃO
            </button>
          </div>
        </div>
        <footer class="bg-blue-200 px-4 py-3 font-display text-blue-900 text-sm">
          Confiança nesta resposta: {{ answer.score.toLocaleString() }}
        </footer>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
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
        console.debug(error)
        this.answers = []
      }
    },
    feedback (action: 'like'|'dislike', index: number) {
      this.$axios.post(`https://diabeteqa.rj.r.appspot.com/${action}`, {
        candidate: this.query,
        idx: index
      })
      const answer = this.answers.find(a => a.index === index)!
      answer.feedback = action
    }
  }
})
</script>
