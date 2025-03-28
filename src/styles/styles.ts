export function getCategoryStyle(
  variant: "menu" | "sidebar",
  isAllButton: boolean,
  isActive: boolean,
  pathname: string = "/",
  activeCategory: string = "",
  activeTag: string = ""
) {
  const baseStyle =
    "flex justify-between items-center py-1.5 w-full cursor-pointer";
  const variantStyle = variant === "menu" ? "pl-6 pr-4" : "px-4";
  let activeStyle = "";

  if (isAllButton) {
    const isAllActive = !activeCategory && !activeTag && pathname === "/";

    activeStyle = isAllActive
      ? "bg-primary/15 text-primary font-medium text-left"
      : "text-muted-foreground hover:bg-accent/50 text-left";
  } else {
    activeStyle = isActive
      ? "bg-primary/15 text-primary font-medium"
      : "text-muted-foreground hover:bg-accent/50";
  }

  return `${baseStyle} ${variantStyle} ${activeStyle}`;
}
