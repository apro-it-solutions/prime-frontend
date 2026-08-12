/** Shared testimonial domain types — mirror the backend contract. */

export interface Testimonial {
  _id: string;
  /** Client full name, e.g. "Rajesh Menon". */
  name: string;
  /** Role / designation, e.g. "Warehouse Developer". */
  designation: string;
  /** Company or organisation (optional). */
  company?: string;
  /** Avatar image URL (served from the backend `/uploads`). */
  avatar?: string;
  /** Rating out of 5. */
  rating: number;
  /** The testimonial body — the only text content the API carries. */
  review: string;
  /** Publish flag set from the admin dashboard; inactive rows never render. */
  isActive: boolean;
  /** ISO date string. */
  createdAt: string;
  /** ISO date string. */
  updatedAt: string;
}

/** Pagination envelope returned under `meta`. */
export interface TestimonialsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** GET /api/v1/testimonials */
export interface TestimonialListResponse {
  success: boolean;
  message: string;
  data: Testimonial[];
  meta?: TestimonialsMeta;
}

/** Query params accepted by the list endpoint. */
export interface TestimonialQuery {
  page?: number;
  limit?: number;
}
