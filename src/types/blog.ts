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

export type BlogParams = Promise<{
  category?: string;
  tag?: string;
  parentCategory?: string;
}>;
