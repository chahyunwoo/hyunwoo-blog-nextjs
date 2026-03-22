import { cn } from '@hyunwoo/shared/lib'
import Image from 'next/image'

interface MdxImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
  caption?: string
  className?: string
  priority?: boolean
}

export function MdxImage({
  src,
  alt = '',
  width = 0,
  height = 0,
  caption,
  className,
  priority = false,
  ...props
}: MdxImageProps) {
  return (
    <figure className="my-6 relative max-w-2xl mx-auto">
      <div className={cn('overflow-hidden rounded-md')}>
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 450}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 672px"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          className={cn('w-full h-auto object-cover mt-0 my-0', className)}
          {...props}
        />
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}
