<script setup lang="ts">
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { navLinks, socials } from '@/data/portfolio'
const currentYear = new Date().getFullYear()
</script>
<template>
  <footer class="mt-8 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-muted)]">
    <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div><p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Ilyass Bouissa</p><p class="mt-2 max-w-sm leading-relaxed">Achats IT × Ingénierie logicielle</p></div>
      <nav class="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em]"><a v-for="link in navLinks" :key="link.id" class="transition hover:text-[var(--color-ink)]" :href="`#${link.id}`">{{ link.label }}</a></nav>
    </div>
    <div class="mt-8 flex flex-wrap items-center justify-between gap-4"><div class="flex flex-wrap gap-3"><SocialLinkItem v-for="social in socials" :key="social.id" :social="social" /></div><p class="text-xs">© {{ currentYear }} Tous droits réservés.</p></div>
  </footer>
</template>
