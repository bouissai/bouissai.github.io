<script setup lang="ts">
import { journey } from '@/data/portfolio'
import { motion } from 'motion-v'
</script>

<template>
  <section id="parcours" data-snap-section class="py-20 sm:py-24">
    <div class="section-inner grid gap-14 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
      <motion.header class="lg:sticky lg:top-32 lg:self-start" :initial="{ opacity: 0, x: -20 }" :while-in-view="{ opacity: 1, x: 0 }" :viewport="{ once: true, amount: 0.3 }" :transition="{ duration: 0.5 }">
        <p class="eyebrow">Parcours</p>
        <h2 class="section-title mt-4">Du code à la décision.</h2>
        <p class="body-copy mt-6 leading-7">Un parcours construit entre ingénierie logicielle, pilotage de projet et achats technologiques.</p>
      </motion.header>
      <ol>
        <motion.li v-for="(item, index) in journey" :key="item.id" class="grid gap-3 border-t border-[var(--color-line)] py-7 first:pt-0 sm:grid-cols-[8.5rem_1fr]" :initial="{ opacity: 0, y: 18 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.3 }" :transition="{ duration: 0.42, delay: Math.min(index * 0.04, 0.16) }">
          <time class="font-[var(--font-mono)] text-xs leading-5 text-[var(--color-muted)]">{{ item.period }}</time>
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">{{ item.organization }}</p>
            <h3 class="mt-2 font-[var(--font-display)] text-xl font-semibold leading-tight tracking-[-0.025em]">{{ item.role }}</h3>
            <p class="body-copy mt-3 text-sm leading-6">{{ item.summary }}</p>
          </div>
        </motion.li>
      </ol>
    </div>
  </section>
</template>
