import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { projects } from '@/data/portfolio'

describe('project cards', () => {
  it('embeds the B-Market demo with an accessible title', () => {
    const project = projects.find((item) => item.id === 'bmarket')
    const wrapper = mount(ProjectCard, { props: { project } })
    const iframe = wrapper.get('iframe')

    expect(iframe.attributes('src')).toContain('Gq5UYJvB9bs')
    expect(iframe.attributes('title')).toBe('Démonstration vidéo : B-Market')
  })

  it('embeds the Deal Hearts demo without an image', () => {
    const project = projects.find((item) => item.id === 'deal-hearts')
    const wrapper = mount(ProjectCard, { props: { project } })
    const iframe = wrapper.get('iframe')

    expect(iframe.attributes('src')).toContain('zwlI8cqxfh8')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('embeds demos for Deal Hearts and MTS with accessible titles', () => {
    const dealHearts = projects.find((item) => item.id === 'deal-hearts')
    const mts = projects.find((item) => item.id === 'mts')
    const dealWrapper = mount(ProjectCard, { props: { project: dealHearts } })
    const mtsWrapper = mount(ProjectCard, { props: { project: mts } })

    expect(dealWrapper.get('iframe').attributes('src')).toContain('zwlI8cqxfh8')
    expect(dealWrapper.get('iframe').attributes('title')).toBe('Démonstration vidéo : Deal Hearts')
    expect(mtsWrapper.get('iframe').attributes('src')).toContain('TurXDLKvCBU')
    expect(mtsWrapper.get('iframe').attributes('title')).toBe('Démonstration vidéo : MTS')
  })
})
