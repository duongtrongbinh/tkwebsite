// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  css: ["~/assets/scss/main.scss", "bootstrap/dist/css/bootstrap.min.css"],
  vite: {
    define: {
      "import.meta.env.DEBUG": false,
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    typescript: {
    strict: true,
    typeCheck: true,
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
  plugins: [
    "@/plugins/axios.ts",
    "@/plugins/pinia.ts",
  ],
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@element-plus/nuxt',
  ],
  runtimeConfig: {
    public: {
      NUXT_API_URL: process.env.NUXT_API_URL || '',
      NUXT_WEB_URL: process.env.NUXT_WEB_URL || ''
    },
  }
})