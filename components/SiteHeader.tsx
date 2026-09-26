"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, stories } from "@/lib/mock-data";
import AppearanceCustomizer from "@/components/AppearanceCustomizer";

export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);

  return (
    <header>
      <div className="utility wrap">
        <span>MAIN STORY</span>
        <nav>
          <Link href="/category/world">Latest</Link>
          <a href="#newsletter">Newsletter</a>
          <button className="link-button" onClick={() => setSearchOpen(true)}>Search</button>
          <button className="link-button" onClick={() => setAppearanceOpen(true)}>Appearance</button>
        </nav>
      </div>

      <div className="masthead wrap">
        <Link className="logo" href="/" aria-label="Main Story home">MAIN <strong>STORY</strong></Link>
        <div className="ad">ADVERTISEMENT</div>
      </div>

      <div className="nav-shell">
        <div className="main-nav wrap">
          <button className="menu" aria-label="Open menu">☰</button>
          <nav>
            {categories.map((category) => (
              <div className="nav-item" key={category}>
                <Link href={"/category/" + category}>{category[0].toUpperCase() + category.slice(1)}</Link>
                {category !== "video" && (
                  <div className="mega-menu">
                    <div>
                      <span className="eyebrow">{category.toUpperCase()}</span>
                      <h3>Top stories</h3>
                      <p>Latest reporting and analysis from Main Story.</p>
                    </div>
                    <div className="mega-stories">
                      {stories.filter((s) => s.category === category).slice(0, 3).map((story) => (
                        <Link key={story.slug} href={"/news/" + story.slug}>{story.title}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button className="search" aria-label="Search" onClick={() => setSearchOpen(true)}>⌕</button>
        </div>
      </div>

      <div className="breaking">
        <div className="wrap breaking-row">
          <b>BREAKING</b>
          <span>Major developments, verified updates and context from the Main Story newsroom.</span>
        </div>
      </div>

      <AppearanceCustomizer open={appearanceOpen} onClose={() => setAppearanceOpen(false)} />

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true">
          <div className="search-panel">
            <div className="search-panel-top">
              <h2>Search Main Story</h2>
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">×</button>
            </div>
            <form action="/search">
              <input autoFocus name="q" placeholder="Search stories, topics and authors" />
              <button type="submit">Search</button>
            </form>
            <p>Try: AI, markets, technology, world</p>
          </div>
        </div>
      )}
    </header>
  );
}
