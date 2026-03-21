'use client'

import type { LucideProps } from 'lucide-react'
import { Check, icons } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Alert, AlertDescription } from '../ui/alert'
import { IconButton } from '../ui/button'

interface CopyButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  target?: string
  icon: keyof typeof icons
  description?: string
  alert?: boolean
  useCurrentUrl?: boolean
  getContent?: () => string
}

export default function CopyButton({
  variant = 'ghost',
  size = 'icon',
  className = '',
  target = '',
  icon = 'Copy',
  description = '',
  alert = true,
  useCurrentUrl = false,
  getContent,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [currentTarget, setCurrentTarget] = useState(target)
  const [iconExists, setIconExists] = useState(true)

  useEffect(() => {
    if (useCurrentUrl && typeof window !== 'undefined') {
      setCurrentTarget(window.location.href)
    }
  }, [useCurrentUrl])

  useEffect(() => {
    if (copied) {
      const iconTimer = setTimeout(() => {
        setCopied(false)
      }, 2000)

      return () => clearTimeout(iconTimer)
    }
  }, [copied])

  useEffect(() => {
    if (showAlert) {
      const alertTimer = setTimeout(() => {
        setShowAlert(false)
      }, 3000)

      return () => clearTimeout(alertTimer)
    }
  }, [showAlert])

  useEffect(() => {
    if (!(icon in icons)) {
      setIconExists(false)
    } else {
      setIconExists(true)
    }
  }, [icon])

  const handleCopy = useCallback(async () => {
    try {
      const contentToCopy = getContent ? getContent() : currentTarget
      await navigator.clipboard.writeText(contentToCopy)
      setCopied(true)
      setShowAlert(true)
    } catch (_error) {
      // clipboard write failed
    }
  }, [currentTarget, getContent])

  if (!iconExists) {
    return null
  }

  const LucideIcon = icons[icon] as React.ComponentType<LucideProps>

  return (
    <>
      <IconButton
        variant={variant}
        size={size}
        icon={copied ? Check : LucideIcon}
        className={`cursor-pointer transition-all ${className} ${copied ? 'text-green-500 hover:text-green-500' : ''}`}
        onClick={handleCopy}
        disabled={copied}
        aria-label={copied ? '복사 완료' : '복사하기'}
      />

      {alert && showAlert && (
        <Alert
          className="fixed bottom-4 right-1/2 transform translate-x-1/2 w-auto bg-background shadow-lg border max-w-xs animate-in fade-in slide-in-from-bottom-5 z-50"
          variant="default"
        >
          <AlertDescription className="flex items-center gap-2 min-w-45 justify-center py-2">
            <Check className="h-4 w-4 text-green-500" />
            {description}
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
