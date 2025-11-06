<script setup lang="ts">
import ExperienceCard from '@/components/ui/ExperienceCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { experiences } from '@/data/portfolio'
</script>

<template>
  <section id="experience" class="rounded-[2.5rem] border border-white/10 bg-white/5 px-6 py-16 md:px-12 lg:py-20">
    <div class="grid gap-12">
      <SectionHeading
        eyebrow="Expérience"
        title="Entre achats IT et ingénierie logicielle"
        description="Mon parcours m’a permis d’évoluer à la croisée du développement logiciel et de la stratégie achat.
        Chez La Poste Groupe, je pilote les achats IT/OT et les projets de digitalisation, tandis que mes expériences chez Capgemini et Rakuten m’ont forgé une solide expertise technique
        en backend, frontend et déploiement cloud."
      />
      <div class="space-y-6">
        <ExperienceCard
          v-for="experience in experiences"
          :key="experience.id"
          :experience="experience"
        />
      </div>
    </div>
  </section>
</template>
