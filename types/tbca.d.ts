export declare namespace TBCA {
  interface Measure {
    carbs: number;
    description: string;
    fat: number;
    monounsaturatedFatG: number;
    polyunsaturatedFatG: number;
    protein: number;
    saturatedFatG: number;
    unit: string;
  }

  interface Measures {
    'Valor por 100 g': Measure;

    [key: string]: Measure;
  }

  interface Food {
    Marca: string;
    id: string;
    label: string;
    measures: Measures;
    query: string;
  }
}
