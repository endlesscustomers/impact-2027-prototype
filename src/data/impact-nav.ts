import type { NavItem, NavLink } from '../lib/site';

// impactplus.com header, as settled with Bob on 2026-09-18.
// Order and labels are decisions; change them here and both desktop and mobile follow.

export const services: NavLink[] = [
  { label: 'Explore All Services', path: '/services' },
  { label: 'Endless Customers Coaching', path: '/coaching' },
  { label: 'HubSpot Services', path: '/hubspot' },
  { label: 'Website Services', path: '/websites' },
  { label: 'Paid Media Services', path: '/paid-media' },
  { label: 'Workshops', path: '/workshops' },
];

export const useCases: NavLink[] = [
  { label: 'Get recommended by AI', path: '/help/ai-visibility' },
  { label: 'Get more leads', path: '/help/leads' },
  { label: 'Close sales faster', path: '/help/sales' },
  { label: 'Make content and video that sells', path: '/help/content' },
  { label: 'Get more reviews', path: '/help/reviews' },
  { label: 'Fix our CRM and customer data', path: '/help/crm' },
  { label: 'Put AI and automation to work', path: '/help/ai' },
  { label: 'Build and train our marketing team', path: '/help/team' },
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
      { heading: 'What we do', className: 'services', links: services },
      { heading: 'What you need', className: 'problems', links: useCases },
      { heading: 'Who we serve', className: 'industries', links: industries },
    ],
    foot: {
      lead: 'Not sure where to start?',
      links: [instantDiagnostic, { label: 'Start with the Deep Diagnostic & Roadmap', path: '/deep-diagnostic' }],
      why: { label: 'Why IMPACT?', path: '/why-impact' },
    },
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
          { label: 'Endless Customers Live', path: '/conference', site: 'ec', sub: 'On endlesscustomers.com' },
        ],
      },
    ],
  },
];
