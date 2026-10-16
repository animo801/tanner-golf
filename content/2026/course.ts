import type { CoursePage } from '../types'

export const course: CoursePage = {
  title: 'Course',
  hero: {
    eyebrow: '2026 Course',
    heading: 'Brockcreek Farms',
    poster: { src: '/images/home/hero.jpg', alt: 'Aerial view of the golf course' },
    // Optional muted looping video, e.g. { src: '/videos/2026-course.mp4', type: 'video/mp4' }
  },
  about: {
    heading: 'About the course',
    body: [
      'This is a thing... this is what we want it to be. We like doing things so that they are clear. And this is a good example of one of those things. So lets try it. Lets see what we can do. This is nonsense... but it seems to work.',
      'This is a thing... this is what we want it to be. We like doing things so that they are clear. And this is a good example of one of those things. So lets try it. Lets see',
    ],
  },
  details: {
    heading: 'Course details',
    items: [
      'This is it',
      'Something else',
      'Something else',
      'Again, something else',
      'Trying something else',
      'And again... something else.',
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
