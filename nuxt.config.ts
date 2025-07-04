// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
  devServer: {
    port: 4040,
    host: '0.0.0.0'
  },

  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },

  future: {
    compatibilityVersion: 4,
  },
  // todo: make runtime config
  // runtimeConfig: {
  //   test_directory: "/home/alisher/-t/test123/data",
  // },
  compatibilityDate: "2024-11-27",
});
