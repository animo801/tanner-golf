import type { EventPhotosPage } from '../types'

// Placeholders until the edited event photos arrive
const photos = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/2026/event-photos/photo-${i + 1}.jpg`,
  alt: `Placeholder photo ${i + 1}`,
}))

export const eventPhotos: EventPhotosPage = {
  title: 'Event Photos',
  eyebrow: '2026',
  heading: 'Event photos',
  photos,
}
