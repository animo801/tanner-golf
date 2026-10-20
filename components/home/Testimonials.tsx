import type { HomePage, Testimonial } from '@/content/types'
import { revealDelay } from '../intro/reveal'
import Photo from '../Photo'
import Marquee from './Marquee'

// An endless, slowly drifting row of quote columns (see Marquee.tsx). Columns
// stretch to the tallest one and the cards in each grow to fill it, so every
// column lines up top and bottom.
export default function Testimonials({ heading, labels, columns }: HomePage['testimonials']) {
  if (!columns.length) return null

  return (
    <section id="testimonials" className="pt-[70px] pb-[70px] md:pt-[120px] md:pb-[120px]">
      {heading && (
        <div className="px-3 md:px-10 lg:pl-[144px]">
          <h2 data-reveal="up" className="max-w-[374px] text-[28px] leading-[32px] font-semibold text-ink uppercase md:max-w-[636px] md:text-[48px] md:leading-[52px] xl:max-w-[860px] xl:text-[64px] xl:leading-[64px]">
            {heading}
          </h2>
        </div>
      )}

      <div data-reveal="up" style={revealDelay(0.15)} className="mt-[31px] md:mt-[72px]">
        <Marquee labels={labels} viewportClassName="-mx-3 md:-mx-4">
          <ul className="flex items-stretch gap-3 pr-3 md:gap-4 md:pr-4">
            {columns.map((column, i) => (
              <li key={i} className="flex w-[300px] shrink-0 flex-col gap-3 md:w-[440px] md:gap-4 xl:w-[600px]">
                {column.map((item) => (
                  <Card key={item.name} {...item} />
                ))}
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </section>
  )
}

function Card({ quote, name, photo }: Testimonial) {
  return (
    <figure className="flex flex-1 flex-col justify-center gap-6 rounded-[8.673px] bg-[#f2f2f2] p-6 text-ink md:gap-8 md:rounded-xl md:p-12">
      <blockquote className="space-y-[1lh] text-[16px] leading-[24px] tracking-[0.01em] md:text-[20px] md:leading-[32px]">
        {quote.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </blockquote>
      <figcaption className="flex items-center gap-4 md:gap-5">
        <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#d9d9d9] md:size-[76px]">
          <Photo image={photo} sizes="(min-width: 768px) 76px, 48px" />
        </span>
        <span className="text-[16px] leading-[24px] font-semibold tracking-[0.01em] uppercase md:text-[20px] md:leading-[28px]">
          {name}
        </span>
      </figcaption>
    </figure>
  )
}
