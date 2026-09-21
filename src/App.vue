<script setup lang="ts">
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
import SiteHeader from '@/components/sections/SiteHeader.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
</script>
<template><div class="min-h-dvh bg-[var(--color-canvas)] text-[var(--color-ink)]"><div class="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-10"><SiteHeader /><main class="space-y-16 pb-16 pt-8 sm:space-y-24 sm:pt-12"><HeroSection /><AboutSection /><ProjectsSection /><ExperienceSection /><SkillsSection /><ContactSection /></main><SiteFooter /></div></div></template>
