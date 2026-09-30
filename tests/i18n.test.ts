import { beforeEach, describe, expect, it } from 'vitest'
import { locale, localizedPortfolio, setLocale } from '@/i18n'

describe('portfolio language mode', () => {
  beforeEach(() => setLocale('fr'))

  it('starts in French with the French CV', () => {
    expect(locale.value).toBe('fr')
    expect(localizedPortfolio.value.heroContent.eyebrow).toContain('Achats IT')
    expect(localizedPortfolio.value.heroContent.actions.find((action) => action.id === 'cv')?.href)
      .toBe('/docs/CV_Ilyass_achat.pdf')
  })

  it('switches every localized content source to English', () => {
    setLocale('en')

    expect(localizedPortfolio.value.navLinks.map((link) => link.label)).toEqual(['Expertise', 'Work', 'Projects', 'Journey', 'Contact'])
    expect(localizedPortfolio.value.heroContent.eyebrow).toBe('IT Procurement × Software Engineering')
    expect(localizedPortfolio.value.heroContent.actions.find((action) => action.id === 'cv')?.href).toBe('/docs/Resume.pdf')
    expect(localizedPortfolio.value.projects.find((project) => project.id === 'mts')?.summary).toContain('transport company')
    expect(localizedPortfolio.value.ui.companion.projets).toBe('Code side')
  })
})
