export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
};

export const categories = ["world","business","technology","ai","markets","science","culture","video"];

export const stories: Story[] = [
  { slug:"global-leaders-week-ahead", title:"The global developments to watch over the next 24 hours", excerpt:"A concise guide to the diplomatic, economic and technology stories likely to shape the day.", category:"world", readTime:"7 min read", author:"Main Story Desk" },
  { slug:"markets-rates-growth-tech", title:"Markets open a new week focused on rates, growth and technology", excerpt:"Investors are balancing central-bank signals with another wave of technology spending.", category:"markets", readTime:"5 min read", author:"Main Story Business" },
  { slug:"computing-more-personal", title:"The next wave of computing is becoming more personal", excerpt:"AI assistants and context-aware software are changing how products are designed.", category:"technology", readTime:"6 min read", author:"Main Story Tech" },
  { slug:"companies-build-uncertain-markets", title:"Global companies rethink how they build for uncertain markets", excerpt:"Efficiency, resilience and selective expansion are becoming boardroom priorities.", category:"business", readTime:"4 min read", author:"Main Story Business" },
  { slug:"research-energy-medicine", title:"Researchers push new boundaries in energy and medicine", excerpt:"A look at the scientific developments attracting serious attention this week.", category:"science", readTime:"5 min read", author:"Main Story Science" },
  { slug:"ai-everyday-products", title:"AI moves from demos into everyday products", excerpt:"The competition is shifting from model benchmarks to products people use every day.", category:"ai", readTime:"6 min read", author:"Main Story AI" },
  { slug:"cities-adapt-change", title:"Cities adapt to faster population and climate changes", excerpt:"Urban planners are rethinking transport, housing and resilience.", category:"world", readTime:"6 min read", author:"Main Story World" },
  { slug:"startups-durable-revenue", title:"Startups return to durable revenue models", excerpt:"Founders are prioritizing healthier margins and more predictable growth.", category:"business", readTime:"5 min read", author:"Main Story Business" },
  { slug:"chip-race-infrastructure", title:"The chip race is changing how countries think about infrastructure", excerpt:"Semiconductors have become a strategic issue spanning energy, security and industrial policy.", category:"technology", readTime:"8 min read", author:"Main Story Tech" },
  { slug:"culture-digital-audiences", title:"Culture is being reshaped by global digital audiences", excerpt:"Entertainment, creators and communities increasingly cross borders from day one.", category:"culture", readTime:"5 min read", author:"Main Story Culture" }
];

export function storiesByCategory(category:string) {
  return stories.filter((story) => story.category === category.toLowerCase());
}

export function storyBySlug(slug:string) {
  return stories.find((story) => story.slug === slug);
}
