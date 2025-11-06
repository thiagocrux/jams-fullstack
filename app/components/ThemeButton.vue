<script setup lang="ts">
interface Props {
  iconOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconOnly: false,
})

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <u-button
    @click="toggleTheme"
    :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
    variant="ghost"
    color="neutral"
  >
    <template v-if="!iconOnly">
      {{ colorMode.value === 'dark' ? 'Modo claro' : 'Modo escuro' }}
    </template>
  </u-button>
</template>
