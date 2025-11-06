<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, watch, type Ref } from 'vue'
import type { Project } from '@/data/portfolio'

const props = defineProps<{
  project: Project
  featured?: boolean
}>()

const isFeatured = computed(() => props.featured ?? props.project.featured ?? false)

const descriptionRef = ref<HTMLElement | null>(null)
const toggleButtonRef = ref<HTMLElement | null>(null)
const isExpanded = ref(false)
const shouldShowToggle = ref(false)
const collapsedHeight = ref(0)
const totalExpandedHeight = ref(0)

const maxDescriptionHeight = inject<Ref<number> | null>('maxDescriptionHeight', null)
const registerDescriptionHeight = inject<((height: number) => void) | null>('registerDescriptionHeight', null)

const measureHeights = async () => {
  await nextTick()
  const el = descriptionRef.value
  if (!el) {
    return
  }

  const collapsed = el.clientHeight
  const full = el.scrollHeight
  shouldShowToggle.value = full - collapsed > 2

  await nextTick()
  const buttonEl = toggleButtonRef.value
  const buttonStyles = buttonEl ? getComputedStyle(buttonEl) : null
  const buttonHeight = buttonEl
    ? buttonEl.offsetHeight + parseFloat(buttonStyles?.marginTop ?? '0')
    : 0

  collapsedHeight.value = collapsed + buttonHeight
  totalExpandedHeight.value = full + buttonHeight
  registerDescriptionHeight?.(totalExpandedHeight.value)
}

onMounted(() => {
  void measureHeights()
})

watch(
  () => props.project.description,
  () => {
    void measureHeights()
  }
)

const descriptionContainerStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (isExpanded.value) {
    const targetHeight =
      maxDescriptionHeight?.value && maxDescriptionHeight.value > 0
        ? maxDescriptionHeight.value
        : totalExpandedHeight.value

    if (targetHeight) {
      styles.minHeight = `${targetHeight}px`
    }
  } else if (collapsedHeight.value) {
    styles.minHeight = `${collapsedHeight.value}px`
  }

  return styles
})

const cardClasses = computed(() => {
  if (isFeatured.value) {
    return [
      'group relative flex h-full flex-col overflow-hidden rounded-3xl border backdrop-blur-lg transition hover:-translate-y-1',
      'border-sky-400/60 bg-gradient-to-br from-sky-500/30 via-slate-900/80 to-purple-500/40 p-8 md:p-12 shadow-xl shadow-sky-500/20 hover:border-sky-300/70 hover:shadow-sky-400/30'
    ]
  }

  return [
    'group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8',
    'backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10'
  ]
})

const titleClasses = computed(() =>
  isFeatured.value ? 'text-2xl font-semibold text-white md:text-3xl' : 'text-xl font-semibold text-white'
)

const ctaClasses = computed(() =>
  isFeatured.value
    ? 'inline-flex items-center gap-2 font-semibold text-sky-100 transition hover:text-white'
    : 'inline-flex items-center gap-2 font-semibold text-sky-300 transition hover:text-sky-200'
)

const repoClasses = computed(() =>
  isFeatured.value
    ? 'inline-flex items-center gap-2 text-white/80 transition hover:text-white'
    : 'inline-flex items-center gap-2 text-white/50 transition hover:text-white/80'
)

const tagClasses = computed(() =>
  isFeatured.value
    ? 'rounded-full border border-sky-300/40 bg-white/10 px-3 py-1 text-xs font-medium text-sky-100/90 backdrop-blur-sm'
    : 'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200/80'
)

const descriptionWrapperClasses = computed(() =>
  isFeatured.value
    ? 'mt-3 text-sm text-white/80 transition-all duration-300'
    : 'mt-3 text-sm text-white/60 transition-all duration-300'
)

const footerClasses = computed(() => {
  const base = ['flex flex-wrap items-center gap-4 text-sm']
  base.push(isFeatured.value ? 'mt-6 pt-4' : 'mt-6')
  return base.join(' ')
})

</script>

<template>
  <article
    :class="cardClasses"
  >
    <div
      v-if="isFeatured"
      class="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/40 via-transparent to-purple-500/40"
    />
    <div
      v-else
      class="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
    />

    <div class="flex w-full flex-col">
      <span
        v-if="isFeatured"
        class="mb-3 inline-flex w-fit items-center gap-2 self-start rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100"
      >
        Projet phare
      </span>
      <h3 :class="titleClasses">{{ project.title }}</h3>
    </div>

    <div
      :class="descriptionWrapperClasses"
      :style="descriptionContainerStyles"
    >
      <p
        ref="descriptionRef"
        :class="isExpanded ? '' : 'line-clamp-5'"
      >
        {{ project.description }}
      </p>
      <button
        v-if="shouldShowToggle"
        ref="toggleButtonRef"
        type="button"
        class="mt-2 text-xs font-semibold transition focus:outline-none"
        :class="isFeatured ? 'text-sky-100 hover:text-white' : 'text-sky-300 hover:text-sky-200'"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? 'Voir moins' : 'Voir plus' }}
      </button>
    </div>

    <iframe
      v-if="project.videoPath"
      :src="project.videoPath"
      title="YouTube video player"
      class="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />

    <footer :class="footerClasses">
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="tag in project.tags"
          :key="tag"
          :class="tagClasses"
        >
          {{ tag }}
        </li>
      </ul>
      <a
        :class="ctaClasses"
        :href="project.href"
        target="_blank"
        rel="noreferrer"
      >
        Étude de cas
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </a>

      <a
        v-if="project.repo"
        :class="repoClasses"
        :href="project.repo"
        target="_blank"
        rel="noreferrer"
      >
        Code source
      </a>
    </footer>
  </article>
</template>
