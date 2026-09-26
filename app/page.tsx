const categories = ["World","Business","Technology","AI","Markets","Science","Culture","Video"];

const latest = [
  { category: "Technology", title: "The next wave of computing is becoming more personal", meta: "6 min read" },
  { category: "Business", title: "Global companies rethink how they build for uncertain markets", meta: "4 min read" },
  { category: "Science", title: "Researchers push new boundaries in energy and medicine", meta: "5 min read" },
  { category: "World", title: "What to watch as leaders gather for a week of major decisions", meta: "7 min read" },
];

const sections = [
  {
    name: "World",
    stories: [
      "Diplomacy shifts as governments prepare for a new round of talks",
      "Cities adapt to faster population and climate changes",
      "Five developments shaping the global week ahead",
    ],
  },
  {
    name: "Technology",
    stories: [
      "AI moves from demos into everyday products",
      "The chip race is changing how countries think about infrastructure",
      "Why software teams are redesigning the way they ship",
    ],
  },
  {
    name: "Business",
    stories: [
      "Investors focus on efficiency as growth expectations reset",
      "Startups return to durable revenue models",
      "The industries attracting the most attention this quarter",
    ],
  },
];

function StoryCard({
  category,
  title,
  meta,
}: {
  category: string;
  title: string;
  meta?: string;
}) {
  return (
    <article className="story-card">
      <div className="story-art" aria-hidden="true" />
      <div className="story-copy">
        <span className="eyebrow">{category}</span>
        <h3>{title}</h3>
        {meta && <p>{meta}</p>}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <header>
        <div className="utility wrap">
          <span>MAIN STORY</span>
          <nav>
            <a href="#latest">Latest</a>
            <a href="#newsletter">Newsletter</a>
            <a href="#search">Search</a>
          </nav>
        </div>

        <div className="masthead wrap">
          <a className="logo" href="/" aria-label="Main Story home">
            MAIN <strong>STORY</strong>
          </a>
          <div className="ad">ADVERTISEMENT</div>
        </div>

        <div className="nav-shell">
          <div className="main-nav wrap">
            <button className="menu" aria-label="Open menu">☰</button>
            <nav>
              {categories.map((category) => (
                <a key={category} href={"#" + category.toLowerCase()}>
                  {category}
                </a>
              ))}
            </nav>
            <button className="search" aria-label="Search">⌕</button>
          </div>
        </div>

        <div className="breaking">
          <div className="wrap breaking-row">
            <b>BREAKING</b>
            <span>
              Major developments, verified updates and context from the Main Story newsroom.
            </span>
          </div>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <article className="hero-main">
            <div className="hero-art" />
            <div className="hero-copy">
              <span className="eyebrow">MAIN STORY</span>
              <h1>Understanding the biggest story of the day — and why it matters</h1>
              <p>
                Clear reporting, essential context and the developments that deserve your attention.
              </p>
              <div className="byline">By Main Story Desk · 8 min read</div>
            </div>
          </article>

          <div className="hero-side">
            <StoryCard
              category="World"
              title="The global developments to watch over the next 24 hours"
            />
            <StoryCard
              category="Markets"
              title="Markets open a new week focused on rates, growth and technology"
            />
          </div>
        </section>

        <section id="latest" className="section">
          <div className="section-head">
            <h2>Latest News</h2>
            <a href="#">View all</a>
          </div>

          <div className="latest-grid">
            {latest.map((item) => (
              <StoryCard
                key={item.title}
                category={item.category}
                title={item.title}
                meta={item.meta}
              />
            ))}
          </div>
        </section>

        <section className="content-grid">
          <div>
            {sections.map((section) => (
              <section
                id={section.name.toLowerCase()}
                className="section category"
                key={section.name}
              >
                <div className="section-head">
                  <h2>{section.name}</h2>
                  <a href="#">More {section.name}</a>
                </div>

                <div className="category-grid">
                  <StoryCard category={section.name} title={section.stories[0]} />
                  <div className="headline-list">
                    {section.stories.slice(1).map((title) => (
                      <article key={title}>
                        <span className="eyebrow">{section.name}</span>
                        <h3>{title}</h3>
                        <p>Analysis and context from the Main Story newsroom.</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <aside>
            <div className="sidebox">
              <div className="section-head">
                <h2>Most Read</h2>
              </div>

              {[
                "The stories readers are following right now",
                "What changed today in technology and AI",
                "The business signals worth watching",
                "Inside the week's most important world story",
                "Five things to know before tomorrow",
              ].map((title, index) => (
                <article className="ranked" key={title}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <div>
                    <span className="eyebrow">TRENDING</span>
                    <h3>{title}</h3>
                  </div>
                </article>
              ))}
            </div>

            <div className="sidebox newsletter" id="newsletter">
              <span className="eyebrow">NEWSLETTER</span>
              <h2>The Daily Main Story</h2>
              <p>The essential stories, explained clearly. Delivered to your inbox.</p>
              <form>
                <input type="email" placeholder="Email address" aria-label="Email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </aside>
        </section>

        <section className="section video" id="video">
          <div className="section-head">
            <h2>Watch</h2>
            <a href="#">All videos</a>
          </div>

          <div className="video-grid">
            <StoryCard
              category="Video"
              title="In 90 seconds: the story everyone is talking about"
            />
            <StoryCard
              category="Explainer"
              title="What happened, what changed, and what comes next"
            />
            <StoryCard
              category="Interview"
              title="The people shaping the next chapter"
            />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-grid">
          <div>
            <a className="logo light" href="/">
              MAIN <strong>STORY</strong>
            </a>
            <p>What matters. Why it matters.</p>
          </div>

          <div>
            <h4>Sections</h4>
            {categories.slice(0, 5).map((item) => (
              <a key={item} href="#">{item}</a>
            ))}
          </div>

          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Editorial Policy</a>
            <a href="#">Corrections</a>
            <a href="#">Contact</a>
          </div>

          <div>
            <h4>Follow</h4>
            <a href="#">YouTube</a>
            <a href="#">Instagram</a>
            <a href="#">X</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>

        <div className="wrap copyright">
          © 2026 Main Story. All rights reserved.
        </div>
      </footer>
    </>
  );
}
