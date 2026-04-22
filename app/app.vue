<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useDatabase } from '@/composables/useDatabase'
import { useResponsive } from '@/composables/useResponsive'
import ThemeButton from './components/ThemeButton.vue'
import DatabaseManagementModal from './features/database/DatabaseManagementModal.vue'

const {
  isUploadModalOpen,
  handleFileUpload,
  importDatabase,
  exportDatabase,
  openUploadModal,
  closeUploadModal,
} = useDatabase()

const { isDesktop } = useResponsive()

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })
const pageTitle = computed(() =>
  isMounted.value && isDesktop.value ? 'Job Applications Management System' : 'JAMS'
)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- SECTION: Header -->
    <header class="flex justify-between items-center p-4 border-b">
      <h1 class="font-bold text-lg">{{ pageTitle }}</h1>
      <div class="flex items-center gap-2">
        <ThemeButton icon-only />
        <Button variant="ghost" @click="exportDatabase">Exportar</Button>
        <Button variant="ghost" @click="openUploadModal">Importar</Button>
      </div>
    </header>

    <!-- SECTION: Main -->
    <main class="flex-1 mx-auto p-4 container">
      <nuxt-page />
    </main>

    <!-- SECTION: Footer -->
    <footer class="p-4 border-t text-muted-foreground text-sm text-center">
      {{ '<footer placeholder>' }}
    </footer>

    <ClientOnly>
      <DatabaseManagementModal
        :is-open="isUploadModalOpen"
        @upload-file="handleFileUpload"
        @import-database="importDatabase"
        @close-modal="closeUploadModal"
      />
    </ClientOnly>

  </div>
</template>
