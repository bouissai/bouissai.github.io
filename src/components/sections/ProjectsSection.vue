<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { projects } from '@/data/portfolio'

const maxDescriptionHeight = ref(0)
const registerDescriptionHeight = (height: number) => {
  if (height > maxDescriptionHeight.value) {
    maxDescriptionHeight.value = height
  }
}

provide('maxDescriptionHeight', maxDescriptionHeight)
provide('registerDescriptionHeight', registerDescriptionHeight)

const orderedProjects = computed(() =>
  [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
)
</script>

<template>
  <section id="projects" class="rounded-[2.5rem] border border-white/10 bg-slate-900/60 px-6 py-16 md:px-12 lg:py-20">
    <div class="gap-12 lg:flex-row lg:items-center lg:justify-between">
      <SectionHeading
        eyebrow="Portfolio"
        title="Une sélection de projets récents"
        description="Des expériences pensées pour convertir, fidéliser et incarner une vision produit claire."
      />
      <p class="max-w-sm text-sm leading-relaxed text-white/60">
        Chaque mission démarre par des ateliers d’alignement, se poursuit par des prototypes haute fidélité et se termine par un accompagnement serré des équipes dev.
      </p>
    </div>
    <div class="mt-12 grid gap-8 lg:auto-rows-[1fr] lg:grid-cols-3">
      <div
        v-for="project in orderedProjects"
        :key="project.id"
        :class="project.featured ? 'lg:col-span-2 lg:row-span-2' : ''"
      >
        <ProjectCard :project="project" :featured="project.featured === true" />
      </div>
    </div>
  </section>
</template>
