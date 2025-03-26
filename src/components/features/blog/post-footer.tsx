import { Post } from "@/types";
import { Badge } from "@/components/common/badge";
import { ShareButton } from "./share-button";

interface PostFooterProps {
  post: Post;
}

export function PostFooter({ post }: PostFooterProps) {
  return (
    <div className="pt-4 mb-20">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <span>tags: </span>
          <div className="ml-2 flex items-center gap-2 flex-wrap">
            {post &&
              post.meta.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
        <div>
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
