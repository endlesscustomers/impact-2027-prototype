import type { NavItem, NavLink, Ribbon } from '../lib/site';

// endlesscustomers.com header, as settled with Bob on 2026-09-18.
// Five items, with Pricing and Learning Center required. Get Coaching & Training is an
// endlesscustomers.com page (Bob, 2026-09-18), not a hop to impactplus.com.

export const cta: NavLink = { label: 'Book a Free Call', path: '/book-a-call' };
export const secondary: NavLink = { label: 'Free AI Diagnostic', path: '/instant-diagnostic' };

export const nav: NavItem[] = [
  { kind: 'link', label: 'The Book', path: '/book' },
  {
    kind: 'menu',
    id: 'ec-coaching',
    label: 'Coaching',
    groups: [
      {
        links: [
          { label: 'Get Coaching & Training', path: '/coaching' },
          { label: 'Our Coaches', path: '/coaches' },
          { label: 'Become a Coach', path: '/become-a-coach' },
        ],
      },
    ],
  },
  { kind: 'link', label: 'Success Stories', path: '/success-stories' },
  {
    kind: 'menu',
    id: 'ec-learn',
    label: 'Learning Center',
    groups: [
      { links: [{ label: 'Explore the Learning Center', path: '/learn' }] },
      {
        rule: true,
        links: [
          { label: 'What Is Endless Customers?', path: '/what-is-endless-customers' },
          { label: 'How to Implement', path: '/how-to-implement' },
          { label: 'Endless Customers Academy', path: '/academy' },
          { label: 'Free Instant AI Diagnostic', path: '/instant-diagnostic' },
          { label: 'The Conference', path: '/conference' },
          { label: 'Webinars', path: '/webinars' },
          { label: 'The Podcast', path: '/podcast' },
        ],
      },
    ],
  },
  { kind: 'link', label: 'Pricing', path: '/pricing' },
];

// Announcement ribbon under the header.
export const ribbons: Ribbon[] = [
  { id: 'ecl-hartford-2026', on: ['/', '/coaching', '/coaches', '/become-a-coach', '/success-stories', '/pricing', '/book-a-call'], text: 'Endless Customers Live · Hartford, CT · October 5–7, 2026', short: 'Endless Customers Live · Oct 5–7', cta: 'Register', path: '/conference' },
  { id: 'free-chapter', on: ['/book', '/what-is-endless-customers', '/how-to-implement'], text: 'Read the first chapter of Endless Customers free', short: 'First chapter, free', cta: 'Get it', path: '/book' },
  { id: 'podcast', on: ['/learn', '/podcast', '/webinars', '/academy', '/instant-diagnostic'], text: 'The Endless Customers Podcast: a new conversation every week', short: 'New podcast episode weekly', cta: 'Listen', path: '/podcast' },
];
