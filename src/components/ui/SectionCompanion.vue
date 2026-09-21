<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type CompanionMoment = {
  image: string
  label: string
  width: number
  height: number
}

const moments: Record<string, CompanionMoment> = {
  home: { image: '/avatar/s2_hi.png', label: 'Enchanté !', width: 1122, height: 1402 },
  expertise: { image: '/avatar/s4_professione.png', label: 'Mon double regard', width: 1024, height: 1536 },
  realisations: { image: '/avatar/s3_Projet.png', label: 'Mes réalisations', width: 1024, height: 1535 },
  projets: { image: '/avatar/s5_lire.png', label: 'Côté code', width: 1024, height: 1536 },
  parcours: { image: '/avatar/s1_neutre.png', label: 'Mon parcours', width: 1122, height: 1402 },
  contact: { image: '/avatar/final_rendez-vous.png', label: 'On se rencontre ?', width: 1024, height: 1536 },
}

const activeId = ref('initial')
const initialMoment: CompanionMoment = {
  image: '/avatar/s1_neutre.png',
  label: 'Bienvenue',
  width: 1122,
  height: 1402,
}
const activeMoment = computed(() => moments[activeId.value] ?? initialMoment)
let observer: IntersectionObserver | undefined
const visibility = new Map<string, number>()

onMounted(() => {
  if (!('IntersectionObserver' in window)) return

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target instanceof Element && entry.target.id in moments) {
        visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
      }
    }

    const mostVisible = [...visibility.entries()].sort((a, b) => b[1] - a[1])[0]
    if (mostVisible && mostVisible[1] > 0) {
      activeId.value = mostVisible[0]
    }
  }, { rootMargin: '-24% 0px -42%', threshold: [0, 0.35, 0.7] })

  document.querySelectorAll<HTMLElement>('[data-snap-section]').forEach((section) => {
    observer?.observe(section)
  })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <aside data-section-companion aria-live="polite" class="pointer-events-none fixed bottom-0 right-1 z-30 w-16 sm:right-2 sm:w-20 md:w-24 lg:w-28 xl:right-5 xl:w-36 2xl:right-8 2xl:w-44">
    <p class="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-[115%] whitespace-nowrap rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-bold text-[var(--color-ink)] shadow-[0_8px_24px_rgb(23_22_18/0.12)] sm:block md:text-xs">{{ activeMoment.label }}</p>
    <AnimatePresence mode="popLayout">
      <motion.div :key="activeMoment.image" :initial="{ opacity: 0, y: 18, scale: 0.94 }" :animate="{ opacity: 1, y: 0, scale: 1 }" :exit="{ opacity: 0, y: 8, scale: 0.98 }" :transition="{ type: 'spring', stiffness: 260, damping: 24 }">
        <img :src="activeMoment.image" alt="" :width="activeMoment.width" :height="activeMoment.height" class="h-auto w-full object-contain object-bottom drop-shadow-[0_12px_12px_rgb(23_22_18/0.16)]" />
      </motion.div>
    </AnimatePresence>
  </aside>
</template>
