<script setup lang="ts">
import type { SkillGroup } from '@/data/portfolio'

defineProps<{
  group: SkillGroup
}>()
</script>

<template>
  <article class="rounded-3xl border border-white/5 bg-white/0 p-6 transition hover:border-white/20 hover:bg-white/5">
    <h3 class="text-base font-semibold text-white">
      {{ group.title }}
    </h3>
    <ul class="mt-4 space-y-2 text-sm text-white/70">
      <li v-for="item in group.items" :key="item" class="flex items-center gap-3">
        <span class="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-purple-300" />
        <span>{{ item }}</span>
      </li>
    </ul>
  </article>
</template>
