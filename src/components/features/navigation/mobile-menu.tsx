"use client";

import React, { Suspense, useCallback, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/common/sheet";
import { Button } from "@/components/common/button";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Logo from "@/components/common/logo";
import ActiveLink from "@/components/features/navigation/active-link";
import type { MenuItem, CategoryData } from "@/types";

interface MobileMenuProps {
  menuItems: MenuItem[];
  categories?: CategoryData[];
}

export default function MobileMenu({
  menuItems,
  categories = [],
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Suspense>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[280px] sm:w-[320px] overflow-y-auto"
        >
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="px-2">
              <Logo />
            </SheetTitle>
            <SheetDescription className="hidden">
              Navigate to different sections of the site.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 py-4">
            <nav className="flex flex-col">
              {menuItems.map(({ name, href }) => {
                return (
                  <ActiveLink
                    key={name}
                    href={href}
                    title={name}
                    className="px-4 py-2 rounded-md hover:bg-accent hover:text-foreground transition-colors text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  />
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </Suspense>
  );
}
