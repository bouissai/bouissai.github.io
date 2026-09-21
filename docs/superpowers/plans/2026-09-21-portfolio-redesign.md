# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Ilyass Bouissa's portfolio as an accessible, fast, editorial site that presents IT procurement and software engineering with equal weight and deploys reliably to GitHub Pages.

**Architecture:** Keep the Vue 3/Vite single-page architecture and centralize typed copy in `src/data/portfolio.ts`. Replace the current glass/video presentation with small semantic section components and shared design tokens, then add a dependency-free Node verifier that audits the production output before GitHub Pages deployment.

**Tech Stack:** Vue 3.5, TypeScript 5.9, Vite 7, Tailwind CSS 4, Lucide Vue, Vitest, Vue Test Utils, jsdom, Node built-in modules, GitHub Actions/Pages.

**Spec:** `docs/superpowers/specs/2026-09-21-portfolio-redesign-design.md`

## Global Constraints

- Give IT procurement and software engineering equal visual and editorial weight.
- Use a Swiss editorial direction: ivory background, graphite text, cobalt accent, cool-gray secondary surfaces, fine borders, restrained radii and no generalized glassmorphism.
- Use Archivo for headings, Space Grotesk for body text and system fallbacks; font loading must never block content.
- Do not modify `public/docs/CV_Ilyass_achat.pdf`.
- Do not disclose La Poste suppliers, budgets, scores, offers or internal documents.
- Keep body text at least 16 px on mobile and interactive targets at least 44 × 44 px.
- Meet WCAG AA text contrast of at least 4.5:1, keep visible focus and preserve browser zoom.
- Respect `prefers-reduced-motion`; animate only `transform` and `opacity`.
- Do not load a background video or third-party iframe on initial page load.
- Keep the site fully static and compatible with the user site `bouissai.github.io` at base `/`.
- The CV URL is `/docs/CV_Ilyass_achat.pdf`; `/public/` must never appear in a public URL.
- Test at 375, 768, 1024 and 1440 px.

## Review Focus

- Missing optional project links must omit the control instead of rendering an empty anchor; Task 1 pins this in data and Task 4 pins it in the component.
- A project/user GitHub Pages base mismatch must fail with the expected base and offending URL; Task 6 tests both repository kinds.
- External, hash, `mailto:`, `tel:` and `data:` URLs must not be treated as missing local assets; Task 6 tests every scheme.
- Opening and closing the mobile menu must lock then restore body scrolling and return focus to the trigger; Task 2 exercises the full interaction.
- Reduced-motion users must receive final visible content without scroll/video animation; Task 2 tests the media-query state and Task 8 verifies it visually.

---

### Task 1: Test foundation and typed portfolio content

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/portfolioContent.test.ts`
- Modify: `src/data/portfolio.ts`

**Interfaces:**
- Produces: `PortfolioContent`, `Expertise`, `CaseStudy`, `Project`, `JourneyItem`, `ContactContent` types and the named exports `heroContent`, `expertise`, `caseStudies`, `projects`, `journey`, `contactContent`, `navLinks`, `socials`.
- Produces: `pnpm test` for Vitest and `pnpm test:pages` for the Node verifier added in Task 6.

- [ ] **Step 1: Add the test runner dependencies and scripts**

Run:

```bash
pnpm add -D vitest @vue/test-utils jsdom
```

Set the scripts in `package.json` to include:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:pages": "node --test tests/githubPagesVerifier.test.mjs",
  "check": "pnpm test && pnpm type-check && pnpm lint:check && pnpm build && pnpm verify:pages",
  "lint": "eslint . --fix --cache",
  "lint:check": "eslint . --cache"
}
```

- [ ] **Step 2: Configure Vitest for Vue**

Create `vitest.config.ts`:

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
})
```

Create `tests/setup.ts`:

```ts
import { afterEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

config.global.stubs = { Teleport: true }

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.removeProperty('overflow')
  vi.restoreAllMocks()
})
```

- [ ] **Step 3: Write failing content-contract tests**

Create `tests/portfolioContent.test.ts`:

```ts
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
    expect(caseStudies.map((study) => study.pillar)).toSorted())
      .toEqual(['engineering', 'procurement'])
    expect(caseStudies.find((study) => study.id === 'b-market')?.proofs)
      .toEqual(expect.arrayContaining(['Back-office & statistiques', 'CI/CD vers un VPS']))
  })

  it('keeps secondary projects compact and links optional', () => {
    expect(projects.map((project) => project.id)).toEqual(['mts', 'monkey-quest'])
    expect(projects.every((project) => project.summary.length < 220)).toBe(true)
  })

  it('orders the journey from current role to earlier roles and training', () => {
    expect(journey[0]?.organization).toContain('La Poste')
    expect(journey.map((item) => item.kind)).toContain('education')
  })
})
```

- [ ] **Step 4: Run the content tests and verify RED**

Run: `pnpm test -- tests/portfolioContent.test.ts`

Expected: FAIL because `expertise`, `caseStudies`, `journey`, `heroContent.actions` and the revised project shape do not exist.

- [ ] **Step 5: Replace the data model with the approved content**

Implement the exact public interfaces in `src/data/portfolio.ts`:

```ts
export type LinkAction = {
  id: string
  label: string
  href: string
  external?: boolean
  variant: 'primary' | 'secondary' | 'text'
}

export type Expertise = {
  id: 'procurement' | 'engineering'
  eyebrow: string
  title: string
  description: string
  capabilities: string[]
}

export type CaseStudy = {
  id: string
  pillar: Expertise['id']
  eyebrow: string
  title: string
  summary: string
  challenge: string
  approach: string[]
  proofs: string[]
  tags: string[]
  links: LinkAction[]
}

export type Project = {
  id: string
  title: string
  summary: string
  features: string[]
  tags: string[]
  demo?: string
  repo?: string
}

export type JourneyItem = {
  id: string
  kind: 'experience' | 'education'
  role: string
  organization: string
  period: string
  summary: string
  highlights: string[]
  logo?: string
}
```

Populate the exports from the approved spec and CV. Use the following fixed hero copy:

```ts
export const heroContent = {
  eyebrow: 'Achats IT × Ingénierie logicielle',
  title: 'Je relie la décision d’achat à la réalité technique.',
  description: 'Acheteur IT issu du développement logiciel, je pilote des consultations technologiques et je continue à concevoir des produits numériques de bout en bout.',
  photoUrl: '/photo-pro.crop.jpg',
  photoAlt: 'Portrait professionnel d’Ilyass Bouissa',
  actions: [
    { id: 'work', label: 'Voir les réalisations', href: '#realisations', variant: 'primary' },
    { id: 'cv', label: 'Télécharger le CV', href: '/docs/CV_Ilyass_achat.pdf', external: true, variant: 'secondary' },
    { id: 'contact', label: 'Me contacter', href: '#contact', variant: 'text' },
  ] satisfies LinkAction[],
}
```

For B-Market, include verified capabilities: click and collect, authentication/account, order management, admin dashboard/statistics, promotions/recipes, Next.js/TypeScript/Prisma/PostgreSQL, Docker/GitHub Actions/GHCR/VPS. Keep La Poste copy at the abstraction level defined by the spec.

- [ ] **Step 6: Run the content tests and type-check**

Run: `pnpm test -- tests/portfolioContent.test.ts && pnpm type-check`

Expected: PASS.

- [ ] **Step 7: Commit the content foundation**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts tests/setup.ts tests/portfolioContent.test.ts src/data/portfolio.ts
git commit -m "test: define portfolio content contracts"
```

### Task 2: Editorial shell, header and hero

**Files:**
- Create: `tests/HeroAndHeader.test.ts`
- Modify: `src/main.css`
- Modify: `src/App.vue`
- Modify: `src/components/sections/SiteHeader.vue`
- Modify: `src/components/sections/HeroSection.vue`
- Modify: `src/components/ui/BaseButton.vue`
- Modify: `src/components/ui/SocialLinkItem.vue`
- Delete: `src/components/background/ScrollVideoBackground.vue`
- Delete: `src/components/background/scrollVideoTimeline.ts`
- Delete: `tests/scrollVideoTimeline.test.ts`
- Delete: `src/assets/me.mp4`

**Interfaces:**
- Consumes: `heroContent`, `navLinks`, `socials`, `contactContent` from Task 1.
- Produces: semantic `SiteHeader`, `HeroSection` and `BaseButton` variants used by later sections.

- [ ] **Step 1: Write failing shell and interaction tests**

Create `tests/HeroAndHeader.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests and verify RED**

Run: `pnpm test -- tests/HeroAndHeader.test.ts`

Expected: FAIL because the current hero lacks the two markers and the menu lacks the required ARIA/focus behavior.

- [ ] **Step 3: Implement the editorial design tokens**

Replace `src/main.css` with Tailwind import plus semantic CSS custom properties:

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap');
@import "tailwindcss";

:root {
  color-scheme: light;
  --color-canvas: #f4f1ea;
  --color-surface: #fffdf8;
  --color-ink: #17191c;
  --color-muted: #5d6470;
  --color-line: #d7d9dc;
  --color-accent: #1746d1;
  --color-accent-strong: #10359f;
  --font-display: 'Archivo', Arial, sans-serif;
  --font-body: 'Space Grotesk', Arial, sans-serif;
  --font-mono: 'SFMono-Regular', Consolas, monospace;
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-width: 320px;
  background: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
}
:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 4: Rebuild the app shell and hero**

Remove `ScrollVideoBackground` and `MobileQuickActions` from `App.vue`. Use a centered `max-w-7xl` page shell, semantic `<main>` and consistent section spacing.

In `HeroSection.vue`, render one `<h1>`, the approved hero copy, actions through `BaseButton`, the two labels “Je pilote” and “Je construis”, and the portrait with explicit `width` and `height`. Keep the portrait eager because it is above the fold.

Update `BaseButton.vue` so external links receive `rel="noreferrer"` and all variants provide at least 44 px height. Update social icons so the link has the accessible name and the decorative SVG is `aria-hidden="true"`.

- [ ] **Step 5: Fix the mobile-menu state contract**

In `SiteHeader.vue`, give the trigger `aria-controls="mobile-navigation"`, bind `aria-expanded`, label both open/close states, keep a `menuButton` ref, and call `menuButton.value?.focus()` after Escape closes the menu. Preserve scroll cleanup in `onBeforeUnmount`.

- [ ] **Step 6: Delete the obsolete video implementation and run tests**

Delete the three background/video files and the old timeline test, then run:

```bash
pnpm test -- tests/HeroAndHeader.test.ts
pnpm type-check
```

Expected: PASS.

- [ ] **Step 7: Commit the shell**

```bash
git add src/main.css src/App.vue src/components/sections/SiteHeader.vue src/components/sections/HeroSection.vue src/components/ui/BaseButton.vue src/components/ui/SocialLinkItem.vue tests/HeroAndHeader.test.ts
git add -u src/components/background tests/scrollVideoTimeline.test.ts src/assets/me.mp4
git commit -m "feat: build editorial hero and navigation"
```

### Task 3: Double expertise and primary case studies

**Files:**
- Create: `tests/ExpertiseAndCaseStudies.test.ts`
- Create: `src/components/sections/DualExpertiseSection.vue`
- Create: `src/components/sections/CaseStudiesSection.vue`
- Create: `src/components/ui/CaseStudyCard.vue`
- Modify: `src/components/ui/SectionHeading.vue`
- Modify: `src/App.vue`
- Delete: `src/components/sections/AboutSection.vue`
- Delete: `src/components/sections/SkillsSection.vue`
- Delete: `src/components/ui/SkillGroupCard.vue`

**Interfaces:**
- Consumes: `expertise: Expertise[]` and `caseStudies: CaseStudy[]` from Task 1.
- Produces: `#expertise` and `#realisations` page anchors.

- [ ] **Step 1: Write failing section tests**

Create `tests/ExpertiseAndCaseStudies.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DualExpertiseSection from '@/components/sections/DualExpertiseSection.vue'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection.vue'

describe('expertise and case studies', () => {
  it('renders exactly two equally ranked expertise articles', () => {
    const wrapper = mount(DualExpertiseSection)
    expect(wrapper.findAll('article')).toHaveLength(2)
    expect(wrapper.text()).toContain('Achats IT')
    expect(wrapper.text()).toContain('Ingénierie logicielle')
  })

  it('renders one case study for each pillar without confidential metrics', () => {
    const wrapper = mount(CaseStudiesSection)
    expect(wrapper.findAll('article')).toHaveLength(2)
    expect(wrapper.text()).toContain('SoftPOS')
    expect(wrapper.text()).toContain('B-Market')
    expect(wrapper.text()).not.toMatch(/€|fournisseur nommé|score fournisseur/i)
  })

  it('exposes valid external links only when supplied', () => {
    const wrapper = mount(CaseStudiesSection)
    for (const link of wrapper.findAll('a[target="_blank"]')) {
      expect(link.attributes('href')).toMatch(/^https:\/\//)
      expect(link.attributes('rel')).toBe('noreferrer')
    }
  })
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `pnpm test -- tests/ExpertiseAndCaseStudies.test.ts`

Expected: FAIL because the new components do not exist.

- [ ] **Step 3: Implement the double-expertise section**

Create `DualExpertiseSection.vue` as a semantic section containing one shared heading and a two-column grid at `md`. Give both articles identical DOM structure, spacing, heading level and visual weight; use the accent only for labels and rules, not to distinguish one pillar as primary.

- [ ] **Step 4: Implement the case-study card and section**

`CaseStudyCard.vue` accepts exactly:

```ts
defineProps<{ study: CaseStudy; index: number }>()
```

Render challenge, approach, proofs, tags and optional links. Use numbered monospace labels `01` and `02`. `CaseStudiesSection.vue` maps the two studies and owns `id="realisations"`.

- [ ] **Step 5: Replace obsolete sections in the app shell**

Remove `AboutSection` and `SkillsSection` imports/usages from `App.vue`; insert `DualExpertiseSection` and `CaseStudiesSection` after the hero. Delete the obsolete files.

- [ ] **Step 6: Run focused and full tests**

Run:

```bash
pnpm test -- tests/ExpertiseAndCaseStudies.test.ts
pnpm test
pnpm type-check
```

Expected: PASS.

- [ ] **Step 7: Commit the proof sections**

```bash
git add src/App.vue src/components/sections/DualExpertiseSection.vue src/components/sections/CaseStudiesSection.vue src/components/ui/CaseStudyCard.vue src/components/ui/SectionHeading.vue tests/ExpertiseAndCaseStudies.test.ts
git add -u src/components/sections/AboutSection.vue src/components/sections/SkillsSection.vue src/components/ui/SkillGroupCard.vue
git commit -m "feat: add dual expertise and case studies"
```

### Task 4: Secondary projects and career journey

**Files:**
- Create: `tests/ProjectsAndJourney.test.ts`
- Modify: `src/components/sections/ProjectsSection.vue`
- Modify: `src/components/ui/ProjectCard.vue`
- Replace: `src/components/sections/ExperienceSection.vue` with `src/components/sections/JourneySection.vue`
- Replace: `src/components/ui/ExperienceCard.vue` with `src/components/ui/JourneyItem.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: `projects: Project[]` and `journey: JourneyItem[]` from Task 1.
- Produces: `#projets` and `#parcours` anchors.

- [ ] **Step 1: Write failing project and journey tests**

Create `tests/ProjectsAndJourney.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import JourneySection from '@/components/sections/JourneySection.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'

describe('secondary work and journey', () => {
  it('renders compact projects without embedded iframes', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.findAll('article')).toHaveLength(2)
    expect(wrapper.find('iframe').exists()).toBe(false)
  })

  it('omits controls for absent optional links', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: { id: 'x', title: 'X', summary: 'Résumé', features: [], tags: [] } },
    })
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('renders professional experience and education in one timeline', () => {
    const wrapper = mount(JourneySection)
    expect(wrapper.text()).toContain('La Poste Groupe')
    expect(wrapper.text()).toContain('Capgemini Engineering')
    expect(wrapper.text()).toContain('Rakuten')
    expect(wrapper.text()).toContain('Grenoble École de Management')
    expect(wrapper.text()).toContain('Université Grenoble Alpes')
  })
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `pnpm test -- tests/ProjectsAndJourney.test.ts`

Expected: FAIL because `JourneySection` does not exist and the current projects embed YouTube.

- [ ] **Step 3: Simplify project cards**

Remove description measurement, expand/collapse state and iframes from `ProjectCard.vue`. Accept only `project: Project`; render title, summary, up to three features, tags and conditional demo/repository links. Make the full-text layout stable without JavaScript measurement.

Update `ProjectsSection.vue` to a simple two-card grid with `id="projets"` and copy describing these as earlier technical projects rather than recent design missions.

- [ ] **Step 4: Build the unified journey timeline**

Create `JourneyItem.vue` with `item: JourneyItem`, semantic heading, `<time>`, optional logo with empty alt and a maximum of two highlights. Create `JourneySection.vue` to group experience and education in one ordered list under `id="parcours"`.

Replace imports/usages in `App.vue`, then delete `ExperienceSection.vue` and `ExperienceCard.vue` after their replacements compile.

- [ ] **Step 5: Run focused and full tests**

Run:

```bash
pnpm test -- tests/ProjectsAndJourney.test.ts
pnpm test
pnpm type-check
```

Expected: PASS.

- [ ] **Step 6: Commit projects and journey**

```bash
git add src/App.vue src/components/sections/ProjectsSection.vue src/components/ui/ProjectCard.vue src/components/sections/JourneySection.vue src/components/ui/JourneyItem.vue tests/ProjectsAndJourney.test.ts
git add -u src/components/sections/ExperienceSection.vue src/components/ui/ExperienceCard.vue
git commit -m "feat: simplify projects and career journey"
```

### Task 5: Contact, footer, metadata and obsolete UI cleanup

**Files:**
- Create: `tests/ContactAndMetadata.test.ts`
- Modify: `src/components/sections/ContactSection.vue`
- Modify: `src/components/sections/SiteFooter.vue`
- Modify: `src/data/portfolio.ts`
- Modify: `index.html`
- Delete: `src/components/ui/MobileQuickActions.vue`
- Delete: `src/components/sections/WorkTogether.vue`

**Interfaces:**
- Consumes: `contactContent`, `socials`, `heroContent.actions` from Task 1.
- Produces: final `#contact` destination and document metadata.

- [ ] **Step 1: Write failing contact and metadata tests**

Create `tests/ContactAndMetadata.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ContactSection from '@/components/sections/ContactSection.vue'
import { readFileSync } from 'node:fs'

describe('contact and metadata', () => {
  it('offers email, LinkedIn, GitHub and CV without design-services copy', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.get('a[href^="mailto:"]')).toBeTruthy()
    expect(wrapper.get('a[href*="linkedin.com"]')).toBeTruthy()
    expect(wrapper.get('a[href*="github.com"]')).toBeTruthy()
    expect(wrapper.get('a[href="/docs/CV_Ilyass_achat.pdf"]')).toBeTruthy()
    expect(wrapper.text()).not.toMatch(/accompagnement design|prototype haute fidélité/i)
  })

  it('defines French portfolio metadata', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain('<html lang="fr">')
    expect(html).toContain('<title>Ilyass Bouissa — Achats IT × Ingénierie logicielle</title>')
    expect(html).toContain('name="description"')
  })
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `pnpm test -- tests/ContactAndMetadata.test.ts`

Expected: FAIL because current contact copy mentions design and lacks a CV action; metadata is generic.

- [ ] **Step 3: Rebuild contact and footer**

Use one short invitation, a `mailto:` primary action and labeled CV/LinkedIn/GitHub links. Keep the phone only if `contactContent.phone` remains populated; do not make it a required layout slot. Update the footer line to “Achats IT × Ingénierie logicielle”.

- [ ] **Step 4: Update document metadata**

Set `lang="fr"`, viewport without disabling zoom, title, description, theme color `#f4f1ea`, favicon and canonical URL `https://bouissai.github.io/` in `index.html`.

- [ ] **Step 5: Remove unused UI and verify imports**

Delete `MobileQuickActions.vue` and `WorkTogether.vue`, then run:

```bash
rg 'MobileQuickActions|WorkTogether|accompagnement design|prototype haute fidélité' src index.html
```

Expected: no matches.

- [ ] **Step 6: Run tests and build**

Run: `pnpm test && pnpm type-check && pnpm build`

Expected: PASS and `dist/index.html` exists.

- [ ] **Step 7: Commit the completed page**

```bash
git add src/components/sections/ContactSection.vue src/components/sections/SiteFooter.vue src/data/portfolio.ts index.html tests/ContactAndMetadata.test.ts
git add -u src/components/ui/MobileQuickActions.vue src/components/sections/WorkTogether.vue
git commit -m "feat: finish portfolio contact and metadata"
```

### Task 6: Deterministic GitHub Pages build verifier and CI gate

**Files:**
- Create: `tests/githubPagesVerifier.test.mjs`
- Create: `scripts/github-pages/verify-build.mjs`
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `.github/workflows/deploy.yml`
- Modify: `README.md`

**Interfaces:**
- Produces: `expectedBase(repository: string): string`.
- Produces: `verifyBuild(options: { projectRoot: string; outDir: string; repository: string; configuredBase: string }): Promise<string[]>` returning error strings; CLI exits 1 when the array is non-empty.
- Consumes: built `dist` output and `GITHUB_REPOSITORY` in CI.

- [ ] **Step 1: Write failing verifier tests**

Create `tests/githubPagesVerifier.test.mjs` using `node:test`, `node:assert/strict`, `fs/promises` and `os.tmpdir()`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { expectedBase, verifyBuild } from '../scripts/github-pages/verify-build.mjs'

async function fixture(html, files = {}) {
  const root = await mkdtemp(join(tmpdir(), 'pages-verify-'))
  const dist = join(root, 'dist')
  await mkdir(dist)
  await writeFile(join(dist, 'index.html'), html)
  for (const [name, content] of Object.entries(files)) {
    await mkdir(join(dist, name, '..'), { recursive: true })
    await writeFile(join(dist, name), content)
  }
  return root
}

test('derives user and project site bases', () => {
  assert.equal(expectedBase('bouissai/bouissai.github.io'), '/')
  assert.equal(expectedBase('bouissai/portfolio'), '/portfolio/')
})

test('accepts external and non-file URL schemes', async () => {
  const root = await fixture('<a href="https://example.com">x</a><a href="mailto:a@b.fr">m</a><a href="#top">h</a><img src="data:image/png;base64,AA">')
  assert.deepEqual(await verifyBuild({ projectRoot: root, outDir: 'dist', repository: 'bouissai/bouissai.github.io', configuredBase: '/' }), [])
})

test('reports public paths, missing assets and a wrong base', async () => {
  const root = await fixture('<script src="/public/app.js"></script><img src="/missing.png">')
  const errors = await verifyBuild({ projectRoot: root, outDir: 'dist', repository: 'bouissai/portfolio', configuredBase: '/' })
  assert.ok(errors.some((error) => error.includes('expected base /portfolio/')))
  assert.ok(errors.some((error) => error.includes('/public/')))
  assert.ok(errors.some((error) => error.includes('missing.png')))
})

test('validates CSS url references and required CV', async () => {
  const root = await fixture('<link rel="stylesheet" href="/assets/app.css">', {
    'assets/app.css': '.hero{background:url(/photo.webp)}',
  })
  const errors = await verifyBuild({ projectRoot: root, outDir: 'dist', repository: 'bouissai/bouissai.github.io', configuredBase: '/' })
  assert.ok(errors.some((error) => error.includes('photo.webp')))
  assert.ok(errors.some((error) => error.includes('CV_Ilyass_achat.pdf')))
})
```

- [ ] **Step 2: Run verifier tests and verify RED**

Run: `node --test tests/githubPagesVerifier.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `verify-build.mjs`.

- [ ] **Step 3: Implement the verifier**

Create `scripts/github-pages/verify-build.mjs`. Use `readdir({ recursive: true })` or an explicit recursive walker, `readFile`, `stat` and `path.resolve`. Extract `href`/`src` from HTML and `url(...)` from CSS. Strip query/hash fragments, decode URI components, skip external/special schemes, map base-relative URLs into `dist`, and reject any resolved path outside `dist`.

Required exports:

```js
export function expectedBase(repository) {
  const name = repository.split('/').at(-1) ?? ''
  return name.endsWith('.github.io') ? '/' : `/${name}/`
}

export async function verifyBuild({ projectRoot, outDir, repository, configuredBase }) {
  const errors = []
  // Check expected base, index.html, required CV, /public/ occurrences,
  // HTML src/href references, CSS url() references and path traversal.
  return errors
}
```

The CLI invocation uses `process.cwd()`, `dist`, `process.env.GITHUB_REPOSITORY ?? 'bouissai/bouissai.github.io'` and base `/`; print each failure prefixed with `GitHub Pages verification failed:` and set `process.exitCode = 1`.

- [ ] **Step 4: Run verifier tests and verify GREEN**

Run: `node --test tests/githubPagesVerifier.test.mjs`

Expected: all four tests PASS.

- [ ] **Step 5: Wire Vite, package scripts and deployment workflow**

Set `base: '/'` and remove `vueDevTools()` from production plugins in `vite.config.ts`; devtools may be enabled only when `mode === 'development'`.

Add to `package.json`:

```json
"verify:pages": "node scripts/github-pages/verify-build.mjs"
```

In `.github/workflows/deploy.yml`, replace the build step with:

```yaml
- name: Test and build
  run: pnpm run check
  env:
    GITHUB_REPOSITORY: ${{ github.repository }}
```

Keep this step before `actions/configure-pages`, artifact upload and deployment.

- [ ] **Step 6: Replace the starter README**

Document project purpose, requirements, `pnpm install`, `pnpm dev`, `pnpm check`, the root GitHub Pages constraint and the workflow file. Do not add a generic Vue tutorial.

- [ ] **Step 7: Verify the real production output**

Run:

```bash
pnpm test:pages
pnpm build
GITHUB_REPOSITORY=bouissai/bouissai.github.io pnpm verify:pages
```

Expected: PASS; verifier prints a success message naming `dist` and base `/`.

- [ ] **Step 8: Commit the deployment gate**

```bash
git add tests/githubPagesVerifier.test.mjs scripts/github-pages/verify-build.mjs package.json vite.config.ts .github/workflows/deploy.yml README.md
git commit -m "ci: verify GitHub Pages build before deploy"
```

### Task 7: Reusable `verifying-github-pages` Codex skill

**Files:**
- Create outside repository: `~/.codex/skills/verifying-github-pages/SKILL.md`
- Create outside repository: `~/.codex/skills/verifying-github-pages/agents/openai.yaml`
- Validate with: `/Users/ilyassbouissa/.codex/skills/.system/skill-creator/scripts/quick_validate.py`

**Interfaces:**
- Consumes: a static-site repository, its host/repository name and build output.
- Produces: a reusable audit workflow that chooses the correct GitHub Pages base and runs repository-native verification before deployment.

- [ ] **Step 1: Load the required skill-authoring guidance**

Read `skill-creator`, `superpowers:writing-skills` and `superpowers:test-driven-development` completely. Because multi-agent testing is unavailable unless explicitly authorized, use realistic written scenarios plus the deterministic verifier tests from Task 6; document this constraint rather than pretending an independent behavioral test occurred.

- [ ] **Step 2: Record baseline failure scenarios before authoring**

Use these three scenarios and record the expected baseline mistakes in the working notes:

```text
1. A Vite project site repo named portfolio uses base "/" and absolute /assets URLs.
2. A user site repo named owner.github.io links to /public/docs/cv.pdf.
3. A workflow uploads dist without running the repository's tests or checking referenced assets.
```

The target failures are choosing the wrong base, misunderstanding Vite's `public/` copy behavior and treating a successful build as proof that every deployed URL resolves.

- [ ] **Step 3: Initialize the skill**

Run:

```bash
python3 /Users/ilyassbouissa/.codex/skills/.system/skill-creator/scripts/init_skill.py verifying-github-pages --path /Users/ilyassbouissa/.codex/skills --interface display_name="Verify GitHub Pages" --interface short_description="Audit static builds before GitHub Pages deployment"
```

- [ ] **Step 4: Replace the scaffold with the minimal skill**

Use this frontmatter and contract:

```md
---
name: verifying-github-pages
description: Use when preparing, debugging, or reviewing a static site deployed with GitHub Pages, especially when Vite base paths, public assets, project-site subpaths, or Actions artifacts may break after deployment.
---

# Verifying GitHub Pages

## Core contract

Determine the site kind before changing paths:

| Repository | Required base |
|---|---|
| `<owner>.github.io` | `/` |
| any other repository | `/<repository>/` |

For Vite, files inside `public/` are emitted at the build root. Reference `public/docs/cv.pdf` as `<base>docs/cv.pdf`, never as `<base>public/docs/cv.pdf`.

## Verification workflow

1. Read the build tool config, package scripts and Pages workflow.
2. Resolve the repository name and expected base with the table above.
3. Run the repository's tests, type-check and production build.
4. Inspect the generated HTML and CSS, not only the sources.
5. Confirm every local `src`, `href` and CSS `url()` target exists inside the artifact.
6. Reject `/public/`, path traversal and base-incompatible root URLs.
7. Serve or preview the artifact and request the entry page plus critical documents.
8. Keep the verification before artifact upload in CI.

Prefer a repository-native deterministic checker when present. Never rewrite paths automatically during an audit; report the exact file and URL, then fix through a tested change.

## Completion evidence

Report the commands run, their exit status, the resolved Pages base and the critical URLs checked. A green build without artifact/path verification is incomplete.
```

- [ ] **Step 5: Validate the skill and run the scenarios against it**

Run:

```bash
python3 /Users/ilyassbouissa/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/ilyassbouissa/.codex/skills/verifying-github-pages
wc -w /Users/ilyassbouissa/.codex/skills/verifying-github-pages/SKILL.md
```

Expected: validation succeeds and the skill remains below 500 words. Re-evaluate the three baseline scenarios: each must select the correct base, forbid `/public/`, inspect the built artifact and require a pre-upload CI gate.

- [ ] **Step 6: Record the external deliverable**

Do not commit the personal skill into this repository. Add a short entry to the final handoff stating its absolute location and validation command.

### Task 8: Full verification and visual QA

**Files:**
- Modify only if verification finds a defect in an already-owned file.

**Interfaces:**
- Consumes: the complete page, all automated checks and the GitHub Pages verifier.
- Produces: evidence that the redesign and deployment contract satisfy the spec.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
pnpm test
pnpm test:pages
pnpm type-check
pnpm lint:check
pnpm build
GITHUB_REPOSITORY=bouissai/bouissai.github.io pnpm verify:pages
```

Expected: every command exits 0 with no unreported warnings or failures.

- [ ] **Step 2: Start the production preview**

Run `pnpm preview --host 127.0.0.1` in a persistent terminal session and record the selected port. Request these URLs with `curl -I`:

```text
/
/docs/CV_Ilyass_achat.pdf
/photo-pro.crop.jpg
/logo/laposte.jpg
/logo/capgemini.jpeg
/logo/rakuten.webp
/logo/uga.png
/logo/gem.png
```

Expected: HTTP 200 for every URL.

- [ ] **Step 3: Inspect responsive layouts**

Capture and inspect the page at 375 × 812, 768 × 1024, 1024 × 768 and 1440 × 1000. At each size confirm: no horizontal scroll, complete hero actions, equal expertise weights, readable case studies, unbroken timeline, visible focus and unobscured final contact.

- [ ] **Step 4: Verify accessibility interactions**

Using keyboard only, traverse the header, hero actions, external links and contact. Open/close the mobile menu with Enter and Escape. Emulate `prefers-reduced-motion: reduce` and confirm all content is visible and no transition blocks interaction.

- [ ] **Step 5: Inspect network and console**

Reload the production preview. Confirm no missing resources, JavaScript errors, autoplaying video, YouTube iframe or unexpected third-party request beyond the font stylesheet/font files. Confirm the CV opens from the built site.

- [ ] **Step 6: Check repository hygiene**

Run:

```bash
git diff --check
git status --short
git diff --name-only HEAD~6..HEAD
```

Expected: only intended portfolio files and plan/spec commits are present; the user's pre-existing modified CV remains uncommitted and unchanged by this work.

- [ ] **Step 7: Commit any QA-only fixes, then rerun the affected checks**

If QA required changes, stage only those files and commit:

```bash
git commit -m "fix: resolve portfolio QA findings"
```

If no fixes were required, do not create an empty commit.

- [ ] **Step 8: Request final code review**

Use `superpowers:requesting-code-review` for a whole-branch review against the spec and this plan. Address any High or Medium findings, rerun Step 1 and report the final command evidence.
