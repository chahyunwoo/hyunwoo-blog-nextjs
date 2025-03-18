interface AboutContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function AboutContainer({
  title,
  children,
}: AboutContainerProps) {
  return (
    <div className="mt-6 pb-6">
      <h2 className="text-xl font-black mb-4">{title}</h2>
      {children}
    </div>
  );
}
