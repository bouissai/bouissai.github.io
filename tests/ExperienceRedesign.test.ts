import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import App from '@/App.vue'
import HeroSection from '@/components/sections/HeroSection.vue'

describe('section-based portfolio experience', () => {
  it('keeps every main chapter in the native section scroll flow', () => {
    const wrapper = mount(App)
    const sectionIds = ['home', 'expertise', 'realisations', 'projets', 'parcours', 'contact']

    for (const id of sectionIds) {
      expect(wrapper.get(`#${id}`).attributes('data-snap-section')).toBe('')
    }
  })

  it('introduces the contextual companion without exposing it to screen readers twice', () => {
    const wrapper = mount(App)
    const companion = wrapper.get('[data-section-companion]')

    expect(companion.attributes('aria-live')).toBe('polite')
    expect(companion.get('img').attributes('src')).toBe('/avatar/s1_neutre.png')
    expect(companion.get('img').attributes('alt')).toBe('')
    expect(companion.text()).toContain('Bienvenue')
  })

  it('updates the companion when a new section becomes the main viewport chapter', async () => {
    const observers: Array<{
      callback: IntersectionObserverCallback
      options?: IntersectionObserverInit
    }> = []

    class TestIntersectionObserver {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        observers.push({ callback, options })
      }

      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return [] }
      readonly root = null
      readonly rootMargin = ''
      readonly thresholds = [0.5]
    }

    vi.stubGlobal('IntersectionObserver', TestIntersectionObserver)

    const wrapper = mount(App, { attachTo: document.body })
    const target = wrapper.get('#realisations').element
    const companionObserver = observers.find(({ options }) => options?.rootMargin === '-24% 0px -42%')

    expect(companionObserver?.callback).toBeTypeOf('function')
    companionObserver?.callback([
      {
        target,
        isIntersecting: true,
        intersectionRatio: 0.72,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)
    await wrapper.vm.$nextTick()

    const companion = wrapper.get('[data-section-companion]')
    expect(companion.findAll('img').some((image) => image.attributes('src') === '/avatar/s3_Projet.png')).toBe(true)
    expect(companion.text()).toContain('Mes réalisations')
  })

  it('keeps the companion on the most visible section during a fast transition', async () => {
    const observers: Array<{
      callback: IntersectionObserverCallback
      options?: IntersectionObserverInit
    }> = []

    class TestIntersectionObserver {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        observers.push({ callback, options })
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return [] }
      readonly root = null
      readonly rootMargin = ''
      readonly thresholds = [0.5]
    }

    vi.stubGlobal('IntersectionObserver', TestIntersectionObserver)
    const wrapper = mount(App, { attachTo: document.body })
    const callback = observers.find(({ options }) => options?.rootMargin === '-24% 0px -42%')?.callback

    callback?.([{
      target: wrapper.get('#parcours').element,
      isIntersecting: true,
      intersectionRatio: 0.78,
    } as IntersectionObserverEntry], {} as IntersectionObserver)
    callback?.([{
      target: wrapper.get('#contact').element,
      isIntersecting: true,
      intersectionRatio: 0.12,
    } as IntersectionObserverEntry], {} as IntersectionObserver)
    await wrapper.vm.$nextTick()

    expect(wrapper.get('[data-section-companion]').text()).toContain('Mon parcours')
  })

  it('gives the profile portrait a layered frame that belongs to the canvas', () => {
    const wrapper = mount(HeroSection)
    const frame = wrapper.get('[data-profile-frame]')

    expect(frame.get('[data-profile-halo]').exists()).toBe(true)
    expect(frame.get('img').attributes('data-profile-image')).toBe('true')
  })
})
