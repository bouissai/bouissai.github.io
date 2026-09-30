import { computed, ref } from 'vue'
import type { CaseStudy, Expertise, JourneyItem, LinkAction, NavLink, Project } from '@/data/portfolio'
import { caseStudies, contactContent, expertise, heroContent, journey, navLinks, projects, socials } from '@/data/portfolio'

export type Locale = 'fr' | 'en'

export type UiCopy = {
  skipToContent: string
  navAria: string
  mobileNavAria: string
  discuss: string
  contactMe: string
  mobileMenuOpen: string
  mobileMenuClose: string
  language: { switchToFrench: string; switchToEnglish: string; current: string }
  expertise: { eyebrow: string; title: string; description: string }
  caseStudies: { eyebrow: string; title: string; description: string }
  projects: { eyebrow: string; title: string; description: string; academicLabel: string; featured: string; technical: string; product: string; source: string; demo: string; videoTitle: string }
  journey: { eyebrow: string; title: string; description: string; experiences: string; experienceCount: string; experienceAria: string; education: string; educationCount: string; educationAria: string; currentJob: string; pastJob: string; currentEducation: string; pastEducation: string }
  contact: { eyebrow: string; title: string; scheduleCall: string; writeEmail: string }
  footer: { label: string; navAria: string }
  companion: Record<'initial' | 'home' | 'expertise' | 'realisations' | 'projets' | 'parcours' | 'contact', string>
}

type PortfolioContent = {
  navLinks: NavLink[]
  heroContent: typeof heroContent
  expertise: Expertise[]
  caseStudies: CaseStudy[]
  projects: Project[]
  journey: JourneyItem[]
  contactContent: typeof contactContent
  socials: typeof socials
  ui: UiCopy
}

export const locale = ref<Locale>('fr')

export const setLocale = (nextLocale: Locale) => { locale.value = nextLocale }

export const toggleLocale = () => { locale.value = locale.value === 'fr' ? 'en' : 'fr' }

const frenchUi: UiCopy = {
  skipToContent: 'Aller au contenu', navAria: 'Navigation principale', mobileNavAria: 'Navigation mobile', discuss: 'Discuter', contactMe: 'Me contacter', mobileMenuOpen: 'Ouvrir le menu', mobileMenuClose: 'Fermer le menu',
  language: { switchToFrench: 'Passer en français', switchToEnglish: 'Switch to English', current: 'Langue actuelle' },
  expertise: { eyebrow: 'Expertise', title: 'Deux expertises. Un seul regard.', description: 'Je relie les enjeux économiques, métier et techniques pour prendre de meilleures décisions numériques.' },
  caseStudies: { eyebrow: 'Réalisations', title: 'Des preuves, pas des promesses.', description: 'Des achats technologiques au produit livré, chaque cas relie décision, architecture et exploitation.' },
  projects: { eyebrow: 'Projets techniques', title: 'Je garde les mains dans le code.', description: 'Je construis des produits utiles. Je les livre et je les rends exploitables.', academicLabel: 'Projets académiques', featured: 'Projet phare', technical: 'Projet technique', product: 'Voir le produit', source: 'Code source', demo: 'Démonstration', videoTitle: 'Démonstration vidéo :' },
  journey: { eyebrow: 'Parcours', title: 'Logiciel et achats IT', description: 'Des expériences en logiciel et en achats IT. Une formation qui complète ce parcours.', experiences: 'Expériences professionnelles', experienceCount: 'postes', experienceAria: 'Expériences professionnelles, de la plus récente à la plus ancienne', education: 'Formations', educationCount: 'diplômes', educationAria: 'Formations, de la plus récente à la plus ancienne', currentJob: 'Poste actuel', pastJob: 'Poste terminé', currentEducation: 'Formation en cours', pastEducation: 'Formation terminée' },
  contact: { eyebrow: 'Contact', title: 'Parlons de ce qu’on peut construire.', scheduleCall: 'Programmer un appel', writeEmail: 'Écrire un email' },
  footer: { label: 'Achats IT × Ingénierie logicielle', navAria: 'Navigation de pied de page' },
  companion: { initial: 'Bienvenue', home: 'Enchanté !', expertise: 'Mon double regard', realisations: 'Mes réalisations', projets: 'Côté code', parcours: 'Mon parcours', contact: 'On se rencontre ?' },
}

const englishUi: UiCopy = {
  skipToContent: 'Skip to content', navAria: 'Main navigation', mobileNavAria: 'Mobile navigation', discuss: 'Let’s talk', contactMe: 'Get in touch', mobileMenuOpen: 'Open menu', mobileMenuClose: 'Close menu',
  language: { switchToFrench: 'Passer en français', switchToEnglish: 'Switch to English', current: 'Current language' },
  expertise: { eyebrow: 'Expertise', title: 'Two areas of expertise. One perspective.', description: 'I connect business, financial and technical considerations to make better digital decisions.' },
  caseStudies: { eyebrow: 'Selected work', title: 'Proof, not promises.', description: 'From technology procurement to delivered products, each case connects decisions, architecture and operations.' },
  projects: { eyebrow: 'Technical projects', title: 'I still build with code.', description: 'I build useful products. I ship them and make them ready to run.', academicLabel: 'Academic projects', featured: 'Featured project', technical: 'Technical project', product: 'View product', source: 'Source code', demo: 'Watch demo', videoTitle: 'Video demo:' },
  journey: { eyebrow: 'Journey', title: 'Software and IT procurement', description: 'Experience in software and IT procurement, supported by a focused academic background.', experiences: 'Professional experience', experienceCount: 'roles', experienceAria: 'Professional experience, most recent first', education: 'Education', educationCount: 'degrees', educationAria: 'Education, most recent first', currentJob: 'Current role', pastJob: 'Previous role', currentEducation: 'Current program', pastEducation: 'Completed program' },
  contact: { eyebrow: 'Contact', title: 'Let’s talk about what we can build.', scheduleCall: 'Schedule a call', writeEmail: 'Send an email' },
  footer: { label: 'IT Procurement × Software Engineering', navAria: 'Footer navigation' },
  companion: { initial: 'Welcome', home: 'Nice to meet you!', expertise: 'Two perspectives', realisations: 'Selected work', projets: 'Code side', parcours: 'My journey', contact: 'Let’s meet?' },
}

const englishNavLinks: NavLink[] = [
  { id: 'expertise', label: 'Expertise' }, { id: 'realisations', label: 'Work' }, { id: 'projets', label: 'Projects' }, { id: 'parcours', label: 'Journey' }, { id: 'contact', label: 'Contact' },
]

const englishHeroContent: typeof heroContent = {
  ...heroContent,
  eyebrow: 'IT Procurement × Software Engineering',
  title: 'I connect purchasing decisions to technical reality.',
  description: 'An IT buyer with a software development background, I lead technology consultations and continue to build digital products from end to end.',
  photoAlt: 'Professional portrait of Ilyass Bouissa',
  photoCaption: 'Buying with an engineer’s perspective. Building with a business perspective.',
  actions: [
    { id: 'work', label: 'View selected work', href: '#realisations', variant: 'primary' },
    { id: 'cv', label: 'Download resume', href: '/docs/Resume.pdf', external: true, variant: 'secondary' },
    { id: 'contact', label: 'Get in touch', href: '#contact', variant: 'text' },
  ] satisfies LinkAction[],
  badge: 'IT Procurement × Software Engineering',
  ctaPrimary: { label: 'View selected work', href: '#realisations' },
  ctaSecondary: { label: 'Download resume', href: '/docs/Resume.pdf' },
  highlights: [
    { value: 'I lead', label: 'IT procurement', description: 'Consultations, analysis and negotiation' },
    { value: 'I build', label: 'Software', description: 'Products, data and deployment' },
  ],
}

const englishExpertise: Expertise[] = [
  { id: 'procurement', eyebrow: '01 · IT Procurement', title: 'Make decisions with business, financial and technical criteria.', description: 'I structure technology consultations from the initial need through contracting, with a concrete understanding of the solutions on the table.', capabilities: ['Tenders and sourcing', 'Technical and financial analysis', 'Negotiation and contracting', 'Market, IoT and software monitoring'] },
  { id: 'engineering', eyebrow: '02 · Software Engineering', title: 'Build products designed to be used in the real world.', description: 'I continue to build complete applications across user experience, data, security, deployment and operating costs.', capabilities: ['Full-stack design', 'Architecture and data', 'Cloud, Docker and CI/CD', 'Product, operations and costs'] },
]

const englishCaseStudies: CaseStudy[] = [
  { id: 'softpos-iot', pillar: 'procurement', eyebrow: 'IT Procurement · La Poste Groupe', title: 'Frame technology purchases with operational impact in mind.', summary: 'Consultations covering mobile payment, IoT and software solutions for Industry, Technology and Logistics activities.', challenge: 'Compare complex offers without losing sight of security, business use, total cost and deployment capacity.', approach: ['Gather and formalize the need', 'Technical, CSR and compliance criteria', 'Technical and financial analysis grid', 'Sourcing, negotiation and contracting'], proofs: ['SoftPOS and PCI-DSS criteria', 'IoT and Bluetooth Low Energy solutions', 'Hypervision, audit and digital assessments'], tags: ['Tenders', 'TCO', 'IoT', 'Security', 'Negotiation'], links: [] },
  { id: 'b-market', pillar: 'engineering', eyebrow: 'Full-stack product · Personal project', title: 'B-Market: make click and collect ready for real operations.', summary: 'An e-commerce platform built for a butcher shop, with a customer journey, order management and operational tools.', challenge: 'Bring online ordering, business workflows and reliable deployment together in a product that is easy to run.', approach: ['Click-and-collect journey and customer account', 'Order management back office', 'Relational data with Prisma and PostgreSQL', 'Containerization and automated delivery'], proofs: ['Back office and statistics', 'Authentication and customer account', 'CI/CD to a VPS'], tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'GitHub Actions'], links: [{ id: 'live', label: 'View product', href: 'https://bmarket.fr', external: true, variant: 'primary' }, { id: 'repo', label: 'View source', href: 'https://github.com/bouissai/b-market', external: true, variant: 'text' }] },
]

const englishProjects: Project[] = [
  { id: 'bmarket', type: 'personal', title: 'B-Market', summary: 'Click-and-collect e-commerce platform built for a butcher shop, with a customer journey and operational tools.', description: 'E-commerce platform built for a butcher shop, with ordering, authentication, customer accounts and a back office.', features: ['Orders and customer account', 'Back office and statistics', 'CI/CD and VPS deployment'], tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Docker'], href: 'https://bmarket.fr', repo: 'https://github.com/bouissai/b-market', demo: 'https://youtu.be/Gq5UYJvB9bs', featured: true },
  { id: 'mts', type: 'academic', title: 'MTS', summary: 'Application designed for a transport company. It tracks driver pay, archives delivery notes and manages client companies. It helps teams find a note and its details when resolving incidents.', features: ['Driver, client and payment management', 'Delivery-note search and archiving', 'Excel export'], tags: ['Spring Boot', 'Angular', 'PostgreSQL'], demo: 'https://www.youtube.com/watch?v=TurXDLKvCBU' },
  { id: 'deal-hearts', type: 'personal', title: 'Deal Hearts', summary: 'Narrative mobile game that turns negotiation fundamentals into choices, consequences and debriefs.', features: ['Offline educational visual novel', 'Deterministic choice engine and versioned content', 'Local saves and skill-based progression'], tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Zod'], demo: 'https://youtu.be/zwlI8cqxfh8' },
  { id: 'monkey-quest', type: 'academic', title: 'MonkeyQuest', summary: 'Urban challenge app in Grenoble, designed around discovery and local interaction.', features: ['Interactive map', 'Authentication and profiles', 'Geolocation and visits'], tags: ['Spring Boot', 'Angular', 'Heroku'], demo: 'https://www.youtube.com/watch?v=t_VteTAYGzc' },
]

const englishJourney: JourneyItem[] = [
  { id: 'laposte', kind: 'experience', role: 'IT/OT Buyer · apprenticeship', organization: 'La Poste Groupe · ITL', period: 'Sep. 2025 to present', summary: 'Software, IT services and IoT procurement for Industry, Technology and Logistics activities.', highlights: ['Technology consultations and technical-financial analysis', 'Sourcing, negotiation and contracting'], logo: '/logo/laposte.jpg' },
  { id: 'capgemini', kind: 'experience', role: 'Software Engineer and Project Lead · apprenticeship', organization: 'Capgemini Engineering', period: 'Sep. 2022 to Feb. 2025', summary: 'Development and delivery of internal products around data, cloud and software industrialization.', highlights: ['Spring Boot, Angular, Python and PostgreSQL', 'Docker and Kubernetes deployments'], logo: '/logo/capgemini.jpeg' },
  { id: 'rakuten', kind: 'experience', role: 'Software Engineer · internship', organization: 'Rakuten Advertising', period: 'May 2022 to Aug. 2022', summary: 'Development of an internal advertising pipeline and deployment on GCP.', highlights: ['Java/Spring service and REST endpoint', 'Docker, Kubernetes and GCP'], logo: '/logo/rakuten.webp' },
  { id: 'gem', kind: 'education', role: 'Specialized Master’s in Procurement', organization: 'Grenoble École de Management', period: 'Sep. 2025 to Sep. 2026', summary: 'Procurement processes, contracting, negotiation, TCO and supplier risk management.', highlights: ['IT procurement', 'Compliance and risk'], logo: '/logo/gem.png' },
  { id: 'uga', kind: 'education', role: 'Master’s in Information Systems', organization: 'Université Grenoble Alpes', period: 'Sep. 2022 to Sep. 2024', summary: 'Software architecture, project management, GDPR and cybersecurity.', highlights: ['Information systems', 'Software development'], logo: '/logo/uga.png' },
]

const englishContactContent = { ...contactContent, title: 'Let’s talk about what we can build.', message: 'Available to discuss a role, an IT procurement project or a digital product to build.', location: 'Lyon, France' }

const frenchPortfolio: PortfolioContent = { navLinks, heroContent, expertise, caseStudies, projects, journey, contactContent, socials, ui: frenchUi }
const englishPortfolio: PortfolioContent = { navLinks: englishNavLinks, heroContent: englishHeroContent, expertise: englishExpertise, caseStudies: englishCaseStudies, projects: englishProjects, journey: englishJourney, contactContent: englishContactContent, socials, ui: englishUi }

export const localizedPortfolio = computed<PortfolioContent>(() => locale.value === 'en' ? englishPortfolio : frenchPortfolio)
