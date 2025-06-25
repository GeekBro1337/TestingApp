// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },

  future: {
    compatibilityVersion: 4,
  },
  imports: {
    dirs: ['app/composables', 'app/utils']
  },
  // todo: make runtime config
  // runtimeConfig: {
  //   test_directory: "/home/alisher/-t/test123/data",
  // },
  compatibilityDate: "2024-11-27",
});
