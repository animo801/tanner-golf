import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { site } from '@/content/site'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header logo={site.logo} logoText={site.logoText} menuLabel={site.menuLabel} navMenus={site.navMenus} />
      {children}
      <Footer settings={site} />
    </div>
  )
}
