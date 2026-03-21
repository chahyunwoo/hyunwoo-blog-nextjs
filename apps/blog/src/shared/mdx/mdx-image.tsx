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
    <figure className="my-2 relative">
      <div className={cn('overflow-hidden')}>
        <Image
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 630}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 896px"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          className={cn('w-full h-full object-cover mt-0 my-0', className)}
          {...props}
        />
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}
