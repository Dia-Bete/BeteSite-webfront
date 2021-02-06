<template>
  <Modal
    :show="$store.state.bioData === null"
    describedby="portion-modal-header"
  >
    <form
      class="bg-white w-full max-w-md opacity-100 rounded-lg overflow-hidden flex flex-col shadow-2xl"
      @submit.prevent="submit"
    >
      <header id="portion-modal-header">
        <h2 class="bg-blue-100 text-blue-800 p-4 font-display">
          Informações Físicas
        </h2>
        <p class="px-4 py-3 bg-gray-200 text-sm lg:text-base">
          As informações que você está inserindo aqui não são salvas, e só serão utilizadas para essa sessão.
        </p>
      </header>
      <fieldset class="px-4">
        <label class="horizontal">
          <span>Sexo</span>
          <select v-model="form.sex" required>
            <option value="female">
              Feminino
            </option>
            <option value="male">
              Masculino
            </option>
          </select>
        </label>
        <label class="horizontal">
          <span>Data de Nascimento</span>
          <input
            v-model="form.birthDate"
            type="date"
            required
          />
        </label>
        <label class="horizontal">
          <span>Peso</span>
          <!-- TODO: Essas assumptions são válidas? -->
          <input
            v-model.number="form.weightKg"
            placeholder="quilogramas"
            type="number"
            step=".1"
            min="40"
            max="250"
            required
          />
        </label>
        <label class="horizontal">
          <span>Altura</span>
          <input
            v-model.number="form.height"
            placeholder="centímetros"
            type="number"
            step="1"
            min="40"
            max="250"
            required
          />
        </label>
        <label class="flex flex-col items-stretch mt-4 mb-6">
          <span>Nível de Atividade</span>
          <select
            v-model="form.activity"
            required
          >
            <option selected value="sedentary">
              Sedentário
            </option>
            <option value="lightly_active">
              Pouco Ativo
            </option>
            <option selected value="moderately_active">
              Moderadamente Ativo
            </option>
            <option value="very_active">
              Muito Ativo
            </option>
            <option selected value="extra_active">
              Exageradamente Ativo
            </option>
          </select>
        </label>
      </fieldset>
      <Divider />
      <button type="submit" class="btn btn-secondary my-6 mx-4" :disabled="!valid">
        Confirmar
      </button>
    </form>
  </Modal>
</template>

<style lang="postcss" scoped>
label.horizontal {
  @apply flex items-baseline my-4;
}

label.horizontal > * {
  @apply flex-grow
}

label.horizontal > input, label.horizontal > select {
  max-width: min(50%, 12rem);
}
</style>

<script lang="ts">
import Vue from 'vue'
import { UserBioData } from '~/types/store'

export default Vue.extend({
  data: () => ({
    formElement: null as HTMLFormElement,
    form: {
      sex: null,
      birthDate: null,
      weightKg: null,
      height: null,
      activity: null
    } as Partial<UserBioData>
  }),
  computed: {
    valid () {
      const f = this.form
      for (const p in f) {
        if (!f[p]) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    submit () {
      const age = (new Date().getUTCFullYear()) - new Date(this.form.birthDate).getUTCFullYear()

      let bmr
      switch (this.form.sex) {
        case 'male':
          bmr = 66.47 + (13.75 * this.form.weightKg) + (5 * this.form.height) - (6.75 * age)
          break
        case 'female':
          bmr = 665.09 + (9.56 * this.form.weightKg) + (1.84 * this.form.height) - (4.67 * age)
      }

      let totalCalories
      switch (this.form.activity) {
        case 'sedentary':
          totalCalories = 1.2 * bmr
          break
        case 'lightly_active':
          totalCalories = 1.375 * bmr
          break
        case 'moderately_active':
          totalCalories = 1.55 * bmr
          break
        case 'very_active':
          totalCalories = 1.725 * bmr
          break
        default:
          totalCalories = 1.9 * bmr
      }

      const mealPlans = {
        meal: {
          carbsGoal: (totalCalories * 0.25 * 0.5) / 4,
          proteinGoal: (totalCalories * 0.25 * 0.2) / 4,
          fatGoal: (totalCalories * 0.25 * 0.3) / 9
        },
        snack: {
          carbsGoal: (totalCalories * 0.125 * 0.5) / 4,
          proteinGoal: (totalCalories * 0.125 * 0.2) / 4,
          fatGoal: (totalCalories * 0.125 * 0.3) / 9
        }
      }

      this.$store.commit('setBioData', {
        sex: this.form.sex,
        birthDate: this.form.birthDate,
        weightKg: this.form.weightKg,
        height: this.form.height,
        activity: this.form.activity,
        mealPlans
      })
    }
  }
})
</script>
