import { Store } from 'vuex'
import { state } from '~/store'

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
