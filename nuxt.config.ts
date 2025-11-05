import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [viteTsconfigPaths(), tailwindcss()],
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
})
