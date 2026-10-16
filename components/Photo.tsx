import Image from 'next/image'
import type { Photo as PhotoValue } from '@/content/types'

type Props = {
  image: PhotoValue | null | undefined
  sizes: string
  className?: string
  priority?: boolean
}

// Fills its (relatively positioned) parent, cropped around the photo's focal point.
export default function Photo({ image, sizes, className, priority }: Props) {
  if (!image) return null
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className ?? 'object-cover'}
      style={image.position ? { objectPosition: image.position } : undefined}
    />
  )
}
