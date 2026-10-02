'use client'

import { useState } from 'react'
import type { PlayerBiosPageQueryResult } from '@/sanity/types'
import PlayerBioModal from './PlayerBioModal'
import SanityImage from './SanityImage'

type Teams = NonNullable<NonNullable<PlayerBiosPageQueryResult>['teams']>

export default function TeamRosters({ teams }: { teams: Teams }) {
  const [openPlayer, setOpenPlayer] = useState<Player | null>(null)

  return (
    <div>
      {teams.map((team, i) => (
        <section key={team._key} className={i > 0 ? 'mt-12 md:mt-20' : undefined}>
          {/* Sticks within its own section, so the next team's label pushes it off screen */}
          <h2 className="sticky top-0 z-10 -mx-3 mb-1 bg-white px-3 py-2 text-[20px] leading-[28px] font-semibold text-forest uppercase md:-mx-4 md:mb-2 md:px-4 md:py-3 md:text-[24px] md:leading-[32px]">
            {team.name}
          </h2>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-4">
            {team.players?.map((player) => (
              <li key={player._key}>
                <PlayerCard player={player} onOpen={() => setOpenPlayer(player)} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {openPlayer && <PlayerBioModal player={openPlayer} onClose={() => setOpenPlayer(null)} />}
    </div>
  )
}

export type Player = NonNullable<Teams[number]['players']>[number]

function PlayerCard({ player, onOpen }: { player: Player; onOpen: () => void }) {
  const hasBio = Boolean(player.bio?.length)
  const card = (
    <>
      <span className="relative block aspect-[185/192] overflow-hidden bg-[#d9d9d9]">
        <SanityImage
          image={player.photo}
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-[16px] leading-[36px] text-black lg:text-[20px] lg:leading-[48px]">{player.name}</span>
        {hasBio && <img src="/images/info.svg" alt="" width={16} height={16} className="size-4 shrink-0 lg:size-5" />}
      </span>
    </>
  )
  return hasBio ? (
    <button type="button" onClick={onOpen} aria-haspopup="dialog" className="group block w-full cursor-pointer text-left">
      {card}
    </button>
  ) : (
    card
  )
}
