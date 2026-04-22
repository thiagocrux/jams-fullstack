<script setup lang="ts">
  import {
    DialogOverlay,
    type DialogOverlayProps,
    useForwardProps,
  } from 'radix-vue'
  import { cn } from '../../../utils/cn'

  const props = defineProps<DialogOverlayProps & { class?: string }>()
  const forwardedProps = useForwardProps(props)
</script>

<template>
  <DialogOverlay
    v-bind="forwardedProps"
    :class="
      cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        props.class
      )
    "
  />
</template>
