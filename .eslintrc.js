const INLINE_ELEMENTS = require('eslint-plugin-vue/lib/utils/inline-non-void-elements.json')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    'plugin:wdio/recommended'
  ],
  plugins: ['prettier', 'wdio', 'vue'],
  // add your custom rules here
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'any'
        }
      }
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: [...INLINE_ELEMENTS, 'nuxt-link']
      }
    ]
  }
}
