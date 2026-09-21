import { afterEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

config.global.stubs = { Teleport: true }

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = [0]
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return [] }
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  configurable: true,
  value: TestIntersectionObserver,
})

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.removeProperty('overflow')
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
