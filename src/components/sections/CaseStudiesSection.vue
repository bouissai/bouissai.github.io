<script setup lang="ts">
import { caseStudies } from '@/data/portfolio'
import { ArrowUpRight, Check } from 'lucide-vue-next'
import { motion } from 'motion-v'
</script>

<template>
  <section id="realisations" data-snap-section class="flex items-center py-20 sm:py-24">
    <div class="section-inner">
      <motion.header class="grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end" :initial="{ opacity: 0, y: 20 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.35 }" :transition="{ duration: 0.5 }">
        <div>
          <p class="eyebrow">Réalisations</p>
          <h2 class="section-title mt-4">Des preuves, pas des promesses.</h2>
        </div>
        <p class="body-copy text-base leading-7 md:justify-self-end">Des achats technologiques au produit livré, chaque cas relie décision, architecture et exploitation.</p>
      </motion.header>

      <div class="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.article v-for="(study, index) in caseStudies" :key="study.id" class="flex flex-col" :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.25 }" :transition="{ duration: 0.5, delay: index * 0.08 }">
          <div class="flex items-start justify-between gap-5 border-b border-[var(--color-line)] pb-5">
            <span class="font-[var(--font-display)] text-5xl font-semibold text-[var(--color-accent-soft)]">0{{ index + 1 }}</span>
            <span class="max-w-xs text-right text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">{{ study.eyebrow }}</span>
          </div>
          <h3 class="mt-7 max-w-xl font-[var(--font-display)] text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{{ study.title }}</h3>
          <p class="body-copy mt-4 leading-7">{{ study.summary }}</p>
          <ul class="mt-7 grid gap-3 text-sm">
            <li v-for="proof in study.proofs" :key="proof" class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-moss-soft)] text-[var(--color-moss)]"><Check class="h-3.5 w-3.5" aria-hidden="true" /></span>
              <span>{{ proof }}</span>
            </li>
          </ul>
          <div class="mt-7 flex flex-wrap gap-x-3 gap-y-2 text-xs text-[var(--color-muted)]">
            <span v-for="tag in study.tags" :key="tag">#{{ tag }}</span>
          </div>
          <div v-if="study.links.length" class="mt-6 flex flex-wrap gap-5">
            <a v-for="link in study.links" :key="link.id" :href="link.href" :target="link.external ? '_blank' : undefined" :rel="link.external ? 'noreferrer' : undefined" class="text-link text-sm">
              {{ link.label }} <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.article>
      </div>
    </div>
  </section>
</template>
