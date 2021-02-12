<template>
  <section class="mx-auto w-full max-w-lg flex flex-col items-stretch gap-5">
    <PageHeader
      title="Dúvidas - Perguntas e Respostas"
      description="Digite aqui sua pergunta ou dúvida e verifique as respostas da nossa assistente. Avalie se você está satisfeit(a) com a resposta recebida."
    />
    <form
      class="p-4 bg-blue-700 rounded shadow-md flex flex-row gap-2 justify-between items-center"
      @submit.prevent="submit"
      @reset.prevent="clear"
    >
      <div class="flex-grow flex flex-row items-center">
        <input
          v-model.trim="query"
          :disabled="state === 'loading'"
          tabindex="0"
          type="search"
          placeholder="O que você gostaria de saber?"
          class="w-full"
        />
      </div>
      <button
        :type="querySent === query? 'reset' : 'submit'"
        class="btn btn-search"
        :class="query ? 'bg-gray-100' : 'bg-gray-500'"
        :disabled="!query || state === 'loading'"
      >
        <font-awesome-icon v-show="querySent !== query || state!=='loaded'" icon="search" size="lg" />
        <font-awesome-icon v-show="querySent === query && state==='loaded'" icon="backspace" />
      </button>
    </form>
    <template v-if="state === 'loading'">
      <Loader />
    </template>
    <template v-else-if="answers.length > 0">
      <div class="grid grid-cols-1 grid-flow-row gap-4">
        <div v-for="answer in answers" :key="answer.index" class="bg-white rounded shadow overflow-y-hidden">
          <div class="px-4 pt-4 mb-3 flex flex-col gap-6">
            <blockquote class="flex flex-col gap-4">
              <p v-for="(paragraph, index) in answer.a" :key="index">
                {{ paragraph }}
              </p>
            </blockquote>
            <div class="flex justify-between items-center text-sm">
              <h4 class="font-display">
                Essa resposta é relevante?
              </h4>
              <button
                v-for="(option, index) in [['SIM', 'like'], ['NÃO', 'dislike']]"
                :key="index"
                class="rounded-lg px-4 py-1 font-medium"
                :class="answer.feedback === option[1]? 'bg-blue-700 text-gray-200': 'text-gray-800'"
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
    </template>
    <template v-else-if="state==='loaded'">
      <p class="bg-white rounded shadow p-4 text-center">
        Não encontramos nenhuma resposta, desculpa
        <font-awesome-icon icon="frown" class="text-blue-600" size="lg" />
      </p>
    </template>
  </section>
</template>

<style lang="postcss" scoped>
.btn-search {
  @apply rounded-md w-10 h-10 text-blue-800 flex items-center justify-center transition;

  &:hover:not(:disabled) {
    @apply shadow-lg bg-white;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import { API } from '~/types/api'
import Loader from '~/components/Loader.vue'
import PageHeader from '~/components/PageHeader.vue'

export default Vue.extend({
  components: {
    PageHeader,
    Loader
  },
  data () {
    return {
      state: 'empty' as 'empty' | 'loading' | 'loaded',
      querySent: null as string | null,
      query: '',
      answers: [] as API.Answer[]
    }
  },
  computed: {},
  methods: {
    async submit () {
      try {
        this.state = 'loading'
        const response = await this.$axios.$get<API.Routes.QA>('https://diabeteqa.rj.r.appspot.com/qa/' + this.query)
        this.answers = response.answers
        this.querySent = this.query
        this.state = 'loaded'
      } catch (error) {
        alert('Perdão, houve um erro :/')
        this.answers = []
      }
    },
    feedback (action: 'like' | 'dislike', answerIndex: number) {
      const index = this.answers.findIndex(a => a.index === answerIndex)!
      const answer = this.answers[index]

      answer.feedback = action
      this.$set(this.answers, index, answer)

      this.$axios.post(`https://diabeteqa.rj.r.appspot.com/${action}`, {
        candidate: this.query,
        idx: answerIndex
      }).catch() // TODO: reportar erros no futuro
    },
    clear () {
      this.query = ''
      this.answers = []
      this.state = 'empty'
      this.querySent = null
    }
  }
})
</script>
