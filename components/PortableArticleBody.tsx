import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

type PortableBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: Array<{ _key?: string; text?: string }>;
  asset?: unknown;
  alt?: string;
  caption?: string;
};

function blockText(block: PortableBlock) {
  return (block.children || []).map((child) => child.text || "").join("");
}

export default function PortableArticleBody({ body }: { body?: unknown[] }) {
  const blocks = (body || []) as PortableBlock[];

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const key = block._key || String(index);

        if (block._type === "block") {
          const text = blockText(block);
          if (!text) return null;

          if (block.style === "h2") return <h2 key={key}>{text}</h2>;
          if (block.style === "h3") return <h3 key={key}>{text}</h3>;
          if (block.style === "blockquote") return <blockquote key={key}>{text}</blockquote>;
          return <p key={key}>{text}</p>;
        }

        if (block._type === "editorialImage" && block.asset) {
          const src = urlForImage(block).width(1400).fit("max").url();
          return (
            <figure className="article-inline-image" key={key}>
              <div className="article-inline-image-frame">
                <Image src={src} alt={block.alt || ""} fill sizes="(max-width: 900px) 100vw, 760px" />
              </div>
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}
