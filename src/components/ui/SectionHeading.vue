<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="max-w-2xl">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80">
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 text-3xl font-semibold text-white md:text-4xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-4 text-sm leading-relaxed text-white/70">
      {{ description }}
    </p>
  </header>
</template>
