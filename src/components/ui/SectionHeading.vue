<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="max-w-2xl">
    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--color-ink)] md:text-4xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
      {{ description }}
    </p>
  </header>
</template>
