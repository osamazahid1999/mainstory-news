export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
};

export const categories = ["world","business","technology","ai","markets","science","culture","video"];

export const stories: Story[] = [
  { slug:"global-leaders-week-ahead", title:"The global developments to watch over the next 24 hours", excerpt:"A concise guide to the diplomatic, economic and technology stories likely to shape the day.", category:"world", readTime:"7 min read", author:"Main Story Desk", image:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=85", imageAlt:"Global city skyline and government district" },
  { slug:"markets-rates-growth-tech", title:"Markets open a new week focused on rates, growth and technology", excerpt:"Investors are balancing central-bank signals with another wave of technology spending.", category:"markets", readTime:"5 min read", author:"Main Story Business", image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80", imageAlt:"Financial market charts on screens" },
  { slug:"computing-more-personal", title:"The next wave of computing is becoming more personal", excerpt:"AI assistants and context-aware software are changing how products are designed.", category:"technology", readTime:"6 min read", author:"Main Story Tech", image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", imageAlt:"Computer circuit board and technology components" },
  { slug:"companies-build-uncertain-markets", title:"Global companies rethink how they build for uncertain markets", excerpt:"Efficiency, resilience and selective expansion are becoming boardroom priorities.", category:"business", readTime:"4 min read", author:"Main Story Business", image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", imageAlt:"Modern business district and office buildings" },
  { slug:"research-energy-medicine", title:"Researchers push new boundaries in energy and medicine", excerpt:"A look at the scientific developments attracting serious attention this week.", category:"science", readTime:"5 min read", author:"Main Story Science", image:"https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80", imageAlt:"Scientists working in a laboratory" },
  { slug:"ai-everyday-products", title:"AI moves from demos into everyday products", excerpt:"The competition is shifting from model benchmarks to products people use every day.", category:"ai", readTime:"6 min read", author:"Main Story AI", image:"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80", imageAlt:"Abstract artificial intelligence visualization" },
  { slug:"cities-adapt-change", title:"Cities adapt to faster population and climate changes", excerpt:"Urban planners are rethinking transport, housing and resilience.", category:"world", readTime:"6 min read", author:"Main Story World", image:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80", imageAlt:"Dense international city skyline" },
  { slug:"startups-durable-revenue", title:"Startups return to durable revenue models", excerpt:"Founders are prioritizing healthier margins and more predictable growth.", category:"business", readTime:"5 min read", author:"Main Story Business", image:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80", imageAlt:"Startup team working together in an office" },
  { slug:"chip-race-infrastructure", title:"The chip race is changing how countries think about infrastructure", excerpt:"Semiconductors have become a strategic issue spanning energy, security and industrial policy.", category:"technology", readTime:"8 min read", author:"Main Story Tech", image:"https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80", imageAlt:"Close-up of a computer processor" },
  { slug:"culture-digital-audiences", title:"Culture is being reshaped by global digital audiences", excerpt:"Entertainment, creators and communities increasingly cross borders from day one.", category:"culture", readTime:"5 min read", author:"Main Story Culture", image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80", imageAlt:"Live audience and stage lights" },
  { slug:"global-trade-routes-shift", title:"Global trade routes are shifting as companies rethink supply chains", excerpt:"Manufacturers are spreading risk across more regions while governments compete for strategic investment.", category:"world", readTime:"6 min read", author:"Main Story World", image:"https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80", imageAlt:"Container port and global shipping infrastructure" },
  { slug:"cities-invest-resilience", title:"Major cities accelerate investment in resilience and transport", excerpt:"Infrastructure spending is increasingly focused on heat, flooding, mobility and housing pressure.", category:"world", readTime:"5 min read", author:"Main Story World", image:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80", imageAlt:"Modern city infrastructure and transportation" },
  { slug:"software-teams-ai-workflows", title:"Software teams redesign workflows around AI-assisted development", excerpt:"Engineering leaders are testing new ways to combine automation with human review and accountability.", category:"technology", readTime:"7 min read", author:"Main Story Tech", image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", imageAlt:"Developer working on software at a laptop" },
  { slug:"data-centers-energy-demand", title:"Data-center growth puts new pressure on power infrastructure", excerpt:"The expansion of AI computing is forcing utilities and technology companies to rethink energy planning.", category:"technology", readTime:"7 min read", author:"Main Story Tech", image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", imageAlt:"Rows of servers inside a data center" },
  { slug:"companies-invest-productivity", title:"Companies increase investment in productivity tools and automation", excerpt:"Executives are focusing on technology that can reduce repetitive work and improve operating efficiency.", category:"business", readTime:"5 min read", author:"Main Story Business", image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80", imageAlt:"Modern office workspace" },
  { slug:"private-markets-reset", title:"Private markets adjust to a more disciplined era of growth", excerpt:"Investors are demanding stronger fundamentals as companies prepare for longer funding cycles.", category:"business", readTime:"6 min read", author:"Main Story Business", image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", imageAlt:"Business team reviewing financial information" }
];

export function storiesByCategory(category:string) {
  return stories.filter((story) => story.category === category.toLowerCase());
}

export function storyBySlug(slug:string) {
  return stories.find((story) => story.slug === slug);
}
