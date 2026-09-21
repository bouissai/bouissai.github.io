import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HeroSection from '@/components/sections/HeroSection.vue'
import SiteHeader from '@/components/sections/SiteHeader.vue'

describe('hero and header', () => {
  it('renders equal procurement and engineering markers with working CV path', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('Je pilote')
    expect(wrapper.text()).toContain('Je construis')
    expect(wrapper.get('a[href="/docs/CV_Ilyass_achat.pdf"]').attributes('target')).toBe('_blank')
  })

  it('opens and closes the mobile menu accessibly', async () => {
    const wrapper = mount(SiteHeader, { attachTo: document.body })
    const trigger = wrapper.get('button[aria-controls="mobile-navigation"]')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(document.body.style.overflow).toBe('hidden')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger.element)
  })

  it('contains no background video', () => {
    expect(mount(HeroSection).find('video').exists()).toBe(false)
  })
})
