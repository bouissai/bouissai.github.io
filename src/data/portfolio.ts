export type NavLink = {
  id: string
  label: string
}

export type SocialLink = {
  id: string
  label: string
  href: string
  icon: string
}

export type Project = {
  id: string
  title: string
  projectImg: string
  description: string
  tags: string[]
  href: string
  repo?: string
  videoPath?: string
  featured?: boolean
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

export type SkillGroup = {
  id: string
  title: string
  items: string[]
}

export const navLinks: NavLink[] = [
  { id: 'about', label: 'À propos' },
  { id: 'projects', label: 'Projets techniques' },
  { id: 'experience', label: 'Parcours' },
  { id: 'skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' }
]

export const heroContent = {
  badge: 'Full Stack Developer & IT/OT Buyer ',
  title: 'Entre achat et technique',
  description:
    'Acheteur IT/OT chez La Poste Groupe et ancien ingénieur full stack, je combine expertise technique et stratégie économique pour piloter les achats logiciels, services IT et projets digitaux. Entre architecture, négociation et innovation, j’aime bâtir des ponts entre la tech et le business.',
  photoUrl:
    '/photo-pro.crop.jpg',
  photoAlt: 'Portrait professionnel d’Ilyass Bouissa',
  photoCaption: '“Comprendre la technique pour mieux acheter”',
  ctaPrimary: {
    label: 'Voir mes projets',
    href: '#projects'
  },
  ctaSecondary: {
    label: 'Télécharger le CV',
    href: '/public/docs/CV_Ilyass_achat.pdf'
  },
  highlights: [
    {
      value: '+ 3 ans',
      label: 'Tech & achats',
      description: 'Capgemini, Rakuten & La Poste Groupe'
    },
    {
      value: '2 domaines',
      label: 'IT & Achats',
      description: 'Developpement, Sourcings & Contractualisation'
    },
    {
      value: 'Lyon',
      label: 'Basé à',
      description: 'Ouvert à toute la France'
    }
  ]
}

export const aboutContent = {
  title: 'Profil spécialisé',
  paragraphs: [
    'Actuellement acheteur IT/OT en alternance à La Poste Groupe, je pilote des achats logiciels et de prestations informatiques pour la branche Industrie, Technologie & Logistique : appels d’offres, analyse des offres, négociation et contractualisation.',
    'Avant cela, j’ai travaillé comme développeur chez Capgemini Engineering et Rakuten, sur des projets en Spring Boot, Angular, Python et PostgreSQL. Cette expérience me permet de comprendre les solutions techniques, d’échanger plus efficacement avec les équipes IT et d’évaluer les offres fournisseurs de manière concrète. Je continue de coder régulièrement sur des projets personnels et je reste en veille sur les nouveaux outils et évolutions technologiques, ce qui me permet de garder un regard actuel et opérationnel sur les solutions du marché.'
  ],
  highlights: [
    { label: 'Expérience IT/OT Achats', value: 'La Poste Groupe', images: ['/logo/laposte.jpg'] },
    { label: 'Expérience Tech', value: 'Capgemini & Rakuten', images: ['/logo/capgemini.jpeg', '/logo/rakuten.webp'] },
    { label: 'Formation', value: 'MS Achats & Master MIAGE', images: ['/logo/uga.png', '/logo/gem.png'] }
  ]
}
export const projects: Project[] = [
  {
    id: 'bmarket',
    title: 'B-Market',
    projectImg: 'B-Market.jpg',
    description:
      'Plateforme e-commerce halal avec système de commande en ligne (click & collect) pour une boucherie à Grenoble. Projet full stack développé avec Next.js, Prisma et PostgreSQL, intégrant CI/CD et hébergement Dockerisé.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Git CI/CD', 'Docker', 'VPS Ionos'],
    href: 'https://bmarket.fr',
    repo: 'https://github.com/bouissai/b-market',
    videoPath: 'https://www.youtube.com/embed/Gq5UYJvB9bs?si=_fzImUamorRds3Zp',
    featured: true
  },
  {
    id: 'transport-app',
    title: 'MTS',
    projectImg: 'MTS.jpg',
    description:
      'Application web de gestion de courses et de bons de livraison, développée dans le cadre du master MIAGE. Permet la gestion des chauffeurs, clients, paiements et export Excel.',
    tags: ['Spring Boot', 'Angular', 'PostgreSQL'],
    href: 'https://www.youtube.com/embed/TurXDLKvCBU?si=PwoPmuFOhLRpZ4u2',
    videoPath: 'https://www.youtube.com/embed/TurXDLKvCBU?si=PwoPmuFOhLRpZ4u2'

  },
  {
    id: 'monkeyQuest',
    projectImg: 'grosmed.jpg',
    title: 'MonkeyQuest',
    description:
      'Application permettant de créer, découvrir et relever des défis à grenoble. Elle intègre une carte interactive, une authentification sécurisée, la géolocalisation en temps réel et la gestion des profils et visites des utilisateurs.',
    tags: ['Spring Boot', 'Angular', 'Heroku'],
    href: 'https://www.youtube.com/watch?v=t_VteTAYGzc',
    videoPath: 'https://www.youtube.com/embed/t_VteTAYGzc?si=5dTG1N04QXQxZcTr'
  }
]

export const experiences: Experience[] = [
  {
    id: 'laposte',
    role: 'IT/OT Buyer Apprentice',
    company: 'La Poste Groupe – ITL (Industrie, Technologie & Logistique)',
    companyImg: "/logo/laposte.jpg",
    period: 'Sept. 2025 — Aujourd’hui',
    description: 'Participation aux achats logiciels et prestations informatiques au sein du pôle ITL, avec un focus sur les appels d’offres, la contractualisation et le suivi fournisseur.',
    achievements: [
      'Pilotage d’un appel d’offre SoftPOS pour équiper des facteurs en solution de paiement mobile : rédaction du cahier des charges, définition des critères (sécurité, conformité PCI-DSS), construction de la grille d’analyse technico-économique et comparaison des offres fournisseurs.',
      'Participation à des appels d’offres portant sur des solutions IoT (Bluetooth Low Energy), des équipements informatiques éducatifs, des prestations intellectuelles ainsi que des solutions logicielles d’hypervision IoT, d’audit et d’état des lieux numériques',
      'Veille technologique et sourcing fournisseurs lors des salons SIDO (IoT) & RetailTech',
      'Négociation et contractualisation',
      'Appui technique grâce à un background full stack : challenge des coûts cachés et des faisabilités techniques.'
    ]
  },
  {
    id: 'capgemini',
    role: 'Software Engineer & IT Project Manager (Alternance)',
    company: 'Capgemini Engineering',
    companyImg: "/logo/capgemini.jpeg",
    period: 'Sept. 2022 — Fév. 2025',
    description:
      'Développement et pilotage de projets internes pour la division R&I (Recherche et Innovation), autour de la data, du cloud et de l’industrialisation logicielle.',
    achievements: [
      'Conception de services backend avec Spring Boot et PostgreSQL.',
      'Développement d’interfaces Angular et intégration d’algorithmes en Python.',
      'Optimisation et automatisation des déploiements sur Docker & Kubernetes.'
    ]
  },
  {
    id: 'rakuten',
    role: 'Software Engineer Intern',
    company: 'Rakuten Advertising',
    companyImg: "/logo/rakuten.webp",
    period: 'Mai 2022 — Août 2022',
    description:
      'Développement d’un pipeline de données interne et déploiement sur GCP.',
    achievements: [
      'Création d’un service Spring Boot pour le traitement des données publicitaires.',
      'Mise en place d’un outil de requêtes internes en HTTP et d’un endpoint REST.',
      'Déploiement sur Docker & Kubernetes (GCP).'
    ]
  }
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'achats',
    title: 'Achats & Stratégie',
    items: [
      'RFI / RFP Management',
      'Négociation fournisseurs',
      'Contract Management',
      'Analyse TCO',
      'Veille technologique',
      'Digitalisation des processus'
    ]
  },
  {
    id: 'tech',
    title: 'Développement & Data',
    items: [
      'Spring Boot',
      'Angular',
      'Python',
      'PostgreSQL',
      'Next.js',
      'Prisma',
      'Docker / Kubernetes'
    ]
  },
  {
    id: 'outils',
    title: 'Outils & Méthodes',
    items: [
      'GitHub / GitLab CI/CD',
      'Swagger / Figma',
      'Agile / Scrum',
      'Power BI / Excel Avancé',
      'Ansible / GCP'
    ]
  }
]

export const socials: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilyassbouissa/', icon: 'linkedin' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/bouissai', icon: 'github' }
]

export const contactContent = {
  title: 'Discutons de vos projets IT',
  email: 'bouissailyass@gmail.com',
  phone: '+33 6 95 50 90 33',
  location: 'Lyon, France',
  message:
    'Basé à Lyon, je suis ouvert aux collaborations hybrides mêlant achats, technologie et développement. Parlons ensemble de vos enjeux stratégiques et des leviers digitaux pour y répondre.',
}
