<template>
  <FormulateForm
    v-model="form"
    class="mx-4 self-center flex gap-6 flex-col items-center"
    @submit="submit"
  >
    <fieldset>
      <div>
        <legend>Informações de Cadastro</legend>
      </div>
      <FormulateInput
        v-for="input in schema_account"
        :key="input.name"
        v-bind="input"
      />
      <client-only>
        <!-- TODO: checar porque input customizados não funcionam em SSR -->
        <FormulateInput
          type="mixedradio"
          name="pronoun"
          :options="{ o: 'Masculino (-o)', a: 'Feminino (-a)' }"
          label="Quais pronomes você utiliza?"
          validation="required"
          validation-name="Pronome"
          placeholder="Outros"
        />
      </client-only>
      <p class="mx-auto text-center font-display font-semibold text-lg">
        {{ greeting }}
      </p>
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
        validation-name="Sexo"
        placeholder="escolha..."
      />
      <div v-if="form.sex === 'female'">
        <FormulateInput
          type="checkbox"
          name="isPregnant"
          :label="`Estou grávid${form.pronoun || 'a(o)'}`"
        />
        <FormulateInput
          type="checkbox"
          name="isBreastFeeding"
          label="Estou amamentando"
        />
      </div>
      <client-only>
        <div
          v-for="(line, index) in schema_numbers"
          :key="index"
          class="double-line"
        >
          <FormulateInput
            v-for="input in line"
            :key="input.name"
            v-bind="input"
          />
        </div>
      </client-only>
      <FormulateInput
        type="select"
        name="activityLevel"
        :options="{
          sedentary: 'Sedentário',
          lightly_active: 'Pouco Ativo',
          moderately_active: 'Moderadamente Ativo',
          very_active: 'Muito Ativo',
          extra_active: 'Extremamente Ativo',
        }"
        label="Nível de Atividade"
        validation="required"
        validation-name="Atividade"
        placeholder="escolha..."
      />
      <FormulateInput
        type="select"
        name="isDiabetic"
        :options="{
          no_diabetic: 'Não',
          pre_diabetic: 'Pré-Diabetes',
          diabetes_1: 'Diabetes Tipo 1',
          diabetes_2: 'Diabetes Tipo 2',
          gestational_diabetes: 'Diabetes Gestacional',
          lada: 'LADA',
          mody: 'MODY',
          secondary: 'Diabetes Secundário à Doenças Específicas',
        }"
        label="Tem Diabetes?"
        validation="required"
        validation-name="Atividade"
        placeholder="escolha..."
      />
      <FormulateInput
        v-for="input in schema_conditions"
        :key="input.name"
        v-bind="input"
      />
    </fieldset>
    <fieldset>
      <div>
        <legend>Consentimento</legend>
      </div>
      <FormulateInput
        type="checkbox"
        name="dataConsent"
        label="Autorizo o uso dos dados etc."
        validation="required"
      />
      <div class="w-full flex justify-center">
        <input
          class="btn btn-primary px-16"
          type="submit"
          :disabled="!form.dataConsent"
          value="Cadastrar"
        />
      </div>
    </fieldset>
  </FormulateForm>
</template>

<style lang="postcss" scoped>
fieldset {
  max-width: 50ch;
  @apply rounded z-20 p-4 pt-6 bg-blue-200 shadow flex-grow justify-center w-full;

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
  data () {
    return {
      form: {},
      schema_account: [
        {
          type: 'text',
          name: 'name',
          label: 'Nome',
          validation: 'required',
          validationName: 'Nome'
        },
        {
          type: 'email',
          name: 'email',
          label: 'E-mail',
          validation: 'required|email',
          validationName: 'e-mail'
        },
        {
          type: 'password',
          name: 'password',
          label: 'Senha',
          validation: 'required|min:8,length',
          validationName: 'senha'
        },
        {
          type: 'password',
          name: 'confirmPassword',
          label: 'Confirme sua senha',
          validation: '^required|confirm:password',
          validationName: 'Confirmação de senha'
        }
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
              white: 'Branca'
            },
            label: 'Raça',
            placeholder: 'escolha...',
            validation: 'required',
            validationName: 'Raça'
          },
          {
            type: 'numberunit',
            name: 'age',
            unit: 'anos',
            label: 'Idade',
            validation: 'required|number|between:0,100',
            validationName: 'Idade'
          }
        ],
        [
          {
            type: 'numberunit',
            name: 'height',
            unit: 'cm',
            label: 'Altura',
            validation: 'required|number|between:0,250',
            validationName: 'Altura'
          },
          {
            type: 'numberunit',
            name: 'weight',
            unit: 'kg',
            label: 'Peso',
            validation: 'required|number|between:0,250',
            validationName: 'Idade'
          }
        ]
      ],
      schema_conditions: [
        {
          type: 'checkbox',
          name: 'physicallyInactive',
          label: 'Sou portador de deficiência física'
        }
      ]
    }
  },
  computed: {
    greeting () {
      const { name, pronoun } = this.form
      if (!(name && pronoun)) { return }

      return `Seja bem vind${pronoun}, ${name.split(' ')[0]}!`
    }
  },
  methods: {
    async submit (data) {
      if (!confirm('Enviar estes dados?')) { return }

      try {
        const response = await this.$axios.post('/signup', data)
        if (response.status === 201) {
          alert('Conta criada com sucesso!')
          this.$router.push('login')
        }
      } catch (error) {
        alert('Perdão, houve um erro :/')
      }
    }
  }
})
</script>
