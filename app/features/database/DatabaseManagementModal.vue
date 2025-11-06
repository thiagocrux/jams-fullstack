<script setup lang="ts">
import type { File } from 'buffer'

interface Props {
  isOpen: boolean
  modelValue: any
}

interface Emits {
  (event: 'uploadFile', value: File): void
  (event: 'importDatabase'): void
  (event: 'closeModal'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const file = ref(undefined)
</script>

<template>
  <u-modal
    :open="isOpen"
    title="Importar banco de dados"
    description="Selecione um arquivo de banco de dados SQLite (.db) para importar. Os dados existentes serão substituídos pelos dados do arquivo."
    overlay
    dismissible
    transition
    class="p-4 gap-y-4"
    @update:open="$emit('closeModal')"
    @after:leave="() => (file = undefined)"
  >
    <template #body>
      <u-file-upload
        v-model="file"
        icon="i-lucide-file-up"
        label="Selecione ou arraste aqui se arquivo de banco de dados."
        description="Arquivo .db (máximo 2MB)"
        class="min-h-48"
        @input="(event: any) => $emit('uploadFile', event)"
      />
    </template>
    <template #footer>
      <u-button @click="$emit('importDatabase')">Confirmar</u-button>
    </template>
  </u-modal>
</template>
