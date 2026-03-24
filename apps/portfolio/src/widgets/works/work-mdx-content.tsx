import { MdxRenderer } from '@hyunwoo/mdx/renderer'

interface WorkMdxContentProps {
  content: string
}

export function WorkMdxContent({ content }: WorkMdxContentProps) {
  return <MdxRenderer source={content} className="prose prose-invert tracking-wide leading-relaxed max-w-none" />
}
