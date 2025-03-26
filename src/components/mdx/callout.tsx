import React from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

type CalloutType = "info" | "success" | "warning" | "error" | "tip" | "default";

interface CalloutProps {
  children: React.ReactNode;
  type?: CalloutType;
  icon?: LucideIcon;
  className?: string;
}

const icons: Record<CalloutType, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  tip: Lightbulb,
  default: AlertCircle,
};

const colors: Record<CalloutType, string> = {
  default:
    "border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
  info: "border-blue-200 bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
  success:
    "border-green-200 bg-green-100 dark:border-green-800 dark:bg-green-900/30 text-green-800 dark:text-green-200",
  warning:
    "border-amber-200 bg-amber-100 dark:border-amber-800 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200",
  error:
    "border-red-200 bg-red-100 dark:border-red-800 dark:bg-red-900/30 text-red-800 dark:text-red-200",
  tip: "border-purple-200 bg-purple-100 dark:border-purple-800 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
};

export function Callout({
  children,
  type = "default",
  icon,
  className,
  ...props
}: CalloutProps) {
  const IconComponent = icon || icons[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-lg border px-4 py-1 items-center",
        colors[type],
        className
      )}
      {...props}
    >
      <div className="ml-2 flex-shrink-0">
        <IconComponent size={24} />
      </div>
      <div>
        <div className="callout-content">{children}</div>
      </div>
    </div>
  );
}
