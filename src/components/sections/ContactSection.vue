<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { contactContent, socials } from '@/data/portfolio'
import { Mail, MapPin, Phone } from 'lucide-vue-next'
import { motion } from 'motion-v'
import { computed } from 'vue'

const phoneHref = computed(() => contactContent.phone ? `tel:${contactContent.phone.replace(/[^+\d]/g, '')}` : '')
</script>

<template>
  <section id="contact" data-snap-section class="flex items-center bg-[var(--color-moss)] py-20 text-white sm:py-24">
    <div class="section-inner">
      <motion.div class="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20" :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.3 }" :transition="{ duration: 0.55 }">
        <div>
          <p class="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.14em] text-[#bed7cc]">Contact</p>
          <h2 class="mt-4 max-w-4xl font-[var(--font-display)] text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">Parlons de ce qu’on peut construire.</h2>
          <p class="mt-7 max-w-2xl text-lg leading-8 text-[#dce9e3]">{{ contactContent.message }}</p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BaseButton label="Programmer un appel" href="https://cal.com/bouissai" target="_blank" />
            <a :href="`mailto:${contactContent.email}`" class="inline-flex min-h-12 items-center justify-center rounded-full bg-white/12 px-6 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-[0.98]">Écrire un email</a>
          </div>
        </div>
        <address class="not-italic">
          <div class="space-y-5 text-sm text-[#dce9e3]">
            <a class="flex min-h-12 items-center gap-4 transition hover:text-white" :href="`mailto:${contactContent.email}`"><Mail class="h-5 w-5 shrink-0" aria-hidden="true" /><span class="break-all">{{ contactContent.email }}</span></a>
            <a v-if="contactContent.phone" class="flex min-h-12 items-center gap-4 transition hover:text-white" :href="phoneHref"><Phone class="h-5 w-5 shrink-0" aria-hidden="true" /><span>{{ contactContent.phone }}</span></a>
            <p v-if="contactContent.location" class="flex min-h-12 items-center gap-4"><MapPin class="h-5 w-5 shrink-0" aria-hidden="true" /><span>{{ contactContent.location }}</span></p>
          </div>
          <div class="mt-7 flex flex-wrap gap-3">
            <SocialLinkItem v-for="social in socials" :key="social.id" :social="social" />
          </div>
        </address>
      </motion.div>
    </div>
  </section>
</template>
