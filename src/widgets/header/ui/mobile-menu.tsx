"use client";

import React, { useState } from "react";
import { MenuItem } from "../model/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/components/sheet";
import { Button } from "@/shared/ui/components/button";
import { Menu } from "lucide-react";
import Logo from "./logo";
import ActiveLink from "./active-link";

interface MobileMenuProps {
  menuItems: MenuItem[];
}

export default function MobileMenu({ menuItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader className="border-b-1">
          <SheetTitle className="px-2">
            <Logo />
          </SheetTitle>
          <SheetDescription className="hidden">
            Navigate to different sections of the site.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <nav className="flex flex-col gap-2">
            {menuItems.map(({ name, href }) => (
              <ActiveLink
                key={name}
                href={href}
                title={name}
                className="px-2 py-2 rounded-md hover:bg-accent hover:text-foreground transition-colors text-muted-foreground"
                onClick={() => setIsOpen(false)}
              ></ActiveLink>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
