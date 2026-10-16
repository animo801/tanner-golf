import type { Player, PlayerBiosPage } from '../types'
import { ostler, seastrand, teamNames } from './players'

// From the 2026 tournament magazine. Photos are cropped from the magazine
// until the original headshots arrive; swap the files in /images/2026/players/.
const details: Record<string, Omit<Player, 'name'>> = {
  'Tanner Eldredge': {
    role: 'Real Estate Insurance, Lockton',
    homeCourse: 'Salt Lake Country Club',
    handicap: '0.2',
    bio: [
      "Tanner Eldredge advises many of the nation's leading real estate developers, owners, and investors on risk management and insurance strategies. Working with clients across the United States, he specializes in helping clients navigate complex construction, property, casualty, and executive risk exposures while supporting long-term growth.",
      "Away from work, Tanner enjoys spending time with his wife and two young sons. Whether he's on the golf course, boating on the lake, or traveling with family and close friends, Tanner believes the best investments are the relationships built along the way. He's also an avid Utah Jazz and Utah Utes fan.",
    ],
  },
  'Taylor Swenson': {
    role: 'VP, Development, Salt Lake City Global Logistics Center',
    homeCourse: 'Bonneville Golf Course',
    handicap: '3.3',
    bio: [
      'Taylor Swenson serves as Vice President of Development for the Salt Lake City Global Logistics Center, a 3,000-acre master-planned industrial development and one of the largest remaining landholdings in Salt Lake City. His team delivers approximately one million square feet of Class A industrial space annually while supporting logistics, manufacturing, and distribution companies throughout the region.',
      "Taylor and his wife, Ashley, have been married for 11 years and are raising five young children. With a full house at home, he jokes that golf is the one hobby he's managed to keep. He also enjoys listening to books, working out, tackling home improvement projects, and cheering on his kids at their sporting events.",
    ],
  },
  'Ben Seastrand': {
    role: 'Torus',
    homeCourse: 'Salt Lake Country Club',
    handicap: '4.8',
    bio: [
      'Ben Seastrand works with Torus to advance energy storage technology, modular data centers, and distributed energy infrastructure throughout the United States. By partnering with developers and landowners, Torus helps create innovative infrastructure while generating long-term value.',
      'A lifelong hockey player, Ben proudly embraces the “Happy Gilmore” lifestyle—bringing a hockey mentality to the golf course. He and his wife are raising four children, and most of his free time revolves around family life, with the occasional round of golf squeezed in.',
    ],
  },
  'Tim Stephens': {
    role: 'Partner, Hamilton Partners',
    homeCourse: 'Park City Golf Club',
    handicap: '5.3',
    bio: [
      'Tim Stephens is a Partner at Hamilton Partners, where he focuses on office, industrial, multifamily, and retail development throughout Utah and Arizona. Hamilton Partners owns and operates more than 18 million square feet of commercial real estate and is recognized for developing institutional-quality properties built for long-term ownership.',
      'Tim lives in Park City with his family and enjoys everything mountain life has to offer, including skiing, hiking, biking, golf, and spending time outdoors.',
    ],
  },
  'Ryan Simmons': {
    role: 'The Boyer Company',
    homeCourse: 'Willow Creek Country Club',
    handicap: '7.0',
    bio: [
      'Ryan is with The Boyer Company, one of the largest real estate development firms in the Western United States. Founded in 1972, Boyer specializes in the development and asset management of commercial real estate across a wide range of property types.',
      "He is married with four kids and enjoys spending his free time outdoors. Whether it's golfing, boating, mountain biking, or just about anything that gets him outside, he's always up for an adventure.",
    ],
  },
  'Preston McNeil': {
    role: 'Founder, SB Real Estate Partners',
    homeCourse: 'Bonneville Golf Course',
    handicap: '7.1',
    bio: [
      'Preston is the founder of SB Real Estate Partners (SBREP), a multifamily investment firm he founded in 2017. SBREP focuses on acquiring and asset managing multifamily investments throughout the United States.',
      "Preston earned his undergraduate degree from Boston College and his MBA from UCLA. He is married with four kids and enjoys spending his free time coaching their sports. In the summer, you'll usually find him on the golf course, while the winter months are spent skiing with family and friends.",
    ],
  },
  'Mark Johnson': {
    role: 'Founder & Managing Director, Acclaim Companies',
    homeCourse: 'Los Altos Golf & Country Club',
    handicap: '9.1',
    bio: [
      'Mark Johnson founded Acclaim Companies with a vision of building exceptional multifamily communities throughout Northern California. During his career, he has directed the entitlement, development, and management of more than 2,000 apartment homes along with significant commercial office developments. His collaborative approach has earned Acclaim a reputation for delivering high-quality projects through partnerships with municipalities, institutions, and private investors.',
      'Mark and his wife, Heather, have been married for more than 35 years and are proud parents of six children and grandparents to a growing family. Outside of work, he enjoys cycling, golf, skiing, heli-skiing, and serving in his faith and community.',
    ],
  },
  'Jaxon Keller': {
    role: 'Keller Investment Properties',
    homeCourse: 'Bronze Buffalo Ranch',
    handicap: '10.0',
    bio: [
      'Jaxon Keller helps oversee a vertically integrated portfolio of approximately 4,000 apartment homes located throughout Salt Lake City, Las Vegas, and Phoenix. Keller Investment Properties has built its reputation on long-term ownership and self-management of multifamily communities.',
      "Jaxon and his wife are busy raising three children under the age of three. He proudly claims to be a better basketball player than golfer. Jaxon's family are also the proud owners of The Bronze Buffalo, and were kind enough to host the inaugural Real Estate Invitational.",
    ],
  },
  'Jordan Davidson': {
    role: 'Davidson Family Holdings',
    homeCourse: 'Fox Hollow Golf Club',
    handicap: '11',
    bio: [
      'Jordan is a real estate developer, owner, and operator with a portfolio of more than 1,300 units across the Southeast, Southern Midwest, and Central Texas.',
      'Outside of real estate, Jordan is married with four children - three boys and one girl. When he is not working, he enjoys spending time outdoors hunting and fishing, as well as getting out on the golf course.',
    ],
  },
  'Parker Pinkalla': {
    role: 'Managing Principal, Tailwind Investment Group',
    homeCourse: 'N/A',
    handicap: '11.3',
    bio: [
      'Parker Pinkalla serves as Managing Principal of Tailwind Investment Group, an owner-operator focused on acquiring, improving, and managing value-add multifamily investments. His investment philosophy centers on disciplined execution and creating long-term value for investors.',
      'Parker and his wife have four children. Outside of work, he is a passionate sports enthusiast who enjoys staying active with family and friends.',
    ],
  },
  'Michael Kron': {
    role: 'CEO, Frankel Family Trust',
    homeCourse: 'Coto de Caza Golf & Racquet Club',
    handicap: '17.6',
    bio: [
      'Michael Kron oversees a portfolio of more than 14,000 apartment units throughout the Southwest, including more than 4,000 units developed internally. He also leads a private equity platform currently raising capital for investments in the single-tenant net lease retail sector.',
      "Michael and his wife have two adult sons. When he isn't working, he enjoys golf, discovering great wines, and traveling the world.",
    ],
  },
  'Dick Anderson': {
    role: 'Founder & CEO, HPI Real Estate',
    homeCourse: 'Austin Country Club',
    handicap: '21.1',
    bio: [
      "Dick Anderson founded HPI Real Estate and has spent decades building one of Texas' premier commercial real estate firms. Today, HPI owns, leases, and manages more than 30 million square feet across office, industrial, self-storage, multifamily, and senior living properties.",
      'Dick and his wife have three children and five grandchildren. Away from business, he enjoys hunting, fishing, and spending time outdoors with family and friends.',
    ],
  },
  'Rashid Salem': {
    role: 'Strata Development',
    homeCourse: 'Vaquero Club',
    handicap: '+6.0',
    bio: [
      'Rashid Salem leads Strata Development, specializing in mixed-use developments and luxury branded residential communities. His current portfolio includes transformative projects in Miami and Frisco, Texas, where he focuses on creating destination developments that combine residential, hospitality, and lifestyle amenities.',
      'Rashid and his wife have three children, and golf has become a family activity they all enjoy together. Outside of business, he prioritizes fitness, family, and his Orthodox Christian faith. He is also the five-time Bluejack Nation Club Champion and the best player competing in TREI 2026.',
    ],
  },
  'Michael Woodfield': {
    role: 'Obsidian Capital',
    homeCourse: 'Cimarron Hills Country Club',
    handicap: '4',
    bio: [
      'Michael is an experienced real estate owner and operator who currently owns approximately 2,000 units and has owned as many as 6,500 units over the past 12 years.',
      'Outside of real estate, Michael is married with three children and another on the way. When he is not working or spending time with his growing family, he enjoys hunting and getting out on the golf course.',
    ],
  },
  'J.D. Lewis': {
    role: 'Executive Managing Director, HPI Real Estate',
    homeCourse: 'Austin Country Club',
    handicap: '5.0',
    bio: [
      "J.D. Lewis is an Executive Managing Director at HPI Real Estate, a full-service real estate company active in the development and acquisition of multifamily, industrial, office, self-storage, and senior housing properties. HPI is also one of Central Texas's largest management companies across office and industrial real estate.",
      'J.D. is married with three children and enjoys anything competitive—especially golf. He plays out of Austin Country Club and carries a 5.0 handicap.',
    ],
  },
  'Tyce Parkinson': {
    role: 'President, SE Investment Group',
    homeCourse: 'Hidden Valley Country Club',
    handicap: '5.5',
    bio: [
      'Tyce Parkinson serves as President of SE Investment Group, a Draper-based family office investing across public equities, private companies, real estate, and private lending. Before joining the family office, he worked in Debt Capital Markets at Bridge Investment Group, where he built a strong foundation in commercial real estate finance.',
      'Tyce and his wife, Kennadie, have been married for ten years and are raising their son, Rory. Together, they are doing their best to convince him that golf is the greatest game ever invented.',
    ],
  },
  'Conor Andrus': {
    role: 'Co-Founder & Head of Capital Markets, Joule',
    homeCourse: 'Salt Lake Country Club',
    handicap: '6.5',
    bio: [
      'As Co-Founder and Head of Capital Markets at Joule, Conor Andrus helps finance and develop next-generation energy and digital infrastructure projects across the country. His work combines institutional capital with large-scale infrastructure that supports the future of energy and technology.',
      "Conor lives in Holladay, Utah with his wife and four children. When he isn't working, you'll likely find him playing tennis, tending to his beehives, or spending time with his growing family.",
    ],
  },
  'Adam Ostler': {
    role: 'Head of Development, Clyde Capital Group',
    homeCourse: 'Mick Riley Golf Course',
    handicap: '7.0',
    bio: [
      'Adam Ostler leads development efforts at Clyde Capital Group, overseeing master-planned communities spanning more than 30,000 acres throughout the Mountain West. His work focuses on creating communities that deliver long-term value while shaping the future growth of the region.',
      'Adam and his wife are raising two daughters and call Utah home. Outside the office, he enjoys golf, cheering on the Utah Jazz, cooking on the Traeger, and spending time with longtime friends.',
    ],
  },
  'Corey Johnson': {
    role: 'Partner, Wasatch Residential Group',
    homeCourse: 'Salt Lake Country Club',
    handicap: '8.0',
    bio: [
      'Corey Johnson is a Partner at Wasatch Residential Group, where he oversees development, construction, asset management, and operations for approximately 8,000 apartment homes. His experience spans the full life cycle of multifamily investment, from development through long-term ownership.',
      'Corey lives in Holladay, Utah with his wife and three children. Outside the office, he enjoys skiing, golfing, biking, boating, and traveling with his family.',
    ],
  },
  'Brad Andrus': {
    role: 'Founder, Retired, Bridge Investment Group',
    homeCourse: 'Salt Lake Country Club',
    handicap: '10.0',
    bio: [
      'Brad Andrus is the retired Founder of Bridge Investment Group, a leading alternative investment firm that grew to approximately $50 billion in assets under management before its recent acquisition by Apollo.',
      'Married for 43 years, Brad is now a partner in Joule Capital Partners, helping advance a 4,000-acre data center complex in Millard County, Utah.',
    ],
  },
  'Alex Lowe': {
    role: 'CEO, Lowe Property Group',
    homeCourse: 'Salt Lake Country Club',
    handicap: '10.8',
    bio: [
      'Alex Lowe serves as CEO of Lowe Property Group, overseeing the development, acquisition, and management of approximately 3,000 to 4,000 apartment homes throughout Utah. His company focuses on building and operating high-quality multifamily communities with a long-term ownership mindset.',
      'Alex and his wife have four children. Outside of work, he enjoys skiing, waterskiing, golfing, and spending time with his family.',
    ],
  },
  'Adam Siegman': {
    role: 'Ethos Real Estate',
    homeCourse: 'Olympic Club',
    handicap: '15.0',
    bio: [
      'Adam Siegman leads Ethos Real Estate, which owns and operates more than 3,200 affordable apartment homes throughout California. His work is centered on preserving and expanding quality affordable housing while creating long-term value through responsible ownership.',
      "Based in Manhattan Beach, Adam is a proud single father. When he isn't working, you'll find him surfing, skiing, or fitting in as much golf as possible.",
    ],
  },
  'Andy Thomas': {
    role: 'Partner, HPI Real Estate',
    homeCourse: 'Austin Country Club',
    handicap: '17.0',
    bio: [
      "Andy Thomas is a Partner at HPI Real Estate, where he helps oversee development, investment, and management initiatives across one of Texas' largest privately held commercial real estate firms. HPI's fully integrated platform has earned a reputation for delivering value through development, ownership, and property management.",
      'Andy has been married for 25 years and has two children. He enjoys golf, cheering on the Kansas City Chiefs, and relaxing with friends over a cold beer.',
    ],
  },
  'Glenn Gonzales': {
    role: 'Obsidian Capital',
    homeCourse: 'Cimarron Hills Country Club',
    handicap: '20',
    bio: [
      'Glenn is a seasoned real estate owner and operator who has owned more than 8,000 units across Texas, Kentucky, Alabama, Tennessee, Utah, and Washington.',
      'Outside of real estate, Glenn and his wife enjoy life with their blended family of seven children and eight grandchildren. They own a ranch where they raise cows and chickens and maintain a garden. When he is not working on the ranch or in real estate, Glenn enjoys flying.',
    ],
  },
}

const slug = (name: string) => name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-')

const withDetails = ({ name }: { name: string }): Player => ({
  name,
  photo: { src: `/images/2026/players/${slug(name)}.jpg`, alt: name },
  ...details[name],
})

export const playerBios: PlayerBiosPage = {
  title: 'Player Bios',
  eyebrow: '2026',
  heading: 'Player Bios',
  labels: { homeCourse: 'Home course', handicap: 'Handicap' },
  teams: [
    { name: teamNames.team1, players: seastrand.map(withDetails) },
    { name: teamNames.team2, players: ostler.map(withDetails) },
  ],
}
