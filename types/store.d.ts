import { Store } from 'vuex'
import { RootState } from '~/store'

declare interface Vue {
  $store: Store<RootState>;
}
