export function getCategoryStyle(
  variant: "menu" | "sidebar",
  isAllButton: boolean,
  isActive: boolean,
  pathname: string = "/",
  activeCategory: string = "",
  activeTag: string = ""
) {
  const baseStyle =
    "flex justify-between items-center py-1.5 rounded-md w-full cursor-pointer";
  const variantStyle = variant === "menu" ? "px-4" : "px-2";
  let activeStyle = "";

  if (isAllButton) {
    const isAllActive = !activeCategory && !activeTag && pathname === "/";
    activeStyle = isAllActive
      ? "bg-primary/10 text-primary font-medium text-left"
      : "text-muted-foreground hover:bg-accent/50 text-left";
  } else {
    activeStyle = isActive
      ? "bg-primary/10 text-primary font-medium"
      : "text-muted-foreground hover:bg-accent/50";
  }

  return `${baseStyle} ${variantStyle} ${activeStyle}`;
}

export function getTagStyle(variant: "menu" | "sidebar", isActive: boolean) {
  const baseStyle =
    "flex justify-between items-center py-1 rounded-md text-sm w-full text-left cursor-pointer";
  const variantStyle = variant === "menu" ? "px-4" : "px-2";
  const activeStyle = isActive
    ? "bg-muted text-primary font-medium"
    : "text-muted-foreground hover:bg-accent/30";

  return `${baseStyle} ${variantStyle} ${activeStyle}`;
}
