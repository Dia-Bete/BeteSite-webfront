<template>
  <FormulateForm class="mx-4 flex gap-6 flex-col items-center" v-model="form" @submit="submit">
    <fieldset>
      <div>
        <legend>Informações de Cadastro</legend>
      </div>
      <FormulateInput v-for="input in schema_account" :key="input.name" v-bind="input" />
      <client-only>
        <!-- TODO: checar porque input customizados não funcionam em SSR -->
        <!-- Est -->
        <FormulateInput
          type="mixedradio"
          name="pronoun"
          :options="{ o: 'Masculino (-o)', a: 'Feminino (-a)' }"
          label="Quais pronomes você utiliza?"
          validation="required"
          validationName="Pronome"
          placeholder="Outros"
        />
      </client-only>
      <p class="mx-auto text-center font-display font-semibold text-lg">{{greeting}}</p>
    </fieldset>
    <fieldset>
      <div>
        <legend>Informações Pessoais</legend>
      </div>
      <FormulateInput
        type="select"
        name="sex"
        :options="{ male: 'Masculino', female: 'Feminino' }"
        label="Sexo"
        validation="required"
        validationName="Sexo"
        placeholder="escolha..."
      />
      <div v-if="form.sex==='female'">
        <FormulateInput
          type="checkbox"
          name="is_pregnant"
          :label="`Estou grávid${form.pronoun || 'a(o)'}`"
        />
        <FormulateInput type="checkbox" name="is_breast_feeding" label="Estou amamentando" />
      </div>
      <client-only>
        <div class="double-line" v-for="(line, index) in schema_numbers" :key="index">
          <FormulateInput v-for="input in line" :key="input.name" v-bind="input" />
        </div>
      </client-only>
      <FormulateInput
        type="select"
        name="activity_level"
        :options="{ sedentary: 'Sedentário', lightly_active: 'Pouco Ativo', moderately_active: 'Moderadamente Ativo', very_active: 'Muito Ativo', extra_active: 'Extremamente Ativo'}"
        label="Nível de Atividade"
        validation="required"
        validationName="Atividade"
        placeholder="escolha..."
      />
      <FormulateInput v-for="input in schema_conditions" :key="input.name" v-bind="input" />
    </fieldset>
    <fieldset>
      <div>
        <legend>Consentimento</legend>
      </div>
      <FormulateInput
        type="checkbox"
        name="data_consent"
        label="Autorizo o uso dos dados etc."
        validation="required"
      />
      <div class="w-full flex justify-center">
        <input
          class="btn btn-primary px-16"
          type="submit"
          :disabled="!form.data_consent"
          value="Cadastrar"
        />
      </div>
    </fieldset>
  </FormulateForm>
</template>

<style lang="postcss" scoped>
fieldset {
  max-width: 50ch;
  @apply rounded z-20 p-4 pt-6 bg-blue-200 shadow flex-grow justify-self-center w-full;

  & legend {
    @apply font-display font-semibold text-xl leading-6 pb-6;
  }
}

.double-line {
  @apply w-full grid grid-cols-2 items-stretch gap-4;
}

@screen md {
  .double-line {
    @apply gap-8;
  }
}
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      form: {
        activity_level: 'moderately_active',
        age: '21',
        data_consent: true,
        email: 'ariel.santos@dcc.ufmg.br',
        height: '172',
        weight: '52',
        is_diabetic: true,
        name: 'Ariel',
        password: 'senhasenha',
        confirm_password: 'senhasenha',
        physically_inactive: true,
        pronoun: 'o',
        race: 'brown',
        sex: 'male',
      },
      schema_account: [
        {
          type: 'text',
          name: 'name',
          validationName: ' ',
          label: 'Nome',
          validation: 'required',
        },
        {
          type: 'email',
          name: 'email',
          validationName: 'e-mail',
          label: 'E-mail',
          validation: 'required|email',
        },
        {
          type: 'password',
          name: 'password',
          validationName: 'senha',
          label: 'Senha',
          validation: 'required|min:8,length',
        },
        {
          type: 'password',
          name: 'confirm_password',
          label: 'Confirme sua senha',
          validation: '^required|confirm:password',
          validationName: 'Confirmação de senha',
        },
      ],
      schema_numbers: [
        [
          {
            type: 'select',
            name: 'race',
            options: {
              black: 'Negra',
              brown: 'Parda',
              indigenous: 'Indígena',
              yellow: 'Amarela',
              white: 'Branca',
            },
            label: 'Raça',
            placeholder: 'escolha...',
            validation: 'required',
            validationName: 'Raça',
          },
          {
            type: 'numberunit',
            name: 'age',
            unit: 'anos',
            label: 'Idade',
            validation: 'required|number|between:0,100',
            validationName: 'Idade',
          },
        ],
        [
          {
            type: 'numberunit',
            name: 'height',
            unit: 'cm',
            label: 'Altura',
            validation: 'required|number|between:0,250',
            validationName: 'Altura',
          },
          {
            type: 'numberunit',
            name: 'weight',
            unit: 'kg',
            label: 'Peso',
            validation: 'required|number|between:0,250',
            validationName: 'Idade',
          },
        ],
      ],
      schema_conditions: [
        {
          type: 'checkbox',
          name: 'physically_inactive',
          label: 'Sou portador de deficiência física',
        },
        {
          type: 'checkbox',
          name: 'is_diabetic',
          label: 'Tenho diabetes',
        },
      ],
    }
  },
  computed: {
    greeting() {
      const { name, pronoun } = this.form
      if (!(name && pronoun)) return

      return `Seja bem vind${pronoun}, ${name.split(' ')[0]}!`
    },
  },
  methods: {
    async submit(data) {
      // TODO: Ajustar o backend para receber tudo em ints
      const height = (parseFloat(data.height) / 100).toString(10)
      try {
        const response = await this.$axios.post('/signup', { ...data, height })
        if (response.status === 201) {
          alert('Conta criada com sucesso!')
          // TODO: Navegar para tela interna de perfil
        }
      } catch (error) {
        alert('Perdão, houve um erro :/')
        console.debug(error)
      }
    },
  },
})
</script>