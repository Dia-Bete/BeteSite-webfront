import type { TBCA as TBCATable } from '~/types/tbca'

export declare namespace API {

  interface Answer {
    a: string,
    index: number,
    score: number,
    feedback?: 'like' | 'dislike'
  }

  namespace Routes {
    export interface TBCA {
      tbca: TBCATable.Food[];
      history: TBCATable.Food[];
    }

    interface Signup {

    }

    interface Login {

    }

    interface QA {
      candidates: Answer[]
    }
  }
}
