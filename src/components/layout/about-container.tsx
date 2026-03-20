interface AboutContainerProps {
  title: string
  children: React.ReactNode
}

export default function AboutContainer({ title, children }: AboutContainerProps) {
  return (
    <section className="mt-10 pb-6">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="w-1 h-4 bg-primary rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  )
}
