import { Callout } from './callout'
import { CodeBlock } from './code-block'
import { Highlight } from './Highlight'
import { Icon } from './icon'
import { MdxImage } from './mdx-image'
import { MdxLink } from './mdx-link'

export const MdxComponents = {
  Callout,
  MdxImage,
  Icon,
  a: MdxLink,
  Highlight,
  pre: (props: React.ComponentProps<'pre'>) => <CodeBlock {...props} />,
}
