import { LINK_TYPES } from "@/lib/constants";

export interface MenuItem {
  name: string;
  href: string;
}

export type LinkType = (typeof LINK_TYPES)[keyof typeof LINK_TYPES];
