'use client'

import { useLayoutEffect, useRef } from 'react'

// Fades/slides in each [data-reveal] element inside it the first time it
// scrolls into view (styles in globals.css). Content is only hidden once this
// has run, so nothing stays invisible if JavaScript is slow or off.
// Note: hiding happens before first paint after hydration; on the home page
// the intro keeps this area invisible until then, so there's no flash.
export default function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const els = [...root.querySelectorAll<HTMLElement>('[data-reveal]')]
    root.dataset.revealReady = ''

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.revealed = ''
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )
    // During the home page intro, hold reveals until the hero has finished so
    // anything already on screen still plays its own entrance afterwards
    const wait = root.closest('[data-home-intro]') ? 1300 : 0
    const timer = window.setTimeout(() => els.forEach((el) => observer.observe(el)), wait)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
