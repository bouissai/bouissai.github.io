<script setup lang="ts">
import CaseStudiesSection from '@/components/sections/CaseStudiesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import DualExpertiseSection from '@/components/sections/DualExpertiseSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import JourneySection from '@/components/sections/JourneySection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
import SiteHeader from '@/components/sections/SiteHeader.vue'
import SectionCompanion from '@/components/ui/SectionCompanion.vue'
</script>

<template>
  <div class="site-shell min-h-dvh bg-[var(--color-canvas)] text-[var(--color-ink)]">
    <a class="skip-link" href="#home">Aller au contenu</a>
    <SiteHeader />
    <main id="main-content">
      <HeroSection />
      <DualExpertiseSection />
      <CaseStudiesSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
    </main>
    <SiteFooter />
    <SectionCompanion />
  </div>
</template>
