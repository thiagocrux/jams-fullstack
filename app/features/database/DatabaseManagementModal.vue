<script setup lang="ts">
  import Button from '@/components/ui/button/Button.vue'
  import Input from '@/components/ui/input/Input.vue'
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'

  /**
   * Props for the DatabaseManagementModal component.
   */
  interface Props {
    /**
     * Whether the modal is open.
     */
    isOpen: boolean
  }

  /**
   * Emits for the DatabaseManagementModal component.
   */
  interface Emits {
    /**
     * Emitted when a file is selected for upload.
     */
    (event: 'uploadFile', value: any): void
    /**
     * Emitted when the import process is confirmed.
     */
    (event: 'importDatabase'): void
    /**
     * Emitted when the modal should be closed.
     */
    (event: 'closeModal'): void
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

  /**
   * Handles the visibility update from the Dialog.
   *
   * @param value The new open state.
   */
  const handleOpenUpdate = (value: boolean) => {
    if (!value) {
      emit('closeModal')
    }
  }
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenUpdate">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Importar banco de dados</DialogTitle>
        <DialogDescription>
          Selecione um arquivo de banco de dados SQLite (.db) para importar. Os
          dados existentes serão substituídos.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 py-4">
        <Input type="file" @change="$emit('uploadFile', $event)" />
      </div>

      <DialogFooter>
        <Button variant="outline" @click="$emit('closeModal')">Cancelar</Button>
        <Button @click="$emit('importDatabase')">Confirmar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
