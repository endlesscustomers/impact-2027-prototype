import type { SiteId } from '../lib/site';
import * as impactNav from './impact-nav';

// Every page the prototype knows about, per site. A page with its own .astro file under
// src/pages/<dir>/ is "drafted"; anything else here gets a generated placeholder so the link
// works and the entry page can show what's still to write.

export interface PageEntry {
  path: string;
  title: string;
  /** Section on the entry page's index. */
  group: string;
  /** One line on the placeholder saying what the page is for. */
  purpose?: string;
  /** Proposed H1. Falls back to the title. */
  h1?: string;
}

/** The parent shown in the breadcrumb for a group, e.g. "How We Help > HubSpot Services". */
export const crumbParent: Record<string, string | undefined> = {
  Services: 'How We Help',
  'Use cases': 'How We Help',
  Industries: 'How We Help',
  Results: 'Results',
  About: 'About',
  'Learning Center': 'Learning Center',
  Coaching: 'Coaching',
};

const useCaseH1: Record<string, string> = {
  '/help/ai-visibility': 'When buyers ask AI for a recommendation, be the answer.',
  '/help/leads': 'More of the right leads, from buyers who already trust you.',
  '/help/sales': 'Close faster by answering everything before the first call.',
  '/help/content': 'Content and video that does the selling before you show up.',
  '/help/reviews': 'Turn happy customers into the proof buyers look for.',
  '/help/crm': 'A CRM your team trusts, with data you can act on.',
  '/help/ai': 'Put AI to work on the tasks that eat your team’s week.',
  '/help/team': 'Build a marketing team that doesn’t need an agency.',
};
const industryH1: Record<string, string> = {
  '/industries/home-services': 'Be the company homeowners find, trust, and call first.',
  '/industries/manufacturers': 'Be the manufacturer buyers find before they call your competitor.',
  '/industries/insurance': 'Be the agency people trust before they ever ask for a quote.',
  '/industries/accounting-payroll-hr': 'Be the firm owners trust when they’re ready to switch.',
  '/industries/cybersecurity': 'Be the security company buyers trust before they need you.',
  '/industries/retail-ecommerce': 'Be the store buyers research, trust, and choose.',
  '/industries/commercial-contractors': 'Be the contractor owners trust before the bid goes out.',
  '/industries/commercial-real-estate': 'Be the name tenants and investors trust before the tour.',
};

const impact: PageEntry[] = [
  { path: '/', title: 'Home', group: 'Core' },
  { path: '/pricing', h1: 'What it costs, in plain numbers.', title: 'Pricing', group: 'Core', purpose: 'What each service costs, in ranges, with what drives the price. The Deep Diagnostic & Roadmap at $5,000 is the first purchase.' },
  { path: '/talk', h1: 'Let’s talk about what’s next for you.', title: 'Let’s Talk', group: 'Core', purpose: 'The one contact page. Book a call or ask a question.' },
  { path: '/why-impact', h1: 'We don’t do it for you forever. We teach you to own it.', title: 'Why IMPACT?', group: 'Core', purpose: 'The case for IMPACT over an agency or doing it alone: the system, the teaching model, the proof.' },
  { path: '/instant-diagnostic', h1: 'Ask AI who to hire in your market. See if it says you.', title: 'Free Instant Diagnostic', group: 'Core', purpose: 'The free tool: enter your site, see how AI describes and recommends you.' },
  { path: '/deep-diagnostic', h1: 'See exactly what’s holding your growth back, and what to do first.', title: 'Deep Diagnostic & Roadmap', group: 'Core', purpose: 'The $5,000 first purchase: what you get, how it runs, what happens after.' },
  { path: '/guarantee', h1: 'If we miss the mark, we make it right.', title: '100% Money-Back Guarantee', group: 'Core', purpose: 'Every service we offer is covered: tell us within 7 days, we redo the work, and if we still miss, we refund you in full.' },
  { path: '/compare', h1: 'IMPACT, an agency, a freelancer, or your own team: an honest comparison.', title: 'Compare Your Options', group: 'Core', purpose: 'How IMPACT compares to the other ways to get this done: cost, speed, what you own at the end, and who each is right for. Written the way we teach clients to write comparisons.' },
  { path: '/search', title: 'Search', group: 'Core' },

  { path: '/services', h1: 'Everything we do, and where to start.', title: 'All Services', group: 'Services', purpose: 'Every service on one page, with who it is for and where to start.' },
  { path: '/coaching', h1: 'Become the most trusted voice in your market, with a coach in your corner.', title: 'Endless Customers Coaching', group: 'Services', purpose: 'Microsite home for coaching on impactplus.com: the program, the coaches, pricing, results.' },
  { path: '/hubspot', h1: 'The HubSpot team that gets you out of the mess and into the results.', title: 'HubSpot Services', group: 'Services', purpose: 'Microsite home. Onboarding, rescue, training, from a Diamond Solutions Partner.' },
  { path: '/websites', h1: 'A website your buyers trust and your team can run.', title: 'Website Services', group: 'Services', purpose: 'Microsite home. Sites built to be found, trusted, and run in-house.' },
  { path: '/paid-media', h1: 'Ads that reach the buyers already asking the question.', title: 'Paid Media Services', group: 'Services', purpose: 'Microsite home. The Swell team lives here.' },
  { path: '/workshops', h1: 'One day with your team. A plan they’ll actually run.', title: 'Workshops', group: 'Services', purpose: 'In-person and virtual workshops for teams.' },

  ...impactNav.useCases.map((l) => ({ path: l.path, title: l.label, group: 'Use cases', h1: useCaseH1[l.path], purpose: 'A short router page: the problem in your words, how IMPACT approaches it, which services apply, proof, and where to start.' })),
  ...impactNav.industries.map((l) => ({ path: l.path, title: l.label, group: 'Industries', h1: industryH1[l.path], purpose: 'Industry page: who we have worked with, what works in this market, and the proof.' })),

  { path: '/results/success-stories', h1: 'Companies that did the work, and what happened.', title: 'Success Stories', group: 'Results' },
  { path: '/results/website-portfolio', h1: 'Websites built to be found, trusted, and run in-house.', title: 'Website Portfolio', group: 'Results' },
  { path: '/results/awards', h1: 'What others have said about the work.', title: 'Awards & Recognition', group: 'Results' },
  { path: '/results/reviews', h1: 'What clients say when we’re not in the room.', title: 'Reviews', group: 'Results', purpose: 'Links to third-party review profiles. Never self-hosted review markup.' },

  { path: '/about', h1: 'A training and coaching company, first and foremost.', title: 'Our Story, Mission & Values', group: 'About' },
  { path: '/team', h1: 'The people you’ll actually work with.', title: 'Meet Our Team', group: 'About' },
  { path: '/speaking', h1: 'Bring the question to your room.', title: 'Request a Speaker', group: 'About' },
  { path: '/careers', h1: 'Do work that makes clients better at their jobs.', title: 'Join Our Team', group: 'About' },

  { path: '/learn', h1: 'Answers first. No forms.', title: 'Learning Center', group: 'Learning Center', purpose: 'Search first; filters for problem, role, industry; type on the card; answer-first; ungated.' },
  { path: '/ai-visibility-study', h1: 'How AI describes your industry, and who it recommends.', title: 'AI Visibility Study', group: 'Learning Center' },
  { path: '/events', h1: 'Live sessions on what’s changing and what to do about it.', title: 'Webinars & Workshops', group: 'Learning Center' },

  { path: '/privacy', title: 'Privacy', group: 'Legal' },
  { path: '/terms', title: 'Terms', group: 'Legal' },
];

const ec: PageEntry[] = [
  { path: '/', title: 'Home', group: 'Core' },
  { path: '/book', h1: 'Read the system before you buy anything.', title: 'The Book', group: 'Core', purpose: 'The book page: what it teaches, the companion guide, a free chapter, where to buy.' },
  { path: '/pricing', h1: 'What it really costs to implement Endless Customers.', title: 'Pricing', group: 'Core', purpose: 'The total cost of implementing Endless Customers, with and without a coach, in ranges. Hands off to IMPACT for specifics.' },
  { path: '/book-a-call', h1: 'Talk to someone who has done this with hundreds of companies.', title: 'Book a Free Call', group: 'Core', purpose: 'What the call is and who it is with (IMPACT), then the booking.' },
  { path: '/success-stories', h1: 'Companies that became the most trusted in their market.', title: 'Success Stories', group: 'Core' },
  { path: '/search', title: 'Search', group: 'Core' },

  { path: '/coaching', h1: 'Coaching and training that installs the system with your team.', title: 'Get Coaching & Training', group: 'Coaching', purpose: 'What working with a coach looks like, who the coaches are, cost ranges, and how to start.' },
  { path: '/coaches', h1: 'Every certified Endless Customers coach, in one place.', title: 'Our Coaches', group: 'Coaching', purpose: 'Every Endless Customers coach, employee or contractor.' },
  { path: '/become-a-coach', h1: 'Teach the system. Build a practice around it.', title: 'Become a Coach', group: 'Coaching', purpose: 'IMPACT’s certified contractor program.' },

  { path: '/learn', h1: 'Everything we know about the system, free and ungated.', title: 'Learning Center', group: 'Learning Center' },
  { path: '/what-is-endless-customers', h1: 'What Endless Customers is, in five minutes.', title: 'What is Endless Customers?', group: 'Learning Center' },
  { path: '/how-to-implement', h1: 'Three ways to implement the system. Pick the one that fits.', title: 'How to Implement', group: 'Learning Center', purpose: 'Every way to implement the system, on your own or with a coach. The page where a buyer changes sites mid-decision, so it is designed as a page, not a link.' },
  { path: '/academy', h1: 'Learn the system, course by course, with your team.', title: 'Endless Customers Academy', group: 'Learning Center' },
  { path: '/instant-diagnostic', h1: 'Ask AI about your company. See what it says.', title: 'Free Instant AI Diagnostic', group: 'Learning Center' },
  { path: '/conference', h1: 'Two days with the people actually doing this.', title: 'The Conference', group: 'Learning Center' },
  { path: '/webinars', h1: 'Live, on what’s changing and what to do about it.', title: 'Webinars', group: 'Learning Center' },
  { path: '/podcast', h1: 'Weekly conversations on trust, content, sales, and AI.', title: 'The Podcast', group: 'Learning Center' },

  { path: '/privacy', title: 'Privacy', group: 'Legal' },
  { path: '/terms', title: 'Terms', group: 'Legal' },
];

export const pages: Record<SiteId, PageEntry[]> = { impact, ec };

/** Paths that have their own .astro file, i.e. drafted rather than placeholder. */
export function draftedPaths(site: SiteId): Set<string> {
  const dir = site === 'ec' ? 'endlesscustomerscom' : 'impactpluscom';
  const files = import.meta.glob('/src/pages/**/*.astro', { eager: false });
  const out = new Set<string>();
  for (const f of Object.keys(files)) {
    const m = f.match(new RegExp(`^/src/pages/${dir}/(.*)\\.astro$`));
    if (!m || m[1].startsWith('[')) continue;
    const p = m[1] === 'index' ? '/' : '/' + m[1].replace(/\/index$/, '');
    out.add(p);
  }
  return out;
}
