<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { navLinks, contactContent } from '@/data/portfolio'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const openMail = () => {
  window.location.href = `mailto:${contactContent.email}`
}

const lockScroll = () => {
  document.body.style.setProperty('overflow', 'hidden')
}

const unlockScroll = () => {
  document.body.style.removeProperty('overflow')
}

watch(isMenuOpen, (value) => {
  if (value) {
    lockScroll()
  } else {
    unlockScroll()
  }
  window.dispatchEvent(
    new CustomEvent('portfolio-menu-toggle', {
      detail: { open: value }
    })
  )
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  unlockScroll()
})
</script>

<template>
  <header class="sticky top-6 z-30">
    <Teleport to="body">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-20 bg-slate-950/70 backdrop-blur-sm md:hidden"
        @click="closeMenu"
      />
    </Teleport>

    <div
      class="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-6 py-3 backdrop-blur"
    >
      <a class="text-sm font-semibold uppercase tracking-[0.3em] text-white" href="#home">
        Ilyass
      </a>
      <nav
        class="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 md:flex"
      >
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
        >
          {{ link.label }}
        </a>
      </nav>
      <a
        class="hidden rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-sky-400/50 hover:text-sky-100 md:inline-flex"
        :href="`mailto:${contactContent.email}`"
      >
        Discuter
      </a>
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
        @click="toggleMenu"
      >
        <span class="sr-only">Menu</span>
        <svg
          v-if="!isMenuOpen"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </svg>
      </button>
    </div>

    <!-- Menu mobile -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="mx-auto mt-3 max-w-5xl rounded-3xl border border-white/10 bg-slate-900/95 px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 shadow-lg md:hidden"
      >
        <nav class="flex flex-col gap-2">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="rounded-2xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </nav>
        <button
          type="button"
          class="mt-3 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-[0.7rem] tracking-[0.22em] text-white transition hover:border-sky-400/50 hover:text-sky-100"
          @click="
            closeMenu();
            openMail();
          "
        >
          Discuter
        </button>
      </div>
    </transition>
  </header>
</template>
