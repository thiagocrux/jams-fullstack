<script setup lang="ts">
  import { useVModel } from '@vueuse/core'
  import { cn } from '../../../utils/cn'

  const props = defineProps<{
    defaultValue?: string | number
    modelValue?: string | number
    class?: string
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void
  }>()

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  })
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        'flex bg-transparent file:bg-transparent disabled:opacity-50 shadow-sm px-3 py-1 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full h-9 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm transition-colors disabled:cursor-not-allowed',
        $attrs.class ?? ''
      )
    "
  />
</template>
