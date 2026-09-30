<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { localizedPortfolio } from '@/i18n'
import { ArrowDownRight } from 'lucide-vue-next'
import { motion } from 'motion-v'

const content = localizedPortfolio
</script>

<template>
  <section id="expertise" data-snap-section class="flex items-center bg-[var(--color-ink)] py-20 text-white sm:py-24">
    <div class="section-inner">
      <motion.div :initial="{ opacity: 0, y: 20 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.35 }" :transition="{ duration: 0.5 }">
        <SectionHeading :eyebrow="content.ui.expertise.eyebrow" :title="content.ui.expertise.title" :description="content.ui.expertise.description" />
      </motion.div>
      <div class="mt-14 grid gap-12 md:grid-cols-2 md:gap-0">
        <motion.article v-for="(item, index) in content.expertise" :key="item.id" class="relative md:pr-12 md:odd:border-r md:odd:border-white/20 md:even:pl-12" :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.3 }" :transition="{ duration: 0.48, delay: index * 0.08 }">
          <p class="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.14em] text-[#f4a58e]">{{ item.eyebrow }}</p>
          <h3 class="mt-6 max-w-xl font-[var(--font-display)] text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{{ item.title }}</h3>
          <p class="mt-5 max-w-xl text-base leading-7 text-[#d9d3ca]">{{ item.description }}</p>
          <ul class="mt-8 space-y-4 text-sm text-[#f4efe6]">
            <li v-for="capability in item.capabilities" :key="capability" class="flex items-center gap-3">
              <ArrowDownRight class="h-4 w-4 shrink-0 text-[#f4a58e]" aria-hidden="true" />
              <span>{{ capability }}</span>
            </li>
          </ul>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.eyebrow) { color: #f4a58e; }
:deep(.section-title) { color: white; }
:deep(.body-copy) { color: #d9d3ca; }
</style>
