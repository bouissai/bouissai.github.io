<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import SocialLinkItem from '@/components/ui/SocialLinkItem.vue'
import { contactContent, socials } from '@/data/portfolio'
import { Mail, MapPin, Phone } from 'lucide-vue-next'
import { computed } from 'vue'

const phoneHref = computed(() =>
  contactContent.phone ? `tel:${contactContent.phone.replace(/[^+\d]/g, '')}` : ''
)
</script>

<template>
  <section id="contact"
    class="relative overflow-hidden rounded-[2.5rem] border border-sky-400/20 bg-gradient-to-br from-sky-500/20 via-slate-900 to-purple-500/10 px-6 py-16 shadow-lg shadow-sky-900/30 md:px-12 lg:py-20">
    <div
      class="absolute inset-y-0 right-0 -z-10 h-full w-1/2 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3),_transparent_65%)] opacity-40 blur-3xl" />
    <div class="gap-16 lg:grid-cols-[0.7fr_0.3fr] lg:items-center">
      <div class="space-y-10 mb-4">
        <SectionHeading eyebrow="Contact" :title="contactContent.title" :description="contactContent.message" />
      </div>
      <div class="flex-col items-center space-y-4">

        <div class="flex-col rounded-3xl border border-white/10 bg-slate-900/50 p-6 text-center">
          <p class="text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Travaillons ensemble
          </p>
          <p class="mt-4 text-base text-white/80">
            Partagez un projet, un produit à lancer ou une mission d’accompagnement design.
          </p>

          <div class="m-6">
            <BaseButton label="Programmer un appel" href="https://cal.com/bouissai" target="_blank" />
          </div>

          <div class="mt-12 flex flex-wrap justify-center gap-3">
            <SocialLinkItem v-for="social in socials" :key="social.id" :social="social" />
          </div>
        </div>



        <div class="space-y-6">
          <div class="grid gap-3">
            <a class="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80 transition hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
              :href="`mailto:${contactContent.email}`">
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400/10 text-sky-200">
                <Mail class="h-5 w-5" />
              </span>
              <div class="text-left">
                <p class="text-xs uppercase tracking-[0.2em] text-white/40">Email</p>
                <p class="text-sm font-medium">{{ contactContent.email }}</p>
              </div>
            </a>
            <a v-if="contactContent.phone"
              class="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80 transition hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
              :href="phoneHref">
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400/10 text-sky-200">
                <Phone class="h-5 w-5" />
              </span>
              <div class="text-left">
                <p class="text-xs uppercase tracking-[0.2em] text-white/40">Téléphone</p>
                <p class="text-sm font-medium">{{ contactContent.phone }}</p>
              </div>
            </a>
            <div v-if="contactContent.location"
              class="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/80">
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400/10 text-sky-200">
                <MapPin class="h-5 w-5" />
              </span>
              <div class="text-left">
                <p class="text-xs uppercase tracking-[0.2em] text-white/40">Localisation</p>
                <p class="text-sm font-medium">{{ contactContent.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
