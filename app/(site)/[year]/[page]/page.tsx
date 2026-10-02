import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { seasonPageQuery } from '@/sanity/lib/queries'
import { seasonPageTypes } from '@/sanity/seasonPages'

// Placeholder template shared by every season page (course, event photos, swag,
// player bios, results) until each gets its own design.
type Params = Promise<{ year: string; page: string }>

async function getPage(params: Params, stega = true) {
  const { year, page } = await params
  const type = seasonPageTypes.find((t) => t.path === page)?.name
  const yearNum = Number(year)
  if (!type || !Number.isInteger(yearNum)) return null
  const { data } = await sanityFetch({ query: seasonPageQuery, params: { type, year: yearNum }, stega })
  return data
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getPage(params, false)
  return data?.title ? { title: `${data.title} – ${data.year}` } : {}
}

export default async function SeasonPage({ params }: { params: Params }) {
  const data = await getPage(params)
  if (!data) notFound()

  return (
    <main className="px-3 md:px-4">
      <section className="min-h-[60vh] rounded-[8.673px] bg-forest px-6 pt-12 pb-16 text-white md:rounded-xl md:px-10 md:pt-24 md:pb-32 lg:pl-[144px]">
        <p className="text-[18px] leading-[24px] font-semibold tracking-[-0.02em] text-white/60 md:text-[24px] md:leading-[32px]">
          {data.year}
        </p>
        <h1 className="mt-2 max-w-[900px] text-[36px] leading-[36px] font-semibold uppercase md:text-[clamp(40px,5.21vw,75px)] md:leading-[0.8533]">
          {data.title}
        </h1>
        {data.intro && (
          <p className="mt-6 max-w-[608px] text-[18px] leading-[28px] tracking-[-0.02em] whitespace-pre-line md:mt-8 md:text-[20px] md:leading-[32px] xl:text-[28px] xl:leading-[48px]">
            {data.intro}
          </p>
        )}
      </section>
    </main>
  )
}
