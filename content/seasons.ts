import { course } from './2026/course'
import { eventPhotos } from './2026/eventPhotos'
import { playerBios } from './2026/playerBios'
import { results } from './2026/results'
import { swag } from './2026/swag'
import type { Season } from './types'

// One entry per tournament year. Each page is optional; a missing page 404s.
// To add a year, create content/<year>/ and add it here (and to the menu in site.ts).
export const seasons: Season[] = [{ year: 2026, course, eventPhotos, swag, playerBios, results }]

export function getSeasonPage<K extends Exclude<keyof Season, 'year'>>(year: string, page: K) {
  return seasons.find((s) => String(s.year) === year)?.[page]
}

// For generateStaticParams: the years that have a given page
export const yearsWith = (page: Exclude<keyof Season, 'year'>) =>
  seasons.filter((s) => s[page]).map((s) => ({ year: String(s.year) }))
