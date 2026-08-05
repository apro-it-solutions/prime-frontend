import type { Blog } from "@/types/blog";
import { BlogCard } from "./blog-card";

/** Responsive 3-column grid of blog cards (Figma gap 32px). */
export function BlogGrid({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
