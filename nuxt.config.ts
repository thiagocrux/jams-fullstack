import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'
import path from 'path'
import { fileURLToPath } from 'url'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-file-storage'],
  vite: {
    plugins: [viteTsconfigPaths(), tailwindcss()],
  },
  fileStorage: {
    mount: path.resolve(__dirname, 'prisma'),
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
  css: ['@/assets/css/main.css'],
})
