<script setup lang="ts">
import { journey } from '@/data/portfolio'
import { motion } from 'motion-v'

const experiences = journey.filter((item) => item.kind === 'experience')
const education = journey.filter((item) => item.kind === 'education')
const isCurrent = (id: string) => id === 'laposte' || id === 'gem'
</script>

<template>
  <section id="parcours" data-snap-section class="py-20 sm:py-24">
    <div class="section-inner grid gap-14 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
      <motion.header class="lg:sticky lg:top-32 lg:self-start" :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }" :viewport="{ once: true, amount: 0.3 }" :transition="{ duration: 0.5 }">
        <p class="eyebrow">Parcours</p>
        <h2 class="section-title mt-4 max-w-[20rem] text-[clamp(2.1rem,4.4vw,4rem)]">Logiciel et achats IT</h2>
        <p class="body-copy mt-6 leading-7">Des expériences en logiciel et en achats IT. Une formation qui complète ce parcours.</p>
      </motion.header>
      <div class="space-y-10">
        <div class="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[0_12px_0_rgba(23,22,18,0.04)] sm:p-6">
          <div class="mb-5 flex items-end justify-between gap-4 border-b border-[var(--color-line)] pb-4">
            <h3 class="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.035em]">Expériences professionnelles</h3>
            <span class="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 font-[var(--font-mono)] text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--color-accent-strong)]">{{ experiences.length }} postes</span>
          </div>
          <ol class="space-y-3" aria-label="Expériences professionnelles, de la plus récente à la plus ancienne">
            <li v-for="item in experiences" :key="item.id" class="grid gap-4 rounded-[1.15rem] border border-transparent bg-[var(--color-canvas)] p-4 sm:grid-cols-[8.75rem_1fr] sm:p-5">
              <div class="flex items-start gap-3 sm:block">
                <motion.span v-if="isCurrent(item.id)" class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-accent-soft)] sm:mb-4 sm:block" :animate="{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }" :transition="{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }" aria-label="Poste actuel" />
                <span v-else class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-line)] sm:mb-4 sm:block" aria-label="Poste terminé"></span>
                <time class="font-[var(--font-mono)] text-xs leading-5 text-[var(--color-muted)]">{{ item.period }}</time>
              </div>
              <div>
                <div class="flex items-start gap-3">
                  <img v-if="item.logo" :src="item.logo" :alt="`Logo ${item.organization}`" width="40" height="40" class="h-10 w-10 rounded-lg border border-[var(--color-line)] bg-white object-contain p-1" />
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">{{ item.organization }}</p>
                    <h4 class="mt-1 font-[var(--font-display)] text-xl font-semibold leading-tight tracking-[-0.025em]">{{ item.role }}</h4>
                  </div>
                </div>
                <p class="body-copy mt-3 text-sm leading-6">{{ item.summary }}</p>
              </div>
            </li>
          </ol>
        </div>
        <div class="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-canvas-deep)] p-4 sm:p-6">
          <div class="mb-5 flex items-end justify-between gap-4 border-b border-[var(--color-line)] pb-4">
            <h3 class="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.035em]">Formations</h3>
            <span class="rounded-full bg-[var(--color-moss-soft)] px-3 py-1 font-[var(--font-mono)] text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--color-moss)]">{{ education.length }} diplômes</span>
          </div>
          <ol class="space-y-3" aria-label="Formations, de la plus récente à la plus ancienne">
            <li v-for="item in education" :key="item.id" class="grid gap-4 rounded-[1.15rem] border border-transparent bg-[var(--color-surface)] p-4 sm:grid-cols-[8.75rem_1fr] sm:p-5">
              <div class="flex items-start gap-3 sm:block">
                <motion.span v-if="isCurrent(item.id)" class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-moss)] ring-4 ring-[var(--color-moss-soft)] sm:mb-4 sm:block" :animate="{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }" :transition="{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }" aria-label="Formation en cours" />
                <span v-else class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-line)] sm:mb-4 sm:block" aria-label="Formation terminée"></span>
                <time class="font-[var(--font-mono)] text-xs leading-5 text-[var(--color-muted)]">{{ item.period }}</time>
              </div>
              <div>
                <div class="flex items-start gap-3">
                  <img v-if="item.logo" :src="item.logo" :alt="`Logo ${item.organization}`" width="40" height="40" class="h-10 w-10 rounded-lg border border-[var(--color-line)] bg-white object-contain p-1" />
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-moss)]">{{ item.organization }}</p>
                    <h4 class="mt-1 font-[var(--font-display)] text-xl font-semibold leading-tight tracking-[-0.025em]">{{ item.role }}</h4>
                  </div>
                </div>
                <p class="body-copy mt-3 text-sm leading-6">{{ item.summary }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
