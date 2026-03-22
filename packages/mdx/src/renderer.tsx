import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { MdxComponents } from './components'

const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: {
    dark: 'ayu-dark',
    light: 'snazzy-light',
  },
}

interface MdxRendererProps {
  source: string
  className?: string
  components?: Record<string, React.ComponentType>
}

export function MdxRenderer({ source, className, components }: MdxRendererProps) {
  return (
    <div className={className}>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              [rehypePrettyCode, prettyCodeOptions],
              [rehypeSlug],
              [rehypeAutolinkHeadings, { behavior: 'append' }],
            ],
          },
        }}
        components={{ ...MdxComponents, ...components }}
      />
    </div>
  )
}
