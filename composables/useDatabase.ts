export function useDatabase() {
  const isUploadModalOpen = ref<boolean>(false)
  const databaseFile = ref<File | undefined>(undefined)

  const { handleFileInput: handleFileUpload, files } = useFileStorage({
    clearOldFiles: false,
  })

  function openUploadModal() {
    isUploadModalOpen.value = true
  }

  function closeUploadModal() {
    databaseFile.value = undefined
    isUploadModalOpen.value = false
  }

  async function importDatabase() {
    if (!files.value) {
      console.log('Nenhum arquivo foi selecionado.')
      return
    }

    await $fetch('/api/database/import', {
      method: 'POST',
      body: {
        files: files.value,
      },
    })

    closeUploadModal()
  }

  async function exportDatabase() {
    window.open('/api/database/export', '_blank')
  }

  return {
    databaseFile,
    isUploadModalOpen,
    openUploadModal,
    closeUploadModal,
    handleFileUpload,
    importDatabase,
    exportDatabase,
  }
}
