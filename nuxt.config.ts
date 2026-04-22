import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'
import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-file-storage', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vueuse/core'],
    },
    ssr: {
      external: ['@libsql/client', '@prisma/adapter-libsql'],
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
