import type { ResultsPage } from '../types'
import { ostler, seastrand, teamNames } from './players'

export const results: ResultsPage = {
  title: 'Results',
  eyebrow: '2026',
  heading: 'Results',
  teams: teamNames,
  labels: { winner: 'Champions', total: 'Total', halved: 'Halved', captain: 'Captain' },
  // Each round can also list its matches, shown under the round:
  //   matches: [{ team1Players: 'A & B', team2Players: 'C & D', team1Points: 2, team2Points: 1 }]
  rounds: [
    { label: 'Round 1', format: 'Best Ball', team1Points: 8, team2Points: 10 },
    { label: 'Round 2', format: 'Best Ball', team1Points: 12.5, team2Points: 5.5 },
    { label: 'Round 3', format: 'Best Ball', team1Points: 5, team2Points: 13 },
    { label: 'Round 4', format: 'Singles', team1Points: 19, team2Points: 5 },
  ],
  players: {
    heading: 'Player +/-',
    intro:
      'Each player’s share of match points won minus points lost, across all four rounds. Best-ball matches count half (winning 2–1 = +0.5); singles count in full (a win = +2).',
    items: [
      ...seastrand.map((p) => ({ ...p, team: 'team1' as const })),
      ...ostler.map((p) => ({ ...p, team: 'team2' as const })),
    ],
  },
}
