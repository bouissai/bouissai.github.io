<script setup lang="ts">
import type { Experience } from '@/data/portfolio'

defineProps<{ experience: Experience }>()
</script>

<template>
  <article
    class="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 transition hover:border-white/30 hover:bg-white/10">

    <header class="flex flex-wrap items-center justify-between gap-3">
      <!-- Bloc gauche : logo + infos -->
      <div class="flex items-center gap-4">
        <img
          :src="experience.companyImg"
          alt=""
          class="h-10 w-10 rounded-md object-cover border border-white/10"
        />
        <div>
          <h3 class="text-lg font-semibold text-white leading-tight">
            {{ experience.role }}
          </h3>
          <p class="text-sm text-sky-200">
            {{ experience.company }}
          </p>
        </div>
      </div>

      <!-- Période à droite -->
      <span class="text-xs uppercase tracking-[0.2em] text-white/40">
        {{ experience.period }}
      </span>
    </header>

    <!-- Description -->
    <p class="mt-4 text-sm leading-relaxed">
      {{ experience.description }}
    </p>

    <!-- Achievements -->
    <ul class="mt-6 space-y-3 text-sm leading-relaxed text-white/70">
      <li
        v-for="achievement in experience.achievements"
        :key="achievement"
        class="flex gap-3"
      >
        <svg
          class="mt-1 h-4 w-4 flex-none text-sky-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
        <span>{{ achievement }}</span>
      </li>
    </ul>
  </article>
</template>
