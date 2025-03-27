import { Callout } from "./callout";
import { MdxImage } from "./mdx-image";
import { MdxLink } from "./mdx-link";
import { Icon } from "./icon";
import { CodeBlock } from "./code-block";
import { Highlight } from "./Highlight";

export const MdxComponents = {
  Callout,
  MdxImage,
  Icon,
  a: MdxLink,
  Highlight,
  pre: (props: any) => <CodeBlock {...props} />,
};
