export type ScrollVideoStop = {
  scrollY: number
  time: number
}

export type PortfolioSectionPositions = {
  home: number
  about: number
  projects: number
  experience: number
  skills: number
  contact: number
}

export function buildScrollVideoStops(
  positions: PortfolioSectionPositions,
  duration: number,
): ScrollVideoStop[] {
  return [
    { scrollY: positions.home, time: 0 },
    { scrollY: positions.about, time: 1 },
    { scrollY: positions.projects, time: 3 },
    { scrollY: positions.experience, time: 4 },
    { scrollY: positions.skills, time: 6 },
    { scrollY: positions.contact, time: duration },
  ]
}

export function interpolateVideoTime(scrollY: number, stops: ScrollVideoStop[]): number {
  const first = stops[0]
  if (!first) return 0
  if (scrollY <= first.scrollY) return first.time

  for (let index = 1; index < stops.length; index += 1) {
    const previous = stops[index - 1]
    const next = stops[index]
    if (!previous || !next) continue

    if (scrollY <= next.scrollY) {
      const distance = next.scrollY - previous.scrollY
      if (distance <= 0) return next.time

      const progress = (scrollY - previous.scrollY) / distance
      return previous.time + (next.time - previous.time) * progress
    }
  }

  const last = stops[stops.length - 1]
  return last?.time ?? 0
}
