import type { TBCA } from '~/types/tbca'

interface MealGoal {
  carbsGoal: number;
  proteinGoal: number;
  fatGoal: number;
}

export interface MealPlans {
  meal: MealGoal;
  snack: MealGoal;
}

export interface Portion {
  food: TBCA.Food,
  measure: string,
  quantity: number
}
