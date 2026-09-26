"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, stories } from "@/lib/mock-data";
import AppearanceCustomizer from "@/components/AppearanceCustomizer";

export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <button className="menu" aria-label="Open menu" onClick={() => setMobileOpen(true)}>☰</button>
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

      {mobileOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileOpen(false)}>
          <aside className="mobile-nav-panel" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-nav-head">
              <Link className="logo" href="/" onClick={() => setMobileOpen(false)}>MAIN <strong>STORY</strong></Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">×</button>
            </div>
            <nav>
              {categories.map((category) => (
                <Link key={category} href={"/category/" + category} onClick={() => setMobileOpen(false)}>
                  {category[0].toUpperCase() + category.slice(1)}
                </Link>
              ))}
            </nav>
            <div className="mobile-nav-actions">
              <button onClick={() => { setMobileOpen(false); setSearchOpen(true); }}>Search</button>
              <button onClick={() => { setMobileOpen(false); setAppearanceOpen(true); }}>Appearance</button>
            </div>
          </aside>
        </div>
      )}

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
