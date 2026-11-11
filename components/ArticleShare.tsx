"use client";

import { useState } from "react";

export default function ArticleShare({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
      window.setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Could not copy link");
    }
  }

  return (
    <div className="article-share">
      <button type="button" onClick={share} aria-label="Share this story">
        Share story <span aria-hidden="true">↗</span>
      </button>
      <span role="status" aria-live="polite">{status}</span>
    </div>
  );
}
