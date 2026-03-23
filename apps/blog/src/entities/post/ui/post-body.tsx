import { MdxRenderer } from '@hyunwoo/mdx/renderer'
import type { Post } from '@hyunwoo/shared/types'

export function PostBody({ post }: { post: Post }) {
  return <MdxRenderer source={post.content} className="pt-4 md:pt-8 pb-12" />
}
