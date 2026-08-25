/** Shared project domain types — mirror the backend contract exactly. */

/** Populated category reference on a project (`populate('category', 'name slug')`). */
export interface ProjectCategoryRef {
  _id: string;
  name: string;
  slug: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  /** Plain-text summary used on cards and as the meta description. */
  shortDescription?: string;
  /** Rich HTML from the dashboard's editor. */
  description: string;
  /**
   * Cover image. Optional because the service drops URLs it cannot resolve to
   * the configured backend origin — see `backendImageUrl`.
   */
  featuredImage?: string;
  gallery: string[];
  /**
   * Populated by the public list/detail routes. Typed defensively: the backend
   * returns the raw ObjectId string when a populate is skipped, and `null` when
   * the referenced category row has been deleted.
   */
  category: ProjectCategoryRef | string | null;
  client?: string;
  location?: string;
  /** ISO date string. */
  completionDate?: string;
  technologies: string[];
  projectUrl?: string;
  status: string;
  featured: boolean;
  /** Manual display order; lower values surface first. */
  sortOrder: number;
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
export interface ProjectMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** GET /api/v1/projects */
export interface ProjectListResponse {
  success: boolean;
  message: string;
  data: Project[];
  meta: ProjectMeta;
}

/** GET /api/v1/projects/:slug */
export interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project;
}

/** Query params accepted by the list endpoint. */
export interface ProjectQuery {
  page?: number;
  /** Backend caps this at 100. */
  limit?: number;
  /** Free-text search across title, short description, client, location, tech. */
  search?: string;
  /** Category `_id` or slug; "all" (or omitted) returns everything. */
  category?: string;
  /** Restricts to (or excludes) the admin-flagged hero project. */
  featured?: boolean;
}
