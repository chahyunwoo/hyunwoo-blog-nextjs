import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { MdxComponents } from '@/components/mdx'
import type { Post } from '@/types'

const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: {
    dark: 'ayu-dark',
    light: 'snazzy-light',
  },
}

export function PostBody({ post }: { post: Post }) {
  return (
    <div className="py-12">
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
                  behavior: 'append',
                },
              ],
            ],
          },
        }}
        components={MdxComponents}
      />
    </div>
  )
}
