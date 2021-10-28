import Sass from 'sass'
import Fiber from 'fibers'

export default {
  // https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  env: {
    // NOTE: .envファイルに記載
  },

  // https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeconfig
  // NOTE: 下記の値はclient sideでContext.$configで値取得できる
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
    WEB_BASE_URL: process.env.WEB_BASE_URL,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'attachment CMS',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'email=no,telephone=no,address=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './plugins/error-handler' },
    { src: './plugins/api' },
    { src: './plugins/filters' },
    { src: './plugins/directives' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://www.npmjs.com/package/@nuxtjs/fontawesome
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    browserBaseURL: process.env.WEB_BASE_URL,
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber,
        },
      },
    },
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-router/
  router: {
    middleware: ['auth'],
  },

  // // https://tailwindcss.nuxtjs.org/options
  tailwindcss: {
    cssPath: '~/assets/stylesheets/tailwind.scss',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    // tailwind.config.jsをoverrideするconfig
    config: {},
  },

  fontawesome: {
    icons: {
      solid: ['faCheckSquare', 'faBan'],
    },
  },

  loading: '~/components/loading.vue',

  // https://nuxtjs.org/docs/configuration-glossary/configuration-server/
  server: {
    port: 3001,
  },
}
