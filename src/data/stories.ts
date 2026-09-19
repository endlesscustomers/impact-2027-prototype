// Success stories, both sites. The shape mirrors the HubDB "evidence" row the build plan calls for:
// the facts sidebar, the filter values, the card, and the media live here; the narrative lives in
// story-bodies.json (pulled from the live impactplus.com stories on 2026-09-19, lightly cleaned).
// Layout reference: zoom.com/en/customer-stories (Bob, 2026-09-19: "exactly what Zoom does").
import type { SiteId } from '../lib/site';
import { useCases, industries } from './impact-nav';
import bodiesJson from './story-bodies.json';

export type Problem = (typeof useCases)[number]['label'];
export type Service = 'Endless Customers Coaching' | 'Website Services' | 'HubSpot Services' | 'Paid Media Services' | 'Deep Diagnostic & Roadmap' | 'Workshops & Speaking';
export type Size = '1-49 employees' | '50-249 employees' | '250+ employees';

export interface Quote { q: string; who: string; role: string }
export interface Stat { n: string; caption: string }
export type Block = { p: string } | { ul: string[] } | { h3: string } | { q: string; by: string };
export interface Section { h: string | null; blocks: Block[] }

export interface Story {
  slug: string;
  client: string;
  /** The H1. Title case; one sentence, no period. */
  headline: string;
  /** Two or three sentences under the H1. */
  summary: string;
  /** One sentence on the card. */
  blurb: string;
  industry: string;
  size?: Size;
  founded?: string;
  location?: string;
  services: Service[];
  problems: Problem[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  stats: Stat[];
  quotes: Quote[];
  /** Vidyard id. Poster and player come from play.vidyard.com. Only the story's own interview video, checked by its Vidyard title on 2026-09-19; the other clients' testimonial clips on the live pages are left out. */
  video?: string;
  /** Hero and card image; falls back to the video poster. */
  image?: string;
  /** File under public/img/logos/. */
  logo?: string;
  /** Sites that show this story in their listing. Every story is on both unless narrowed. */
  on?: SiteId[];
  featuredOn?: SiteId[];
}

export const SERVICES: { name: Service; path: string; site: SiteId }[] = [
  { name: 'Endless Customers Coaching', path: '/coaching', site: 'impact' },
  { name: 'Deep Diagnostic & Roadmap', path: '/deep-diagnostic', site: 'impact' },
  { name: 'HubSpot Services', path: '/hubspot', site: 'impact' },
  { name: 'Website Services', path: '/websites', site: 'impact' },
  { name: 'Paid Media Services', path: '/paid-media', site: 'impact' },
  { name: 'Workshops & Speaking', path: '/workshops', site: 'impact' },
];
export const SIZES: Size[] = ['1-49 employees', '50-249 employees', '250+ employees'];
export const PROBLEMS: Problem[] = useCases.map((u) => u.label);
/** The locked eight first, then anything else a story carries. */
export function industryOrder(list: Story[]): string[] {
  const locked = industries.map((i) => i.label);
  const extra = [...new Set(list.map((s) => s.industry))].filter((i) => !locked.includes(i)).sort();
  return [...locked, ...extra];
}

const vid = (id: string) => ({ video: id });

export const stories: Story[] = [
  {
    slug: 'linta-roofing', client: 'Linta Roofing',
    headline: 'How Linta Roofing Grew to an $8M Business by Becoming the Most Transparent Roofer in Myrtle Beach',
    summary: 'When you buy a roof you are betting your home, your budget, and your peace of mind on a contractor you may have met once. Linta chose radical transparency as its growth strategy and, in about three years of implementing the Endless Customers System with coaching, grew to about $8M in revenue, 21 employees, and 1,100 customers a year.',
    blurb: 'How radical transparency took a six-person roofer to $8M and the top three in its market.',
    industry: 'Home Services', size: '1-49 employees', location: 'Myrtle Beach, South Carolina',
    services: ['Endless Customers Coaching'],
    problems: ['Lead Generation', 'Content and Video', 'Sales Enablement', 'Marketing Team Training'],
    challenges: ['Not enough buyers knew who they were or why they were different', 'Outsourced marketing had not worked', 'Wanted a system the company could own, not another vendor'],
    solutions: ['Radical transparency on pricing, comparisons, and fit', 'An in-house marketing team instead of agencies', 'Three articles, three short videos, and two long videos a week', 'Content used in the sales process so calls start further along'],
    outcomes: ['Revenue tracking to $8M', 'Team grew from 6 to 21', 'Roof replacements from 250 to 450 a year', 'Top 3 in the market, from the top 10 to 15', 'A faster, smoother sales cycle'],
    stats: [{ n: '$8M', caption: 'in revenue, from a six-person company' }, { n: '6 to 21', caption: 'employees in about three years' }, { n: '250 to 450', caption: 'roof replacements a year' }],
    quotes: [
      { q: 'We want to be radically transparent. When we’re able to be transparent, we win the trust of our community.', who: 'Jeffrey Linta', role: 'CEO, Linta Roofing' },
      { q: 'You don’t know what you don’t know. There are so many layers to actually applying those principles and bringing it to life.', who: 'Jeffrey Linta', role: 'CEO, Linta Roofing' },
    ],
    ...vid('7e1HDgXbjSLg3nPLH37oyc'), logo: 'linta-roofing.svg', featuredOn: ['ec'],
  },
  {
    slug: 'movemobility', client: 'MoveMobility',
    headline: 'How a Mobile Medical Van Company Got Over $1 Million per Month of Revenue From Endless Customers',
    summary: 'MoveMobility builds wheelchair-accessible vehicles and mobile medical clinics that remove barriers to care across Canada. Three years ago marketing was “the dusty corner of the company.” Today an insourced content and video team drives a predictable stream of educated inbound leads, bigger deals, and faster closes.',
    blurb: 'An insourced content and video team added roughly $6M in revenue in five months.',
    industry: 'Manufacturers', location: 'Canada',
    services: ['Endless Customers Coaching'],
    problems: ['Lead Generation', 'Sales Enablement', 'Content and Video', 'Marketing Team Training'],
    challenges: ['Marketing was monthly emails and a website nobody looked at', 'Sales and marketing had no shared view of what buyers were asking', 'No-shows on sales calls and slow deals'],
    solutions: ['A weekly 30-minute revenue team meeting that turns buyer questions into the next articles and videos', 'An insourced content manager and videographer with a simple in-house studio', 'Two or three pieces of content sent before every sales call', 'Plain answers on price, problems, comparisons, and competitors'],
    outcomes: ['450 inbound leads in five months, against a goal of 400', '98 qualified opportunities and 38 closed deals', '$6M in revenue tied to Endless Customers', 'Shorter sales cycles and a higher average deal size'],
    stats: [{ n: '$6M', caption: 'in revenue tied to Endless Customers in five months' }, { n: '450', caption: 'inbound leads in five months, against a goal of 400' }, { n: '38', caption: 'closed deals attributed to the system' }],
    quotes: [
      { q: 'Coaching gave us structure. It was a rhythm we could follow and a plan we could trust.', who: 'Bryn Jones', role: 'General Manager, MoveMobility' },
      { q: 'When customers see the salesperson in our videos, the first call already feels familiar.', who: 'Jorge Gonzalez', role: 'Marketing Lead, MoveMobility' },
      { q: 'If there’s one thing to invest in early, it’s your marketing. Fix that, and customers come to you.', who: 'Bryn Jones', role: 'General Manager, MoveMobility' },
    ],
    ...vid('NwYUQ85WJUFY7Q7RDkZVtE'), featuredOn: ['impact'],
  },
  {
    slug: 'roe-painting', client: 'Roe Painting',
    headline: 'How a Painting Company Took Control of Marketing and Tripled Qualified Leads',
    summary: 'Roe Painting had a strong brand and decades of momentum, but too many outside hands had made its marketing hard to control. They brought content and video in house, rebuilt the website around buyer questions, and committed to the Endless Customers System with coaching. Qualified leads tripled.',
    blurb: 'A painting company brought marketing in house, rebuilt its website around buyers, and tripled qualified leads.',
    industry: 'Home Services',
    services: ['Endless Customers Coaching', 'Website Services'],
    problems: ['Lead Generation', 'Content and Video', 'Marketing Team Training', 'AI Visibility'],
    challenges: ['The CEO was carrying marketing on top of everything else', 'Sales and marketing were not operating as one unit', 'Website copy that felt written for algorithms, not people', 'Leads dropping as search and AI changed how buyers find businesses'],
    solutions: ['Hired the right content manager and videographer first', 'Rebuilt the website around buyer trust, with a learning center and video on service pages', 'At least three articles a week, every week', 'A concrete coatings pricing calculator that qualifies leads', 'A weekly content briefing for the sales team'],
    outcomes: ['Tripled qualified leads', 'More form fills and stronger service pages', 'Buyers arriving educated and confident', 'The CEO is no longer the content engine'],
    stats: [{ n: '3x', caption: 'qualified leads' }, { n: '3 a week', caption: 'articles published, up from peaks and valleys' }],
    quotes: [{ q: 'It was half sold for me.', who: 'A Roe Painting sales rep', role: 'on buyers who watched the videos first' }],
    ...vid('iTBRDEe7tvDF7md7ENcycj'), logo: 'roe-painting.svg',
  },
  {
    slug: 'superior-trucking-payroll-service', client: 'Superior Trucking Payroll Service',
    headline: 'How a Niche Payroll Company Tripled Its Sales Opportunities With the Endless Customers Coaching Program',
    summary: 'Superior Trucking Payroll Service is a specialized payroll service for trucking companies. Founder Mike Ritzema always planned to educate buyers rather than hard-sell, but doing it alone stalled. With a coach and a weekly cadence, inbound opportunities went from about one a week to between five and eight.',
    blurb: 'A founder-led payroll company went from about one inbound opportunity a week to five to eight.',
    industry: 'Accounting, Payroll & HR Firms',
    services: ['Endless Customers Coaching'],
    problems: ['Lead Generation', 'Sales Enablement', 'Content and Video'],
    challenges: ['Inconsistent posting with no clear calls to action', 'Content that didn’t move buyers forward', 'A founder trying to do everything himself'],
    solutions: ['A buyer-first content plan tied to real questions and clear next steps', 'Weekly accountability with an Endless Customers coach', 'A lightweight video habit that supports content and sales', 'A rebuilt pricing calculator so buyers can self-serve'],
    outcomes: ['Weekly inbound opportunities from about one to five to eight', 'Leads almost tripled in a year', 'First sales rep hired in four years'],
    stats: [{ n: '3x', caption: 'leads in a year' }, { n: '5 to 8', caption: 'inbound opportunities a week, up from about one' }],
    quotes: [
      { q: 'Michael Jordan had a coach. Why don’t I have a marketing coach?', who: 'Mike Ritzema', role: 'Founder, Superior Trucking Payroll Service' },
      { q: 'A year later, leads almost tripled, and I think a lot of that is due to the time I spent with the coaches and IMPACT.', who: 'Mike Ritzema', role: 'Founder, Superior Trucking Payroll Service' },
    ],
    ...vid('RUZSzA7bBGHddVarLCYujn'),
  },
  {
    slug: 'applied-educational-systems', client: 'Applied Educational Systems',
    headline: 'Digital Curriculum Business Generates 30,000 Organic Leads per Year',
    summary: 'Applied Educational Systems has made Inc.’s list of the 5,000 fastest-growing companies four times in a row, proof that going all-in on answering teachers’ questions was the right move. Today AES brings in close to 30,000 leads a year, driving more than $6 million in revenue.',
    blurb: 'A curriculum company went all-in on buyer education and now generates close to 30,000 leads a year.',
    industry: 'Education', size: '1-49 employees', location: 'Pennsylvania',
    services: ['Endless Customers Coaching', 'Website Services', 'HubSpot Services'],
    problems: ['Lead Generation', 'Content and Video', 'CRM and Customer Data'],
    challenges: ['A strategic shift to a subscription software model', 'Teachers and school budgets stretched thinner than ever', 'A new market to reach and earn trust in'],
    solutions: ['Went all-in on answering teachers’ questions in content', 'Web design and optimization', 'HubSpot training and enablement'],
    outcomes: ['169% increase in revenue growth', '5,253% increase in leads', '4,603% increase in blog traffic', 'Inc. 5000 four years in a row'],
    stats: [{ n: '169%', caption: 'increase in revenue growth' }, { n: '5,253%', caption: 'increase in leads' }, { n: '4,603%', caption: 'increase in blog traffic' }],
    quotes: [{ q: 'We’ve had tremendous success, but if I hadn’t seen Marcus talk and hadn’t committed to it as a company, we wouldn’t be where we are today.', who: 'Jim Schultz', role: 'President and Founder, Applied Educational Systems' }],
    ...vid('jH7JGgTo1y9NLtyuZvtBK4'), image: 'https://www.impactplus.com/hubfs/IMPACT_Framework_3/Inbound%20Success%20Playbook/Real%20World%20Results/Featured%20Images/Case-Studies---Real-World-Results---Featured-Images--AES.jpg',
  },
  {
    slug: 'berry-insurance', client: 'Berry Insurance',
    headline: 'Family-Owned Insurance Company Triples Revenue From Search',
    summary: 'Berry Insurance knew insurance was something everyone needed and nobody understood. After trying to implement the system on their own, owner Kaitlyn Pintarich and her team hired IMPACT’s coaches and trainers to bring it to life, and the results changed the business.',
    blurb: 'A family-owned insurance agency brought marketing in house and tripled revenue from search.',
    industry: 'Insurance Agencies & Brokerages', founded: '1922',
    services: ['Endless Customers Coaching', 'Website Services'],
    problems: ['Lead Generation', 'Sales Enablement', 'Content and Video', 'Marketing Team Training'],
    challenges: ['The owner was running marketing alone and, in her words, failing at all of it', 'A website that talked about the company, not the buyer’s problems', 'A million ideas from a conference and no way to implement them'],
    solutions: ['Hired a full-time content manager producing three educational pieces a week', 'Weekly one-on-one training for the content manager', 'Regular coaching for leadership and sales on using content in the sales process'],
    outcomes: ['183% increase in business growth', '99% increase in leads', '69% increase in close rate', 'Form submissions from 127 to 253 in a year, close rate from 16% to 27%'],
    stats: [{ n: '183%', caption: 'increase in business growth' }, { n: '99%', caption: 'increase in leads' }, { n: '69%', caption: 'increase in close rate' }],
    quotes: [
      { q: 'Implementing the system with IMPACT’s help has transformed my business.', who: 'Kaitlyn Pintarich', role: 'Owner, Berry Insurance' },
      { q: 'When people call us up, they’ve already looked the info up on our website. When we get on the phone with them, they’re basically spouting all the information we need.', who: 'Chris Pintarich', role: 'Vice President, Berry Insurance' },
    ],
    image: 'https://www.impactplus.com/hubfs/IMPACT_Framework_3/Inbound%20Success%20Playbook/Real%20World%20Results/Featured%20Images/Case-Studies---Real-World-Results---Featured-Images--Berry-Insurance.jpg', logo: 'berry-insurance.png',
  },
  {
    slug: 'dalinghaus-construction', client: 'Dalinghaus Construction',
    headline: 'Foundation Repair Business Grows Sales by 40% in One Year',
    summary: 'Dalinghaus Construction is in control of its own sales and marketing. After every agency prescribed a new website and paid search kept eating budget, the whole company read the book, committed to the system, and built the internal expertise to drive traffic, capture leads, and close sales without an agency.',
    blurb: 'A foundation repair company stopped renting marketing and grew sales 40% in a year.',
    industry: 'Home Services',
    services: ['Endless Customers Coaching'],
    problems: ['Lead Generation', 'Sales Enablement', 'Content and Video', 'Marketing Team Training'],
    challenges: ['Every agency prescribed the same thing: a new website', 'Heavy spending on paid search', 'Growth that was steady but modest'],
    solutions: ['The whole company read the book and committed to it', 'Content that helps homeowners whether or not they buy', 'Content used to shorten the sales cycle'],
    outcomes: ['141% increase in deal velocity', '56% increase in deals closed', '40% increase in revenue', 'From about $7.5M to about $10.5M in a year'],
    stats: [{ n: '141%', caption: 'increase in deal velocity' }, { n: '56%', caption: 'increase in deals closed' }, { n: '40%', caption: 'increase in revenue' }],
    quotes: [],
    ...vid('L2PRzmbXC9jKtX7WLZw5Yr'), image: 'https://www.impactplus.com/hubfs/IMPACT_Framework_3/Inbound%20Success%20Playbook/Real%20World%20Results/Featured%20Images/Case-Studies---Real-World-Results---Featured-Images---Dalinghaus.jpg',
  },
  {
    slug: 'dental-claimsupport', client: 'Dental ClaimSupport',
    headline: 'Dental Billing Company Pulls the Plug on Bad Marketing',
    summary: 'Ryan DeLettre, Davy Clay, and Josh Smith founded Dental ClaimSupport to give dentists their time back. They stopped pouring money into Facebook and Google ads, put structure and accountability behind their marketing, and now set a new record almost every month.',
    blurb: 'A dental billing company pulled the plug on paid ads and grew deals won by 192%.',
    industry: 'Business Services',
    services: ['Endless Customers Coaching', 'HubSpot Services'],
    problems: ['Lead Generation', 'Sales Enablement', 'CRM and Customer Data', 'Content and Video'],
    challenges: ['A lot of money each month into Facebook and Google ads with little to show', 'No structure behind marketing', 'Dental offices losing patient time to insurance paperwork'],
    solutions: ['Pulled the plug on paid ads', 'Coaching and accountability every week', 'HubSpot training and enablement'],
    outcomes: ['192% increase in deals won', '56% increase in deal velocity', '1,421% increase in organic traffic'],
    stats: [{ n: '192%', caption: 'increase in deals won' }, { n: '56%', caption: 'increase in deal velocity' }, { n: '1,421%', caption: 'increase in organic traffic' }],
    quotes: [],
    ...vid('gJU3nqTN3tyZ8xjGnPnodC'), image: 'https://www.impactplus.com/hubfs/IMPACT_Framework_3/Inbound%20Success%20Playbook/Real%20World%20Results/Featured%20Images/Case-Studies---Real-World-Results---Featured-Images--Dental-Claim-Support.jpg',
  },
  {
    slug: 'intek-freight-and-logistics', client: 'InTek Freight & Logistics',
    headline: 'How a CEO Prioritized Content Marketing, Became the Voice of an Industry, and Increased Leads by 1,300%',
    summary: 'Freight and logistics company InTek added $5 million to its pipeline when CEO Rick LaGore took on the writing himself, publishing two to three revenue-generating articles a week plus weekly updates on what was happening in freight and logistics.',
    blurb: 'A CEO wrote the content himself, became the voice of his industry, and grew leads by 1,300%.',
    industry: 'Transportation & Logistics',
    services: ['Endless Customers Coaching', 'Website Services', 'HubSpot Services'],
    problems: ['Lead Generation', 'Content and Video', 'CRM and Customer Data'],
    challenges: ['Competing with companies $15 to 20 billion in size that already have the name', 'One shot at a first impression as a new brand', 'Nobody knew the content better than the CEO'],
    solutions: ['The CEO became the content owner', 'The Big 5 topics plus weekly freight and logistics updates', 'Web design and HubSpot training'],
    outcomes: ['1,300% increase in leads', '$5 million added to the pipeline', 'The most known and trusted voice in its niche'],
    stats: [{ n: '1,300%', caption: 'increase in leads' }, { n: '$5M', caption: 'added to the pipeline' }],
    quotes: [{ q: 'Because I know the content much better than anyone I could hire. InTek is my brand and investment, and I want to have full control over it as we come out of the gate.', who: 'Rick LaGore', role: 'CEO, InTek Freight & Logistics' }],
    ...vid('okJEY6YfC1XCv2m9LTsG5Z'), image: 'https://www.impactplus.com/hubfs/IMPACT_Framework_3/Inbound%20Success%20Playbook/Real%20World%20Results/Featured%20Images/Case-Studies---Real-World-Results---Featured-Images--Intek.jpg', logo: 'intek.png',
  },
  {
    slug: 'retrofoam', client: 'RetroFoam of Michigan',
    headline: 'Home Insulation Company Increased Leads by 2,942% and Doubled Its Business',
    summary: 'RetroFoam of Michigan is a statewide spray foam insulation contractor. Working with IMPACT, they doubled their business and saw organic monthly traffic jump from 7,000 to more than 300,000 in 18 months, all of it attributable to content, video, and assignment selling.',
    blurb: 'An insulation contractor took organic traffic from 7,000 to 300,000 a month and doubled its business.',
    industry: 'Home Services', location: 'Michigan',
    services: ['Endless Customers Coaching', 'HubSpot Services'],
    problems: ['Lead Generation', 'Content and Video', 'CRM and Customer Data'],
    challenges: ['Growth had plateaued', 'Spending more on marketing without getting better', 'Homeowner questions nobody in the industry was answering'],
    solutions: ['Evaluated the website and marketing first', 'Answered questions through content and video, by the book', 'HubSpot training and enablement'],
    outcomes: ['2,942% increase in organic leads', '10,109% increase in organic web traffic', 'Business more than doubled in three years', 'Over 1.1 million page views'],
    stats: [{ n: '2,942%', caption: 'increase in organic leads' }, { n: '10,109%', caption: 'increase in organic web traffic' }, { n: '2x', caption: 'the business, in three years' }],
    quotes: [],
    ...vid('yCsfgR4kMZ8FQiBYJezMW5'), image: 'https://www.impactplus.com/hubfs/IMPACT_Framework_3/Inbound%20Success%20Playbook/Real%20World%20Results/Featured%20Images/Case-Studies---Real-World-Results---Featured-Images--Retrofoam.jpg', logo: 'retrofoam.png',
  },
  {
    slug: 'thoroughcare', client: 'ThoroughCare',
    headline: 'Digital Health Technology Company Doubles Annual Revenue Four Years in a Row',
    summary: 'Rather than invest in a marketing agency, ThoroughCare worked with IMPACT’s coaches to build an internal team around the system. The care coordination software company is now in 600 clinics across the country and runs its own marketing.',
    blurb: 'A health technology startup built an internal team instead of hiring an agency and doubled revenue four years running.',
    industry: 'Software & SaaS',
    services: ['Endless Customers Coaching', 'Website Services'],
    problems: ['Lead Generation', 'Marketing Team Training', 'Content and Video', 'Sales Enablement'],
    challenges: ['A startup with a skeleton crew and no sales team', 'Starting from zero awareness', 'Caregivers held back by unreliable software'],
    solutions: ['Sales coaching and training', 'Web design and optimization', 'An internal marketing team instead of an agency'],
    outcomes: ['100% year-over-year growth, four years running', '160% increase in traffic', '600 clinics and counting', 'Runs its own marketing, no agency'],
    stats: [{ n: '100%', caption: 'year-over-year growth, four years in a row' }, { n: '160%', caption: 'increase in traffic' }, { n: '600', caption: 'clinics across the country' }],
    quotes: [],
    ...vid('avSSLZHsNZ9TZnFzNQKeyU'),
  },
];

export const bodies = bodiesJson as Record<string, Section[]>;
/** The live slug the narrative was pulled from, where it differs from ours. */
const bodyKey: Record<string, string> = { 'linta-roofing': 'lintaroofing', 'roe-painting': 'roepainting', 'superior-trucking-payroll-service': 'superior-trucking-payroll-services', 'dalinghaus-construction': 'dalinghaus', 'intek-freight-and-logistics': 'intek' };
export const bodyFor = (s: Story): Section[] => bodies[bodyKey[s.slug] ?? s.slug] ?? [];

export const listingPath: Record<SiteId, string> = { impact: '/results/success-stories', ec: '/success-stories' };
export const storyPath = (site: SiteId, s: Story) => `${listingPath[site]}/${s.slug}`;
export const storiesFor = (site: SiteId) => stories.filter((s) => !s.on || s.on.includes(site));
export const posterFor = (s: Story) => s.image ?? (s.video ? `https://play.vidyard.com/${s.video}.jpg` : undefined);
export function related(s: Story, list: Story[], n = 3): Story[] {
  const score = (o: Story) => (o.industry === s.industry ? 10 : 0) + o.problems.filter((p) => s.problems.includes(p)).length + o.services.filter((x) => s.services.includes(x)).length;
  return list.filter((o) => o.slug !== s.slug).sort((a, b) => score(b) - score(a)).slice(0, n);
}
