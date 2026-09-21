import { describe, expect, it } from 'vitest'
import {
  caseStudies,
  expertise,
  heroContent,
  journey,
  projects,
} from '@/data/portfolio'

describe('portfolio content', () => {
  it('presents procurement and engineering with equal weight', () => {
    expect(expertise).toHaveLength(2)
    expect(expertise.map((item) => item.id)).toEqual(['procurement', 'engineering'])
    expect(heroContent.eyebrow).toBe('Achats IT × Ingénierie logicielle')
  })

  it('uses the GitHub Pages CV path', () => {
    expect(heroContent.actions.find((action) => action.id === 'cv')?.href)
      .toBe('/docs/CV_Ilyass_achat.pdf')
    expect(JSON.stringify(heroContent)).not.toContain('/public/')
  })

  it('keeps one procurement and one engineering case study', () => {
    expect(caseStudies.map((study) => study.pillar).toSorted())
      .toEqual(['engineering', 'procurement'])
    expect(caseStudies.find((study) => study.id === 'b-market')?.proofs)
      .toEqual(expect.arrayContaining(['Back-office & statistiques', 'CI/CD vers un VPS']))
  })

  it('keeps secondary projects compact and links optional', () => {
    expect(projects.map((project) => project.id)).toEqual(['bmarket', 'mts', 'monkey-quest'])
    expect(projects.every((project) => project.summary.length < 220)).toBe(true)
  })

  it('orders the journey from current role to earlier roles and training', () => {
    expect(journey[0]?.organization).toContain('La Poste')
    expect(journey.map((item) => item.kind)).toContain('education')
  })
})
