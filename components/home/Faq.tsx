import type { HomePageQueryResult } from '@/sanity/types'
import { revealDelay } from '../intro/reveal'

type FaqData = NonNullable<NonNullable<HomePageQueryResult>['faq']>

type Props = {
  heading: FaqData['heading'] | undefined
  items: FaqData['items'] | undefined
}

export default function Faq({ heading, items }: Props) {
  return (
    <section id="faq" className="px-3 pt-[70px] pb-[70px] md:px-10 md:pt-[120px] md:pb-[120px] lg:pl-[144px]">
      {heading && (
        <h2 data-reveal="up" className="max-w-[374px] text-[28px] leading-[32px] font-semibold text-ink uppercase md:max-w-[636px] md:text-[48px] md:leading-[52px] xl:text-[64px] xl:leading-[64px]">
          {heading}
        </h2>
      )}
      {items && items.length > 0 && (
        <ul className="mt-[31px] max-w-[855px] border-t border-rule md:mt-[72px]">
          {items.map((item, i) => (
            <li key={item._key} data-reveal="up" style={revealDelay(0.1 + i * 0.07)} className="border-b border-rule">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 pt-[41px] pb-10 pr-3 md:pr-8 [&::-webkit-details-marker]:hidden">
                  <span className="text-[20px] leading-[28px] font-medium tracking-[-0.02em] text-ink md:text-[28px]">
                    {item.question}
                  </span>
                  <img
                    src="/images/chevron-down.svg"
                    alt=""
                    width={21.4142}
                    height={12.1213}
                    className="h-[9.697px] w-[17.131px] shrink-0 transition-transform duration-300 group-open:-scale-y-100 md:h-[12.121px] md:w-[21.414px]"
                  />
                </summary>
                {item.answer && (
                  <p className="-mt-4 pb-10 pr-12 text-[18px] leading-[28px] tracking-[0.01em] whitespace-pre-line text-ink/75 md:text-[20px] md:leading-[32px]">
                    {item.answer}
                  </p>
                )}
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
