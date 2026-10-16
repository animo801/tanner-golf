// The 2026 field in seed order, shared by Player Bios and Results.
// Total +/- is from the scoring workbook (Home tab, "Total +/-" column).

export const teamNames = { team1: 'Seastrand', team2: 'Ostler' } as const

type Entry = { name: string; plusMinus: number; captain?: boolean }

export const seastrand: Entry[] = [
  { name: 'Tanner Eldredge', plusMinus: 3 },
  { name: 'Taylor Swenson', plusMinus: 2.5 },
  { name: 'Ben Seastrand', plusMinus: 0.5, captain: true },
  { name: 'Tim Stephens', plusMinus: 0 },
  { name: 'Ryan Simmons', plusMinus: 3.5 },
  { name: 'Preston McNeil', plusMinus: 1 },
  { name: 'Mark Johnson', plusMinus: -3 },
  { name: 'Jaxon Keller', plusMinus: 0.5 },
  { name: 'Jordan Davidson', plusMinus: -1 },
  { name: 'Parker Pinkalla', plusMinus: 2.5 },
  { name: 'Michael Kron', plusMinus: 2.5 },
  { name: 'Dick Anderson', plusMinus: -1 },
]

export const ostler: Entry[] = [
  { name: 'Rashid Salem', plusMinus: 0.5 },
  { name: 'Michael Woodfield', plusMinus: -6.5 },
  { name: 'J.D. Lewis', plusMinus: -1 },
  { name: 'Tyce Parkinson', plusMinus: 1 },
  { name: 'Conor Andrus', plusMinus: -3.5 },
  { name: 'Adam Ostler', plusMinus: 1, captain: true },
  { name: 'Corey Johnson', plusMinus: -4 },
  { name: 'Brad Andrus', plusMinus: 3.5 },
  { name: 'Alex Lowe', plusMinus: -2.5 },
  { name: 'Adam Siegman', plusMinus: -2 },
  { name: 'Andy Thomas', plusMinus: 4 },
  { name: 'Glenn Gonzales', plusMinus: -1.5 },
]
