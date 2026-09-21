export type NavLink = { id: string; label: string }

export type SocialLink = {
  id: string
  label: string
  href: string
  icon: 'linkedin' | 'github'
}

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
  description?: string
  href?: string
  projectImg?: string
  videoPath?: string
  featured?: boolean
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

export type Experience = {
  id: string
  role: string
  company: string
  companyImg: string
  period: string
  description: string
  achievements: string[]
}

export type SkillGroup = { id: string; title: string; items: string[] }

export const navLinks: NavLink[] = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' }
]

export const heroContent = {
  eyebrow: 'Achats IT × Ingénierie logicielle',
  title: 'Je relie la décision d’achat à la réalité technique.',
  description: 'Acheteur IT issu du développement logiciel, je pilote des consultations technologiques et je continue à concevoir des produits numériques de bout en bout.',
  photoUrl: '/photo-pro.crop.jpg',
  photoAlt: 'Portrait professionnel d’Ilyass Bouissa',
  actions: [
    { id: 'work', label: 'Voir les réalisations', href: '#realisations', variant: 'primary' },
    { id: 'cv', label: 'Télécharger le CV', href: '/docs/CV_Ilyass_achat.pdf', external: true, variant: 'secondary' },
    { id: 'contact', label: 'Me contacter', href: '#contact', variant: 'text' }
  ] satisfies LinkAction[],
  badge: 'Achats IT × Ingénierie logicielle',
  photoCaption: 'Acheter avec un regard d’ingénieur. Construire avec un regard métier.',
  ctaPrimary: { label: 'Voir les réalisations', href: '#realisations' },
  ctaSecondary: { label: 'Télécharger le CV', href: '/docs/CV_Ilyass_achat.pdf' },
  highlights: [
    { value: 'Je pilote', label: 'Achats IT', description: 'Consultations, analyse et négociation' },
    { value: 'Je construis', label: 'Logiciel', description: 'Produits, données et déploiement' }
  ]
}

export const expertise: Expertise[] = [
  {
    id: 'procurement', eyebrow: '01 — Achats IT', title: 'Décider avec des critères métier, économiques et techniques.',
    description: 'Je structure les consultations technologiques depuis le besoin jusqu’à la contractualisation, en gardant une lecture concrète des solutions proposées.',
    capabilities: ['Appels d’offres & sourcing', 'Analyse technico-économique & TCO', 'Négociation & contractualisation', 'Veille marché, IoT & logiciels']
  },
  {
    id: 'engineering', eyebrow: '02 — Ingénierie logicielle', title: 'Construire des produits pensés pour être réellement exploités.',
    description: 'Je continue à développer des applications complètes : expérience métier, données, sécurité, déploiement et maîtrise des coûts d’exploitation.',
    capabilities: ['Conception full stack', 'Architecture & données', 'Cloud, Docker & CI/CD', 'Produit, exploitation & coûts']
  }
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'softpos-iot', pillar: 'procurement', eyebrow: 'Achats IT — La Poste Groupe',
    title: 'Cadrer des achats technologiques à forts enjeux opérationnels.',
    summary: 'Consultations autour du paiement mobile, de l’IoT et de solutions logicielles pour les activités Industrie, Technologie & Logistique.',
    challenge: 'Comparer des offres complexes sans perdre de vue la sécurité, l’usage métier, le coût global et la capacité de déploiement.',
    approach: ['Recueil et formalisation du besoin', 'Critères techniques, RSE et conformité', 'Grille d’analyse technico-économique', 'Sourcing, négociation et contractualisation'],
    proofs: ['SoftPOS et critères PCI-DSS', 'Solutions IoT & Bluetooth Low Energy', 'Hypervision, audit et état des lieux numériques'],
    tags: ['Appels d’offres', 'TCO', 'IoT', 'Sécurité', 'Négociation'], links: []
  },
  {
    id: 'b-market', pillar: 'engineering', eyebrow: 'Produit full stack — Projet personnel',
    title: 'B-Market : faire du click & collect un produit exploitable.',
    summary: 'Une plateforme e-commerce conçue pour une boucherie, avec parcours client, gestion des commandes et outils opérationnels.',
    challenge: 'Réunir commande en ligne, gestion métier et déploiement fiable dans un produit simple à administrer.',
    approach: ['Parcours click & collect et compte client', 'Back-office de gestion des commandes', 'Données relationnelles avec Prisma & PostgreSQL', 'Conteneurisation et livraison automatisée'],
    proofs: ['Back-office & statistiques', 'Authentification & compte client', 'CI/CD vers un VPS'],
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    links: [
      { id: 'live', label: 'Voir le produit', href: 'https://bmarket.fr', external: true, variant: 'primary' },
      { id: 'repo', label: 'Voir le code', href: 'https://github.com/bouissai/b-market', external: true, variant: 'text' }
    ]
  }
]

export const projects: Project[] = [
  { id: 'mts', title: 'MTS', summary: 'Application de gestion de courses et de bons de livraison construite en master MIAGE.', features: ['Gestion chauffeurs, clients et paiements', 'Bons de livraison', 'Export Excel'], tags: ['Spring Boot', 'Angular', 'PostgreSQL'], demo: 'https://www.youtube.com/watch?v=TurXDLKvCBU' },
  { id: 'monkey-quest', title: 'MonkeyQuest', summary: 'Application de défis urbains à Grenoble, pensée autour de la découverte et de l’interaction locale.', features: ['Carte interactive', 'Authentification & profils', 'Géolocalisation et visites'], tags: ['Spring Boot', 'Angular', 'Heroku'], demo: 'https://www.youtube.com/watch?v=t_VteTAYGzc' }
]

export const journey: JourneyItem[] = [
  { id: 'laposte', kind: 'experience', role: 'Acheteur IT/OT — alternance', organization: 'La Poste Groupe · ITL', period: 'Sept. 2025 — aujourd’hui', summary: 'Achats de logiciels, prestations IT et solutions IoT pour les activités Industrie, Technologie & Logistique.', highlights: ['Pilotage de consultations et d’analyses technico-économiques', 'Sourcing, négociation et contractualisation'], logo: '/logo/laposte.jpg' },
  { id: 'capgemini', kind: 'experience', role: 'Ingénieur logiciel & chef de projet — alternance', organization: 'Capgemini Engineering', period: 'Sept. 2022 — fév. 2025', summary: 'Développement et pilotage de produits internes autour de la data, du cloud et de l’industrialisation logicielle.', highlights: ['Spring Boot, Angular, Python et PostgreSQL', 'Déploiements Docker et Kubernetes'], logo: '/logo/capgemini.jpeg' },
  { id: 'rakuten', kind: 'experience', role: 'Software Engineer — stage', organization: 'Rakuten Advertising', period: 'Mai 2022 — août 2022', summary: 'Développement d’un pipeline publicitaire interne et déploiement sur GCP.', highlights: ['Service Java/Spring et endpoint REST', 'Docker, Kubernetes et GCP'], logo: '/logo/rakuten.webp' },
  { id: 'gem', kind: 'education', role: 'Mastère Spécialisé Achats', organization: 'Grenoble École de Management', period: 'Sept. 2025 — sept. 2026', summary: 'Processus achats, contractualisation, négociation, TCO et gestion des risques fournisseurs.', highlights: ['Achats IT', 'Conformité et risques'], logo: '/logo/gem.png' },
  { id: 'uga', kind: 'education', role: 'Master MIAGE', organization: 'Université Grenoble Alpes', period: 'Sept. 2022 — sept. 2024', summary: 'Architecture logicielle, gestion de projet, RGPD et cybersécurité.', highlights: ['Systèmes d’information', 'Développement logiciel'], logo: '/logo/uga.png' }
]

export const aboutContent = {
  title: 'Un double regard sur les décisions technologiques',
  paragraphs: ['Acheteur IT issu du développement logiciel, je relie les besoins métiers, les contraintes techniques et les enjeux économiques.', 'Je continue à coder sur des produits personnels afin de garder un regard concret sur les outils et leurs conditions d’exploitation.'],
  highlights: [] as { label: string; value: string; images?: string[] }[]
}

export const experiences: Experience[] = journey.filter((item) => item.kind === 'experience').map((item) => ({ id: item.id, role: item.role, company: item.organization, companyImg: item.logo ?? '', period: item.period, description: item.summary, achievements: item.highlights }))
export const skillGroups: SkillGroup[] = []

export const socials: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilyassbouissa/', icon: 'linkedin' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/bouissai', icon: 'github' }
]

export const contactContent = {
  title: 'Parlons achats IT, produit et technologie.',
  email: 'bouissailyass@gmail.com', phone: '+33 6 95 50 90 33', location: 'Lyon, France',
  message: 'Disponible pour échanger sur un poste, une consultation IT ou un projet numérique à construire.',
  cvHref: '/docs/CV_Ilyass_achat.pdf'
}
