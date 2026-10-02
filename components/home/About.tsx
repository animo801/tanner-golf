import { PortableText } from '@portabletext/react'
import type { HomePageQueryResult } from '@/sanity/types'
import { revealDelay } from '../intro/reveal'
import SanityImage from '../SanityImage'

type AboutData = NonNullable<NonNullable<HomePageQueryResult>['about']>

type Props = {
  heading: AboutData['heading'] | undefined
  body: AboutData['body'] | undefined
  images: AboutData['images'] | undefined
}

export default function About({ heading, body, images }: Props) {
  return (
    <section id="about" className="mt-1 grid gap-2 md:mt-3 md:grid-cols-[873fr_523fr] md:gap-3">
      <div data-reveal="up" style={revealDelay(0.2)} className="flex flex-col justify-center rounded-[5.196px] bg-[#3f5e48] px-6 pt-12 pb-10 text-white md:rounded-xl md:px-10 md:py-12 xl:px-20 xl:py-24">
        <div className="max-w-[820px]">
          {heading && (
            <h2 data-reveal="up" style={revealDelay(0.45)} className="text-[24px] leading-[24.247px] font-semibold tracking-[-0.02em] md:text-[32px] md:leading-[44px] md:uppercase xl:text-[40px] xl:leading-[56px]">
              {heading}
            </h2>
          )}
          {body && (
            <div data-reveal="up" style={revealDelay(0.55)} className="mt-1 space-y-[1lh] text-[18px] leading-[28px] tracking-[0.01em] md:mt-2 md:text-[20px] md:leading-[32px] xl:text-[28px] xl:leading-[48px]">
              <PortableText value={body} />
            </div>
          )}
        </div>
      </div>

      {images && images.length > 0 && (
        <div data-reveal="slide-right" style={revealDelay(0.65)} className="flex flex-col gap-2 md:gap-3">
          {images.map((image) => (
            <div
              key={image._key}
              className="relative aspect-[523/341.455] overflow-hidden rounded-[8.673px] md:rounded-xl"
            >
              <SanityImage image={image} sizes="(min-width: 768px) 523px, 100vw" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
