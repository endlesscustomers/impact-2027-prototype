import type { NavItem, NavLink } from '../lib/site';

// impactplus.com header, as settled with Bob on 2026-09-18.
// Order and labels are decisions; change them here and both desktop and mobile follow.

export const services: NavLink[] = [
  { label: 'Deep Diagnostic & Roadmap', path: '/deep-diagnostic', badge: 'Start here' },
  { label: 'Endless Customers Coaching', path: '/coaching' },
  { label: 'HubSpot Services', path: '/hubspot' },
  { label: 'Website Services', path: '/websites' },
  { label: 'Paid Media Services', path: '/paid-media' },
  { label: 'Workshops', path: '/workshops' },
];

export const exploreAll: NavLink = { label: 'Explore all services', path: '/services' };
export const guarantee: NavLink = { label: 'Read the guarantee', path: '/guarantee' };

// Menu labels are the topics a buyer would name; the pages behind them carry the persuasive H1s.
export const useCases: NavLink[] = [
  { label: 'AI visibility', path: '/help/ai-visibility' },
  { label: 'Lead generation', path: '/help/leads' },
  { label: 'Sales enablement', path: '/help/sales' },
  { label: 'Content and video', path: '/help/content' },
  { label: 'Reviews and reputation', path: '/help/reviews' },
  { label: 'CRM and customer data', path: '/help/crm' },
  { label: 'AI and automation', path: '/help/ai' },
  { label: 'Marketing team training', path: '/help/team' },
];

export const industries: NavLink[] = [
  { label: 'Home Services', path: '/industries/home-services' },
  { label: 'Manufacturers', path: '/industries/manufacturers' },
  { label: 'Insurance Agencies & Brokerages', path: '/industries/insurance' },
  { label: 'Accounting, Payroll & HR Firms', path: '/industries/accounting-payroll-hr' },
  { label: 'Cybersecurity Companies', path: '/industries/cybersecurity', whenProof: true },
  { label: 'Retail & E-commerce', path: '/industries/retail-ecommerce' },
  { label: 'Commercial Contractors', path: '/industries/commercial-contractors' },
  { label: 'Commercial Real Estate', path: '/industries/commercial-real-estate' },
];

export const cta: NavLink = { label: 'Let’s Talk', path: '/talk' };
export const instantDiagnostic: NavLink = { label: 'Take the free instant diagnostic', path: '/instant-diagnostic' };

export const nav: NavItem[] = [
  {
    kind: 'panel',
    id: 'help',
    label: 'How We Help',
    columns: [
      { heading: 'Services we offer', className: 'services', links: services, more: exploreAll },
      { heading: 'Problems we solve', className: 'problems', links: useCases },
      { heading: 'Industries we serve', className: 'industries', links: industries },
    ],
    foot: [
      { text: 'Every service we offer is backed by our 100% money-back guarantee.', link: guarantee },
      { text: 'Is IMPACT the right fit for your business?', link: { label: 'Compare us to your other options', path: '/compare' } },
    ],
  },
  {
    kind: 'menu',
    id: 'results',
    label: 'Results',
    groups: [
      {
        links: [
          { label: 'Success Stories', path: '/results/success-stories' },
          { label: 'Website Portfolio', path: '/results/website-portfolio' },
          { label: 'Awards & Recognition', path: '/results/awards' },
          { label: 'Reviews', path: '/results/reviews' },
        ],
      },
    ],
  },
  { kind: 'link', label: 'Pricing', path: '/pricing' },
  {
    kind: 'menu',
    id: 'about',
    label: 'About',
    groups: [
      {
        links: [
          { label: 'Our Story, Mission & Values', path: '/about' },
          { label: 'Why IMPACT?', path: '/why-impact' },
          { label: 'Meet Our Team', path: '/team' },
          { label: 'Request a Speaker', path: '/speaking' },
          { label: 'Join Our Team', path: '/careers' },
        ],
      },
    ],
  },
  {
    kind: 'menu',
    id: 'learn',
    label: 'Learning Center',
    groups: [
      { links: [{ label: 'Explore the Learning Center', path: '/learn', sub: 'Articles, videos, and answers, searchable' }] },
      {
        heading: 'Free tools',
        links: [
          { label: 'Instant Diagnostic', path: '/instant-diagnostic' },
          { label: 'AI Visibility Study', path: '/ai-visibility-study' },
        ],
      },
      {
        heading: 'Events',
        links: [
          { label: 'Webinars & Workshops', path: '/events' },
          { label: 'Endless Customers Live', path: '/conference', site: 'ec' },
        ],
      },
    ],
  },
];
