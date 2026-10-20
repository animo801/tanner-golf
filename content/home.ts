import { playerBios } from './2026/playerBios'
import type { HomePage, Testimonial } from './types'

// Past participants, with their photo from the Player Bios
const players = playerBios.teams.flatMap((team) => team.players)
const said = (name: string, ...quote: string[]): Testimonial => {
  const player = players.find((p) => p.name === name)
  if (!player) throw new Error(`No player bio for ${name}`)
  return { name, quote, photo: player.photo }
}

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

  testimonials: {
    heading: 'Hear what participants have said',
    // Screen-reader names for the arrow buttons
    labels: { previous: 'Previous', next: 'Next' },
    // Grouped by measured card heights so the columns need little stretching
    // at every screen size. JD's long quote stands alone; the shortest share.
    columns: [
      [
        said(
          'J.D. Lewis',
          'The amount of experience and knowledge around the dinner tables each night was unmatched. But what stood out most was how genuine, down-to-earth, and fun this group of guys was. You don’t often walk away from an industry event feeling like you’ve made real friends, but that’s exactly what happened here.',
          'Now I just need to convince a few of them to get back into the office business. The team format created an incredible sense of camaraderie from the start. There’s something about a little competition, plenty of laughs, and a few humbling golf shots that brings a group together quickly. We showed up as industry peers and left as friends, which is a pretty special thing.',
        ),
      ],
      [
        said(
          'Michael Kron',
          'I was lucky enough to be invited to The Real Estate Invitational, but never did I think it would turn into and have as much enduring impact as it did. The relationships that were made over the 3 days of golf and meals could not be generated in any other way and I dare say, will last long after the last putt was holed.',
          'I can’t wait for next year’s event to see the gang again and pick up where we left off!',
        ),
        said('Michael Woodfield', 'I had the time of my life and made memories and new friendships that will last a lifetime.'),
      ],
      [
        said('Conor Andrus', 'Such a great event. Bringing together titans of the real estate industry… and me. Friends made, putts missed.'),
        said('Alex Lowe', 'In Adam we trust!'),
        said('Adam Ostler', 'The RE Invitational is the ONLY private, Ryder Cup style tournament for real estate execs. Grateful to Tanner for hosting and to be a part of such an exclusive group.'),
      ],
      [
        said(
          'Tanner Eldredge',
          'What made the Real Estate Invitational so special was the caliber of people who attended. Some of the most accomplished and influential leaders in real estate, yet not an ego in the room. Just genuine people, great competition, and meaningful relationships built around a shared passion for golf and real estate.',
        ),
        said('Ben Seastrand', 'For those that love golf and real estate, The Invitational is special. It’s on a tier of its own when it comes to real estate events. Blessed to be a part of it. Team Ben will repeat next year!'),
      ],
      [
        said('Jaxon Keller', 'Everyone was so personable, kind, funny, and down to earth. It felt like I’d known them for years, and that’s what made The Invitational so memorable for me.'),
        said(
          'Mark Johnson',
          'A bunch of developers, one spectacular ranch, and enough golf to make us forget about rising cap rates. The Real Estate Invitational was a winner – the company was every bit as good as the golf, Tanner and his Lockton team made it a hole-in-one event.',
        ),
      ],
      [
        said('Tyce Parkinson', 'It was an honor to spend time with smart, successful, and genuinely good people who just so happen to be addicted to the same stupid game.'),
        said(
          'Jordan Davidson',
          'It was a pleasure spending a few days walking with wise men. I garnered some wisdom from everyone I met and look forward to future opportunities to learn from those I didn’t. Thank you to Tanner Eldredge and Lockton for putting this together!',
        ),
      ],
      [
        said(
          'Preston McNeil',
          'The RE Invitational brought together a great group of people for friendly competition on an awesome golf course. The team format made it easy to get to know the other players and turn connections into new friendships.',
        ),
        said(
          'Dick Anderson',
          'The best part of The RE Invitational were the new friendships formed with some of the best executives throughout the country. The Invitational took it to another level when it comes to real estate events.',
        ),
      ],
      [
        said(
          'Tim Stephens',
          'What Tanner and his team orchestrated with The RE Invitational was nothing short of amazing. To call it a success would be a huge understatement of epic proportions. It was an unforgettable experience.',
        ),
        said(
          'Taylor Swenson',
          'The Real Estate Invitational is an experience every executive should want to be a part of if they love golf and real estate. It brought competition, but more than anything great lasting relationships.',
        ),
      ],
    ],
  },
}
