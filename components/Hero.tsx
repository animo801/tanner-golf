import { urlFor } from '@/sanity/lib/image'
import SplitLines from './intro/SplitLines'
import SanityImage, { type SanityImageValue } from './SanityImage'

type Props = {
  heading: string | null | undefined
  eyebrow?: string | null
  image: SanityImageValue | undefined
  // Muted looping background video; `image` becomes its poster
  video?: { url: string | null | undefined; type: string | null | undefined }
  // 30% shorter, cropped to show the bottom of the photo
  short?: boolean
  // Split the heading into lines for the home page intro animation
  intro?: boolean
}

export default function Hero({ heading, eyebrow, image, video, short, intro }: Props) {
  const videoUrl = video?.url

  return (
    <section
      className={`intro-hero relative overflow-hidden rounded-[6.81px] md:h-auto md:rounded-xl ${
        short ? 'h-[621px] md:aspect-[1408/730]' : 'h-[592px] md:aspect-[1408/1043]'
      }`}
    >
      {/* Media and shading share one box so the shading tracks the photo when it's cropped */}
      <div
        className={`absolute left-1/2 aspect-[1408/1043] -translate-x-1/2 ${
          // Short: a box at least as tall as the hero, pinned to the bottom so the top of the photo is what's cut
          short ? 'bottom-0 w-[max(100%,839px)] md:w-full' : 'top-0 h-full min-w-full'
        }`}
      >
        <div className="intro-hero-media absolute inset-0">
          {videoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={image?.asset ? urlFor(image).width(1600).url() : undefined}
              className="absolute inset-0 size-full object-cover"
            >
              <source src={videoUrl} type={video?.type ?? undefined} />
            </video>
          ) : (
            <SanityImage image={image} sizes="(min-width: 768px) 100vw, 800px" priority />
          )}
          {videoUrl ? (
            // The Figma overlay is shaped to the photo's treeline, so video gets a plain gradient
            <div className="absolute inset-x-0 top-0 h-[56.6%] bg-linear-to-b from-[#4f4f4f]/50 to-transparent" />
          ) : (
            <img
              src="/images/hero-overlay.svg"
              alt=""
              width={1406.53}
              height={590.373}
              className="absolute top-0 left-0 h-[56.6%] w-full"
            />
          )}
        </div>
      </div>
      <div className="relative max-w-[369px] px-6 pt-[58px] text-white uppercase md:max-w-[1059px] md:pt-[min(7.15vw,103px)] md:pr-0 md:pl-[min(2.85vw,41px)]">
        {eyebrow && (
          <p className="text-[20px] leading-[36px] font-semibold opacity-60 md:text-[clamp(20px,2.22vw,32px)] md:leading-[1.4]">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h1
            className={`text-[36px] leading-[36px] font-semibold md:text-[clamp(40px,5.21vw,75px)] md:leading-[0.8533] ${eyebrow ? '-mt-[5px] md:mt-0' : ''}`}
          >
            {intro ? <SplitLines text={heading} /> : heading}
          </h1>
        )}
      </div>
    </section>
  )
}
