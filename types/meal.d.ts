interface MealGoal {
  carbsGoal: number;
  proteinGoal: number;
  fatGoal: number;
}

interface MealPlans {
  meal: MealGoal;
  snack: MealGoal;
}

interface Portion {
  food: TBCA.Food,
  measure: string,
  quantity: number
}
