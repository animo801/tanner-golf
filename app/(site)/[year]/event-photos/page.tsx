import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import PhotoGallery from '@/components/PhotoGallery'
import { sanityFetch } from '@/sanity/lib/live'
import { eventPhotosPageQuery } from '@/sanity/lib/queries'

type Params = Promise<{ year: string }>

async function getPage(params: Params, stega = true) {
  const year = Number((await params).year)
  if (!Number.isInteger(year)) return null
  const { data } = await sanityFetch({ query: eventPhotosPageQuery, params: { year }, stega })
  return data
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getPage(params, false)
  return data?.title ? { title: `${data.title} – ${data.year}` } : {}
}

export default async function EventPhotosPage({ params }: { params: Params }) {
  const data = await getPage(params)
  if (!data) notFound()

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <PageHeader eyebrow={data.eyebrow} heading={data.heading} />

      {data.photos && data.photos.length > 0 && (
        <div className="mt-[78px] md:mt-20">
          <PhotoGallery photos={data.photos} />
        </div>
      )}
    </main>
  )
}
