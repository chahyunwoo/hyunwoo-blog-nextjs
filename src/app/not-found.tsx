import { Button } from "@/shared/ui/components/button";
import { InnerContainer } from "@/shared/ui/layout/inner-container";
import React from "react";
import Link from "next/link";
export default function NotFound() {
  return (
    <InnerContainer className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Not Found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button variant="outline" asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </InnerContainer>
  );
}
