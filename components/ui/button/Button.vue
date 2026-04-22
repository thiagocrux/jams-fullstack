<script setup lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority'
  import { cn } from '../../../utils/cn'

  /**
   * Button variants using class-variance-authority.
   */
  const buttonVariants = cva(
    'inline-flex justify-center items-center disabled:opacity-50 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium text-sm transition-colors disabled:pointer-events-none',
    {
      variants: {
        variant: {
          default:
            'bg-primary text-primary-foreground shadow hover:bg-primary/90',
          destructive:
            'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
          outline:
            'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
          secondary:
            'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-9 px-4 py-2',
          sm: 'h-8 rounded-md px-3 text-xs',
          lg: 'h-10 rounded-md px-8',
          icon: 'h-9 w-9',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  )

  /**
   * Props for the Button component.
   */
  interface Props
    extends /* @vue-ignore */ VariantProps<typeof buttonVariants> {
    /**
     * Additional CSS classes.
     */
    class?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'default',
  })
</script>

<template>
  <button
    :class="
      cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        $attrs.class ?? ''
      )
    "
  >
    <slot />
  </button>
</template>
