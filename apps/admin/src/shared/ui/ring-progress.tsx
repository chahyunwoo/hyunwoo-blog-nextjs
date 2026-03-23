import { cn } from '@hyunwoo/shared/lib'

interface RingProgressProps {
  value: number
  size?: number
  thickness?: number
  color?: string
  label?: React.ReactNode
  className?: string
}

export function RingProgress({ value, size = 120, thickness = 12, color, label, className }: RingProgressProps) {
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={color || 'text-primary'}
          style={{ transition: 'stroke-dashoffset 0.3s' }}
        />
      </svg>
      {label && <div className="absolute inset-0 flex items-center justify-center">{label}</div>}
    </div>
  )
}
