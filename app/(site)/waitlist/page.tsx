import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import WaitlistForm from '@/components/WaitlistForm'
import { waitlist } from '@/content/waitlist'

export const metadata: Metadata = { title: waitlist.title }

export default function WaitlistPage() {
  return (
    <main className="px-3 pb-[84px] md:px-4 md:pb-[120px]">
      <PageHeader eyebrow={waitlist.eyebrow} heading={waitlist.heading} />
      <section className="mt-10 rounded-[5.196px] bg-[#f1f1f1] px-6 pt-10 pb-12 md:mt-16 md:rounded-xl md:px-10 md:py-16 lg:pl-[144px] xl:py-24">
        <div className="max-w-[760px]">
          <p className="mb-8 text-[18px] leading-[28px] tracking-[-0.02em] whitespace-pre-line text-ink md:mb-12 md:text-[20px] md:leading-[32px] xl:text-[28px] xl:leading-[48px]">
            {waitlist.intro}
          </p>
          <WaitlistForm copy={waitlist.form} />
        </div>
      </section>
    </main>
  )
}
