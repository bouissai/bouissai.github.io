<script setup lang="ts">
import type { Project } from '@/data/portfolio'
import { ArrowUpRight, Play } from 'lucide-vue-next'

defineProps<{ project: Project; featured?: boolean }>()
</script>

<template>
  <article class="group flex h-full flex-col py-7 first:pt-0 lg:py-0">
    <div class="flex items-center justify-between gap-4">
      <p class="eyebrow">{{ featured ? 'Projet phare' : 'Projet technique' }}</p>
      <span class="font-[var(--font-mono)] text-xs text-[var(--color-muted)]">{{ project.tags[0] }}</span>
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
      <a v-if="project.href" :href="project.href" target="_blank" rel="noreferrer" class="text-link text-sm">Voir le produit <ArrowUpRight class="h-4 w-4" aria-hidden="true" /></a>
      <a v-if="project.repo" :href="project.repo" target="_blank" rel="noreferrer" class="text-link text-sm">Code source <ArrowUpRight class="h-4 w-4" aria-hidden="true" /></a>
      <a v-if="project.demo" :href="project.demo" target="_blank" rel="noreferrer" class="text-link text-sm">Démonstration <Play class="h-4 w-4" aria-hidden="true" /></a>
    </div>
  </article>
</template>
