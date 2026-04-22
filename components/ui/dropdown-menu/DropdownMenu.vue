<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'radix-vue'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
