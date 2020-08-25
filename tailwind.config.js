/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      body: ['Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
    },
    // colors: {
    //   blue: {
    //     100: '#EAF4FA',
    //     200: '#B5D1ED',
    //     300: '#76A0DA',
    //     400: '#4874CB',
    //     500: '#324DA0',
    //     600: '#264787',
    //     700: '#1C3C68',
    //     800: '#0E2439',
    //     900: '#050E15'
    //   },
    //   red: {
    //     100: '#fccfcf',
    //     200: '#f9aeae',
    //     300: '#f59393',
    //     400: '#f17474',
    //     500: '#eb5656',
    //     600: '#e92121',
    //     700: '#c51111',
    //     800: '#940b0b',
    //     900: '#600606'
    //   },
    //   orange: {
    //     100: '#ffbdb3',
    //     200: '#feac95',
    //     300: '#fba47e',
    //     400: '#f79c63',
    //     500: '#f2994a',
    //     600: '#f46e1b',
    //     700: '#da4606',
    //     800: '#ab2702',
    //     900: '#801100'
    //   },
    //   green: {
    //     100: '#e7fdea',
    //     200: '#b0f7be',
    //     300: '#7cee9d',
    //     400: '#4ce183',
    //     500: '#28c870',
    //     600: '#1cab50',
    //     700: '#138c35',
    //     800: '#0b6a1e',
    //     900: '#05470d'
    //   },
    // },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
