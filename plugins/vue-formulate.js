import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { pt } from '@braid/vue-formulate-i18n'
import MixedRadioInput from '../components/MixedRadioInput'

Vue.component('MixedRadioInput', MixedRadioInput)

Vue.use(VueFormulate, {
	plugins: [pt],
	locale: 'pt',
	classes: {
		outer: 'mb-4',
		element: '',
		input(context) {
			const base = 'px-3 py-2 rounded border-2 border-blue-500 bg-blue-100 leading-none placeholder-opacity-100 placeholder-blue-800'
			switch (context.classification) {
				case 'mixed':
				case 'box':
					return `${base}`;
				default:
					return `${base} w-full max-w-md`;
			}
		},
		decorator: 'radio-decorator',
		label: 'font-medium mb-1',
		help: '',
		errors: 'text-red-900 font-semibold text-sm',
		error: ''
	},
	library: {
		mixedradio: {
			classification: 'mixed',
			component: 'MixedRadioInput'
		}
	}
})
