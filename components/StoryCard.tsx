import Link from "next/link";
import type { Story } from "@/lib/mock-data";

export default function StoryCard({ story, compact=false }: { story: Story; compact?: boolean }) {
  return (
    <article className={compact ? "story-card compact" : "story-card"}>
      <Link className="story-art" href={"/news/" + story.slug} aria-label={story.title}>
        <span>{story.category}</span>
      </Link>
      <div className="story-copy">
        <Link className="eyebrow" href={"/category/" + story.category}>{story.category.toUpperCase()}</Link>
        <h3><Link href={"/news/" + story.slug}>{story.title}</Link></h3>
        {!compact && <p>{story.excerpt}</p>}
        <div className="story-meta">{story.readTime}</div>
      </div>
    </article>
  );
}
