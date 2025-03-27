import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InnerContainer } from "@/components/layout/inner-container";

export default function PostNotFound() {
  return (
    <InnerContainer className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Not Found</h1>
      <p className="text-muted-foreground">
        The post you requested may not exist or have been deleted.
      </p>
      <Button variant="outline" asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </InnerContainer>
  );
}
