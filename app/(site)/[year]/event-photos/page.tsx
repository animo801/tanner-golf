import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import PhotoGallery from '@/components/PhotoGallery'
import { getSeasonPage, yearsWith } from '@/content/seasons'

type Params = Promise<{ year: string }>

// Only years with this page in content/seasons.ts exist; anything else 404s
export const dynamicParams = false
export const generateStaticParams = () => yearsWith('eventPhotos')

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { year } = await params
  const page = getSeasonPage(year, 'eventPhotos')
  return page ? { title: `${page.title} – ${year}` } : {}
}

export default async function EventPhotosPage({ params }: { params: Params }) {
  const data = getSeasonPage((await params).year, 'eventPhotos')
  if (!data) notFound()

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <PageHeader eyebrow={data.eyebrow} heading={data.heading} />

      {data.photos.length > 0 && (
        <div className="mt-[78px] md:mt-20">
          <PhotoGallery photos={data.photos} />
        </div>
      )}
    </main>
  )
}
