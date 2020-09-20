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
	classes: {
		outer: 'mb-4',
		element({ type }) {
			if (type === 'checkbox')
				return 'inline-block'
		},
		input(context) {
			let style = 'px-3 py-2 rounded border-2 border-blue-500 bg-blue-100 leading-none placeholder-opacity-100 placeholder-blue-800'
			switch (context.classification) {
				case 'box': return;
				default:
					style += ' w-full max-w-md'
			}
			switch (context.type) {
				case 'number':
				case 'numberunit':
					style += ' text-right'
					break;
				default:
					break;
			}
			return style;
		},
		decorator({ type }) {
			if (type === 'checkbox') return 'checkbox-decorator'
			else return 'radio-decorator'
		},
		label: 'font-medium mb-1',
		help: '',
		errors: 'text-red-900 font-semibold text-sm',
		error: ''
	},
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
