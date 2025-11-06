<script setup lang="ts">
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { navLinks, socials } from '@/data/portfolio'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-20 border-t border-white/10 pt-10 text-sm text-white/60">
    <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-sky-200/80">Ilyass Bouissa</p>
        <p class="mt-2 max-w-sm leading-relaxed">
          Entre design, code et stratégie IT
        </p>
      </div>
      <nav class="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        <a
          v-for="link in navLinks"
          :key="link.id"
          class="transition hover:text-white"
          :href="`#${link.id}`"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
    <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap gap-3">
        <SocialLinkItem
          v-for="social in socials"
          :key="social.id"
          :social="social"
        />
      </div>
      <p class="text-xs text-white/40">
        © {{ currentYear }} Tous droits réservés.
      </p>
    </div>
  </footer>
</template>
