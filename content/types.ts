// Shapes for everything in content/. Components take these as props, so all
// copy and images live in content/ and nothing is hardcoded in components.

export type Photo = {
  // Path under /public, e.g. "/images/home/hero.jpg"
  src: string
  alt: string
  // CSS object-position for cropping, e.g. "50% 30%". Defaults to centre.
  position?: string
}

export type NavLink = { label: string; href: string }
export type NavMenu = { label: string; links: NavLink[]; emptyText?: string }

export type SiteSettings = {
  siteTitle: string
  siteDescription: string
  logo: Photo
  logoText: { prefix: string; highlight: string; suffix: string }
  menuLabel: string
  navMenus: NavMenu[]
  footerText: string
}

export type FaqItem = { question: string; answer: string }
export type Testimonial = { quote: string; name: string; role?: string; photo?: Photo }

export type HomePage = {
  hero: { heading: string; image: Photo }
  about: { heading: string; body: string[]; images: Photo[] }
  faq: { heading: string; items: FaqItem[] }
  testimonials: { heading: string; items: Testimonial[] }
}

export type WaitlistPage = {
  title: string
  eyebrow: string
  heading: string
  intro: string
  form: {
    firstNameLabel: string
    lastNameLabel: string
    emailLabel: string
    phoneLabel: string
    companyLabel: string
    messageLabel: string
    optionalText: string
    submitLabel: string
    submittingLabel: string
    successHeading: string
    successMessage: string
    requiredError: string
    emailError: string
    genericError: string
  }
}

// ── Pages every tournament year gets, at /<year>/<page> ─────────────

export type CoursePage = {
  title: string
  hero: { eyebrow: string; heading: string; poster: Photo; video?: { src: string; type: string } }
  about: { heading: string; body: string[] }
  details: { heading: string; items: string[] }
  photos: { heading: string; images: Photo[] }
}

export type EventPhotosPage = { title: string; eyebrow: string; heading: string; photos: Photo[] }

export type SwagPage = {
  title: string
  eyebrow: string
  heading: string
  image?: Photo
  intro: string
  items: string[]
}

export type Player = {
  name: string
  role?: string
  photo?: Photo
  homeCourse?: string
  handicap?: string
  bio?: string[]
}
export type PlayerBiosPage = {
  title: string
  eyebrow: string
  heading: string
  // Shown above the home course and handicap in each bio
  labels: { homeCourse: string; handicap: string }
  teams: { name: string; players: Player[] }[]
}

export type Match = {
  team1Players: string
  team2Players: string
  team1Points: number
  team2Points: number
}

export type ResultsPage = {
  title: string
  eyebrow: string
  heading: string
  teams: { team1: string; team2: string }
  labels: { winner: string; total: string; halved: string; captain: string }
  // The total is added up from the rounds
  rounds: { label: string; format: string; team1Points: number; team2Points: number; matches?: Match[] }[]
  players: {
    heading: string
    intro: string
    items: { name: string; team: 'team1' | 'team2'; captain?: boolean; plusMinus: number }[]
  }
}

export type Season = {
  year: number
  course?: CoursePage
  eventPhotos?: EventPhotosPage
  swag?: SwagPage
  playerBios?: PlayerBiosPage
  results?: ResultsPage
}
