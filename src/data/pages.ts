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
  { path: '/pricing', h1: 'What It Costs, in Plain Numbers', title: 'Pricing', group: 'Core', purpose: 'What each service costs, in ranges, with what drives the price. The Deep Diagnostic & Roadmap at $5,000 is the first purchase.' },
  { path: '/talk', h1: 'Let’s Talk About What’s Next for You', title: 'Let’s Talk', group: 'Core', purpose: 'The one contact page. Book a call or ask a question.' },
  { path: '/why-impact', h1: 'We don’t do it for you forever. We teach you to own it.', title: 'Why IMPACT?', group: 'Core', purpose: 'The case for IMPACT over an agency or doing it alone: the system, the teaching model, the proof.' },
  { path: '/instant-diagnostic', h1: 'Ask AI who to hire in your market. See if it says you.', title: 'Free Instant Diagnostic', group: 'Core', purpose: 'The free tool: enter your site, see how AI describes and recommends you.' },
  { path: '/deep-diagnostic', h1: 'See Exactly What’s Holding Your Growth Back, and What to Do First', title: 'Deep Diagnostic & Roadmap', group: 'Core', purpose: 'The $5,000 first purchase: what you get, how it runs, what happens after.' },
  { path: '/guarantee', h1: 'If We Miss the Mark, We Make It Right', title: '100% Money-Back Guarantee', group: 'Core', purpose: 'Every service we offer is covered: tell us within 7 days, we redo the work, and if we still miss, we refund you in full.' },
  { path: '/compare', h1: 'IMPACT, an Agency, a Freelancer, or Your Own Team: An Honest Comparison', title: 'Compare Your Options', group: 'Core', purpose: 'How IMPACT compares to the other ways to get this done: cost, speed, what you own at the end, and who each is right for. Written the way we teach clients to write comparisons.' },
  { path: '/letter', h1: 'What Changed for Buyers This Week, and What to Do About It', title: 'The Weekly Letter', group: 'Core', purpose: 'Bob Ruffolo’s weekly letter: signup, the archive, and what it is.' },
  { path: '/search', title: 'Search', group: 'Core' },

  { path: '/services', h1: 'Everything We Do, and Where to Start', title: 'All Services', group: 'Services', purpose: 'Every service on one page, with who it is for and where to start.' },
  { path: '/coaching', h1: 'Become the Most Trusted Voice in Your Market, With a Coach in Your Corner', title: 'Endless Customers Coaching', group: 'Services', purpose: 'Microsite home for coaching on impactplus.com: the program, the coaches, pricing, results.' },
  { path: '/hubspot', h1: 'The HubSpot Team That Gets You Out of the Mess and Into the Results', title: 'HubSpot Services', group: 'Services', purpose: 'Microsite home. Onboarding, rescue, training, from a Diamond Solutions Partner.' },
  { path: '/websites', h1: 'A Website Your Buyers Trust and Your Team Can Run', title: 'Website Services', group: 'Services', purpose: 'Microsite home. Sites built to be found, trusted, and run in-house.' },
  { path: '/paid-media', h1: 'Ads That Reach the Buyers Already Asking the Question', title: 'Paid Media Services', group: 'Services', purpose: 'Microsite home. The Swell team lives here.' },
  { path: '/workshops', h1: 'One day with your team. A plan they’ll actually run.', title: 'Workshops', group: 'Services', purpose: 'In-person and virtual workshops for teams.' },
  { path: '/coaching/how-it-works', title: 'How It Works', group: 'Services' },
  { path: '/coaching/alignment-day', title: 'Alignment Day', group: 'Services' },
  { path: '/coaching/results', title: 'Coaching Results', group: 'Services' },
  { path: '/coaching/pricing', title: 'Coaching Pricing', group: 'Services' },
  { path: '/hubspot/training', title: 'HubSpot Training', group: 'Services', h1: 'HubSpot Is Only as Powerful as the Team Using It' },
  { path: '/hubspot/onboarding', title: 'HubSpot Onboarding & Setup', group: 'Services', h1: 'Set Up Right the First Time, or the Second' },
  { path: '/hubspot/cleanup', title: 'HubSpot Cleanup & Rescue', group: 'Services', h1: 'A Portal Your Team Trusts Again' },
  { path: '/hubspot/integrations', title: 'HubSpot Integrations & Migrations', group: 'Services', h1: 'HubSpot, Connected to Everything You Run On' },
  { path: '/hubspot/trust-theme', title: 'Trust Theme', group: 'Services', h1: 'A HubSpot Site Your Marketing Manager Can Run' },
  { path: '/hubspot/results', title: 'HubSpot Results', group: 'Services', h1: 'What HubSpot Clients Say' },
  { path: '/hubspot/pricing', title: 'HubSpot Pricing', group: 'Services', h1: 'What HubSpot Services Cost' },
  { path: '/hubspot/experts', title: 'HubSpot Experts', group: 'Services', h1: 'The People in Your Portal' },
  { path: '/websites/redesign', title: 'Website Redesign', group: 'Services', h1: 'A Website Built to Be Found, Trusted, and Run In-House' },
  { path: '/websites/optimization', title: 'Website Optimization', group: 'Services', h1: 'Make the Site You Have Work Harder, Every Week' },
  { path: '/websites/learning-center-builds', title: 'Learning Center Builds', group: 'Services', h1: 'The Engine of the System, Built on Your Site' },
  { path: '/websites/self-service-tools', title: 'Self-Service Tools', group: 'Services', h1: 'Let Buyers Answer Their Own Question' },
  { path: '/websites/pricing', title: 'Website Pricing', group: 'Services', h1: 'What a Website Costs, in Real Numbers' },
  { path: '/websites/experts', title: 'Website Experts', group: 'Services', h1: 'Strategists, Not Junior Staff' },
  { path: '/paid-media/management', title: 'Paid Media Management', group: 'Services', h1: 'Ads Run for You, Reported in Revenue' },
  { path: '/paid-media/consulting', title: 'Paid Media Consulting & Training', group: 'Services', h1: 'Ads Run by Your Team, With a Strategist Beside Them' },
  { path: '/paid-media/results', title: 'Paid Media Results', group: 'Services', h1: 'What Swell Clients Say' },
  { path: '/paid-media/pricing', title: 'Paid Media Pricing', group: 'Services', h1: 'What Paid Media Costs' },
  { path: '/paid-media/experts', title: 'Paid Media Team', group: 'Services', h1: 'The Swell Team' },

  ...impactNav.useCases.map((l) => ({ path: l.path, title: l.label, group: 'Use cases', h1: useCaseH1[l.path], purpose: 'A short router page: the problem in your words, how IMPACT approaches it, which services apply, proof, and where to start.' })),
  ...impactNav.industries.map((l) => ({ path: l.path, title: l.label, group: 'Industries', h1: industryH1[l.path], purpose: 'Industry page: who we have worked with, what works in this market, and the proof.' })),

  { path: '/results/success-stories', h1: 'Companies That Did the Work, and What Happened', title: 'Success Stories', group: 'Results' },
  { path: '/results/website-portfolio', h1: 'Websites Built to Be Found, Trusted, and Run In-House', title: 'Website Portfolio', group: 'Results' },
  { path: '/results/awards', h1: 'What Others Have Said About the Work', title: 'Awards & Recognition', group: 'Results' },
  { path: '/results/reviews', h1: 'What Clients Say When We’re Not in the Room', title: 'Reviews', group: 'Results', purpose: 'Links to third-party review profiles. Never self-hosted review markup.' },

  { path: '/about', h1: 'A Training and Coaching Company, First and Foremost', title: 'Our Story, Mission & Values', group: 'About' },
  { path: '/team', h1: 'The People You’ll Actually Work With', title: 'Meet Our Team', group: 'About' },
  { path: '/speaking', h1: 'Bring the Question to Your Room', title: 'Request a Speaker', group: 'About' },
  { path: '/careers', h1: 'Do Work That Makes Clients Better at Their Jobs', title: 'Join Our Team', group: 'About' },

  { path: '/learn', h1: 'Answers first. No forms.', title: 'Learning Center', group: 'Learning Center', purpose: 'Search first; filters for problem, role, industry; type on the card; answer-first; ungated.' },
  { path: '/ai-visibility-study', h1: 'How AI Describes Your Industry, and Who It Recommends', title: 'AI Visibility Study', group: 'Learning Center' },
  { path: '/events', h1: 'Live Sessions on What’s Changing and What to Do About It', title: 'Webinars & Workshops', group: 'Learning Center' },

  { path: '/privacy', title: 'Privacy', group: 'Legal' },
  { path: '/terms', title: 'Terms', group: 'Legal' },
];

const ec: PageEntry[] = [
  { path: '/', title: 'Home', group: 'Core' },
  { path: '/book', h1: 'Read the System Before You Buy Anything', title: 'The Book', group: 'Core', purpose: 'The book page: what it teaches, the companion guide, a free chapter, where to buy.' },
  { path: '/pricing', h1: 'What It Really Costs to Implement Endless Customers', title: 'Pricing', group: 'Core', purpose: 'The total cost of implementing Endless Customers, with and without a coach, in ranges. Hands off to IMPACT for specifics.' },
  { path: '/book-a-call', h1: 'Talk to Someone Who Has Done This With Hundreds of Companies', title: 'Book a Free Call', group: 'Core', purpose: 'What the call is and who it is with (IMPACT), then the booking.' },
  { path: '/success-stories', h1: 'Companies That Became the Most Trusted in Their Market', title: 'Success Stories', group: 'Core' },
  { path: '/search', title: 'Search', group: 'Core' },

  { path: '/coaching', h1: 'Coaching and Training That Installs the System With Your Team', title: 'Get Coaching & Training', group: 'Coaching', purpose: 'What working with a coach looks like, who the coaches are, cost ranges, and how to start.' },
  { path: '/coaches', h1: 'Every Certified Endless Customers Coach, in One Place', title: 'Our Coaches', group: 'Coaching', purpose: 'Every Endless Customers coach, employee or contractor.' },
  { path: '/become-a-coach', h1: 'Teach the system. Build a practice around it.', title: 'Become a Coach', group: 'Coaching', purpose: 'IMPACT’s certified contractor program.' },

  { path: '/learn', h1: 'Everything We Know About the System, Free and Ungated', title: 'Learning Center', group: 'Learning Center' },
  { path: '/what-is-endless-customers', h1: 'What Endless Customers Is, in Five Minutes', title: 'What Is Endless Customers?', group: 'Learning Center' },
  { path: '/how-to-implement', h1: 'Three ways to implement the system. Pick the one that fits.', title: 'How to Implement', group: 'Learning Center', purpose: 'Every way to implement the system, on your own or with a coach. The page where a buyer changes sites mid-decision, so it is designed as a page, not a link.' },
  { path: '/academy', h1: 'Learn the System, Course by Course, With Your Team', title: 'Endless Customers Academy', group: 'Learning Center' },
  { path: '/instant-diagnostic', h1: 'Ask AI about your company. See what it says.', title: 'Free Instant AI Diagnostic', group: 'Learning Center' },
  { path: '/conference', h1: 'Two Days With the People Actually Doing This', title: 'The Conference', group: 'Learning Center' },
  { path: '/webinars', h1: 'Live, on What’s Changing and What to Do About It', title: 'Webinars', group: 'Learning Center' },
  { path: '/podcast', h1: 'Weekly Conversations on Trust, Content, Sales, and AI', title: 'The Podcast', group: 'Learning Center' },

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
