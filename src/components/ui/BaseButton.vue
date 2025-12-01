<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    href?: string
    variant?: 'primary' | 'ghost'
    target?: '_blank' | '_self'
    block?: boolean
  }>(),
  {
    variant: 'primary',
    href: undefined,
    target: '_self',
    block: false
  }
)

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const contentClasses = computed(() =>
  [baseClasses, props.block ? 'w-full sm:w-auto' : ''].filter(Boolean).join(' ')
)

const rootClasses = computed(() =>
  ['group', props.block ? 'w-full sm:w-auto' : 'inline-block'].filter(Boolean).join(' ')
)

const variants = {
  primary:
    'bg-gradient-to-r from-blue-500 via-purple-500 to-sky-400 text-white shadow-lg shadow-blue-500/20 hover:opacity-90 focus-visible:outline-blue-500',
  ghost:
    'border border-white/20 bg-white/0 text-white hover:bg-white/10 focus-visible:outline-white'
} as const
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    :target="props.target"
    :class="rootClasses"
  >
    <span :class="[contentClasses, variants[props.variant]]">
      <span>{{ props.label }}</span>
      <svg
        v-if="props.variant === 'primary'"
        class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </span>
  </component>
</template>
