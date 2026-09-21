<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; description?: string }>()
</script>

<template>
  <header class="max-w-3xl">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title mt-4">{{ title }}</h2>
    <p v-if="description" class="body-copy mt-6 text-base leading-7 sm:text-lg">{{ description }}</p>
  </header>
</template>
