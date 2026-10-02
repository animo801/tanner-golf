'use client'

import Image from 'next/image'
import { stegaClean } from 'next-sanity'
import { useCallback, useEffect, useRef, useState } from 'react'
import { urlFor } from '@/sanity/lib/image'
import SanityImage, { type SanityImageValue } from './SanityImage'

type Photo = NonNullable<SanityImageValue> & { _key: string }

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  // Index of the photo shown full screen, or null when the viewer is closed
  const [openAt, setOpenAt] = useState<number | null>(null)

  return (
    <>
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <li key={photo._key}>
            <button
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={stegaClean(photo.alt) || `Photo ${i + 1}`}
              className="relative block aspect-[378/282] w-full cursor-zoom-in overflow-hidden bg-[#d9d9d9] md:rounded-xl"
            >
              <SanityImage
                image={photo}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      {openAt !== null && <Lightbox photos={photos} startAt={openAt} onClose={() => setOpenAt(null)} />}
    </>
  )
}

function Lightbox({ photos, startAt, onClose }: { photos: Photo[]; startAt: number; onClose: () => void }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(startAt)

  const goTo = useCallback((i: number, behavior: ScrollBehavior = 'smooth') => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(photos.length - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior })
  }, [photos.length])

  // Jump to the tapped photo, lock page scroll, and wire up the keyboard
  useEffect(() => {
    goTo(startAt, 'instant')
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [goTo, startAt])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, index, onClose])

  const onScroll = () => {
    const el = track.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black">
      {/* Swipeable track: native scroll-snap handles touch swiping */}
      <div
        ref={track}
        onScroll={onScroll}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <div key={photo._key} className="relative h-full w-full shrink-0 snap-center snap-always">
            {photo.asset && Math.abs(i - index) <= 1 && (
              <Image
                src={urlFor(photo).width(2400).url()}
                alt={stegaClean(photo.alt) ?? ''}
                fill
                sizes="100vw"
                className="object-contain md:p-12"
                priority={i === startAt}
              />
            )}
          </div>
        ))}
      </div>

      <p className="absolute top-5 left-5 text-[16px] leading-[24px] font-medium text-white/80 tabular-nums md:top-6 md:left-6 md:text-[18px]">
        {index + 1} / {photos.length}
      </p>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-3 right-3 grid size-11 cursor-pointer place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:top-4 md:right-4"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {([-1, 1] as const).map((dir) => {
        const disabled = dir === -1 ? index === 0 : index === photos.length - 1
        return (
          <button
            key={dir}
            type="button"
            aria-label={dir === -1 ? 'Previous photo' : 'Next photo'}
            disabled={disabled}
            onClick={() => goTo(index + dir)}
            className={`absolute top-1/2 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/40 bg-black/30 transition-colors hover:bg-white/10 disabled:cursor-default disabled:opacity-30 md:grid ${dir === -1 ? 'left-6' : 'right-6'}`}
          >
            <img
              src="/images/chevron-down.svg"
              alt=""
              width={21.4142}
              height={12.1213}
              className={`h-[9.697px] w-[17.131px] invert ${dir === -1 ? 'rotate-90' : '-rotate-90'}`}
            />
          </button>
        )
      })}
    </div>
  )
}
