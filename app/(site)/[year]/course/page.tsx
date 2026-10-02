import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Hero from '@/components/Hero'
import SanityImage from '@/components/SanityImage'
import { sanityFetch } from '@/sanity/lib/live'
import { coursePageQuery } from '@/sanity/lib/queries'

type Params = Promise<{ year: string }>

async function getPage(params: Params, stega = true) {
  const year = Number((await params).year)
  if (!Number.isInteger(year)) return null
  const { data } = await sanityFetch({ query: coursePageQuery, params: { year }, stega })
  return data
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getPage(params, false)
  return data?.title ? { title: `${data.title} – ${data.year}` } : {}
}

export default async function CoursePage({ params }: { params: Params }) {
  const data = await getPage(params)
  if (!data) notFound()
  const { hero, about, details, photos } = data

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <Hero
        eyebrow={hero?.eyebrow}
        heading={hero?.heading}
        image={hero?.poster}
        video={{ url: hero?.videoUrl, type: hero?.videoType }}
      />

      {(about?.heading || about?.body) && (
        <section className="mt-1 rounded-[5.196px] bg-[#f1f1f1] px-6 pt-12 pb-[72px] text-ink md:mt-3 md:rounded-xl md:px-10 md:py-12 lg:pl-[144px] xl:py-24">
          {about.heading && (
            <h2 className="text-[24px] leading-[24.247px] font-semibold tracking-[-0.02em] md:text-[32px] md:leading-[44px] md:uppercase xl:text-[40px] xl:leading-[56px]">
              {about.heading}
            </h2>
          )}
          {about.body && (
            <div className="mt-1 max-w-[760px] space-y-[1lh] text-[18px] leading-[28px] tracking-[-0.02em] md:mt-2 md:text-[20px] md:leading-[32px] xl:text-[28px] xl:leading-[48px]">
              <PortableText value={about.body} />
            </div>
          )}
        </section>
      )}

      {details?.items && details.items.length > 0 && (
        <section className="px-2 pt-20 md:px-6 md:pt-[120px] lg:pl-[144px]">
          {details.heading && <SectionHeading>{details.heading}</SectionHeading>}
          <ul className="mt-4 list-disc pl-[30px] text-[20px] leading-[28px] font-medium tracking-[-0.02em] text-ink md:mt-8 md:text-[28px] md:leading-[40px]">
            {details.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {photos?.images && photos.images.length > 0 && (
        <section className="pt-24 md:pt-[120px]">
          {photos.heading && (
            <div className="px-2 md:px-6 lg:pl-[144px]">
              <SectionHeading>{photos.heading}</SectionHeading>
            </div>
          )}
          <div className="mt-2.5 grid gap-2 md:mt-8 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
            {photos.images.map((image) => (
              <div key={image._key} className="relative aspect-[378/282] overflow-hidden bg-[#d9d9d9] md:rounded-xl">
                <SanityImage image={image} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[32px] leading-[36px] font-semibold text-ink uppercase md:text-[48px] md:leading-[52px] xl:text-[64px] xl:leading-[64px]">
      {children}
    </h2>
  )
}
