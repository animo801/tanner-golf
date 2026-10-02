// Pages every tournament year gets, routed at /<year>/<path>.
// Kept free of Studio imports so the site can use it too.
export const seasonPageTypes = [
  { name: 'coursePage', title: 'Course', path: 'course' },
  { name: 'eventPhotosPage', title: 'Event Photos', path: 'event-photos' },
  { name: 'swagPage', title: 'Swag', path: 'swag' },
  { name: 'playerBiosPage', title: 'Player Bios', path: 'player-bios' },
  { name: 'resultsPage', title: 'Results', path: 'results' },
] as const
