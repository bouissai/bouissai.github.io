import { afterEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

config.global.stubs = { Teleport: true }

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.removeProperty('overflow')
  vi.restoreAllMocks()
})
