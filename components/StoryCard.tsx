import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/mock-data";

export default function StoryCard({ story, compact=false }: { story: Story; compact?: boolean }) {
  return (
    <article className={compact ? "story-card compact" : "story-card"}>
      <Link
        className="story-art"
        href={"/news/" + story.slug}
        aria-label={story.title}
        data-analytics-event="story_click"
        data-analytics-slug={story.slug}
        data-analytics-category={story.category}
        data-analytics-author={story.author}
      >
        <Image
          src={story.image}
          alt={story.imageAlt}
          fill
          sizes={compact ? "92px" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"}
          className="story-image"
        />
        <span>{story.category}</span>
      </Link>
      <div className="story-copy">
        <Link
          className="eyebrow"
          href={"/category/" + story.category}
          data-analytics-event="category_click"
          data-analytics-category={story.category}
        >
          {story.category.toUpperCase()}
        </Link>
        <h3>
          <Link
            href={"/news/" + story.slug}
            data-analytics-event="story_click"
            data-analytics-slug={story.slug}
            data-analytics-category={story.category}
            data-analytics-author={story.author}
          >
            {story.title}
          </Link>
        </h3>
        {!compact && <p>{story.excerpt}</p>}
        <div className="story-meta">{story.readTime}</div>
      </div>
    </article>
  );
}
