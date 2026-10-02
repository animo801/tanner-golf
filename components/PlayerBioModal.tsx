'use client'

import { PortableText } from '@portabletext/react'
import { useEffect, useRef } from 'react'
import SanityImage from './SanityImage'
import type { Player } from './TeamRosters'

// Native <dialog> gives us Escape-to-close, focus trapping and a backdrop for free
export default function PlayerBioModal({ player, onClose }: { player: Player; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      // Clicking the backdrop (the dialog element itself, outside the panel) closes it
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      aria-label={player.name ?? undefined}
      className="m-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[860px] overflow-hidden bg-white p-0 text-ink backdrop:bg-black/60 md:max-h-[calc(100dvh-64px)]"
    >
      <div className="grid max-h-[inherit] overflow-y-auto md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative aspect-[185/192] bg-[#d9d9d9] md:aspect-auto md:min-h-[440px]">
          <SanityImage image={player.photo} sizes="(min-width: 768px) 360px, 100vw" />
        </div>
        <div className="px-6 pt-6 pb-8 md:px-10 md:pt-10 md:pb-12">
          <h2 className="pr-10 text-[24px] leading-[28px] font-semibold uppercase md:text-[32px] md:leading-[36px]">
            {player.name}
          </h2>
          {player.role && <p className="mt-1 text-[16px] leading-[24px] text-ink/60 md:text-[18px]">{player.role}</p>}
          {player.bio && (
            <div className="mt-5 space-y-[1lh] text-[16px] leading-[26px] tracking-[-0.01em] md:mt-6 md:text-[18px] md:leading-[30px]">
              <PortableText value={player.bio} />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={() => dialog.current?.close()}
        className="absolute top-3 right-3 grid size-10 cursor-pointer place-items-center rounded-full bg-white/90 text-ink transition-colors hover:bg-black/5"
      >
        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </dialog>
  )
}
