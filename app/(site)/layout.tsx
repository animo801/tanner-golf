import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { SanityLive, sanityFetch } from '@/sanity/lib/live'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery })

  return (
    <div>
      <Header
        logo={settings?.logo}
        logoText={settings?.logoText}
        menuLabel={settings?.menuLabel}
        navMenus={settings?.navMenus}
      />
      {children}
      <Footer settings={settings} />
      <SanityLive />
      {isEnabled && <VisualEditing />}
    </div>
  )
}
