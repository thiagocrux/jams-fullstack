<script setup lang="ts">
import { useDatabase } from '@/composables/useDatabase'
import { useResponsive } from '@/composables/useResponsive'
import DatabaseManagementModal from '~/features/database/DatabaseManagementModal.vue'
import ThemeButton from './components/ThemeButton.vue'

const {
  databaseFile,
  isUploadModalOpen,
  handleFileUpload,
  importDatabase,
  exportDatabase,
  openUploadModal,
  closeUploadModal,
} = useDatabase()

const { isDesktop } = useResponsive()

const dropdownMenuItems = ref([
  [
    {
      label: 'Banco de dados',
      icon: 'i-lucide-database',
      children: [
        [
          {
            label: 'Importar dados',
            icon: 'i-lucide-upload',
            onSelect: async () => {
              await nextTick()
              openUploadModal()
            },
          },
          {
            label: 'Exportar dados',
            icon: 'i-lucide-download',
            onSelect: exportDatabase,
          },
        ],
      ],
    },
  ],
])
</script>

<template>
  <u-app>
    <div class="flex flex-col min-h-screen">
      <!-- SECTION: Header -->
      <u-header mode="drawer">
        <template #title>
          {{ isDesktop ? 'Job Applications Management System' : 'JAMS' }}
        </template>
        <template #right>
          <template v-if="isDesktop">
            <theme-button icon-only />
            <u-dropdown-menu :items="dropdownMenuItems">
              <UButton
                icon="i-lucide-settings"
                color="neutral"
                variant="ghost"
              />
            </u-dropdown-menu>
            <u-button icon="i-lucide-log-out" variant="ghost" color="neutral" />
          </template>
        </template>
        <template #body>
          <div class="flex items-center justify-center">
            <theme-button />
            <u-dropdown-menu :items="dropdownMenuItems">
              <u-button icon="i-lucide-settings" color="neutral" variant="ghost">
                Configurações
              </u-button>
            </u-dropdown-menu>
            <u-button icon="i-lucide-log-out" variant="ghost" color="neutral">
              Sair
            </u-button>
          </div>
        </template>
      </u-header>
      <!-- SECTION: Main -->
      <u-container class="flex-1">
        <u-main>
          <nuxt-page />
        </u-main>
      </u-container>
      <!-- SECTION: Footer -->
      <u-footer>{{ '<footer placeholder>' }}</u-footer>
      <!-- SECTION: Modals -->
      <database-management-modal
        v-model:is-open="isUploadModalOpen"
        :model-value="databaseFile"
        @upload-file="handleFileUpload"
        @import-database="importDatabase"
        @close-modal="closeUploadModal"
      />
    </div>
  </u-app>
</template>
