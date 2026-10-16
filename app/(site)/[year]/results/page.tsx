import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import { getSeasonPage, yearsWith } from '@/content/seasons'
import type { ResultsPage as ResultsData } from '@/content/types'

type Params = Promise<{ year: string }>
type PlayerResult = ResultsData['players']['items'][number]

// Only years with this page in content/seasons.ts exist; anything else 404s
export const dynamicParams = false
export const generateStaticParams = () => yearsWith('results')

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { year } = await params
  const page = getSeasonPage(year, 'results')
  return page ? { title: `${page.title} – ${year}` } : {}
}

// Match points come in halves: 12.5 → "12½"
const points = (n: number) => {
  const whole = Math.trunc(n)
  return n % 1 === 0 ? String(n) : `${whole === 0 ? '' : whole}½`
}

// Golf-style: 0 is "E" (even), positives get a plus sign
const plusMinus = (n: number) => {
  if (n === 0) return 'E'
  return `${n > 0 ? '+' : '−'}${Math.abs(n)}`
}

export default async function ResultsPage({ params }: { params: Params }) {
  const data = getSeasonPage((await params).year, 'results')
  if (!data) notFound()

  const { rounds, labels, players } = data
  const total1 = rounds.reduce((sum, r) => sum + r.team1Points, 0)
  const total2 = rounds.reduce((sum, r) => sum + r.team2Points, 0)
  const leader = total1 === total2 ? null : total1 > total2 ? 'team1' : 'team2'
  const { team1, team2 } = data.teams

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <PageHeader eyebrow={data.eyebrow} heading={data.heading} />

      {rounds.length > 0 && (
        <section className="mt-10 rounded-[8.673px] bg-forest px-6 pt-10 pb-8 text-white md:mt-16 md:rounded-xl md:px-10 md:pt-16 md:pb-12 lg:px-[144px]">
          {/* Scoreboard */}
          <div className="grid grid-cols-2 gap-4 text-center">
            {(
              [
                ['team1', team1, total1],
                ['team2', team2, total2],
              ] as const
            ).map(([key, name, total]) => (
              <div key={key}>
                <p className={`text-[14px] leading-[20px] font-semibold tracking-[0.08em] uppercase md:text-[16px] ${leader === key ? 'text-white/60' : 'invisible'}`}>
                  {labels.winner}
                </p>
                <p className="mt-2 text-[20px] leading-[28px] font-semibold uppercase md:text-[32px] md:leading-[40px]">{name}</p>
                <p className={`mt-1 text-[56px] leading-[1] font-semibold tabular-nums md:text-[120px] ${leader && leader !== key ? 'text-white/50' : ''}`}>
                  {points(total)}
                </p>
              </div>
            ))}
          </div>

          {/* Points by round */}
          <div className="mt-10 border-t border-white/25 md:mt-16">
            {rounds.map((round) => (
              <div key={round.label} className="border-b border-white/25 py-4 md:py-6">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-[18px] leading-[28px] md:text-[24px] md:leading-[32px]">
                  <span className={`text-center font-semibold tabular-nums ${round.team1Points < round.team2Points ? 'text-white/50' : ''}`}>
                    {points(round.team1Points)}
                  </span>
                  <span className="text-center">
                    <span className="block font-semibold">{round.label}</span>
                    {round.format && <span className="block text-[14px] leading-[20px] text-white/60 md:text-[16px]">{round.format}</span>}
                  </span>
                  <span className={`text-center font-semibold tabular-nums ${round.team2Points < round.team1Points ? 'text-white/50' : ''}`}>
                    {points(round.team2Points)}
                  </span>
                </div>

                {round.matches && round.matches.length > 0 && (
                  <ul className="mt-4 space-y-2 text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]">
                    {round.matches.map((match, i) => {
                      const p1 = match.team1Points
                      const p2 = match.team2Points
                      return (
                        <li key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-md bg-white/5 px-3 py-2">
                          <span className={`text-right ${p1 > p2 ? 'font-semibold' : 'text-white/60'}`}>{match.team1Players}</span>
                          <span className="min-w-[72px] text-center tabular-nums text-white/80">
                            {p1 === p2 ? labels.halved : `${points(p1)} – ${points(p2)}`}
                          </span>
                          <span className={p2 > p1 ? 'font-semibold' : 'text-white/60'}>{match.team2Players}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            ))}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-4 text-[18px] leading-[28px] font-semibold uppercase md:pt-6 md:text-[24px] md:leading-[32px]">
              <span className="text-center tabular-nums">{points(total1)}</span>
              <span className="text-center">{labels.total}</span>
              <span className="text-center tabular-nums">{points(total2)}</span>
            </div>
          </div>
        </section>
      )}

      {players.items.length > 0 && (
        <section className="mt-[70px] px-3 md:mt-[120px] md:px-10 lg:pl-[144px]">
          <h2 className="text-[28px] leading-[32px] font-semibold text-ink uppercase md:text-[48px] md:leading-[52px] xl:text-[64px] xl:leading-[64px]">
            {players.heading}
          </h2>
          <p className="mt-4 max-w-[855px] text-[18px] leading-[28px] tracking-[0.01em] whitespace-pre-line text-ink/75 md:mt-6 md:text-[20px] md:leading-[32px]">
            {players.intro}
          </p>
          <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-12">
            {(
              [
                ['team1', team1],
                ['team2', team2],
              ] as const
            ).map(([key, name]) => (
              <PlayerTable
                key={key}
                team={name}
                players={players.items.filter((p) => p.team === key)}
                captainLabel={labels.captain}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function PlayerTable({ team, players, captainLabel }: { team: string; players: PlayerResult[]; captainLabel: string }) {
  return (
    <div>
      <h3 className="text-[20px] leading-[28px] font-semibold text-forest uppercase md:text-[24px] md:leading-[32px]">{team}</h3>
      <ul className="mt-3 border-t border-rule">
        {players.map((player) => (
          <li key={player.name} className="flex items-center justify-between gap-4 border-b border-rule py-3 text-[18px] leading-[28px] md:py-4 md:text-[20px]">
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate text-ink">{player.name}</span>
              {player.captain && (
                <span className="shrink-0 rounded-full bg-forest/10 px-2 text-[12px] leading-[20px] font-semibold text-forest uppercase">{captainLabel}</span>
              )}
            </span>
            <span
              className={`shrink-0 font-semibold tabular-nums ${
                player.plusMinus > 0 ? 'text-forest' : player.plusMinus < 0 ? 'text-ink/50' : 'text-ink'
              }`}
            >
              {plusMinus(player.plusMinus)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
