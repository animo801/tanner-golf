import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import PageHeader from '@/components/PageHeader'
import SanityImage from '@/components/SanityImage'
import { sanityFetch } from '@/sanity/lib/live'
import { swagPageQuery } from '@/sanity/lib/queries'

type Params = Promise<{ year: string }>

async function getPage(params: Params, stega = true) {
  const year = Number((await params).year)
  if (!Number.isInteger(year)) return null
  const { data } = await sanityFetch({ query: swagPageQuery, params: { year }, stega })
  return data
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getPage(params, false)
  return data?.title ? { title: `${data.title} – ${data.year}` } : {}
}

export default async function SwagPage({ params }: { params: Params }) {
  const data = await getPage(params)
  if (!data) notFound()

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <PageHeader eyebrow={data.eyebrow} heading={data.heading} />

      <div className="mt-[78px] grid gap-6 md:mt-20 md:grid-cols-2 md:items-start md:gap-3">
        {data.image?.asset && (
          <div className="relative aspect-[378/282] overflow-hidden bg-[#d9d9d9] md:rounded-xl">
            <SanityImage image={data.image} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        )}
        {data.body && (
          <div className="px-6 text-[20px] leading-[36px] tracking-[-0.02em] text-ink md:px-10 md:text-[24px] md:leading-[40px] xl:text-[28px] xl:leading-[48px] [&_ul]:list-disc [&_ul]:pl-[30px]">
            <PortableText value={data.body} />
          </div>
        )}
      </div>
    </main>
  )
}
