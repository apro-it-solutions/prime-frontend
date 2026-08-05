/**
 * Article footer tags (Figma 258:178 → 258:187): a centered hairline divider
 * above a row of "#tag" pills on the sunken surface. Renders nothing when the
 * post has no tags.
 */
export function BlogTags({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;

  return (
    <div className="mt-12 lg:mt-14">
      <div className="mx-auto h-px w-full max-w-[760px] bg-border" />
      <ul className="mt-10 flex flex-wrap gap-2.5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-pill bg-bg-sunken px-4 py-[9px] font-body text-base leading-[1.5] text-text-secondary"
          >
            #{tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
