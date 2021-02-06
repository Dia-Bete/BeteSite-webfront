<template>
  <section class="mx-auto w-full max-w-lg flex flex-col items-stretch gap-8 overflow-visible">
    <PageHeader title="Dieta - Contador de Carboidratos" />

    <BioDataModal />

    <!-- TODO: Integrar no design -->
    <!--    <div v-show="overLimit" class="alert alert-warning alert-dismissible fade show" role="alert">-->
    <!--      &lt;!&ndash; TODO: Mudar o wording talvez? &ndash;&gt;-->
    <!--      <strong>Cuidado!</strong> Sua refeição ultrapassa o total de calorias que você deve consumir. Planeje a-->
    <!--      distribuição dos seus alimentos para evitar ganho de peso.-->
    <!--    </div>-->

    <div class="flex flex-col items-stretch gap-6">
      <div class="grid grid-flow-col place-items-center bg-blue-700 text-white rounded p-4 shadow-lg">
        <div
          v-for="item in goals"
          :key="item.label"
          class="flex flex-col items-center"
        >
          <p class="text-2xl">
            {{ item.current.toFixed(0) }}/{{ item.limit.toFixed(0) }} <span
              class="text-base"
              style="margin-left: -0.75ch"
            >g</span>
          </p>
          <p class="text-lg">
            {{ item.label }}
          </p>
        </div>
      </div>

      <form class="flex flex-col gap-6" @submit.prevent="submit">
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
                <td
                  v-if="portionClicked !== index"
                  class="border-l-2 border-gray-400 text-right pr-4"
                  style="width: 10ch"
                >
                  {{ `${portion.quantity} x ${portion.measure}${portion.food.measures[portion.measure].unit}` }}
                </td>
                <td v-else class="border-l-2 border-gray-400 pr-1" style="width: 10ch">
                  <div class="w-full flex justify-evenly">
                    <button>
                      <font-awesome-icon
                        icon="pen-square"
                        class="text-gray-700 text-3xl"
                        @click="portionPicker = portion"
                      />
                    </button>
                    <button>
                      <font-awesome-icon icon="minus-square" class="text-red-700 text-3xl" @click="deleteFood(index)" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <PortionPicker
            :show="portionPicker"
            @close="portionPicker = false"
            @edit="editFood"
            @submit="addFood"
          ></PortionPicker>
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
    let meal
    const time = new Date().getHours()
    if (time < 9) {
      meal = 'breakfast'
    } else if (time < 11) {
      meal = 'snack1'
    } else if (time < 15) {
      meal = 'lunch'
    } else if (time < 18) {
      meal = 'snack2'
    } else {
      meal = 'dinner'
    }

    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear()
    const hour = now.getHours().toString().padStart(2, '0')
    const minute = now.getMinutes().toString().padStart(2, '0')

    return {
      portionPicker: false as boolean | Portion,
      portionClicked: null as null | number,
      form: {
        portions: [] as Portion[],
        meal_goal: {} as MealGoal,
        meal,
        date: `${year}-${month}-${day}`,
        time: `${hour}:${minute}`
      }
    }
  },
  computed: {
    fat (): number {
      return this.form.portions.reduce((acc, portion) => acc + portion.food.measures[portion.measure].fat * portion.quantity, 0)
    },
    carbs (): number {
      return this.form.portions.reduce((acc, portion) => acc + portion.food.measures[portion.measure].carbs * portion.quantity, 0)
    },
    protein (): number {
      return this.form.portions.reduce((acc, portion) => acc + portion.food.measures[portion.measure].protein * portion.quantity, 0)
    },
    goals (): { current: number, limit: number, label: string }[] {
      const limits: undefined | MealPlans = this.$store.state.bioData?.mealPlans
      if (!limits) {
        return []
      }

      let limit
      switch (this.form.meal) {
        case 'snack1':
        case 'snack2':
          limit = limits.snack
          break
        default:
          limit = limits.meal
      }

      return [{
        current: this.protein,
        limit: limit.proteinGoal,
        label: 'Proteínas'
      }, {
        current: this.carbs,
        limit: limit.carbsGoal,
        label: 'Carboidratos'
      }, {
        current: this.fat,
        limit: limit.fatGoal,
        label: 'Gorduras'
      }]
    }
  },
  methods: {
    addFood (portion: Portion) {
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
    },
    submit () {
      confirm('Tudo certo?')
    }
  }
})
</script>
