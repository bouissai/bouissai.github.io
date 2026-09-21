<script setup lang="ts">
import { navLinks } from '@/data/portfolio'
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[var(--color-ink)] py-8 text-sm text-[#c9c3b9]">
    <div class="footer-inner flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <p><span class="font-semibold text-white">Ilyass Bouissa</span> — Achats IT × Ingénierie logicielle</p>
      <nav class="flex flex-wrap gap-x-5 gap-y-2 text-xs" aria-label="Navigation de pied de page">
        <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="min-h-6 transition hover:text-white">{{ link.label }}</a>
      </nav>
      <p class="text-xs">© {{ currentYear }}</p>
    </div>
  </footer>
</template>
