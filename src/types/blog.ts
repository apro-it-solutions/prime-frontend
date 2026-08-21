/** Shared blog domain types — mirror the backend contract exactly. */

/** Populated category reference on a blog. */
export interface BlogCategoryRef {
  _id: string;
  name: string;
  slug: string;
}

/** Populated author reference on a blog. */
export interface BlogAuthor {
  _id: string;
  name: string;
  email: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** HTML string. */
  content: string;
  /**
   * Cover image. Optional because the service drops URLs it cannot resolve to
   * the configured backend origin — see `backendImageUrl`.
   */
  featuredImage?: string;
  gallery: string[];
  category: BlogCategoryRef;
  tags: string[];
  author: BlogAuthor;
  isFeatured: boolean;
  /** Estimated reading time in minutes. */
  readingTime: number;
  status: string;
  /** ISO date string. */
  publishDate: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  /** ISO date string. */
  createdAt: string;
  /** ISO date string. */
  updatedAt: string;
}

/** Pagination envelope returned under `meta`. */
export interface BlogMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** GET /api/v1/blogs */
export interface BlogListResponse {
  success: boolean;
  message: string;
  data: Blog[];
  meta: BlogMeta;
}

/** GET /api/v1/blogs/:slug */
export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

/** Query params accepted by the list endpoint. */
export interface BlogQuery {
  page?: number;
  limit?: number;
  /** Free-text search against the title. */
  search?: string;
  /** Category `_id`; "all" (or omitted) returns everything. */
  category?: string;
}
