'use client'

import { useEffect, useRef } from 'react'

const SPEED = 19 // drift, in px per second
const RESUME_AFTER = 2500 // ms of no interaction before the drift picks back up
const STEP_DURATION = 700 // ms for an arrow press to glide one column

type Props = {
  children: React.ReactNode
  labels: { previous: string; next: string }
  // e.g. negative margins to let the row run to the screen edges
  viewportClassName?: string
}

// An endless row that drifts left on its own and can be pushed either way with
// the arrows, a sideways trackpad/mouse-wheel swipe, or a drag/swipe on touch.
// `children` is one set of columns (a <ul> of equal-width <li>s); it's rendered twice,
// back to back, and the row wraps around by one set's width so it never ends.
// It moves with a GPU transform rather than scrolling, which keeps the slow
// drift smooth (scroll positions snap to whole pixels and judder).
export default function Marquee({ children, labels, viewportClassName }: Props) {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const go = useRef<(dir: 1 | -1) => void>(() => {})

  useEffect(() => {
    const view = viewport.current
    const row = track.current
    const set = row?.firstElementChild as HTMLElement | null
    if (!view || !row || !set) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let setWidth = set.offsetWidth
    let pos = 0 // how far the row has moved left, unbounded; wrapped when drawn
    let pausedUntil = 0
    let hovering = false
    let glide: { from: number; to: number; start: number } | null = null
    let fling = 0 // px per ms left over from a drag, eased away
    let dragging = false
    let frame = 0
    let last = performance.now()

    const pause = () => (pausedUntil = performance.now() + RESUME_AFTER)
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const resize = new ResizeObserver(() => (setWidth = set.offsetWidth))
    resize.observe(set)

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      if (glide) {
        const t = Math.min((now - glide.start) / STEP_DURATION, 1)
        pos = glide.from + (glide.to - glide.from) * ease(t)
        if (t === 1) glide = null
      } else if (Math.abs(fling) > 0.01) {
        pos += fling * dt
        fling *= Math.pow(0.95, dt / 16)
      } else if (!hovering && !dragging && now > pausedUntil && !reduceMotion.matches) {
        pos += (SPEED * dt) / 1000
      }
      const x = setWidth ? ((pos % setWidth) + setWidth) % setWidth : 0
      row.style.transform = `translate3d(${-x}px, 0, 0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    // Arrows: glide to the next column edge in that direction
    go.current = (dir) => {
      const list = set.firstElementChild as HTMLElement | null
      const column = list?.firstElementChild as HTMLElement | null
      if (!list || !column) return
      const step = column.offsetWidth + (parseFloat(getComputedStyle(list).columnGap) || 0)
      const from = glide ? glide.to : pos
      glide = { from: pos, to: (Math.round(from / step) + dir) * step, start: performance.now() }
      fling = 0
      pause()
    }

    // Sideways trackpad swipes / shift+wheel move the row; vertical scrolling
    // is left alone so the page still scrolls past it
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!dx) return
      e.preventDefault()
      glide = null
      fling = 0
      pos += dx
      pause()
    }

    // Dragging (touch or mouse). touch-action: pan-y hands vertical swipes to
    // the browser, so only sideways drags land here.
    let pointer: { id: number; x: number; y: number; lastX: number; lastT: number } | null = null
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      pointer = { id: e.pointerId, x: e.clientX, y: e.clientY, lastX: e.clientX, lastT: e.timeStamp }
    }
    const onMove = (e: PointerEvent) => {
      if (!pointer || e.pointerId !== pointer.id) return
      if (!dragging) {
        const dx = Math.abs(e.clientX - pointer.x)
        if (dx < 6 || dx < Math.abs(e.clientY - pointer.y)) return
        dragging = true
        glide = null
        view.setPointerCapture(e.pointerId)
        view.dataset.dragging = ''
      }
      const moved = e.clientX - pointer.lastX
      const elapsed = Math.max(e.timeStamp - pointer.lastT, 1)
      pos -= moved
      fling = fling * 0.6 + (-moved / elapsed) * 0.4
      pointer.lastX = e.clientX
      pointer.lastT = e.timeStamp
    }
    const onUp = (e: PointerEvent) => {
      if (!pointer || e.pointerId !== pointer.id) return
      // A pause before letting go means no fling
      if (!dragging || e.timeStamp - pointer.lastT > 80) fling = 0
      if (dragging) pause()
      dragging = false
      pointer = null
      delete view.dataset.dragging
    }
    const onEnter = (e: PointerEvent) => e.pointerType === 'mouse' && (hovering = true)
    const onLeave = () => (hovering = false)

    view.addEventListener('wheel', onWheel, { passive: false })
    view.addEventListener('pointerdown', onDown)
    view.addEventListener('pointermove', onMove)
    view.addEventListener('pointerup', onUp)
    view.addEventListener('pointercancel', onUp)
    view.addEventListener('pointerenter', onEnter)
    view.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      view.removeEventListener('wheel', onWheel)
      view.removeEventListener('pointerdown', onDown)
      view.removeEventListener('pointermove', onMove)
      view.removeEventListener('pointerup', onUp)
      view.removeEventListener('pointercancel', onUp)
      view.removeEventListener('pointerenter', onEnter)
      view.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div>
      <div
        ref={viewport}
        className={`touch-pan-y overflow-hidden ${viewportClassName ?? ''} overscroll-x-contain data-dragging:cursor-grabbing data-dragging:select-none`}
      >
        <div ref={track} className="flex w-max will-change-transform">
          <div className="flex shrink-0">{children}</div>
          <div aria-hidden inert className="flex shrink-0">
            {children}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2 px-3 md:mt-10 md:px-10 lg:pl-[144px]">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === -1 ? labels.previous : labels.next}
            onClick={() => go.current(dir)}
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-rule transition-colors hover:bg-ink/5"
          >
            <img
              src="/images/chevron-down.svg"
              alt=""
              width={21.4142}
              height={12.1213}
              className={`h-[9.697px] w-[17.131px] ${dir === -1 ? 'rotate-90' : '-rotate-90'}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
