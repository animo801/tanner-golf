import type { HomePage } from './types'

export const home: HomePage = {
  hero: {
    heading: 'Real Estate’s Premier Executive Golf Tournament',
    image: { src: '/images/home/hero.jpg', alt: 'Aerial view of a mountain golf course green beside a pond' },
  },

  about: {
    heading: 'About the tournament',
    body: [
      'The Real Estate Invitational is the only 24-player, Ryder Cup-style golf tournament created exclusively for the most respected executives across the country.',
      'Built around a shared passion for golf, real estate, and relationships, The Invitational brings together a select group of industry leaders for competition, connection, and camaraderie.',
    ],
    // Two photos shown beside the text
    images: [
      { src: '/images/home/about-1.jpg', alt: 'Team lined up on the course in grey jackets' },
      { src: '/images/home/about-2.jpg', alt: 'Team lined up on the course in navy jackets' },
    ],
  },

  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Who has and will be attending The Invitational?',
        answer:
          'Real estate executives who share a passion for golf and meaningful relationships. See the 2026 Player Bios page to review past attendees.',
      },
    ],
  },

  // The section is hidden while this list is empty
  testimonials: {
    heading: 'What players are saying',
    items: [],
  },
}
