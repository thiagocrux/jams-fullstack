import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'
import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-file-storage'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vueuse/core'],
    },
  },
  fileStorage: {
    mount: path.resolve(__dirname, 'prisma'),
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
  css: ['@/assets/css/main.css'],
})
