import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxComponents } from "@/components/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { Post } from "@/types";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkBreaks from "remark-breaks";
import { PostTOC } from "./post-toc";

const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: {
    dark: "ayu-dark",
    light: "solarized-light",
  },
};

export function PostBody({ post }: { post: Post }) {
  return (
    <>
      <PostTOC />
      <div className="py-12 border-y border-border">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkBreaks],
              rehypePlugins: [
                [rehypePrettyCode, prettyCodeOptions],
                [rehypeSlug],
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: "append",
                  },
                ],
              ],
            },
          }}
          components={MdxComponents}
        />
      </div>
    </>
  );
}
