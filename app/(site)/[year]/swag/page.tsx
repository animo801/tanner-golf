import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import Photo from '@/components/Photo'
import { getSeasonPage, yearsWith } from '@/content/seasons'

type Params = Promise<{ year: string }>

// Only years with this page in content/seasons.ts exist; anything else 404s
export const dynamicParams = false
export const generateStaticParams = () => yearsWith('swag')

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { year } = await params
  const page = getSeasonPage(year, 'swag')
  return page ? { title: `${page.title} – ${year}` } : {}
}

export default async function SwagPage({ params }: { params: Params }) {
  const data = getSeasonPage((await params).year, 'swag')
  if (!data) notFound()

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <PageHeader eyebrow={data.eyebrow} heading={data.heading} />

      <div className="mt-[78px] grid gap-6 md:mt-20 md:grid-cols-2 md:items-start md:gap-3">
        {data.image && (
          <div className="relative aspect-[378/282] overflow-hidden bg-[#d9d9d9] md:rounded-xl">
            <Photo image={data.image} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        )}
        <div className="px-6 text-[20px] leading-[36px] tracking-[-0.02em] text-ink md:px-10 md:text-[24px] md:leading-[40px] xl:text-[28px] xl:leading-[48px]">
          <p>{data.intro}</p>
          {data.items.length > 0 && (
            <ul className="list-disc pl-[30px]">
              {data.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
