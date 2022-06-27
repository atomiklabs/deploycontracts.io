import Image, { ImageProps } from 'next/image'

export function NonOptimizedImage(props: ImageProps) {
  return <Image loader={({ src }) => src} unoptimized={true} {...props} />
}
