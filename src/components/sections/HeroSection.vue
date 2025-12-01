<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { heroContent, socials } from '@/data/portfolio'
</script>

<template>
  <section
    id="home"
    aria-labelledby="home-title"
    class="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900/90 to-slate-900/30 shadow-2xl shadow-blue-900/20 px-5 py-6 sm:px-8 md:rounded-[2.5rem] md:px-12 md:py-7"
  >
    <div class="absolute -left-40 top-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
    <div class="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
    <div class="relative mx-auto max-w-6xl">
      <div class="flex flex-col gap-10 text-left md:gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-3xl md:max-w-2xl lg:max-w-3xl">
          <p class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80 backdrop-blur">
            {{ heroContent.badge }}
          </p>
          <h1 id="home-title" class="mt-6 text-3xl font-semibold text-white sm:text-4xl md:mt-8 md:text-5xl lg:text-6xl">
            {{ heroContent.title }}
          </h1>
          <p class="mt-4 text-base leading-relaxed text-white/70 md:mt-6 md:text-lg">
            {{ heroContent.description }}
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
            <BaseButton
              :block="true"
              :label="heroContent.ctaPrimary.label"
              :href="heroContent.ctaPrimary.href"
            />
            <BaseButton
              variant="ghost"
              :block="true"
              :label="heroContent.ctaSecondary.label"
              :href="heroContent.ctaSecondary.href"
              target="_blank"
            />
          </div>
          <div
            v-if="heroContent.highlights?.length"
            class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="highlight in heroContent.highlights"
              :key="highlight.label"
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-white/5"
            >
              <p class="text-2xl font-semibold text-white">{{ highlight.value }}</p>
              <p class="text-[0.7rem] uppercase tracking-[0.3em] text-white/70">
                {{ highlight.label }}
              </p>
              <p class="mt-1 text-sm text-white/60">
                {{ highlight.description }}
              </p>
            </div>
          </div>
          <div class="mt-8 flex flex-wrap gap-3">
            <SocialLinkItem
              v-for="social in socials"
              :key="social.id"
              :social="social"
            />
          </div>
        </div>
        <figure class="order-first w-full max-w-xs self-center sm:max-w-sm lg:order-last lg:max-w-sm">
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
