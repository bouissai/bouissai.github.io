<script setup lang="ts">
import type { SocialLink } from '@/data/portfolio'
import { Github, Linkedin } from 'lucide-vue-next'

defineProps<{ social: SocialLink }>()
const icons = { github: Github, linkedin: Linkedin }
</script>

<template>
  <a class="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] transition duration-200 hover:bg-[var(--color-canvas-deep)] active:scale-[0.98]" :href="social.href" target="_blank" rel="noreferrer">
    <component :is="icons[social.icon]" class="h-5 w-5 shrink-0" aria-hidden="true" />
    <span>{{ social.label }}</span>
  </a>
</template>
