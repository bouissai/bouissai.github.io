<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { aboutContent } from '@/data/portfolio'
</script>

<template>
  <section id="about" class="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 px-6 py-16 md:px-12 lg:py-20">
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
    <div>
      <SectionHeading
        eyebrow="À propos"
        :title="aboutContent.title"
        class="mb-6"
      />
      <div class="space-y-6 text-sm leading-7 text-white/70">
        <p v-for="paragraph in aboutContent.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </div>
    <dl class="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md md:grid-cols-3">
      <div
        v-for="highlight in aboutContent.highlights"
        :key="highlight.label"
        class="flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-5 text-center"
      >
        <dt class="text-xs uppercase tracking-[0.3em] text-white/40">{{ highlight.label }}</dt>
        <dd class="flex flex-col items-center gap-2">
          <div
            v-if="highlight.images?.length"
            class="flex items-center justify-center gap-3"
          >
            <img
              v-for="(imageSrc, idx) in highlight.images"
              :key="`${highlight.label}-${idx}`"
              :src="imageSrc"
              :alt="highlight.value || highlight.label"
              class="h-12 w-auto rounded-lg object-contain"
            />
          </div>
          <span v-else class="text-xl font-semibold text-white">{{ highlight.value }}</span>
          <span class="sr-only">{{ highlight.value }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>
