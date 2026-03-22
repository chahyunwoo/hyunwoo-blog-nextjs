'use client'

import { cn } from '@hyunwoo/shared/lib'
import { type DetailedHTMLProps, type HTMLAttributes, useRef } from 'react'
import { CopyButton } from '@/shared/ui'
export function CodeBlock({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null)

  const getCodeContent = () => {
    return preRef.current?.textContent || ''
  }

  return (
    <div className="relative">
      <CopyButton
        icon="Copy"
        className="absolute right-2 top-2 backdrop-blur-xl"
        alert={false}
        getContent={getCodeContent}
      />
      <pre {...props} className={cn(className)} ref={preRef}>
        {children}
      </pre>
    </div>
  )
}
