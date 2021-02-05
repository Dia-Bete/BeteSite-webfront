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
          v-for="(item,index) in [[protein, 25, 'Proteínas'], [carbs, 64, 'Carboidratos'], [fat, 17, 'Gorduras']]"
          :key="index"
          class="flex flex-col items-center"
        >
          <p class="text-2xl">
            {{ item[0] }}/{{ item[1] }} <span class="text-base" style="margin-left: -0.75ch">g</span>
          </p>
          <p class="text-lg">
            {{ item[2] }}
          </p>
        </div>
      </div>
      <!--    <div class="grid grid-flow-col content-center auto-cols-max place-items-center">-->
      <!--      <div class="px-4">-->
      <!--        <strong><span>{{ form.protein.toFixed(2) }}</span> / <span>{{ form.meal_goal.protein_goal-->
      <!--        }}</span></strong><br />-->
      <!--        <span>Proteínas</span>-->
      <!--      </div>-->
      <!--      <div class="px-4">-->
      <!--        <div class="text-xl">-->
      <!--          <strong><span>{{ form.carbs.toFixed(2) }}</span> / <span>{{ form.meal_goal.carbs_goal }}</span></strong>-->
      <!--        </div>-->
      <!--        <span>Carboidratos</span>-->
      <!--      </div>-->
      <!--      <div class="px-4">-->
      <!--        <strong><span>{{ form.fat.toFixed(2) }}</span> / <span>{{ form.meal_goal.fat_goal }}</span></strong><br />-->
      <!--        <span>Gorduras</span>-->
      <!--      </div>-->
      <!--    </div>-->

      <!--    <PortionPicker-->
      <!--      :add-food="addFood"-->
      <!--      :cancel-food="cancelFood"-->
      <!--      :delete-food="deleteFood"-->
      <!--      :form="form"-->
      <!--      :select="select"-->
      <!--    />-->

      <form class="flex flex-col gap-6">
        <fieldset class="box flex flex-col">
          <p v-if="form.portions.length === 0" class="pt-4 pb-6 px-4">
            Opa, você ainda não adicionou nenhuma porção à sua refeição...
          </p>
          <table v-else class="table-fixed w-full">
            <tbody>
              <tr
                v-for="(portion, index) in form.portions"
                :key="index"
                :class="{'bg-gray-200': portionClicked === index}"
                @click="portionClicked = index"
                @mouseleave="portionClicked = null"
              >
                <td class="py-3 pl-4">
                  {{ portion.food.label }}
                </td>
                <td v-if="portionClicked !== index" class="border-l-2 border-gray-400 text-right pr-4" style="width: 10ch">
                  {{ `${portion.quantity} x ${portion.measure}${portion.food.measures[portion.measure].unit}` }}
                </td>
                <td v-else class="border-l-2 border-gray-400 pr-1" style="width: 10ch">
                  <div class="w-full flex justify-evenly">
                    <button><font-awesome-icon icon="pen-square" class="text-gray-700 text-3xl" @click="portionPicker = portion" /></button>
                    <button><font-awesome-icon icon="minus-square" class="text-red-700 text-3xl" @click="deleteFood(index)" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <PortionPicker :visible="portionPicker" @close="portionPicker = false" @edit="editFood" @submit="addFood"></PortionPicker>
          <Divider />
          <button class="btn btn-tertiary" type="button" @click="portionPicker = true">
            Adicionar Porção
          </button>
        </fieldset>
        <fieldset class="box p-4 grid grid-cols-2 grid-rows-2 col-gap-8 row-gap-4">
          <input
            v-model="form.time"
            type="time"
            class="text-center"
            required
          />
          <input
            v-model="form.date"
            type="date"
            class="text-center"
            required
          />
          <select
            v-model="form.meal"
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

<style lang="postcss">

</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    portionPicker: false as boolean | Portion,
    portionClicked: null as null | number,
    form: {
      // diet_plans: null,
      portions: [] as Portion[],
      meal_goal: {} as MealGoal,
      meal: '',
      date: '',
      time: ''
    }
  }),
  computed: {
    fat () {
      return Math.ceil(this.form.portions.reduce((acc, portion) => acc + portion.food.measures[portion.measure].fat * portion.quantity, 0))
    },
    carbs () {
      return Math.ceil(this.form.portions.reduce((acc, portion) => acc + portion.food.measures[portion.measure].carbs * portion.quantity, 0))
    },
    protein () {
      return Math.ceil(this.form.portions.reduce((acc, portion) => acc + portion.food.measures[portion.measure].protein * portion.quantity, 0))
    }
  },
  // TODO: Remover?
  async created () {
    // const date = new Date()
    // const dia = date.getDate().toString().padStart(2, '0')
    // const mes = (date.getMonth() + 1).toString().padStart(2, '0')
    // const ano = date.getFullYear()
    // this.form.date = ano + '-' + mes + '-' + dia
    //
    // const hour = date.getHours().toString().padStart(2, '0')
    // const minute = (date.getMinutes()).toString().padStart(2, '0')
    // this.form.time = hour + ':' + minute
  },
  methods: {
    changeMeal () {
      if (this.form.meal === 'snack1' || this.form.meal === 'snack2') {
        // this.form.meal_goal = this.$store.state.account.meal_plans!.snack
      } else {
        // this.form.meal_goal = this.$store.state.account.meal_plans!.meal
      }
    },
    addFood (portion:Portion) {
      this.form.portions.push(portion)
      this.portionPicker = false
    },
    editFood (portion: Portion) {
      const index = this.form.portions.findIndex(p => p === this.portionPicker)
      this.$set(this.form.portions, index, portion)
      this.portionPicker = false
    },
    deleteFood (index: number) {
      this.form.portions.splice(index, 1)
    }
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
