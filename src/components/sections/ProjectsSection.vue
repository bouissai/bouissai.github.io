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
  <section id="projects" class="rounded-[2.5rem] border border-white/10 bg-slate-950/50 px-6 py-16 backdrop-blur-[2px] md:px-12 lg:py-20">
    <div class="gap-12 lg:flex-row lg:items-center lg:justify-between">
      <SectionHeading
        eyebrow="Portfolio"
        title="Des produits conçus jusqu’à leur mise en ligne"
        description="B-Market est la preuve centrale : je relie besoin métier, architecture, coûts d’exploitation et livraison."
      />
      <p class="max-w-sm text-sm leading-relaxed text-white/60">
        B-Market est présenté en premier, puis MTS et MonkeyQuest complètent le parcours technique.
      </p>
    </div>
    <div class="mt-12 grid gap-8 items-start lg:grid-cols-2">
      <div
        v-for="project in orderedProjects"
        :key="project.id"
        :class="project.featured ? 'lg:col-span-3' : ''"
      >
        <ProjectCard :project="project" :featured="project.featured === true" />
      </div>
    </div>
  </section>
</template>
