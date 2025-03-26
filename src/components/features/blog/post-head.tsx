import { Badge } from "../../common/badge";
import { Post } from "@/types";
export function PostHead({ post }: { post: Post }) {
  return (
    <>
      <h1 className="text-4xl font-bold mt-6 md:mt-12 mb-6 text-center">
        {post.meta.title}
      </h1>
      <div className="text-center mb-2">
        <Badge variant="secondary">{post.meta.mainTag}</Badge>
      </div>
      <div className="text-gray-500 mb-8 text-center border-b-1 pb-4">
        {new Date(post.meta.date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </>
  );
}
