<!--<template>-->
<!--  <section>-->
<!--    <form>-->
<!--      <header>-->
<!--        <h2>Informações Físicas</h2>-->
<!--        <p>As informações que você está inserindo aqui não serão salvas, e só serão utilizadas para essa sessão.</p>-->
<!--      </header>-->
<!--      <label for="input_sexo" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Sexo-->
<!--        <select-->
<!--          id="input_sexo"-->
<!--          v-model="form.sex"-->
<!--          name="sex"-->
<!--          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200"-->
<!--        >-->
<!--          <option value="female">-->
<!--            Feminino-->
<!--          </option>-->
<!--          <option value="male">-->
<!--            Masculino-->
<!--          </option>-->
<!--        </select></label>-->
<!--      <label class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Data de-->
<!--        Nascimento-->
<!--        <input-->
<!--          v-model="form.birthDate"-->
<!--          type="date"-->
<!--          name="date"-->
<!--          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"-->
<!--          required-->
<!--        /></label>-->
<!--      <label class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Peso (Kg)-->
<!--        <input-->
<!--          v-model="form.weightKg"-->
<!--          type="number"-->
<!--          name="weight_kg"-->
<!--          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"-->
<!--          required-->
<!--        /></label>-->
<!--      <label for="height" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Altura (m)</label>-->
<!--      <input-->
<!--        id="height"-->
<!--        v-model="form.height"-->
<!--        type="number"-->
<!--        step=".01"-->
<!--        name="height"-->
<!--        class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"-->
<!--        required-->
<!--      />-->
<!--      <label for="activity" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Sexo</label>-->
<!--      <select-->
<!--        id="activity"-->
<!--        v-model="form.activity"-->
<!--        name="activity"-->
<!--        class="block w-full p-3 mt-2 text-gray-700 bg-gray-200"-->
<!--      >-->
<!--        <option selected value="sedentary">-->
<!--          Sedentário-->
<!--        </option>-->
<!--        <option value="lightly_active">-->
<!--          Pouco Ativo-->
<!--        </option>-->
<!--        <option selected value="moderately_active">-->
<!--          Moderadamente Ativo-->
<!--        </option>-->
<!--        <option value="very_active">-->
<!--          Muito Ativo-->
<!--        </option>-->
<!--        <option selected value="extra_active">-->
<!--          Exageradamente Ativo-->
<!--        </option>-->
<!--      </select>-->
<!--      <button-->
<!--        type="submit"-->
<!--        class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"-->
<!--        @click="submit"-->
<!--      >-->
<!--        Submeter-->
<!--      </button>-->
<!--    </form>-->
<!--  </section>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import Vue from 'vue'-->
<!--import { UserBioData } from '~/types/store'-->

<!--export default Vue.extend({-->
<!--  props: {-->
<!--    show: {-->
<!--      type: Boolean,-->
<!--      required: true-->
<!--    }-->
<!--  },-->
<!--  data: () => ({-->
<!--    form: {} as Partial<UserBioData>-->
<!--  }),-->
<!--  methods: {-->
<!--    submit () {-->
<!--      const birthday = new Date(this.form.birthDate)-->
<!--      const age = (new Date().getUTCFullYear()) - birthday.getUTCFullYear()-->

<!--      const weight = this.form.weightKg!-->
<!--      const height = this.form.height * 100-->
<!--      // ?-->
<!--      const bmr = this.form.sex === 'female'-->
<!--        ? 665.09 + (9.56 * weight) + (1.84 * height) - (4.67 * age)-->
<!--        : 66.47 + (13.75 * weight) + (5 * height) - (6.75 * age)-->

<!--      const activityLevel = this.form.activity-->
<!--    }-->
<!--  }-->
<!--})-->
<!--</script>-->
