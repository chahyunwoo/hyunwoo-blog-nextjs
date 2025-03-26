import Link from "next/link";
import { Button } from "@/components/common/button";
import { InnerContainer } from "@/components/layout/inner-container";

export default function PostNotFound() {
  return (
    <InnerContainer>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">
          포스트를 찾을 수 없습니다
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          요청하신 포스트가 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </InnerContainer>
  );
}
