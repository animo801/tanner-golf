import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import TeamRosters from '@/components/TeamRosters'
import { getSeasonPage, yearsWith } from '@/content/seasons'

type Params = Promise<{ year: string }>

// Only years with this page in content/seasons.ts exist; anything else 404s
export const dynamicParams = false
export const generateStaticParams = () => yearsWith('playerBios')

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { year } = await params
  const page = getSeasonPage(year, 'playerBios')
  return page ? { title: `${page.title} – ${year}` } : {}
}

export default async function PlayerBiosPage({ params }: { params: Params }) {
  const data = getSeasonPage((await params).year, 'playerBios')
  if (!data) notFound()

  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <PageHeader eyebrow={data.eyebrow} heading={data.heading} />

      {data.teams.length > 0 && (
        <div className="mt-10 md:mt-16">
          <TeamRosters teams={data.teams} labels={data.labels} />
        </div>
      )}
    </main>
  )
}
