import { Callout } from "./callout";
import { MdxImage } from "./mdx-image";
import { MdxLink } from "./mdx-link";
import { Icon } from "./icon";
import { CodeBlock } from "./code-block";

export const MdxComponents = {
  Callout,
  MdxImage,
  Icon,
  a: MdxLink,
  pre: (props: any) => <CodeBlock {...props} />,
};
