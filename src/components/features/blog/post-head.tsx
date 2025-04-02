import { Calendar } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Post } from "@/types";
export function PostHead({ post }: { post: Post }) {
  return (
    <>
      <h1 className="text-4xl font-bold mt-6 md:mt-12 mb-2 text-center">
        {post.meta.title}
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-2">
        {post.meta.description}
      </p>
      <div className="text-center mb-6">
        <Badge variant="secondary" className="text-teal-500">
          {post.meta.mainTag}
        </Badge>
      </div>
      <div className="text-muted-foreground text-xs mb-8 text-center border-b-1 pb-4 flex items-center justify-center gap-2">
        <Calendar className="w-3 h-3" />
        {new Date(post.meta.date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </>
  );
}
