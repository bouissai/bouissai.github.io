<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { heroContent, socials } from '@/data/portfolio'
</script>

<template>
  <section
    id="home"
    aria-labelledby="home-title"
    class="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-br from-slate-900 via-slate-900/90 to-slate-900/30 shadow-2xl shadow-blue-900/20 px-12 py-7 md:px-12 md:py-7"
  >
    <div class="absolute -left-40 top-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
    <div class="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
    <div class="relative mx-auto max-w-6xl">
      <div class="flex flex-col-reverse items-center gap-10 text-center md:gap-12 lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div class="max-w-3xl md:max-w-2xl lg:max-w-3xl">
          <p class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80 backdrop-blur">
            {{ heroContent.badge }}
          </p>
          <h1 id="home-title" class="mt-6 text-3xl font-semibold text-white md:mt-8 md:text-5xl lg:text-6xl">
            {{ heroContent.title }}
          </h1>
          <p class="mt-4 text-base leading-relaxed text-white/70 md:mt-6 md:text-lg">
            {{ heroContent.description }}
          </p>
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
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
          <div class="mt-12 flex flex-wrap justify-center gap-3 lg:justify-start">
            <SocialLinkItem
              v-for="social in socials"
              :key="social.id"
              :social="social"
            />
          </div>
        </div>
        <figure class="order-1 w-full max-w-xs sm:max-w-sm lg:order-2 lg:max-w-sm lg:self-center">
          <div class="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-slate-900/40">
            <div class="relative overflow-hidden rounded-4xl">
              <img
                :src="heroContent.photoUrl"
                :alt="heroContent.photoAlt"
                class="h-full w-full object-center grayscale transition duration-500 hover:scale-105 hover:grayscale-0"
                loading="lazy"
              />
              <div class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-900/80 to-transparent" />
            </div>
          </div>
          <figcaption class="mt-4 text-center text-sm font-medium text-white/80">
            {{ heroContent.photoCaption }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
