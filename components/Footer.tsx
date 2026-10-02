import Link from 'next/link'
import { stegaClean } from 'next-sanity'
import type { SiteSettingsQueryResult } from '@/sanity/types'
import SanityImage from './SanityImage'

type Settings = NonNullable<SiteSettingsQueryResult>

export default function Footer({ settings }: { settings: SiteSettingsQueryResult | undefined }) {
  const { logo, logoText, navMenus, footerText } = (settings ?? {}) as Partial<Settings>

  return (
    <footer className="mx-3 mt-3 mb-3 rounded-[8.673px] bg-[#0c2414] px-6 pt-14 pb-8 text-white md:mx-4 md:mt-4 md:mb-4 md:rounded-xl md:px-10 md:pt-20">
      <div className="flex flex-col gap-12 md:flex-row md:gap-24">
        <Link href="/" className="flex items-center gap-[11px] self-start">
          <span className="relative block h-[43.174px] w-[69.642px]">
            {/* The logo mark is black, so it's flipped to white on the dark background */}
            <SanityImage image={logo} sizes="70px" className="object-contain object-left brightness-0 invert" />
          </span>
          {logoText && (
            <span className="block w-[200px] text-[16.096px] leading-[13.735px] font-semibold uppercase md:w-[283px] md:text-[20.85px] md:leading-[17.792px]">
              {logoText.prefix} <span className="text-white/50">{logoText.highlight}</span> {logoText.suffix}
            </span>
          )}
        </Link>

        {navMenus && navMenus.length > 0 && (
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-10 md:flex md:gap-x-20">
            {navMenus.map((menu) => (
              <div key={menu._key}>
                <p className="text-[14px] leading-[20px] font-semibold tracking-[0.08em] text-white/50 uppercase">{menu.label}</p>
                {menu.links?.length ? (
                  <ul className="mt-3 space-y-2">
                    {menu.links.map((link) => (
                      <li key={link._key}>
                        <Link
                          href={stegaClean(link.href) ?? '/'}
                          className="text-[18px] leading-[28px] tracking-[0.01em] text-white/90 transition-colors hover:text-white hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  menu.emptyText && <p className="mt-3 text-[18px] leading-[28px] text-white/50">{menu.emptyText}</p>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>

      <p className="mt-16 border-t border-white/15 pt-6 text-[14px] leading-[20px] tracking-[0.01em] text-white/50 md:mt-24">
        © {new Date().getFullYear()} {footerText}
      </p>
    </footer>
  )
}
