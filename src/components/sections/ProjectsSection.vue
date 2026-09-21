<script setup lang="ts">
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { projects } from '@/data/portfolio'
</script>

<template>
  <section id="projets" class="py-4 sm:py-8">
    <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeading eyebrow="Projets techniques" title="Continuer à construire, côté code" description="B-Market est la preuve centrale : je relie besoin métier, architecture, coûts d’exploitation et livraison." />
      <p class="max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">Une sélection courte de produits conçus pour apprendre, livrer et mesurer l’impact.</p>
    </div>
    <div class="mt-12 grid items-start gap-8 lg:grid-cols-2">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" :featured="project.featured === true" />
    </div>
  </section>
</template>
