<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { contactContent, socials } from '@/data/portfolio'
import { Mail, MapPin, Phone } from 'lucide-vue-next'
import { computed } from 'vue'
const phoneHref = computed(() => contactContent.phone ? `tel:${contactContent.phone.replace(/[^+\d]/g, '')}` : '')
</script>
<template>
  <section id="contact" class="border-t border-[var(--color-line)] py-16 sm:py-24">
    <div class="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
      <SectionHeading eyebrow="Contact" :title="contactContent.title" :description="contactContent.message" />
      <div class="border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">Un sujet à débloquer ?</p>
        <p class="mt-4 text-lg leading-relaxed text-[var(--color-ink)]">Parlons d’un besoin d’achats IT, d’un projet logiciel ou d’un poste hybride.</p>
        <BaseButton class="mt-6" label="Programmer un appel" href="https://cal.com/bouissai" target="_blank" />
        <div class="mt-8 flex flex-wrap gap-3"><SocialLinkItem v-for="social in socials" :key="social.id" :social="social" /></div>
      </div>
    </div>
    <div class="mt-10 grid gap-3 sm:grid-cols-3">
      <a class="border border-[var(--color-line)] p-4 text-sm transition hover:border-[var(--color-ink)]" :href="`mailto:${contactContent.email}`"><Mail class="mb-3 h-5 w-5 text-[var(--color-accent)]" /><span class="block text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Email</span><span class="mt-1 block text-[var(--color-ink)]">{{ contactContent.email }}</span></a>
      <a v-if="contactContent.phone" class="border border-[var(--color-line)] p-4 text-sm transition hover:border-[var(--color-ink)]" :href="phoneHref"><Phone class="mb-3 h-5 w-5 text-[var(--color-accent)]" /><span class="block text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Téléphone</span><span class="mt-1 block text-[var(--color-ink)]">{{ contactContent.phone }}</span></a>
      <div v-if="contactContent.location" class="border border-[var(--color-line)] p-4 text-sm"><MapPin class="mb-3 h-5 w-5 text-[var(--color-accent)]" /><span class="block text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Localisation</span><span class="mt-1 block text-[var(--color-ink)]">{{ contactContent.location }}</span></div>
    </div>
  </section>
</template>
