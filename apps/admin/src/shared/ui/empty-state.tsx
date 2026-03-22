interface EmptyStateProps {
  label?: string
}

export function EmptyState({ label = '데이터 없음' }: EmptyStateProps) {
  return <p className="text-sm text-muted-foreground text-center py-4">{label}</p>
}
