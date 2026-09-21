<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import videoSource from '@/assets/me.mp4'
import {
  buildScrollVideoStops,
  interpolateVideoTime,
  type PortfolioSectionPositions,
  type ScrollVideoStop,
} from './scrollVideoTimeline'

const video = ref<HTMLVideoElement | null>(null)
const isReady = ref(false)

const sectionIds = ['home', 'about', 'projects', 'experience', 'skills', 'contact'] as const

let animationFrame: number | undefined
let timeline: ScrollVideoStop[] = []
let reducedMotionQuery: MediaQueryList | undefined

function readSectionPositions(): PortfolioSectionPositions | null {
  const markerOffset = window.innerHeight * 0.22
  const positions = {} as PortfolioSectionPositions

  for (const id of sectionIds) {
    const section = document.getElementById(id)
    if (!section) return null

    positions[id] = Math.max(0, section.getBoundingClientRect().top + window.scrollY - markerOffset)
  }

  return positions
}

function rebuildTimeline() {
  const element = video.value
  const positions = readSectionPositions()
  if (!element || !positions || !Number.isFinite(element.duration)) return

  timeline = buildScrollVideoStops(positions, element.duration)
}

function updateVideoTime() {
  animationFrame = undefined

  const element = video.value
  if (!element || timeline.length === 0 || reducedMotionQuery?.matches) return

  const targetTime = interpolateVideoTime(window.scrollY, timeline)
  if (Math.abs(element.currentTime - targetTime) > 0.015) {
    element.currentTime = targetTime
  }
}

function requestVideoUpdate() {
  if (animationFrame === undefined) {
    animationFrame = window.requestAnimationFrame(updateVideoTime)
  }
}

function handleMetadataLoaded() {
  rebuildTimeline()
  updateVideoTime()
}

function handleVideoReady() {
  isReady.value = true
}

function handleResize() {
  rebuildTimeline()
  requestVideoUpdate()
}

function handleMotionPreference() {
  const element = video.value
  if (!element) return

  if (reducedMotionQuery?.matches) {
    element.currentTime = 0
  } else {
    requestVideoUpdate()
  }
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener('change', handleMotionPreference)
  window.addEventListener('scroll', requestVideoUpdate, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })

  if (document.readyState === 'complete') {
    handleResize()
  } else {
    window.addEventListener('load', handleResize, { once: true })
  }
})

onBeforeUnmount(() => {
  reducedMotionQuery?.removeEventListener('change', handleMotionPreference)
  window.removeEventListener('scroll', requestVideoUpdate)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('load', handleResize)

  if (animationFrame !== undefined) {
    window.cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950" aria-hidden="true">
    <video
      ref="video"
      :src="videoSource"
      class="h-full w-full object-cover transition-opacity duration-700"
      :class="isReady ? 'opacity-75' : 'opacity-0'"
      muted
      playsinline
      preload="auto"
      tabindex="-1"
      @loadeddata="handleVideoReady"
      @loadedmetadata="handleMetadataLoaded"
    />
    <div class="absolute inset-0 bg-slate-950/45" />
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/70" />
  </div>
</template>
