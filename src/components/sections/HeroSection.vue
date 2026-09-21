<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { heroContent, socials } from '@/data/portfolio'
import { motion } from 'motion-v'
</script>

<template>
  <section id="home" data-snap-section aria-labelledby="home-title" class="flex items-center overflow-hidden py-12 sm:py-16">
    <div class="section-inner grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.68fr)] lg:gap-20">
      <motion.div :initial="{ opacity: 0, y: 24 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.58, ease: 'easeOut' }">
        <p class="eyebrow">{{ heroContent.eyebrow }}</p>
        <h1 id="home-title" class="display-title mt-6 max-w-5xl text-[clamp(3rem,7vw,7rem)]">
          Je relie la décision <span class="text-[var(--color-accent)]">d’achat</span> à la réalité technique.
        </h1>
        <p class="body-copy mt-7 text-lg leading-8 sm:text-xl">{{ heroContent.description }}</p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <BaseButton v-for="action in heroContent.actions" :key="action.id" :label="action.label" :href="action.href" :target="action.external ? '_blank' : '_self'" :variant="action.variant" :block="action.variant !== 'text'" />
        </div>
        <dl class="mt-9 flex flex-wrap gap-x-10 gap-y-4">
          <div v-for="highlight in heroContent.highlights" :key="highlight.label">
            <dt class="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)]">{{ highlight.label }}</dt>
            <dd class="mt-1 font-[var(--font-display)] text-xl font-semibold tracking-[-0.03em]">{{ highlight.value }}</dd>
          </div>
        </dl>
        <div class="mt-8 flex flex-wrap gap-3">
          <SocialLinkItem v-for="social in socials" :key="social.id" :social="social" />
        </div>
      </motion.div>

      <motion.figure data-profile-frame class="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end" :initial="{ opacity: 0, scale: 0.94, rotate: 2 }" :animate="{ opacity: 1, scale: 1, rotate: 0 }" :transition="{ duration: 0.7, delay: 0.12, ease: 'easeOut' }">
        <div data-profile-halo class="absolute inset-5 -rotate-6 rounded-[42%_58%_52%_48%/38%_42%_58%_62%] bg-[var(--color-canvas-deep)]" aria-hidden="true" />
        <div class="absolute -right-3 top-12 h-20 w-20 rounded-full border-[1.25rem] border-[var(--color-accent-soft)] opacity-80" aria-hidden="true" />
        <div class="relative z-10 rounded-[3rem_3rem_8rem_3rem] bg-[var(--color-surface)] p-2 shadow-[0_24px_60px_-28px_rgb(23_22_18/0.45)]">
          <img data-profile-image="true" :src="heroContent.photoUrl" :alt="heroContent.photoAlt" width="704" height="704" class="aspect-[4/5] w-full rounded-[2.5rem_2.5rem_7.5rem_2.5rem] object-cover object-top grayscale-[0.08]" fetchpriority="high" />
        </div>
        <figcaption class="relative mt-5 max-w-sm text-sm leading-6 text-[var(--color-muted)]">{{ heroContent.photoCaption }}</figcaption>
      </motion.figure>
    </div>
  </section>
</template>
