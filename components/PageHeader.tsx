// Small grey eyebrow (e.g. the year) above a large uppercase page title
export default function PageHeader({ eyebrow, heading }: { eyebrow?: string | null; heading?: string | null }) {
  return (
    <header className="px-6 pt-[58px] text-ink uppercase md:pt-24 lg:pl-[144px]">
      {eyebrow && (
        <p className="text-[20px] leading-[36px] font-semibold opacity-60 md:text-[clamp(20px,2.22vw,32px)] md:leading-[1.4]">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h1 className="-mt-[5px] text-[36px] leading-[36px] font-semibold md:mt-0 md:text-[clamp(40px,5.21vw,75px)] md:leading-[0.8533]">
          {heading}
        </h1>
      )}
    </header>
  )
}
