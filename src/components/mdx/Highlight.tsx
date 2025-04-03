interface HighlightProps {
  children: React.ReactNode;
  color?: keyof typeof colors;
}

const colors = {
  fuchsia: "text-fuchsia-500",
  blue: "text-blue-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  red: "text-red-500",
} as const;

export function Highlight({ children, color = "fuchsia" }: HighlightProps) {
  return <strong className={colors[color]}>{children}</strong>;
}
