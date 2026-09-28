"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, stories } from "@/lib/mock-data";
import AppearanceCustomizer from "@/components/AppearanceCustomizer";

export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [breakingItem, setBreakingItem] = useState<{
    headline: string;
    href?: string;
    priority?: string;
  } | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/breaking")
      .then((response) => (response.ok ? response.json() : null))
      .then((item) => {
        if (active) setBreakingItem(item);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const overlayOpen = mobileOpen || searchOpen || appearanceOpen;
    const previousOverflow = document.body.style.overflow;

    if (overlayOpen) {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      setSearchOpen(false);
      setAppearanceOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, searchOpen, appearanceOpen]);

  const openSearch = () => {
    setMobileOpen(false);
    setSearchOpen(true);
  };

  return (
    <header className="site-header">
      <div className="utility wrap">
        <span>MAIN STORY</span>
        <nav>
          <Link href="/latest">Latest</Link>
          <Link href="/#newsletter">Newsletter</Link>
          <button className="link-button" onClick={() => setSearchOpen(true)}>
            Search
          </button>
          <button className="link-button" onClick={() => setAppearanceOpen(true)}>
            Appearance
          </button>
        </nav>
      </div>

      <div className="masthead wrap">
        <Link className="logo" href="/" aria-label="Main Story home">
          MAIN <strong>STORY</strong>
        </Link>
        <div className="ad">ADVERTISEMENT</div>
      </div>

      <div className="nav-shell">
        <div className="main-nav wrap">
          <button
            className="menu"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <nav aria-label="Primary navigation">
            {categories.map((category) => (
              <div className="nav-item" key={category}>
                <Link href={"/category/" + category}>
                  {category[0].toUpperCase() + category.slice(1)}
                </Link>

                {category !== "video" && (
                  <div className="mega-menu">
                    <div>
                      <span className="eyebrow">{category.toUpperCase()}</span>
                      <h3>Top stories</h3>
                      <p>Latest reporting and analysis from Main Story.</p>
                    </div>
                    <div className="mega-stories">
                      {stories
                        .filter((story) => story.category === category)
                        .slice(0, 3)
                        .map((story) => (
                          <Link key={story.slug} href={"/news/" + story.slug}>
                            {story.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className="search"
            aria-label="Search Main Story"
            onClick={() => setSearchOpen(true)}
          >
            ⌕
          </button>
        </div>
      </div>

      <div className="breaking">
        <div className="wrap breaking-row">
          <b>{breakingItem?.priority === "urgent" ? "URGENT" : "BREAKING"}</b>
          {breakingItem?.href ? (
            <Link
              href={breakingItem.href}
              data-analytics-event="breaking_click"
              data-analytics-label={breakingItem.headline}
            >
              {breakingItem.headline}
            </Link>
          ) : (
            <span>
              {breakingItem?.headline ||
                "Major developments, verified updates and context from the Main Story newsroom."}
            </span>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileOpen(false)}
          role="presentation"
        >
          <aside
            className="mobile-nav-panel"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav-head">
              <Link
                className="logo"
                href="/"
                onClick={() => setMobileOpen(false)}
              >
                MAIN <strong>STORY</strong>
              </Link>
              <button
                className="mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="mobile-nav-intro">
              <span className="eyebrow">EXPLORE MAIN STORY</span>
              <p>News, analysis and explainers across the stories shaping the world.</p>
            </div>

            <nav className="mobile-section-nav" aria-label="Sections">
              {categories.map((category, index) => (
                <Link
                  key={category}
                  href={"/category/" + category}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{category[0].toUpperCase() + category.slice(1)}</strong>
                  <b aria-hidden="true">→</b>
                </Link>
              ))}
            </nav>

            <div className="mobile-utility-links">
              <Link href="/latest" onClick={() => setMobileOpen(false)}>
                Latest
              </Link>
              <Link href="/about" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
              <Link href="/#newsletter" onClick={() => setMobileOpen(false)}>
                Newsletter
              </Link>
            </div>

            <div className="mobile-nav-actions">
              <button onClick={openSearch}>Search Main Story</button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setAppearanceOpen(true);
                }}
              >
                Appearance
              </button>
            </div>
          </aside>
        </div>
      )}

      <AppearanceCustomizer
        open={appearanceOpen}
        onClose={() => setAppearanceOpen(false)}
      />

      {searchOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
          onClick={() => setSearchOpen(false)}
        >
          <div className="search-panel" onClick={(event) => event.stopPropagation()}>
            <div className="search-panel-top">
              <div>
                <span className="eyebrow">SEARCH</span>
                <h2 id="search-dialog-title">Find the story that matters.</h2>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                ×
              </button>
            </div>

            <form action="/search">
              <input
                autoFocus
                name="q"
                placeholder="Search stories, topics and authors"
                aria-label="Search stories, topics and authors"
              />
              <button type="submit">Search</button>
            </form>

            <div className="search-quick-links">
              <span>Popular:</span>
              <Link href="/search?q=AI" onClick={() => setSearchOpen(false)}>AI</Link>
              <Link href="/search?q=markets" onClick={() => setSearchOpen(false)}>Markets</Link>
              <Link href="/search?q=technology" onClick={() => setSearchOpen(false)}>Technology</Link>
              <Link href="/search?q=world" onClick={() => setSearchOpen(false)}>World</Link>
            </div>

            <div className="search-section-links">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category}
                  href={"/category/" + category}
                  onClick={() => setSearchOpen(false)}
                >
                  {category[0].toUpperCase() + category.slice(1)}
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
