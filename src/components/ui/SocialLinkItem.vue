<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { SocialLink } from '@/data/portfolio'

// Avec vite-svg-loader, ces imports sont des composants Vue
import GitHubIcon from '@/assets/gh.svg'
import LinkedinIcon from '@/assets/linkedin.svg'

const props = defineProps<{ social: SocialLink }>()

const iconCompMap = {
  github: GitHubIcon,
  linkedin: LinkedinIcon
} as const

const IconComp = computed<Component | null>(() => {
  const comp = iconCompMap[props.social.icon as keyof typeof iconCompMap]
  return comp && typeof comp !== 'string' ? comp : null
})
</script>

<template>
  <a
    class="inline-flex min-h-11 items-center gap-2 border border-[var(--color-line)] px-4 text-sm text-[var(--color-ink)] transition hover:border-[var(--color-ink)]"
    :href="props.social.href"
    target="_blank"
    rel="noreferrer"
  >
    <span class="inline-flex h-5 w-5 items-center justify-center text-xs font-semibold uppercase">
      <component
        v-if="IconComp"
        :is="IconComp"
        class="h-5 w-5"
        aria-hidden="true"
      />
      <template v-else>
        {{ props.social.icon.slice(0, 2) }}
      </template>
    </span>
    <span>{{ props.social.label }}</span>
  </a>
</template>
