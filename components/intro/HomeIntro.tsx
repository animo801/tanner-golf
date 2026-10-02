'use client'

import { useEffect, useState } from 'react'

// True once the intro has played in this browser tab, so client-side
// navigation back to the home page doesn't replay it.
let hasPlayed = false

// Wraps the home page and turns on the intro animation (styles in globals.css,
// keyed off [data-home-intro]) for a full page load only.
export default function HomeIntro({ children }: { children: React.ReactNode }) {
  const [play] = useState(() => !hasPlayed)

  useEffect(() => {
    hasPlayed = true
  }, [])

  return (
    <div data-home-intro={play ? '' : undefined} className="contents">
      {children}
    </div>
  )
}
