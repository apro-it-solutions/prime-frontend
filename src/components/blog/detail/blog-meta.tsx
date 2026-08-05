import type { BlogCategoryRef } from "@/types/blog";

/**
 * Article eyebrow: the "News / Category" breadcrumb and the green category
 * badge, matching the top of the Figma Blog Detail page.
 */
export function BlogMeta({ category }: { category: BlogCategoryRef }) {
  return (
    <div className="flex flex-col items-start gap-5">
      <p className="font-body text-base leading-[1.5] text-text-secondary">
        News&nbsp;&nbsp;/&nbsp;&nbsp;{category.name}
      </p>
      <span className="inline-flex items-center rounded-pill bg-green-soft px-3.5 py-[7px] font-body text-xs font-medium uppercase leading-[1.2] tracking-[0.06px] text-green-primary">
        {category.name}
      </span>
    </div>
  );
}
