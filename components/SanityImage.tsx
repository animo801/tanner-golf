import Image from 'next/image'
import { stegaClean } from 'next-sanity'
import type { SanityImageAssetReference, SanityImageCrop, SanityImageHotspot } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'

export type SanityImageValue = {
  asset: SanityImageAssetReference | null
  hotspot?: SanityImageHotspot | null
  crop?: SanityImageCrop | null
  alt?: string | null
} | null

type Props = {
  image: SanityImageValue | undefined
  sizes: string
  className?: string
  priority?: boolean
}

// Fills its (relatively positioned) parent, honouring the editor's crop and hotspot.
export default function SanityImage({ image, sizes, className, priority }: Props) {
  if (!image?.asset) return null
  const hotspot = image.hotspot
  return (
    <Image
      src={urlFor(image).url()}
      alt={stegaClean(image.alt) ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      className={className ?? 'object-cover'}
      style={hotspot?.x != null && hotspot?.y != null ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` } : undefined}
    />
  )
}
