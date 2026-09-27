<script setup lang="ts">
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { projects } from '@/data/portfolio'
import { motion } from 'motion-v'

const personalProjects = projects.filter((project) => project.type === 'personal')
const academicProjects = projects.filter((project) => project.type === 'academic')
</script>

<template>
  <section id="projets" data-snap-section class="flex items-center bg-[var(--color-surface)] py-20 sm:py-24">
    <div class="section-inner">
      <motion.div :initial="{ opacity: 0, y: 20 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.35 }" :transition="{ duration: 0.5 }">
        <SectionHeading eyebrow="Projets techniques" title="Je garde les mains dans le code." description="Je construis des produits utiles. Je les livre et je les rends exploitables." />
      </motion.div>
      <div class="mt-14 grid gap-5 lg:grid-cols-2">
        <motion.div v-for="(project, index) in personalProjects" :key="project.id" :initial="{ opacity: 0, y: 24 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.2 }" :transition="{ duration: 0.48, delay: index * 0.07 }">
          <ProjectCard :project="project" :featured="true" />
        </motion.div>
      </div>
      <div class="mt-14">
        <p class="eyebrow">Projets académiques</p>
        <div class="mt-5 grid gap-5 lg:grid-cols-2">
        <motion.div v-for="(project, index) in academicProjects" :key="project.id" :initial="{ opacity: 0, y: 18 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.2 }" :transition="{ duration: 0.42, delay: index * 0.06 }">
          <ProjectCard :project="project" />
        </motion.div>
        </div>
      </div>
    </div>
  </section>
</template>
