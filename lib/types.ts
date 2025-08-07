export type PostCategory = "journal" | "tutorial" | "news" | string;

export interface AuthorInfo {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface PostFrontmatter {
  title: string;
  description?: string;
  date: string;
  lastModified?: string;
  publishedAt?: string;
  tags?: string[];
  category?: PostCategory;
  series?: string;
  coverImage?: string;
  coverImageAlt?: string;
  featured?: boolean;
  draft?: boolean;
  author?: AuthorInfo;
  seo?: {
    canonical?: string;
    noindex?: boolean;
  };
  tableOfContents?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTimeMinutes?: number;
}

export interface PostContent extends PostMeta {
  content: string;
}


