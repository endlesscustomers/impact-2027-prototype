import type { NavLink, SiteId } from '../lib/site';

// A microsite is a service section on impactplus.com that keeps the IMPACT header and gets its own
// local nav under it (the way Apple's product sections do). No second brand, no header lockup.
// Every service except Workshops is one (Site Structure, 2026-09-18).

/** Microsite nav link; `hash` jumps to a section on the target page. */
export type MsLink = NavLink & { hash?: string };

export interface Microsite {
  id: string;
  name: string;
  /** Real-site base path; every page under it shows this local nav. */
  base: string;
  /** One line under the name in the local nav. */
  tagline: string;
  links: MsLink[];
  cta: NavLink;
  /** Call to action in the floating section pill (Apple-style bar that appears once the header scrolls away). */
  pill: NavLink;
}

export const microsites: Microsite[] = [
  {
    id: 'coaching',
    name: 'Endless Customers Coaching',
    base: '/coaching',
    tagline: 'Delivered by IMPACT, the company behind the system',
    links: [
      { label: 'Overview', path: '/coaching' },
      { label: 'How it works', path: '/coaching/how-it-works' },
      { label: 'Results', path: '/coaching/results' },
      { label: 'Pricing', path: '/coaching/pricing' },
      { label: 'Coaches', path: '/coaches', site: 'ec' },
    ],
    cta: { label: 'Book an Explore Call', path: '/talk' },
    pill: { label: 'Talk to an Endless Customers Coach', path: '/talk' },
  },
  {
    id: 'hubspot',
    name: 'HubSpot Services',
    base: '/hubspot',
    tagline: 'Diamond Solutions Partner · 15+ years · 27 certifications',
    links: [
      { label: 'Overview', path: '/hubspot' },
      { label: 'Services', path: '/hubspot', hash: 'services' },
      { label: 'Training', path: '/hubspot/training' },
      { label: 'Results', path: '/hubspot/results' },
      { label: 'Pricing', path: '/hubspot/pricing' },
      { label: 'Experts', path: '/hubspot/experts' },
    ],
    cta: { label: 'Talk to a HubSpot expert', path: '/talk' },
    pill: { label: 'Talk to a HubSpot Expert', path: '/talk' },
  },
  {
    id: 'websites',
    name: 'Website Services',
    base: '/websites',
    tagline: 'Built to be found, trusted, and run in-house',
    links: [
      { label: 'Overview', path: '/websites' },
      { label: 'Services', path: '/websites', hash: 'services' },
      { label: 'Portfolio', path: '/results/website-portfolio' },
      { label: 'Pricing', path: '/websites/pricing' },
      { label: 'Experts', path: '/websites/experts' },
    ],
    cta: { label: 'Talk to a website strategist', path: '/talk' },
    pill: { label: 'Talk to a Website Strategist', path: '/talk' },
  },
  {
    id: 'paid-media',
    name: 'Paid Media Services',
    base: '/paid-media',
    tagline: 'Run by our Swell team',
    links: [
      { label: 'Overview', path: '/paid-media' },
      { label: 'Services', path: '/paid-media', hash: 'services' },
      { label: 'Results', path: '/paid-media/results' },
      { label: 'Pricing', path: '/paid-media/pricing' },
      { label: 'Team', path: '/paid-media/experts' },
    ],
    cta: { label: 'Get a free ads assessment', path: '/talk' },
    pill: { label: 'Talk to a Paid Media Strategist', path: '/talk' },
  },
];

/** The microsite a real-site path belongs to, if any. */
export function micrositeFor(site: SiteId, path: string): Microsite | undefined {
  if (site !== 'impact') return undefined;
  const clean = '/' + path.replace(/^\/+|\/+$/g, '');
  return microsites.find((m) => clean === m.base || clean.startsWith(m.base + '/'));
}
