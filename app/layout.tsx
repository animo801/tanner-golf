import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { sanityFetch } from '@/sanity/lib/live'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import './globals.css'

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: siteSettingsQuery, stega: false })
  return {
    title: data?.siteTitle ?? undefined,
    description: data?.siteDescription ?? undefined,
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interTight.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
