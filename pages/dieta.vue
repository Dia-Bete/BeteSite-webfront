<template>
  <section class="mx-auto w-full max-w-lg flex flex-col items-stretch gap-8 overflow-visible">
    <PageHeader title="Dieta - Contador de Carboidratos" />
    <!--    <div v-show="isAlert" class="alert alert-warning alert-dismissible fade show" role="alert">-->
    <!--      &lt;!&ndash; TODO: Mudar o wording talvez? &ndash;&gt;-->
    <!--      <strong>Cuidado!</strong> Sua refeição ultrapassa o total de calorias que você deve consumir. Planeje a-->
    <!--      distribuição dos seus alimentos para evitar ganho de peso.-->
    <!--      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert">-->
    <!--        &lt;!&ndash; TODO: Usar FontAwesome &ndash;&gt;-->
    <!--        <span aria-hidden="true">&times;</span>-->
    <!--      </button>-->
    <!--    </div>-->
    <div class="flex flex-col items-stretch gap-6">
      <div class="grid grid-flow-col place-items-center bg-blue-700 text-white rounded p-4 shadow-lg">
        <div
          v-for="(item,index) in [[diet.protein, 25, 'Proteínas'], [diet.carbs, 64, 'Carboidratos'], [diet.fat, 17, 'Gorduras']]"
          :key="index"
          class="flex flex-col items-center"
        >
          <p class="text-2xl">
            {{ item[0] }}/{{ item[1] }} <span class="text-base" style="margin-left: -0.5ch">g</span>
          </p>
          <p class="text-lg">
            {{ item[2] }}
          </p>
        </div>
      </div>
      <!--    <div class="grid grid-flow-col content-center auto-cols-max place-items-center">-->
      <!--      <div class="px-4">-->
      <!--        <strong><span>{{ diet.protein.toFixed(2) }}</span> / <span>{{ diet.meal_goal.protein_goal-->
      <!--        }}</span></strong><br />-->
      <!--        <span>Proteínas</span>-->
      <!--      </div>-->
      <!--      <div class="px-4">-->
      <!--        <div class="text-xl">-->
      <!--          <strong><span>{{ diet.carbs.toFixed(2) }}</span> / <span>{{ diet.meal_goal.carbs_goal }}</span></strong>-->
      <!--        </div>-->
      <!--        <span>Carboidratos</span>-->
      <!--      </div>-->
      <!--      <div class="px-4">-->
      <!--        <strong><span>{{ diet.fat.toFixed(2) }}</span> / <span>{{ diet.meal_goal.fat_goal }}</span></strong><br />-->
      <!--        <span>Gorduras</span>-->
      <!--      </div>-->
      <!--    </div>-->

      <!--    <PortionPicker-->
      <!--      :add-food="addFood"-->
      <!--      :cancel-food="cancelFood"-->
      <!--      :delete-food="deleteFood"-->
      <!--      :diet="diet"-->
      <!--      :select="select"-->
      <!--    />-->

      <form>
        <fieldset class="bg-white rounded shadow p-4 grid grid-cols-2 grid-rows-2 col-gap-8 row-gap-4">
          <input
            v-model="diet.time"
            type="time"
            class="text-center"
            required
          />
          <input
            v-model="diet.date"
            type="date"
            class="text-center"
            required
          />
          <select
            v-model="diet.meal"
            name="meal"
            required
            class="col-span-2"
            @change="changeMeal()"
          >
            <option value="breakfast">
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
          <button
            type="submit"
            class="col-span-2 btn btn-secondary"
          >
            Registrar Refeição
          </button>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      isAlert: false,
      diet: {
        carbs: 0,
        fat: 0,
        protein: 0,
        // diet_plans: null,
        // foods: [] as any[],
        // meal_goal: {} as MealGoal,
        meal: '',
        date: null as string | null,
        time: null as string | null
      }
    }
  },
  // TODO: Remover?
  async created () {
    // const date = new Date()
    // const dia = date.getDate().toString().padStart(2, '0')
    // const mes = (date.getMonth() + 1).toString().padStart(2, '0')
    // const ano = date.getFullYear()
    // this.diet.date = ano + '-' + mes + '-' + dia
    //
    // const hour = date.getHours().toString().padStart(2, '0')
    // const minute = (date.getMinutes()).toString().padStart(2, '0')
    // this.diet.time = hour + ':' + minute
  },
  methods: {
    changeMeal () {
      if (this.diet.meal === 'snack1' || this.diet.meal === 'snack2') {
        // this.diet.meal_goal = this.$store.state.account.meal_plans!.snack
      } else {
        // this.diet.meal_goal = this.$store.state.account.meal_plans!.meal
      }
    }
    // addFood () {
    //   const measure_info = this.select.food.measure_list.filter(item => item.id === this.select.food.measure)[0].info
    //
    //   this.diet.foods.push({
    //     food_id: this.select.food.id,
    //     label: this.select.food.label,
    //     measure: this.select.food.measure,
    //     quantity: this.select.food.portion,
    //     measure_info
    //   })
    //
    //   this.diet.fat += (measure_info.fat * parseFloat(this.select.food.portion))
    //   this.diet.carbs += (measure_info.carbs * parseFloat(this.select.food.portion))
    //   this.diet.protein += (measure_info.protein * parseFloat(this.select.food.portion))
    //
    //   const {
    //     meal_goal,
    //     fat,
    //     carbs
    //   } = this.diet
    //   if (fat > meal_goal.fat_goal || carbs > meal_goal.carbs_goal ||
    //     this.diet.protein > meal_goal.protein_goal) {
    //     this.isAlert = true
    //   }
    //
    //   this.select = {
    //     show: false,
    //     food: {
    //       id: '',
    //       label: '',
    //       measure: '',
    //       portion: '',
    //       measure_list: []
    //     }
    //   }
    // },
    // deleteFood (food_id: string) {
    //   const food = this.diet.foods.filter(item => item.food_id === food_id)[0]
    //   this.diet.foods = this.diet.foods.filter(item => item.food_id !== food_id)
    //
    //   const measure_info = food.measure_info
    //   this.diet.fat -= (measure_info.fat * food.quantity)
    //   this.diet.carbs -= (measure_info.carbs * food.quantity)
    //   this.diet.protein -= (measure_info.protein * food.quantity)
    // },
    // cancelFood () {
    //   this.select = {
    //     show: false,
    //     food: {
    //       id: '',
    //       label: '',
    //       measure: '',
    //       portion: '',
    //       measure_list: []
    //     }
    //   }
    // },
    // closeAlert () {
    //   this.isAlert = false
    // }
  }
})
</script>
