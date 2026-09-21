<script setup lang="ts">
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
import SiteHeader from '@/components/sections/SiteHeader.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import MobileQuickActions from '@/components/ui/MobileQuickActions.vue'
import ScrollVideoBackground from '@/components/background/ScrollVideoBackground.vue'
</script>

<template>
  <div class="relative isolate min-h-screen text-white">
    <ScrollVideoBackground />
    <div class="pointer-events-none fixed inset-0 z-[1] opacity-60">
      <div class="absolute left-20 top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div class="absolute right-32 top-40 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div class="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
    </div>
    <div class="relative z-10 mx-auto flex min-h-screen flex-col gap-8 px-6 md:px-10">
      <SiteHeader />
      <main class="flex flex-col gap-16 md:gap-20">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
    <MobileQuickActions />
  </div>
</template>
