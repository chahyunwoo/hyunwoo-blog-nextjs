import { cn } from "@/lib/utils";

interface InnerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function InnerContainer({
  children,
  className,
  ...props
}: InnerContainerProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 md:border-x-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
