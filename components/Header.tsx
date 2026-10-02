'use client'

import Link from 'next/link'
import { stegaClean } from 'next-sanity'
import { useEffect, useState } from 'react'
import type { SiteSettingsQueryResult } from '@/sanity/types'
import SanityImage from './SanityImage'

type Settings = NonNullable<SiteSettingsQueryResult>
type NavMenu = NonNullable<Settings['navMenus']>[number]

type Props = {
  logo: Settings['logo'] | undefined
  logoText: Settings['logoText'] | undefined
  menuLabel: string | null | undefined
  navMenus: Settings['navMenus'] | undefined
}

export default function Header({ logo, logoText, menuLabel, navMenus }: Props) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // While the menu is open: Escape closes it and the page behind doesn't scroll
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const menus = navMenus ?? []
  const brand = <Logo logo={logo} logoText={logoText} />

  return (
    <header className="relative z-30 flex h-[86px] items-center justify-between pr-6 pl-4 md:h-[76px] md:pr-4">
      <Link href="/" onClick={close} className="intro-header">
        {brand}
      </Link>

      <button
        type="button"
        aria-label={stegaClean(menuLabel) ?? undefined}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
        className="intro-header relative block h-[21.946px] w-[29px] cursor-pointer md:h-[28px] md:w-[37px]"
      >
        <img src="/images/menu.svg" alt="" width={37} height={28} className="absolute inset-0 size-full" />
      </button>

      {/* Slide-in drawer: always mounted so it can animate out; inert while closed */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        inert={!open}
        className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
      >
        <div
          onClick={close}
          className={`absolute inset-0 bg-white/60 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <nav
          data-open={open ? '' : undefined}
          className={`absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto border-l border-rule bg-white px-8 pt-12 pb-12 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[560px] md:px-12 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute top-5 right-5 grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-black/5 md:top-6 md:right-6"
          >
            <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="2.4" />
            </svg>
          </button>

          <div className="space-y-10">
            {menus.map((menu, m) => {
              // Running position in the menu, so every label and link staggers in order
              const start = menus.slice(0, m).reduce((n, prev) => n + 1 + Math.max(prev.links?.length ?? 0, 1), 0)
              return (
                <div key={menu._key}>
                  <p
                    className="menu-stagger text-[14px] leading-[20px] font-semibold tracking-[0.08em] text-ink/50 uppercase"
                    style={stagger(start)}
                  >
                    {menu.label}
                  </p>
                  <MenuLinks menu={menu} onNavigate={close} startIndex={start + 1} className="mt-3" />
                </div>
              )
            })}
          </div>

          <Link
            href="/"
            onClick={close}
            className="menu-stagger mt-auto pt-12"
            style={stagger(menus.reduce((n, menu) => n + 1 + Math.max(menu.links?.length ?? 0, 1), 0))}
          >
            {brand}
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Logo({ logo, logoText }: Pick<Props, 'logo' | 'logoText'>) {
  return (
    <span className="flex items-center gap-[9px] md:gap-[11px]">
      <span className="relative block h-[52.778px] w-[53.762px] md:h-[43.174px] md:w-[69.642px]">
        <SanityImage image={logo} sizes="70px" className="object-contain" priority />
      </span>
      {logoText && (
        <span className="block w-[139px] text-[16.096px] leading-[13.735px] font-semibold text-ink uppercase md:w-[283px] md:text-[20.85px] md:leading-[17.792px]">
          {logoText.prefix} <span className="text-muted">{logoText.highlight}</span> {logoText.suffix}
        </span>
      )}
    </span>
  )
}

const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties

function MenuLinks({
  menu,
  onNavigate,
  startIndex,
  className,
}: {
  menu: NavMenu
  onNavigate: () => void
  startIndex: number
  className?: string
}) {
  if (!menu.links?.length) {
    return menu.emptyText ? (
      <div className={className}>
        <p className="menu-stagger py-2 text-[20px] leading-[28px] text-ink/50" style={stagger(startIndex)}>
          {menu.emptyText}
        </p>
      </div>
    ) : null
  }
  return (
    <ul className={className}>
      {menu.links.map((link, i) => (
        <li key={link._key} className="menu-stagger" style={stagger(startIndex + i)}>
          <Link
            href={stegaClean(link.href) ?? '/'}
            onClick={onNavigate}
            className="block py-1 text-[36px] leading-[48px] font-medium tracking-[-0.02em] text-ink transition-colors hover:text-forest md:text-[40px]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
