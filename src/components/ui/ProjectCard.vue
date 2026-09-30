<script setup lang="ts">
import type { Project } from '@/data/portfolio'
import { localizedPortfolio } from '@/i18n'
import { ArrowUpRight, Play } from 'lucide-vue-next'

defineProps<{ project: Project; featured?: boolean }>()
const content = localizedPortfolio

const embedUrl = (url?: string) => {
  if (!url) return ''
  const videoId = url.includes('youtu.be/') ? url.split('youtu.be/')[1]?.split(/[?&]/)[0] : new URL(url).searchParams.get('v')
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url
}
</script>

<template>
  <article class="project-card group flex h-full flex-col rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-[0_10px_0_rgba(23,22,18,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_18px_30px_rgba(23,22,18,0.10)] sm:p-6">
    <div class="flex items-center justify-between gap-4">
      <p class="eyebrow">{{ featured ? content.ui.projects.featured : content.ui.projects.technical }}</p>
      <span class="font-[var(--font-mono)] text-xs text-[var(--color-muted)]">{{ project.tags[0] }}</span>
    </div>
    <div v-if="project.demo" class="mt-5 aspect-[16/10] overflow-hidden rounded-[1rem] bg-[var(--color-canvas-deep)]">
      <iframe :src="embedUrl(project.demo)" :title="`${content.ui.projects.videoTitle} ${project.title}`" class="h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <h3 class="mt-5 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-[var(--color-accent-strong)]">{{ project.title }}</h3>
    <p class="body-copy mt-4 leading-7">{{ project.summary }}</p>
    <ul class="mt-6 space-y-2 text-sm text-[var(--color-muted)]">
      <li v-for="feature in project.features" :key="feature" class="before:mr-3 before:text-[var(--color-accent)] before:content-['/']">{{ feature }}</li>
    </ul>
    <div class="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 text-xs text-[var(--color-muted)]">
      <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="mt-5 flex flex-wrap gap-5">
      <a v-if="project.href" :href="project.href" target="_blank" rel="noreferrer" class="text-link text-sm">{{ content.ui.projects.product }} <ArrowUpRight class="h-4 w-4" aria-hidden="true" /></a>
      <a v-if="project.repo" :href="project.repo" target="_blank" rel="noreferrer" class="text-link text-sm">{{ content.ui.projects.source }} <ArrowUpRight class="h-4 w-4" aria-hidden="true" /></a>
      <a v-if="project.demo" :href="project.demo" target="_blank" rel="noreferrer" class="text-link text-sm">{{ content.ui.projects.demo }} <Play class="h-4 w-4" aria-hidden="true" /></a>
    </div>
  </article>
</template>
