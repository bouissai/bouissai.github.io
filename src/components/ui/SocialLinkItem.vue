<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { SocialLink } from '@/data/portfolio'

// Avec vite-svg-loader, ces imports sont des composants Vue
import GitHubIcon from '@/assets/gh.svg'
import LinkedinIcon from '@/assets/linkedin.svg'

const props = defineProps<{ social: SocialLink }>()

const iconCompMap: Record<string, Component> = {
  github: GitHubIcon,
  linkedin: LinkedinIcon
}

const IconComp = computed<Component | null>(() => iconCompMap[props.social.icon] ?? null)
</script>

<template>
  <a
    class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:border-sky-400/60 hover:text-white"
    :href="props.social.href"
    target="_blank"
    rel="noreferrer"
  >
    <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold uppercase">
      <component
        v-if="IconComp"
        :is="IconComp"
        class="h-6 w-6 text-sky-200"
        role="img"
        :aria-label="`${props.social.label} icon`"
      />
      <template v-else>
        {{ props.social.icon.slice(0, 2) }}
      </template>
    </span>
    <span>{{ props.social.label }}</span>
  </a>
</template>
