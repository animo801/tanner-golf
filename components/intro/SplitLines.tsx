'use client'

import { useLayoutEffect, useRef } from 'react'

// Renders text as masked words tagged with the visual line they wrap onto
// (--line), so CSS can reveal the heading one line at a time.
export default function SplitLines({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const tag = () => {
      let line = -1
      let lastTop = -Infinity
      el.querySelectorAll<HTMLElement>('.split-word').forEach((word) => {
        if (word.offsetTop > lastTop + 2) {
          line++
          lastTop = word.offsetTop
        }
        word.style.setProperty('--line', String(line))
      })
    }
    tag()
    const observer = new ResizeObserver(tag)
    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  const words = text.split(/\s+/).filter(Boolean)

  return (
    <span ref={ref}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="split-word">
            <span>{word}</span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
