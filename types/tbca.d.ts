/* eslint-disable camelcase */

declare namespace TBCA {
    interface Measure {
        carbs: number;
        description: string;
        fat: number;
        monounsaturated_fat_g: number;
        polyunsaturated_fat_g: number;
        protein: number;
        saturated_fat_g: number;
        unit: string;
    }

    interface Measures {
        [key: string]: Measure;
        'Valor por 100 g': Measure;
    }

    interface Food {
        Marca: string;
        id: string;
        label: string;
        measures: Measures;
        query: string;
    }

    interface Route {
        tbca: Food[];
        history: Food[];
    }
}
