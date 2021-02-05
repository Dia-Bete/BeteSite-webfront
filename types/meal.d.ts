interface MealGoal {
  carbsGoal: number;
  proteinGoal: number;
  fatGoal: number;
}

interface Meal {
  meal: MealGoal;
  snack: MealGoal;
}

interface Portion {
  food: TBCA.Food,
  measure: string,
  quantity: number
}
