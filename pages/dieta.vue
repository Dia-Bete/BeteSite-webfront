<template>
  <div class="max-w-xl mx-auto px-4 content-center">
    <div v-show="isAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Cuidado!</strong> Sua refeição ultrapassa o total de calorias que você deve consumir. Planeje a distribuição dos seus alimentos para evitar ganho de peso.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="grid grid-flow-col auto-cols-max items-center">
      <div class="px-4">
        <strong><span>{{ diet.protein.toFixed(2) }}</span> / <span>{{ diet.protein_goal }}</span></strong><br />
        <span>Proteínas</span>
      </div>
      <div class="px-4">
        <div class="text-xl">
          <strong><span>{{ diet.carbs.toFixed(2) }}</span> / <span>{{ diet.carbs_goal }}</span></strong>
        </div>
        <span>Carboidratos</span>
      </div>
      <div class="px-4">
        <strong><span>{{ diet.fat.toFixed(2) }}</span> / <span>{{ diet.fat_goal }}</span></strong><br />
        <span>Gorduras</span>
      </div>
    </div>

    <div class="content-center py-4">
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

    <div class="py-4">
      <div>
        <input
          v-model="search.food"
          type="text"
          class="border-solid"
          placeholder="O que você comeu nesta refeição?"
          autocomplete="off"
          @input="searchFood"
        />
        <div class="grid grid-flow-row auto-rows-max overflow-auto h-50 max-w-sm mx-auto">
          <div v-for="food in search.food_list" :key="food.id" cursor-pointer hover:bg-indigo-500>
            <a @click="selectFood(food.id)">{{ food.label }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
/* eslint-disable camelcase */
export default Vue.extend({
  data () {
    return {
      isAlert: false,
      diet: {
        carbs: 0,
        fat: 0,
        protein: 0,
        diet_plans: null,
        foods: [],
        carbs_goal: 78,
        protein_goal: 31,
        fat_goal: 20
      },
      search: {
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
    const response = await this.$axios.get('https://trusty-pipe-277616.rj.r.appspot.com/tbca')
    this.search.foods = response.data.tbca
  },
  methods: {
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

      if (this.diet.fat > this.diet.fat_goal || this.diet.carbs > this.diet.carbs_goal ||
            this.diet.protein > this.diet.protein_goal) {
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
    }
  }
})
</script>
