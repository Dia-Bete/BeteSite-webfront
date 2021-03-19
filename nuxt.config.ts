import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  ssr: true,
  router: {
    base: '/BeteSite-webfront/'
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/BeteSite-webfront/favicon.ico'
    }]
  },
  /*
  ** Zero config PWA solution for Nuxt.js
  ** https://pwa.nuxtjs.org/
  */
  pwa: {
    meta: {
      lang: 'pt-BR',
      name: 'DiaBete',
      description: 'Assistente virtual para acompanhamento de diabetes',
      author: 'LETRA - UFMG',
      nativeUI: true
    }
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/buttons.css',
    '@/assets/css/forms.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vue-formulate',
    '~/plugins/axiosSnakeToCamel'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/pwa'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/google-fonts',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
    // Doc: https://github.com/nuxt/content
    // '@nuxt/content',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://trusty-pipe-277616.rj.r.appspot.com'
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  // content: {},
  tailwindcss: {
    jit: true
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      plugins: {
        'postcss-nesting': {},
        'postcss-preset-env': { stage: 2 }
      }
    }
  },

  fontawesome: {
    icons: {
      solid: ['faBars', 'faChevronDown', 'faSearch', 'faBackspace', 'faFrown', 'faMinusSquare', 'faPenSquare']
    }
  }
}

export default config
