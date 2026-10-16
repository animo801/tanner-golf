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
      {
        question: 'What is the format?',
        answer:
          'The Invitational is a three-day, Ryder Cup-style team match-play competition. Two teams of 12 compete across singles matches, where players face the corresponding seed from the opposing team, and four-ball (best ball) matches, where partners each play their own ball and the lower score counts on every hole. The final day closes with a live Ryder Cup-style call-out and handicapped singles.',
      },
      {
        question: 'How are the teams chosen?',
        answer:
          'Two captains are selected before the tournament and revealed on draft day. At the opening lunch, the captains take turns picking players in a snake draft until all 24 players have a side.',
      },
      {
        question: 'How are points awarded?',
        answer:
          'Each best-ball match is worth 3 points: one for the front nine, one for the back nine, and one overall. Each singles match is worth 2 points to the winner. The final day’s singles are played with handicaps, giving every player a chance to contribute, and every point counts toward the team championship.',
      },
      {
        question: 'Where is it played?',
        answer:
          'The 2026 Invitational was held September 14–16 at Bronze Buffalo Ranch in Victor, Idaho, on the quiet side of the Tetons and just 30 minutes from Jackson Hole. Players stay on the property in Lodge suites, private mountain cabins, and condominiums, with dining, a full-service spa, and fitness facilities on site.',
      },
      {
        question: 'How can I attend?',
        answer:
          'The Invitational is a private, invitation-only gathering for a select group of real estate executives. Join the waitlist and we’ll reach out as soon as registration opens for next year’s tournament.',
      },
    ],
  },

  // The section is hidden while this list is empty
  testimonials: {
    heading: 'What players are saying',
    items: [],
  },
}
