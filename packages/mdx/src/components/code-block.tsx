'use client'

import { cn } from '@hyunwoo/shared/lib'
import { Check, Copy } from 'lucide-react'
import { type DetailedHTMLProps, type HTMLAttributes, useRef, useState } from 'react'

export function CodeBlock({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const content = preRef.current?.textContent || ''
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 backdrop-blur-sm cursor-pointer"
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5 text-muted-foreground" />}
      </button>
      <pre {...props} className={cn(className)} ref={preRef}>
        {children}
      </pre>
    </div>
  )
}
