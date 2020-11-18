import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { pt } from '@braid/vue-formulate-i18n'
import MixedRadioInput from '../components/MixedRadioInput'
import NumberUnitInput from '../components/NumberUnitInput'

Vue.component('MixedRadioInput', MixedRadioInput)
Vue.component('NumberUnitInput', NumberUnitInput)

Vue.use(VueFormulate, {
  plugins: [pt],
  locale: 'pt',
  library: {
    numberunit: {
      classification: 'text',
      component: 'NumberUnitInput'
    },
    mixedradio: {
      classification: 'mixed',
      component: 'MixedRadioInput'
    }
  }
})
