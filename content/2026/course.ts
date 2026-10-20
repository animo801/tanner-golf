import type { CoursePage } from '../types'

export const course: CoursePage = {
  title: 'Course',
  hero: {
    eyebrow: '2026 Course',
    heading: 'Bronze Buffalo Ranch',
    poster: { src: '/images/home/hero.jpg', alt: 'Aerial view of the golf course' },
    // Optional muted looping video, e.g. { src: '/videos/2026-course.mp4', type: 'video/mp4' }
  },
  about: {
    heading: 'About the course',
    body: [
      'Nestled in the breathtaking Teton Valley of Victor, Idaho, Bronze Buffalo Ranch is a luxury mountain retreat where championship golf, Western hospitality, and natural beauty come together. Surrounded by panoramic mountain views, the Ranch features an acclaimed 18-hole championship golf course with rolling fairways, pristine greens, and spectacular scenery, offering an unforgettable golf experience in one of the West’s most remarkable settings.',
      'Beyond the fairways, Bronze Buffalo Ranch embodies a lifestyle centered on meaningful relationships, adventure, and authentic Western luxury. With exceptional accommodations, dining, and outdoor experiences, the Ranch provided the ideal setting for the Real Estate Invitational. More than a venue, it offered an extraordinary backdrop for the real estate industry’s most respected executives to compete, connect, and build lasting relationships.',
    ],
  },
  details: {
    heading: 'Course details',
    items: [
      'Victor, ID',
      'Par 72',
      'Blue Tees: 6,500 Yards',
      '#5 Ranked Course in Idaho by Golf Digest',
      'Private Club',
    ],
  },
  photos: {
    heading: 'Photos',
    images: [
      { src: '/images/home/hero.jpg', alt: 'Aerial view of the golf course' },
      { src: '/images/home/about-1.jpg', alt: 'Team on the course' },
      { src: '/images/home/about-2.jpg', alt: 'Team on the course' },
    ],
  },
}
