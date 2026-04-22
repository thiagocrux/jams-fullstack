<script setup lang="ts">
  import {
    DialogDescription,
    type DialogDescriptionProps,
    useForwardProps,
  } from 'radix-vue'
  import { cn } from '../../../utils/cn'

  const props = defineProps<DialogDescriptionProps & { class?: string }>()
  const forwardedProps = useForwardProps(props)
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
