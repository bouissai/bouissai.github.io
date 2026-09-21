# Refonte du portfolio d'Ilyass Bouissa

Date : 21 septembre 2026

## Objectif

Reconstruire le portfolio comme une vitrine professionnelle courte et crédible qui donne le même poids aux achats IT et au développement logiciel. Le visiteur doit comprendre en quelques secondes qu'Ilyass sait à la fois piloter une décision d'achat technologique et construire un produit numérique.

Le site vise principalement les recruteurs, responsables achats, responsables IT et interlocuteurs techniques. Il doit faciliter trois actions : comprendre le positionnement, vérifier les preuves et contacter Ilyass ou télécharger son CV.

## Positionnement éditorial

Le message central est :

> Je pilote les achats IT avec un regard d'ingénieur, et je continue à construire des produits numériques.

Les achats et le code sont présentés comme deux expertises complémentaires, pas comme deux carrières concurrentes. Le ton est direct, précis et factuel. Les formulations génériques sur le design, les prototypes, l'innovation ou l'accompagnement sont supprimées lorsqu'elles ne sont pas soutenues par une réalisation concrète.

Le contenu provient en priorité du CV `public/docs/CV_Ilyass_achat.pdf`, du dépôt du portfolio et des projets techniques vérifiables. Les informations confidentielles sur La Poste, ses fournisseurs, ses budgets ou ses offres ne sont pas exposées.

## Direction artistique

La direction retenue est un style éditorial suisse, lumineux et structuré :

- fond ivoire clair et surfaces blanches ;
- texte graphite à contraste élevé ;
- bleu cobalt comme accent unique ;
- gris froid pour les informations secondaires ;
- grille visible par l'alignement, les bordures fines et les rythmes d'espacement ;
- angles peu arrondis et ombres limitées ;
- grands titres, textes courts et données mises en évidence ;
- portrait professionnel sans filtre décoratif ;
- icônes SVG cohérentes, sans emoji décoratif.

Archivo est utilisée pour les titres et Space Grotesk pour le texte. Une police monospace peut être utilisée avec parcimonie pour les libellés techniques, dates et métriques. Les polices doivent disposer de fallbacks système et ne doivent pas bloquer l'affichage.

La vidéo de fond, les halos colorés, le glassmorphism généralisé et les animations liées au défilement sont supprimés. Les transitions restantes sont courtes, portent uniquement sur `transform` ou `opacity` et respectent `prefers-reduced-motion`.

## Architecture de la page

### 1. En-tête

L'en-tête contient le nom, une navigation par ancres et une action de contact. Il reste compact, accessible au clavier et lisible sur fond clair. Sur mobile, le menu conserve des cibles tactiles d'au moins 44 px et gère correctement l'ouverture, la fermeture, la touche Échap et le retour du focus.

### 2. Hero

Le hero présente immédiatement :

- le libellé « Achats IT × Ingénierie logicielle » ;
- une accroche dérivée du message central ;
- une description courte du profil ;
- le portrait professionnel ;
- les actions « Voir les réalisations », « Télécharger le CV » et « Me contacter » ;
- deux repères visuels de poids égal : « Je pilote » pour les achats et « Je construis » pour le développement.

Le lien du CV pointe vers `/docs/CV_Ilyass_achat.pdf`, jamais vers `/public/docs/...`.

### 3. Double expertise

Deux blocs symétriques montrent la complémentarité du profil.

Le bloc Achats IT couvre : appels d'offres, sourcing, analyse technico-économique, TCO, négociation, contractualisation et veille marché.

Le bloc Ingénierie logicielle couvre : conception full stack, architecture applicative, data, cloud, CI/CD et exploitation.

Les listes restent courtes. Les compétences détaillées sont démontrées dans les études de cas et le parcours plutôt que répétées dans une section exhaustive.

### 4. Études de cas principales

#### Achats IT : SoftPOS et solutions IT/IoT

Cette étude de cas explique le type de problèmes traités à La Poste : recueil du besoin, définition des critères, construction d'une grille technico-économique et RSE, comparaison des offres, négociation et contractualisation. Elle peut mentionner SoftPOS, PCI-DSS, IoT et Bluetooth Low Energy, conformément au CV, mais ne publie aucun fournisseur, montant, score ou document interne.

#### Produit technique : B-Market

B-Market est le projet technique phare. L'étude de cas présente :

- le besoin métier de click and collect pour une boucherie ;
- le parcours client et la gestion des commandes ;
- l'authentification et le compte client ;
- le back-office, les statistiques, les promotions, les recettes et les exports ;
- Next.js, TypeScript, Prisma et PostgreSQL ;
- Docker, GitHub Actions, GHCR et le déploiement sur VPS ;
- le lien vers le produit et le code source.

La présentation met en avant la capacité à relier besoin, coût d'exploitation, architecture et livraison, plutôt qu'une simple liste de technologies.

### 5. Autres réalisations

MTS et MonkeyQuest apparaissent sous forme de fiches compactes. Chaque fiche contient le problème traité, deux ou trois fonctionnalités distinctives, la pile technique et un lien de démonstration. Les iframes YouTube ne sont pas chargées automatiquement dans la page principale ; un visuel ou un bouton ouvre la démonstration afin de préserver les performances et la vie privée.

### 6. Parcours

Une chronologie compacte présente Rakuten, Capgemini Engineering puis La Poste Groupe. Chaque étape est limitée à son rôle, sa période et deux contributions significatives. Les formations MIAGE et Mastère Spécialisé Achats complètent la chronologie et rendent la double compétence explicite.

### 7. Contact

La fin de page contient l'email, LinkedIn, GitHub et le CV. Le message invite à échanger sur un besoin d'achats IT, un projet technologique ou un poste hybride. Le téléphone n'est affiché que si sa publication reste souhaitée dans les données finales.

## Modèle de contenu et composants

Le contenu reste centralisé dans `src/data/portfolio.ts`, mais ses types sont adaptés aux études de cas, preuves, liens et niveaux de mise en avant. Les composants ont chacun une responsabilité claire :

- `SiteHeader` : navigation et menu mobile ;
- `HeroSection` : positionnement, portrait et actions ;
- `DualExpertiseSection` : deux expertises équilibrées ;
- `CaseStudiesSection` et `CaseStudyCard` : preuves principales ;
- `OtherProjectsSection` et `ProjectCard` : réalisations secondaires ;
- `JourneySection` et `JourneyItem` : expériences et formations ;
- `ContactSection` : coordonnées et actions finales ;
- composants UI partagés pour les boutons, titres, badges et liens externes.

La section À propos actuelle, la longue section de compétences, `ScrollVideoBackground`, `MobileQuickActions` et le composant inutilisé `WorkTogether` sont retirés s'ils ne servent plus la nouvelle architecture.

## Responsive, accessibilité et performance

Le design est mobile-first et vérifié aux largeurs 375, 768, 1024 et 1440 px.

- corps de texte d'au moins 16 px sur mobile ;
- lignes de 35 à 60 caractères sur mobile et 60 à 75 sur desktop ;
- aucun défilement horizontal ;
- navigation, boutons et liens utilisables au clavier ;
- focus visible et contraste WCAG AA d'au moins 4,5:1 ;
- titres hiérarchisés et régions sémantiques ;
- textes alternatifs utiles et logos décoratifs correctement masqués ;
- cibles tactiles d'au moins 44 × 44 px ;
- zoom utilisateur conservé ;
- mouvement réduit respecté ;
- images dimensionnées pour éviter le CLS et chargées paresseusement hors hero ;
- aucune vidéo de fond ou iframe tierce chargée au démarrage.

## Compatibilité GitHub Pages

Le site reste une application Vue/Vite statique déployée sur `bouissai.github.io`. La configuration et les contenus ne dépendent d'aucun serveur d'application.

Un skill Codex réutilisable nommé `verifying-github-pages` sera créé dans le répertoire personnel des skills. Il guidera les audits de projets Vite/Vue destinés à GitHub Pages, en distinguant les sites utilisateur à la racine des sites projet sous un sous-chemin.

Le dépôt recevra un vérificateur déterministe appelé par le workflow GitHub Actions. Après le build, il contrôlera au minimum :

- la présence de `dist/index.html` ;
- la présence du CV et des images référencées ;
- l'absence de chemins `/public/` dans les sources et le build ;
- la résolution des ressources locales référencées par le HTML et le CSS ;
- l'absence de chemins absolus incompatibles avec le type de dépôt ;
- la cohérence entre la base Vite, le nom du dépôt et l'URL GitHub Pages ;
- la réussite du build avant l'envoi de l'artefact.

Le workflow conserve le déploiement officiel `actions/deploy-pages` et exécute la vérification avant `upload-pages-artifact`.

## Gestion des erreurs

Les liens externes s'ouvrent avec `rel="noreferrer"`. Les médias manquants ne doivent pas casser la mise en page. Les données optionnelles, comme un dépôt ou une démonstration, ne produisent aucun contrôle vide. Le menu mobile restaure toujours le défilement du document lorsqu'il se ferme ou lorsque le composant est démonté.

Une erreur du vérificateur GitHub Pages bloque le déploiement avec un message indiquant le fichier et le chemin concernés. Aucun correctif automatique ne modifie les fichiers du projet pendant cette vérification.

## Vérification

L'implémentation est considérée terminée uniquement lorsque :

1. les tests écrits avant les changements de comportement échouent pour la raison attendue puis passent ;
2. les tests existants passent ;
3. le type-check et le lint passent sans erreur ;
4. le build de production réussit ;
5. le vérificateur GitHub Pages valide le dossier `dist` ;
6. les pages sont contrôlées visuellement aux quatre largeurs cibles ;
7. le clavier, le focus, les contrastes et `prefers-reduced-motion` sont vérifiés ;
8. les liens vers le CV, GitHub, LinkedIn, les démonstrations et B-Market sont valides.

## Hors périmètre

- modification du CV PDF ;
- ajout d'un CMS ou d'un backend ;
- publication de données confidentielles sur les achats ;
- blog, formulaire avec stockage ou système d'analytics ;
- refonte des projets externes eux-mêmes ;
- traduction anglaise dans cette première version.
