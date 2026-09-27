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
    expect(projects.map((project) => project.id)).toEqual(['bmarket', 'mts', 'deal-hearts', 'monkey-quest'])
    expect(projects.every((project) => project.summary.length < 340)).toBe(true)
  })

  it('presents Deal Hearts as an offline mobile negotiation game without a placeholder demo', () => {
    const dealHearts = projects.find((project) => project.id === 'deal-hearts')

    expect(dealHearts).toMatchObject({
      title: 'Deal Hearts',
      demo: 'https://youtu.be/zwlI8cqxfh8',
    })
    expect(dealHearts?.tags).toEqual(expect.arrayContaining(['React Native', 'Expo', 'SQLite']))
    expect(dealHearts?.demo).toBe('https://youtu.be/zwlI8cqxfh8')
  })

  it('describes MTS around the transport company workflow', () => {
    const mts = projects.find((project) => project.id === 'mts')

    expect(mts?.summary).toContain('entreprise de transport')
    expect(mts?.summary).toContain('bons de livraison')
    expect(mts?.summary).toContain('incidents')
    expect(mts?.summary).not.toContain('MIAGE')
  })

  it('separates personal projects from academic projects', () => {
    expect(projects.filter((project) => project.type === 'personal').map((project) => project.id))
      .toEqual(['bmarket', 'deal-hearts'])
    expect(projects.filter((project) => project.type === 'academic').map((project) => project.id))
      .toEqual(['mts', 'monkey-quest'])
  })

  it('orders the journey from current role to earlier roles and training', () => {
    expect(journey[0]?.organization).toContain('La Poste')
    expect(journey.map((item) => item.kind)).toContain('education')
  })
})
