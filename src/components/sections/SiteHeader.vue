<script setup lang="ts">
import { navLinks } from '@/data/portfolio'
import { contactContent } from '@/data/portfolio'
</script>

<template>
  <header class="sticky top-6 z-30">
    <div class="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-6 py-3 backdrop-blur">
      <a class="text-sm font-semibold uppercase tracking-[0.3em] text-white" href="#home">
        Ilyass
      </a>
      <nav class="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
        >
          {{ link.label }}
        </a>
      </nav>
      <a
        class="hidden rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-sky-400/50 hover:text-sky-100 md:inline-flex"
        :href="`mailto:${contactContent.email}`"
      >
        Discuter
      </a>
      <button class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden">
        <span class="sr-only">Menu</span>
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </div>
  </header>
</template>
