import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { home } from '@/content/home'
import { site } from '@/content/site'
import './globals.css'

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
})

// Link previews (iMessage, Slack, social) use the home page hero. On Vercel, Next
// resolves the image to an absolute URL from the deployment's own domain.
const shareImage = { url: home.hero.image.src, alt: home.hero.image.alt }

export const metadata: Metadata = {
  title: site.siteTitle,
  description: site.siteDescription,
  openGraph: {
    type: 'website',
    siteName: site.siteTitle,
    title: site.siteTitle,
    description: site.siteDescription,
    images: [shareImage],
  },
  twitter: { card: 'summary_large_image', images: [shareImage] },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interTight.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
