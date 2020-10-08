<template>
    <section>
      <FormulateForm
        v-model="form"
        class="mx-4 self-center flex gap-6 flex-col items-center"
        @submit="submit"
      >
      <fieldset>
        <div>
          <legend>Dúvidas</legend>
        </div>
        <FormulateInput
          type="text"
          name="question"
          label="Pergunta"
          validation="required"
          validation-name="Este campo"
          placeholder="Faça uma pergunta sobre Diabetes"
        />
        <div class="w-full flex justify-center">
          <input
            class="btn btn-primary px-16"
            type="submit"
            :disabled="!form.question"
            value="Perguntar"
          />
        </div>
      </fieldset>
      </FormulateForm>
      <br />
      <div v-show="answers.length != 0">
        <h1>Respostas</h1>
        <div v-for="answer in answers" :key="answer.index">
          <div class="card-header"></div>
          <div class="card-body">{{ answer.a.join("\n") }}</div>
          <div class="card-footer">
            {{ answer.score }}<br>
            <a v-on:click="like(answer.index)" class="btn btn-primary like">Curtir</a>
          </div>
          <br />
        </div>
      </div>
    </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      form: {},
      answers: [],
    }
  },
  computed: {
    teste () {
      return "Imprime uma mensagem"
    }
  },
  methods: {
    async submit (data) {
      // TODO: Ajustar o backend para receber tudo em ints
      try {
        const query = data.question;
        const response = await this.$axios.get('https://diabeteqa.rj.r.appspot.com/qa/' + query)
        if (response.status === 200) {
          this.answers = response.data.answers;
        }
      } catch (error) {
        alert('Perdão, houve um erro :/')
        console.debug(error);
        this.answers = [];
      }
    },
    async like(index) {
      const response = await this.$axios.post('https://diabeteqa.rj.r.appspot.com/like', {
        "candidate": this.form.question,
        "idx": index
      })
      if (response.status === 200) {
        alert('Like com sucesso!')
      }
    }
  }
})
</script>