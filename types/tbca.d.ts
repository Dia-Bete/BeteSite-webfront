export declare namespace TBCA {
  interface Measure {
    description: string;
    carbs: number;
    fat: number;
    monounsaturatedFatG: number;
    polyunsaturatedFatG: number;
    protein: number;
    saturatedFatG: number;
    quantity: number;
    unit: string;
  }

  interface Food {
    marca: string;
    identifier: string;
    label: string;
    measures: Measure[];
    query: string;
    popularity: number;
  }
}
