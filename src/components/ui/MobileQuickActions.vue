<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { heroContent, contactContent } from '@/data/portfolio'

const isVisible = ref(false)
const isMenuOpen = ref(false)

const updateVisibility = () => {
  if (typeof window === 'undefined') return
  const shouldShow = window.scrollY > 280 && !isMenuOpen.value
  isVisible.value = shouldShow
}

const handleScroll = () => {
  updateVisibility()
}

const handleMenuToggle = (event: Event) => {
  const detail = (event as CustomEvent<{ open: boolean }>).detail
  isMenuOpen.value = detail?.open ?? false
  updateVisibility()
}

const openMail = () => {
  window.location.href = `mailto:${contactContent.email}`
}

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('portfolio-menu-toggle', handleMenuToggle as EventListener)
  updateVisibility()
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('portfolio-menu-toggle', handleMenuToggle as EventListener)
})
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-6 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-6 opacity-0"
    >
      <div v-if="isVisible" class="fixed inset-x-4 bottom-6 z-40 md:hidden">
        <div
          class="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 p-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-2xl shadow-black/40 backdrop-blur"
        >
          <a
            class="flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-400 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:opacity-90"
            :href="heroContent.ctaPrimary.href"
          >
            {{ heroContent.ctaPrimary.label }}
          </a>
          <button
            type="button"
            class="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:border-sky-400/50"
            @click="openMail"
          >
            Contacter
          </button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

