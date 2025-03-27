export interface MenuItem {
  name: string;
  href: string;
}

//BLOG
export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  mainTag: string;
  thumbnail: string;
  published: boolean;
  slug: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export interface CategoryWithTags {
  category: string;
  tags: string[];
  count: number;
}

export interface CategoryInfo {
  category: string;
  subCategory: SubCategoryInfo[];
  recent: boolean;
}

export interface SubCategoryInfo {
  name: string;
  count: number;
}

export interface CategoryData {
  category: string;
  subCategory: {
    name: string;
    count: number;
  }[];
  postCount: number;
  recent: boolean;
}

//ABOUT
export type Locale = "ko" | "en" | "jp";

export type Profile = {
  name: string;
  job: string;
  location: string;
  link: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
  introduction: string[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  experience: {
    title: string;
    role: string;
    period: string;
    responsibilities: string[];
  }[];
  copied: string;
};
