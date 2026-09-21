<script setup lang="ts">
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { projects } from '@/data/portfolio'
import { motion } from 'motion-v'
</script>

<template>
  <section id="projets" data-snap-section class="flex items-center bg-[var(--color-surface)] py-20 sm:py-24">
    <div class="section-inner">
      <motion.div :initial="{ opacity: 0, y: 20 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.35 }" :transition="{ duration: 0.5 }">
        <SectionHeading eyebrow="Projets techniques" title="Je garde les mains dans le code." description="Une sélection courte de produits pensés pour être utiles, livrés et exploitables — pas seulement montrés." />
      </motion.div>
      <div class="mt-14 grid divide-y divide-[var(--color-line)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        <motion.div v-for="(project, index) in projects" :key="project.id" class="lg:px-8 lg:first:pl-0 lg:last:pr-0" :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.25 }" :transition="{ duration: 0.48, delay: index * 0.07 }">
          <ProjectCard :project="project" :featured="project.featured === true" />
        </motion.div>
      </div>
    </div>
  </section>
</template>
