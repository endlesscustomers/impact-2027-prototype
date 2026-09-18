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
}

const impact: PageEntry[] = [
  { path: '/', title: 'Home', group: 'Core' },
  { path: '/pricing', title: 'Pricing', group: 'Core', purpose: 'What each service costs, in ranges, with what drives the price. The Deep Diagnostic & Roadmap at $5,000 is the first purchase.' },
  { path: '/talk', title: 'Let’s Talk', group: 'Core', purpose: 'The one contact page. Book a call or ask a question.' },
  { path: '/why-impact', title: 'Why IMPACT?', group: 'Core', purpose: 'The case for IMPACT over an agency or doing it alone: the system, the teaching model, the proof.' },
  { path: '/instant-diagnostic', title: 'Free Instant Diagnostic', group: 'Core', purpose: 'The free tool: enter your site, see how AI describes and recommends you.' },
  { path: '/deep-diagnostic', title: 'Deep Diagnostic & Roadmap', group: 'Core', purpose: 'The $5,000 first purchase: what you get, how it runs, what happens after.' },
  { path: '/search', title: 'Search', group: 'Core' },

  { path: '/services', title: 'All Services', group: 'Services', purpose: 'Every service on one page, with who it is for and where to start.' },
  { path: '/coaching', title: 'Endless Customers Coaching', group: 'Services', purpose: 'Microsite home. The only place coaching is sold; endlesscustomers.com hands off here.' },
  { path: '/hubspot', title: 'HubSpot Services', group: 'Services', purpose: 'Microsite home. Onboarding, rescue, training, from a Diamond Solutions Partner.' },
  { path: '/websites', title: 'Website Services', group: 'Services', purpose: 'Microsite home. Sites built to be found, trusted, and run in-house.' },
  { path: '/paid-media', title: 'Paid Media Services', group: 'Services', purpose: 'Microsite home. The Swell team lives here.' },
  { path: '/workshops', title: 'Workshops', group: 'Services', purpose: 'In-person and virtual workshops for teams.' },

  ...impactNav.useCases.map((l) => ({ path: l.path, title: l.label, group: 'Use cases', purpose: 'A short router page: the problem in your words, how IMPACT approaches it, which services apply, proof, and where to start.' })),
  ...impactNav.industries.map((l) => ({ path: l.path, title: l.label, group: 'Industries', purpose: 'Industry page: who we have worked with, what works in this market, and the proof.' })),

  { path: '/results/success-stories', title: 'Success Stories', group: 'Results' },
  { path: '/results/website-portfolio', title: 'Website Portfolio', group: 'Results' },
  { path: '/results/awards', title: 'Awards & Recognition', group: 'Results' },
  { path: '/results/reviews', title: 'Reviews', group: 'Results', purpose: 'Links to third-party review profiles. Never self-hosted review markup.' },

  { path: '/about', title: 'Our Story, Mission & Values', group: 'About' },
  { path: '/team', title: 'Meet Our Team', group: 'About' },
  { path: '/speaking', title: 'Request a Speaker', group: 'About' },
  { path: '/careers', title: 'Join Our Team', group: 'About' },

  { path: '/learn', title: 'Learning Center', group: 'Learning Center', purpose: 'Search first; filters for problem, role, industry; type on the card; answer-first; ungated.' },
  { path: '/ai-visibility-study', title: 'AI Visibility Study', group: 'Learning Center' },
  { path: '/events', title: 'Webinars & Workshops', group: 'Learning Center' },

  { path: '/privacy', title: 'Privacy', group: 'Legal' },
  { path: '/terms', title: 'Terms', group: 'Legal' },
];

const ec: PageEntry[] = [
  { path: '/', title: 'Home', group: 'Core' },
  { path: '/book', title: 'The Book', group: 'Core', purpose: 'The book page: what it teaches, the companion guide, a free chapter, where to buy.' },
  { path: '/pricing', title: 'Pricing', group: 'Core', purpose: 'The total cost of implementing Endless Customers, with and without a coach, in ranges. Hands off to IMPACT for specifics.' },
  { path: '/book-a-call', title: 'Book a Free Call', group: 'Core', purpose: 'What the call is and who it is with (IMPACT), then the booking.' },
  { path: '/success-stories', title: 'Success Stories', group: 'Core' },
  { path: '/search', title: 'Search', group: 'Core' },

  { path: '/coaches', title: 'Our Coaches', group: 'Coaching', purpose: 'Every Endless Customers coach, employee or contractor.' },
  { path: '/become-a-coach', title: 'Become a Coach', group: 'Coaching', purpose: 'IMPACT’s certified contractor program.' },

  { path: '/learn', title: 'Learning Center', group: 'Learning Center' },
  { path: '/what-is-endless-customers', title: 'What is Endless Customers?', group: 'Learning Center' },
  { path: '/how-to-implement', title: 'How to Implement', group: 'Learning Center', purpose: 'Every way to implement the system, on your own or with a coach. The page where a buyer changes sites mid-decision, so it is designed as a page, not a link.' },
  { path: '/academy', title: 'Endless Customers Academy', group: 'Learning Center' },
  { path: '/instant-diagnostic', title: 'Free Instant AI Diagnostic', group: 'Learning Center' },
  { path: '/conference', title: 'The Conference', group: 'Learning Center' },
  { path: '/webinars', title: 'Webinars', group: 'Learning Center' },
  { path: '/podcast', title: 'The Podcast', group: 'Learning Center' },

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
