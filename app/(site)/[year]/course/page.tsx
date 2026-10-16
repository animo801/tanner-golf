import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import Photo from '@/components/Photo'
import { getSeasonPage, yearsWith } from '@/content/seasons'

type Params = Promise<{ year: string }>

// Only years with this page in content/seasons.ts exist; anything else 404s
export const dynamicParams = false
export const generateStaticParams = () => yearsWith('course')

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { year } = await params
  const page = getSeasonPage(year, 'course')
  return page ? { title: `${page.title} – ${year}` } : {}
}

export default async function CoursePage({ params }: { params: Params }) {
  const data = getSeasonPage((await params).year, 'course')
  if (!data) notFound()
  const { hero, about, details, photos } = data

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <Hero eyebrow={hero.eyebrow} heading={hero.heading} image={hero.poster} video={hero.video} />

      {about.body.length > 0 && (
        <section className="mt-1 rounded-[5.196px] bg-[#f1f1f1] px-6 pt-12 pb-[72px] text-ink md:mt-3 md:rounded-xl md:px-10 md:py-12 lg:pl-[144px] xl:py-24">
          <h2 className="text-[24px] leading-[24.247px] font-semibold tracking-[-0.02em] md:text-[32px] md:leading-[44px] md:uppercase xl:text-[40px] xl:leading-[56px]">
            {about.heading}
          </h2>
          <div className="mt-1 max-w-[760px] space-y-[1lh] text-[18px] leading-[28px] tracking-[-0.02em] md:mt-2 md:text-[20px] md:leading-[32px] xl:text-[28px] xl:leading-[48px]">
            {about.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {details.items.length > 0 && (
        <section className="px-2 pt-20 md:px-6 md:pt-[120px] lg:pl-[144px]">
          <SectionHeading>{details.heading}</SectionHeading>
          <ul className="mt-4 list-disc pl-[30px] text-[20px] leading-[28px] font-medium tracking-[-0.02em] text-ink md:mt-8 md:text-[28px] md:leading-[40px]">
            {details.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {photos.images.length > 0 && (
        <section className="pt-24 md:pt-[120px]">
          <div className="px-2 md:px-6 lg:pl-[144px]">
            <SectionHeading>{photos.heading}</SectionHeading>
          </div>
          <div className="mt-2.5 grid gap-2 md:mt-8 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
            {photos.images.map((image) => (
              <div key={image.src} className="relative aspect-[378/282] overflow-hidden bg-[#d9d9d9] md:rounded-xl">
                <Photo image={image} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
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
