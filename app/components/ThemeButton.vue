<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Moon, Sun } from 'lucide-vue-next'

interface Props {
  iconOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconOnly: false,
})

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button
    @click="toggleTheme"
    variant="ghost"
    size="icon"
  >
    <ClientOnly>
      <Sun v-if="colorMode.preference === 'dark'" class="w-5 h-5" />
      <Moon v-else class="w-5 h-5" />
      <template #fallback><Moon class="w-5 h-5" /></template>
    </ClientOnly>
    <span v-if="!iconOnly" class="ml-2">
      <ClientOnly>
        {{ colorMode.preference === 'dark' ? 'Modo claro' : 'Modo escuro' }}
        <template #fallback>Modo escuro</template>
      </ClientOnly>
    </span>
  </Button>
</template>
