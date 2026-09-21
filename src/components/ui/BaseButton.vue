<script setup lang="ts">
import { ArrowDownRight, Download } from 'lucide-vue-next'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  href?: string
  variant?: 'primary' | 'secondary' | 'text' | 'ghost'
  target?: '_blank' | '_self'
  block?: boolean
}>(), { href: undefined, variant: 'primary', target: '_self', block: false })

const classes = computed(() => {
  const base = 'group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition duration-200 focus-visible:outline-none active:scale-[0.98]'
  const size = props.block ? 'w-full sm:w-auto' : ''
  const variants = {
    primary: 'bg-[var(--color-ink)] text-white hover:bg-[var(--color-accent-strong)]',
    secondary: 'bg-[var(--color-accent-soft)] text-[var(--color-ink)] hover:bg-[var(--color-line)]',
    text: 'px-1 text-[var(--color-ink)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-[0.4rem] hover:text-[var(--color-accent-strong)]',
    ghost: 'bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-canvas-deep)]',
  }
  return [base, size, variants[props.variant]].filter(Boolean).join(' ')
})
</script>

<template>
  <component :is="href ? 'a' : 'button'" :href="href" :target="target" :rel="target === '_blank' ? 'noreferrer' : undefined" :class="classes">
    <span>{{ label }}</span>
    <Download v-if="variant === 'secondary'" class="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
    <ArrowDownRight v-else-if="variant === 'primary'" class="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
  </component>
</template>
