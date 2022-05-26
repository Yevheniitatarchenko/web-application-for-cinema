export default {
  mode: 'universal',
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  env: {
    apiUrl: process.env.API_URL || 'https://cinema-api-test.y-media.io/v1',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cinema',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vue-multiselect/dist/vue-multiselect.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/after-each.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
  ],
  dayjs: {
    plugins: ['utc', 'advancedFormat']
  },
  axios: {
    baseURL: process.env.API_URL || 'https://cinema-api-test.y-media.io/v1',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
