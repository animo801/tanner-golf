import type { CSSProperties } from 'react'

// Delay (in seconds) for a [data-reveal] element, used to stagger siblings.
// See RevealOnScroll.tsx and the "Scroll reveals" styles in globals.css.
export const revealDelay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties
