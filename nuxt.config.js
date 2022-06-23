export default {

  loading: {
    color: 'green',
    failedColor: 'red',
    height: '3px'
  }, 
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "webviewer-nuxtjs-sample",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
          '@mdi/font/css/materialdesignicons.css',

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/vue-session.client.js" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  /*
   ** Disabling Bootstrap Compiled CSS
   *
  bootstrapVue: {
    bootstrapCSS: true,
    bootstrapVueCSS: true,
  },*/
   vuetify: {
    theme: {
      themes: {
        light: {
          primary: "#0f08af",
          secondary: "#e4e9f4",
          tertiary: "#03032b",
          tertiary_dim: "#2b334e",
          danger: "#d12c2c",
          warning: "#fcb126",
          success: "#00b052",
          white: "#fafafa",
          field_bg: "#f7fafd",
          field_border: "#dadeeb",
          bg_color: "#f2f3f4",
          placeholder: "#abacbf",
          greyneutral: "#6f6f6f",
        },
      },
    },
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
