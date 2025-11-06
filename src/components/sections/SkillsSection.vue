<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import SkillGroupCard from '@/components/ui/SkillGroupCard.vue'
import { skillGroups } from '@/data/portfolio'
</script>

<template>
  <section id="skills" class="rounded-[2.5rem] border border-white/5 bg-slate-900/40 px-6 py-16 md:px-12 lg:py-20">
    <div>
      <SectionHeading
        eyebrow="Compétences"
        title="Une expertise à la croisée des achats IT et du développement logiciel"
        description="Grâce à un parcours mêlant ingénierie et stratégie, je maîtrise aussi bien les environnements techniques (Spring Boot, Angular, Docker) que les leviers achats (RFI, négociation, TCO, conformité).
  Cette double compétence me permet d’assurer un dialogue fluide entre les équipes techniques, métiers et fournisseurs."
        class="mb-6"
        />
      <div class="grid gap-6 md:grid-cols-3">
        <SkillGroupCard
          v-for="group in skillGroups"
          :key="group.id"
          :group="group"
        />
      </div>
    </div>
  </section>
</template>
