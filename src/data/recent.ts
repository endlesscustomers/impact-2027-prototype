// What "recent from the Learning Center" shows in the prototype. Real titles from impactplus.com on
// 2026-09-18; on the built site this is a feed, not a list.

export interface RecentItem {
  title: string;
  type: 'Podcast' | 'Article' | 'Webinar' | 'Video' | 'Guide';
  url: string;
  meta?: string;
}

export const recent: RecentItem[] = [
  { title: 'How He Built a 600-page Website Without Knowing How to Code', type: 'Podcast', url: 'https://www.impactplus.com/endless-customers-podcast/built-website-without-knowing-code', meta: 'Episode 175' },
  { title: 'How Far Can AI Take Your Endless Customers Strategy?', type: 'Podcast', url: 'https://www.impactplus.com/endless-customers-podcast/ai-vs-coach-endless-customers', meta: 'Episode 174' },
  { title: 'The Great Agency Reckoning: What’s Still Worth Paying For in the Age of AI', type: 'Webinar', url: 'https://www.impactplus.com/the-great-agency-reckoning-whats-still-worth-paying-for-in-the-age-of-ai', meta: 'On demand' },
  { title: 'How to Prepare for Agentic Buying and the Future of Search', type: 'Webinar', url: 'https://www.impactplus.com/how-to-prepare-for-agentic-buying-the-future-of-search', meta: 'On demand' },
];
