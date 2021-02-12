import type { Store } from 'vuex'
import type { state } from '~/store'
import type { MealPlans } from '~/types/meal'

declare type RootState = ReturnType<typeof state>

interface Vue {
  $store: Store<RootState>;
}

declare interface User {
  id: string
  name: string
  email: string
}

declare interface UserBioData {
  sex: string
  birthDate: string
  weightKg: number
  height: number
  activity: string
  mealPlans: MealPlans
}
