import type { SiteSettings } from './types'

export const site: SiteSettings = {
  siteTitle: 'The Real Estate Invitational',
  siteDescription: 'A Ryder Cup style golf tournament for real estate professionals.',
  logo: { src: '/images/logo.svg', alt: 'The Real Estate Invitational' },
  logoText: { prefix: 'The', highlight: 'Real Estate', suffix: 'Invitational' },
  menuLabel: 'Open menu',
  // Each menu is a column in the header drawer and the footer
  navMenus: [
    {
      label: '2026',
      links: [
        { label: 'Course', href: '/2026/course' },
        { label: 'Event Photos', href: '/2026/event-photos' },
        { label: 'Swag', href: '/2026/swag' },
        { label: 'Player Bios', href: '/2026/player-bios' },
        { label: 'Results', href: '/2026/results' },
      ],
    },
    {
      label: '2027',
      emptyText: 'Details coming soon',
      links: [{ label: 'Join the waitlist', href: '/waitlist' }],
    },
  ],
  footerText: 'The Real Estate Invitational. All rights reserved.',
}
