<script setup lang="ts">
import { contactContent, navLinks } from '@/data/portfolio'
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const isMenuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

const closeMenu = async (restoreFocus = false) => {
  isMenuOpen.value = false
  if (restoreFocus) {
    await nextTick()
    menuButton.value?.focus()
  }
}

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMenuOpen.value) void closeMenu(true)
}

watch(isMenuOpen, (open) => {
  if (open) document.body.style.setProperty('overflow', 'hidden')
  else document.body.style.removeProperty('overflow')
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.removeProperty('overflow')
})
</script>

<template>
  <header class="sticky top-0 z-40 h-[var(--header-height)] border-b border-black/8 bg-[var(--color-canvas)]">
    <div class="header-inner flex h-full items-center justify-between gap-5">
      <a href="#home" class="inline-flex min-h-12 items-center font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.08em]">
        Ilyass <span class="ml-1 text-[var(--color-accent)]">Bouissa.</span>
      </a>
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
        <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="inline-flex min-h-12 items-center rounded-full px-3.5 text-sm font-medium text-[var(--color-muted)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]">{{ link.label }}</a>
      </nav>
      <a :href="`mailto:${contactContent.email}`" class="group hidden min-h-12 items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] sm:inline-flex">
        Discuter <ArrowUpRight class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
      <button ref="menuButton" type="button" class="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[var(--color-surface)] transition active:scale-95 lg:hidden" aria-controls="mobile-navigation" :aria-expanded="isMenuOpen" :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'" @click="toggleMenu">
        <X v-if="isMenuOpen" class="h-5 w-5" aria-hidden="true" />
        <Menu v-else class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <nav v-if="isMenuOpen" id="mobile-navigation" class="fixed inset-x-0 top-[var(--header-height)] grid min-h-[calc(100dvh-var(--header-height))] content-center gap-2 bg-[var(--color-canvas)] px-[var(--page-gutter)] pb-20 lg:hidden" aria-label="Navigation mobile">
      <a v-for="(link, index) in navLinks" :key="link.id" :href="`#${link.id}`" class="border-b border-[var(--color-line)] py-4 font-[var(--font-display)] text-3xl font-semibold tracking-[-0.04em]" @click="closeMenu()"><span class="mr-4 font-[var(--font-mono)] text-xs text-[var(--color-accent)]">0{{ index + 1 }}</span>{{ link.label }}</a>
      <a :href="`mailto:${contactContent.email}`" class="mt-5 inline-flex min-h-12 items-center font-semibold text-[var(--color-accent-strong)]" @click="closeMenu()">Me contacter</a>
    </nav>
  </header>
</template>
