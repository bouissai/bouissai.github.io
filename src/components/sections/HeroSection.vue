<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { heroContent, socials } from '@/data/portfolio'
</script>

<template>
  <section
    id="home"
    class="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-900/30 px-6 py-20 shadow-2xl shadow-blue-900/20 md:px-12 lg:py-24"
  >
    <div class="absolute -left-40 top-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
    <div class="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
    <div class="relative mx-auto max-w-4xl text-center">
      <p class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80 backdrop-blur">
        {{ heroContent.badge }}
      </p>
      <h1 class="mt-8 text-4xl font-semibold text-white md:text-6xl">
        {{ heroContent.title }}
      </h1>
      <p class="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
        {{ heroContent.description }}
      </p>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <BaseButton
          :label="heroContent.ctaPrimary.label"
          :href="heroContent.ctaPrimary.href"
        />
        <BaseButton
          variant="ghost"
          :label="heroContent.ctaSecondary.label"
          :href="heroContent.ctaSecondary.href"
          target="_blank"
        />
      </div>
      <div class="mt-12 flex flex-wrap justify-center gap-3">
        <SocialLinkItem
          v-for="social in socials"
          :key="social.id"
          :social="social"
        />
      </div>
    </div>
  </section>
</template>
