<template>
  <div class="max-w-xl mx-auto px-4 content-center place-items-center">
    <div v-show="isAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Cuidado!</strong> Sua refeição ultrapassa o total de calorias que você deve consumir. Planeje a distribuição dos seus alimentos para evitar ganho de peso.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <section v-show="!isLogged">
      <div class="grid place-items-center">
        <form>
          <fieldset>Informações Físicas</fieldset>
          <label for="meal" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Sexo</label>
          <select id="meal" v-model="user.sex" name="meal" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200">
            <option selected value="female">
              Feminino
            </option>
            <option value="male">
              Masculino
            </option>
          </select>
          <label for="birthDate" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Data de Nascimento</label>
          <input
            id="birthDate"
            v-model="user.birthDate"
            type="date"
            name="date"
            class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label for="weight_kg" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Peso (Kg)</label>
          <input
            id="weight_kg"
            v-model="user.weight_kg"
            type="number"
            name="weight_kg"
            class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label for="height" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Altura (m)</label>
          <input
            id="height"
            v-model="user.height"
            type="number"
            step=".01"
            name="height"
            class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label for="activity" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Sexo</label>
          <select id="activity" v-model="user.activity" name="activity" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200">
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
          <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none" @click="getBioData()">
            Submeter
          </button>
        </form>
      </div>
    </section>

    <section v-show="isLogged">
      <div class="grid grid-flow-col content-center auto-cols-max place-items-center">
        <div class="px-4">
          <strong><span>{{ diet.protein.toFixed(2) }}</span> / <span>{{ diet.meal_goal.protein_goal }}</span></strong><br />
          <span>Proteínas</span>
        </div>
        <div class="px-4">
          <div class="text-xl">
            <strong><span>{{ diet.carbs.toFixed(2) }}</span> / <span>{{ diet.meal_goal.carbs_goal }}</span></strong>
          </div>
          <span>Carboidratos</span>
        </div>
        <div class="px-4">
          <strong><span>{{ diet.fat.toFixed(2) }}</span> / <span>{{ diet.meal_goal.fat_goal }}</span></strong><br />
          <span>Gorduras</span>
        </div>
      </div>

      <div class="content-center grid place-items-center py-4">
        <table class="table-auto content-center w-full">
          <thead>
            <tr>
              <th class="w-2/5">
                Alimento
              </th>
              <th class="w-1/5">
                Medida
              </th>
              <th class="w-1/5 ">
                Porção
              </th>
              <th class="w-1/5"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="food in diet.foods" :key="food.id">
              <td class="w-2/5">
                {{ food.label }}
              </td>
              <td class="w-1/5">
                {{ food.measure }} g
              </td>
              <td class="w-1/5">
                {{ food.quantity }}
              </td>
              <td class="w-1/5">
                <a @click="deleteFood(food.food_id)">Remover</a>
              </td>
            </tr>
          </tbody>
          <tfoot v-show="select.show">
            <tr>
              <td class="w-2/5">
                {{ select.food.label }}
              </td>
              <td class="w-1/5">
                <select v-model="select.food.measure">
                  <option v-for="measure in select.food.measure_list" :key="measure.id" :value="measure.id">
                    {{ measure.label }}
                  </option>
                </select>
              </td>
              <td class="w-1/5">
                <select v-model="select.food.portion">
                  <option selected value="0.5">
                    ½
                  </option>
                  <option value="1">
                    1
                  </option>
                  <option value="1.5">
                    1 ½
                  </option>
                  <option value="2">
                    2
                  </option>
                  <option value="2.5">
                    2 ½
                  </option>
                  <option value="3">
                    3
                  </option>
                  <option value="3.5">
                    3 ½
                  </option>
                </select>
              </td>
              <td class="w-1/5">
                <a @click="cancelFood()">Cancelar</a>
                <a @click="addFood()"> Adicionar</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="py-4 grid place-items-center">
        <div>
          <input
            v-model="search.food"
            type="text"
            class="block w-full p-3 mt-2 text-gray-700 bg-gray-200"
            placeholder="O que você comeu nesta refeição?"
            autocomplete="off"
            @input="searchFood"
          />
          <div class="grid grid-flow-row auto-rows-max overflow-auto h-50 max-w-sm mx-auto">
            <div v-for="food in search.food_list" :key="food.id" class="cursor-pointer hover:bg-indigo-500">
              <a @click="selectFood(food.id)">{{ food.label }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="grid place-items-center">
        <form>
          <label for="meal" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Refeição</label>
          <select v-model="diet.meal" name="meal" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200" @change="changeMeal()">
            <option selected value="breakfast">
              Café da Manhã
            </option>
            <option value="snack1">
              Lanche da Manhã
            </option>
            <option value="lunch">
              Almoço
            </option>
            <option value="snack2">
              Lanche da Tarde
            </option>
            <option value="dinner">
              Jantar
            </option>
          </select>
          <label for="date" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Data</label>
          <input
            id="date"
            v-model="diet.date"
            type="date"
            name="date"
            autocomplete="new-password"
            class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label for="time" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Hora</label>
          <input
            id="time"
            v-model="diet.time"
            type="time"
            name="time"
            class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <!-- <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
            Cadastrar
          </button> -->
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
/* eslint-disable camelcase */
export default Vue.extend({
  data () {
    return {
      isAlert: false,
      isLogged: false,
      user: {
        id: '',
        name: '',
        sex: 'female',
        birthDate: '2002-01-01',
        weight_kg: 0,
        height: 1.00,
        activity: 'lightly_active',
        meal_plans: null as Meal | null
      },
      diet: {
        carbs: 0,
        fat: 0,
        protein: 0,
        meal: 'breakfast',
        diet_plans: null,
        foods: [],
        date: null as string | null,
        time: null as string | null,
        meal_goal: {}
      },
      search: {
        foods: null as TBCA.Food[] | null,
        food: '',
        food_list: []
      },
      select: {
        show: false,
        food: {
          id: '',
          label: '',
          measure: '',
          portion: '',
          measure_list: []
        }
      }
    }
  },
  async created () {
    const response = (await this.$axios.get<TBCA.Route>('/tbca')).data
    this.search.foods = response.tbca

    const date = new Date()
    const dia = date.getDate().toString().padStart(2, '0')
    const mes = (date.getMonth() + 1).toString().padStart(2, '0')
    const ano = date.getFullYear()
    this.diet.date = ano + '-' + mes + '-' + dia

    const hour = date.getHours().toString().padStart(2, '0')
    const minute = (date.getMinutes()).toString().padStart(2, '0')
    this.diet.time = hour + ':' + minute

    // is user logged?
    this.isLogged = this.user.id !== ''
  },
  methods: {
    getBioData () {
      const birthday = new Date(this.user.birthDate + 'T00:00:00')
      const ageDifMs = Date.now() - birthday.getTime()
      const ageDate = new Date(ageDifMs) // milliseconds from epoch
      const age = Math.abs(ageDate.getUTCFullYear() - 1970)

      const weight_kg = this.user.weight_kg
      const height_cm = this.user.height * 100
      const bmr = this.user.sex === 'female'
        ? 665.09 + (9.56 * weight_kg) + (1.84 * height_cm) - (4.67 * age)
        : 66.47 + (13.75 * weight_kg) + (5 * height_cm) - (6.75 * age)

      const active_level = this.user.activity

      let total_calories : number
      switch (active_level) {
        case 'total_calories':
          total_calories = 1.2 * bmr
          break
        case 'lightly_active':
          total_calories = 1.375 * bmr
          break
        case 'moderately_active':
          total_calories = 1.55 * bmr
          break
        case 'very_active':
          total_calories = 1.725 * bmr
          break
        default:
          total_calories = 1.9 * bmr
      }

      this.isLogged = true
      this.user.meal_plans = {
        meal: {
          carbs_goal: ((total_calories * 0.25 * 0.5) / 4).toFixed(0),
          protein_goal: ((total_calories * 0.25 * 0.2) / 4).toFixed(0),
          fat_goal: ((total_calories * 0.25 * 0.3) / 9).toFixed(0)
        },
        snack: {
          carbs_goal: ((total_calories * 0.125 * 0.5) / 4).toFixed(0),
          protein_goal: ((total_calories * 0.125 * 0.2) / 4).toFixed(0),
          fat_goal: ((total_calories * 0.125 * 0.3) / 9).toFixed(0)
        }
      }
      this.diet.meal_goal = this.user.meal_plans.meal
    },
    changeMeal () {
      if (this.diet.meal === 'snack1' || this.diet.meal === 'snack2') {
        this.diet.meal_goal = this.user.meal_plans.snack
      } else {
        this.diet.meal_goal = this.user.meal_plans.meal
      }
    },
    searchFood () {
      this.select.show = false
      const query = this.search.food.toLowerCase().trim()

      if (query === '') {
        this.search.food_list = []
      } else {
        let data_list = this.search.foods.filter(item => !this.diet.foods.includes(item.food))
        data_list = this.search.foods.filter(item => item.label.toLowerCase().includes(query))
        this.search.food_list = data_list.slice(0, 20)
      }
    },
    selectFood (food_id) {
      this.search.food_list = []

      this.select.show = true
      const food = this.search.foods.filter(item => item.id === food_id)[0]
      this.select.food.id = food_id
      this.select.food.label = food.label

      const measures = []
      for (const [key] of Object.entries(food.measures)) {
        measures.push({
          id: key,
          label: food.measures[key].description,
          info: food.measures[key]
        })
      }
      this.select.food.measure_list = measures
    },
    addFood () {
      const measure_info = this.select.food.measure_list.filter(item => item.id === this.select.food.measure)[0].info

      this.diet.foods.push({
        food_id: this.select.food.id,
        label: this.select.food.label,
        measure: this.select.food.measure,
        quantity: this.select.food.portion,
        measure_info
      })

      this.diet.fat += (measure_info.fat * this.select.food.portion)
      this.diet.carbs += (measure_info.carbs * this.select.food.portion)
      this.diet.protein += (measure_info.protein * this.select.food.portion)

      if (this.diet.fat > this.diet.meal_goal.fat_goal || this.diet.carbs > this.diet.meal_goal.carbs_goal ||
            this.diet.protein > this.diet.meal_goal.protein_goal) {
        this.isAlert = true
      }

      this.select = {
        show: false,
        food: {
          id: '',
          label: '',
          measure: '',
          portion: '',
          measure_list: []
        }
      }
    },
    deleteFood (food_id) {
      const food = this.diet.foods.filter(item => item.food_id === food_id)[0]
      this.diet.foods = this.diet.foods.filter(item => item.food_id !== food_id)

      const measure_info = food.measure_info
      this.diet.fat -= (measure_info.fat * food.quantity)
      this.diet.carbs -= (measure_info.carbs * food.quantity)
      this.diet.protein -= (measure_info.protein * food.quantity)
    },
    cancelFood () {
      this.select = {
        show: false,
        food: {
          id: '',
          label: '',
          measure: '',
          portion: '',
          measure_list: []
        }
      }
    },
    closeAlert () {
      this.isAlert = false
    }
  }
})
</script>
