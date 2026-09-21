import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '@/App.vue'

describe('portfolio architecture', () => {
  it('renders the approved navigation anchors and case-study content', () => {
    const wrapper = mount(App)
    for (const id of ['expertise', 'realisations', 'projets', 'parcours', 'contact']) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
    expect(wrapper.text()).toContain('B-Market')
    expect(wrapper.text()).toContain('Achats IT')
    expect(wrapper.text()).not.toContain('accompagnement design')
  })
})
