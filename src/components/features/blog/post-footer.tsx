import { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Giscus } from "./giscus";
import { Tag } from "lucide-react";
import CopyButton from "@/components/common/copy-button";
interface PostFooterProps {
  post: Post;
}

export function PostFooter({ post }: PostFooterProps) {
  return (
    <div className="space-y-8 mb-20">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-3 pt-8">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              <span className="font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {post?.meta.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-8">
            <CopyButton
              description="링크가 복사되었습니다."
              icon="Share2"
              useCurrentUrl
            />
          </div>
        </div>
        <Giscus />
      </div>
    </div>
  );
}
