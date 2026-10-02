'use client'

import { useRef } from 'react'
import type { HomePageQueryResult } from '@/sanity/types'
import { revealDelay } from '../intro/reveal'
import SanityImage from '../SanityImage'

type TestimonialsData = NonNullable<NonNullable<HomePageQueryResult>['testimonials']>

type Props = {
  heading: TestimonialsData['heading'] | undefined
  items: TestimonialsData['items'] | undefined
}

export default function Testimonials({ heading, items }: Props) {
  const scroller = useRef<HTMLUListElement>(null)

  if (!items?.length) return null

  const scrollByCard = (dir: 1 | -1) => {
    const el = scroller.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="mb-3 overflow-hidden rounded-[8.673px] bg-[#f1f1f1] py-[56px] md:mb-4 md:rounded-xl md:py-[96px]">
      <div className="flex items-end justify-between gap-6 px-6 md:px-10 lg:pr-10 lg:pl-[144px]">
        {heading && (
          <h2 data-reveal="up" className="max-w-[374px] text-[28px] leading-[32px] font-semibold text-ink uppercase md:max-w-[636px] md:text-[48px] md:leading-[52px] xl:text-[64px] xl:leading-[64px]">
            {heading}
          </h2>
        )}
        <div data-reveal="up" style={revealDelay(0.2)} className="hidden shrink-0 gap-2 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir === -1 ? 'Previous' : 'Next'}
              onClick={() => scrollByCard(dir)}
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

      <ul
        ref={scroller}
        className="mt-[31px] flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scroll-px-3 px-3 [scrollbar-width:none] md:mt-[72px] md:scroll-px-10 md:px-10 lg:scroll-pl-[144px] lg:pl-[144px] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li
            key={item._key}
            data-reveal="up"
            style={revealDelay(0.15 + i * 0.08)}
            className="flex w-[calc(100%-48px)] shrink-0 snap-start flex-col justify-between gap-10 rounded-[8.673px] bg-[#e4e4e4] p-6 text-ink md:w-[45%] md:rounded-xl md:p-10 lg:w-[34%]"
          >
            <blockquote className="text-[20px] leading-[28px] font-medium tracking-[0.01em] md:text-[24px] md:leading-[34px]">
              {item.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              {item.photo?.asset && (
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
                  <SanityImage image={item.photo} sizes="48px" />
                </span>
              )}
              <div>
                {item.name && <p className="text-[18px] leading-[24px] font-semibold tracking-[0.01em]">{item.name}</p>}
                {item.role && <p className="text-[16px] leading-[22px] tracking-[0.01em] text-ink/60">{item.role}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
