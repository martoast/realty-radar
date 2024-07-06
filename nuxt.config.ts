// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => ['mapbox-search-box'].includes(tag),
    },
  },
  runtimeConfig: {
    REAL_ESTATE_API_KEY: process.env.REAL_ESTATE_API_KEY,
    public: {
        MAPBOX_API_TOKEN: process.env.MAPBOX_API_TOKEN,
        ZILLOW_API_KEY: process.env.ZILLOW_API_KEY,
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
    }
}
})
