import type { NavLink, SiteId } from '../lib/site';
import { useCases, industries } from './impact-nav';

// Page outlines: enough of every page for someone to read the strategy off the prototype. A page
// with an outline renders through Outline.astro; a page with its own .astro file wins over both.
// Facts and prices come from the live sites (2026-09-18) unless the strategy says otherwise; where
// they conflict, the strategy wins and the live figure is tagged for review.

export type BlockKind = 'text' | 'cards' | 'links' | 'steps' | 'pricing' | 'faq' | 'proof';
export interface Block {
  h: string;
  p?: string;
  kind?: BlockKind;
  /** Cards, steps, prices, FAQs, or quotes, depending on kind. "Label — detail" splits on the dash. */
  items?: string[];
  links?: NavLink[];
  tag?: string;
}
export interface Connect { text: string; link: NavLink }
export interface Outline {
  h1?: string;
  lede?: string;
  ctas?: NavLink[];
  blocks: Block[];
  /** "How this page connects": the doors in and out, across both sites. */
  connects?: Connect[];
  /** Which site owns this content when it appears on both. */
  source?: 'This site is the source.' | 'impactplus.com is the source; this page is the door.' | 'endlesscustomers.com is the source; this page is the door.';
}

const talk: NavLink = { label: 'Let’s Talk', path: '/talk' };
const instant: NavLink = { label: 'Free instant diagnostic', path: '/instant-diagnostic' };
const deep: NavLink = { label: 'Deep Diagnostic & Roadmap', path: '/deep-diagnostic' };
const ecCall: NavLink = { label: 'Book a Free Call', path: '/book-a-call' };
const live = 'Live-site figure, to verify for 2027';

const impact: Record<string, Outline> = {
  '/pricing': {
    lede: 'Every price we charge, on one page. Ranges where the work varies, and what moves the number. Most agencies won’t do this; we tell our clients to, so we do.',
    ctas: [deep, talk],
    blocks: [
      { h: 'Where everyone starts', kind: 'pricing', items: ['Free instant diagnostic — $0, about a minute, how AI describes you today', 'Deep Diagnostic & Roadmap — $5,000 one-time, three weeks, 124 checkpoints and a 3/6/12-month roadmap'] },
      { h: 'Endless Customers Coaching', kind: 'pricing', tag: live, items: ['Alignment Day (first month) — $10,000 virtual · $12,500 + travel in person', 'Guidance — $5,500/mo', 'Mastery (recommended) — $8,000/mo', 'Mastery Accelerated — $10,500/mo', 'All plans month-to-month, 30-day notice'], links: [{ label: 'Coaching pricing in detail', path: '/coaching/pricing' }] },
      { h: 'HubSpot Services', kind: 'pricing', tag: live, items: ['Core training — $3,500/mo', 'Advanced training — $6,000/mo', 'Organization training — $10,000/mo', 'On-site workshop — $12,500 + travel', 'Projects (onboarding, cleanup, integrations, dashboards) — $3,000 to $15,000+, quoted'], links: [{ label: 'HubSpot pricing in detail', path: '/hubspot/pricing' }] },
      { h: 'Website Services', kind: 'pricing', tag: live, items: ['Redesign — $25,000 to $155,000 (Enhanced $30K–$60K; Elite from $63K)', 'Learning Center build — from $5,000', 'Self-service tool — strategy $3,000; builds $5,000 to $70,000', 'Optimization & training — monthly, quoted'], links: [{ label: 'Website pricing in detail', path: '/websites/pricing' }] },
      { h: 'Paid Media Services', kind: 'pricing', tag: live, items: ['Management — $5,000/mo base + 10–15% performance fee ($20K–$100K monthly spend); $7,000/mo base above $100K', 'Consulting & training — $4,000/mo', 'Minimum ad spend — $20,000/mo managed; $10,000/mo consulting'], links: [{ label: 'Paid media pricing in detail', path: '/paid-media/pricing' }] },
      { h: 'Workshops', kind: 'pricing', items: ['One-day workshop — quoted by room size and travel'] },
      { h: 'What changes the price', kind: 'cards', items: ['Team size — more people in the room means more sessions', 'Departments — sales and marketing together costs more than one', 'Speed — accelerated plans compress the same work into fewer months', 'Complexity — integrations, migrations, and custom builds are quoted'] },
      { h: 'Every service is covered', p: 'Tell us within 7 days, we redo the work, and if we still miss, you get your money back in full. No cap, no “reasonable use” clause.', links: [{ label: 'Read the guarantee', path: '/guarantee' }] },
    ],
    connects: [
      { text: 'What implementing the system costs in total, with or without a coach', link: { label: 'endlesscustomers.com/pricing', path: '/pricing', site: 'ec' } },
      { text: 'How we compare to an agency, a freelancer, or in-house', link: { label: 'Compare your options', path: '/compare' } },
    ],
    source: 'This site is the source.',
  },
  '/talk': {
    lede: 'One page for every conversation. Pick what you want to talk about and book it, or ask a question and a person answers within a business day.',
    blocks: [
      { h: 'Book a call', kind: 'cards', items: ['Explore Call — 30 minutes about your business and whether the Deep Diagnostic is the right first step', 'HubSpot — talk to a HubSpot expert about training, onboarding, or a rescue', 'Website — talk to a website strategist about a redesign or optimization', 'Paid media — a free ads assessment with the Swell team', 'Speaking — bring Bob or Marcus to your event'] },
      { h: 'Or just ask', p: 'A short form: name, company, website, what’s on your mind. No dropdowns, no budget field.' },
      { h: 'Not ready to talk?', p: 'Run the free instant diagnostic first. Most people do.', links: [instant] },
    ],
    connects: [{ text: 'The same booking, from the Endless Customers side', link: { label: 'endlesscustomers.com/book-a-call', path: '/book-a-call', site: 'ec' } }],
  },
  '/why-impact': {
    lede: 'A training company that also does the work. Here’s why that matters, and what it means for what you own at the end.',
    blocks: [
      { h: 'We teach you to own it', p: 'Agencies rent you results. We build the systems and the internal capabilities inside your business that keep it going without us.' },
      { h: 'We run on the system we sell', p: 'Endless Customers is how IMPACT markets IMPACT. Published pricing, honest comparisons, a guarantee. This site is the proof.' },
      { h: 'One way in', p: 'Nobody buys the wrong thing, because everyone starts with the same diagnostic.' },
      { h: 'Proof', kind: 'links', links: [{ label: 'Success stories', path: '/results/success-stories' }, { label: 'Reviews', path: '/results/reviews' }, { label: 'Compare your options', path: '/compare' }] },
    ],
    connects: [{ text: 'Overlaps with the compare page; one of the two may fold into the other', link: { label: 'Compare your options', path: '/compare' } }],
  },
  '/instant-diagnostic': {
    lede: 'Enter your website. In about a minute you’ll see how ChatGPT, Google, and Perplexity describe your company, whether they recommend you, and what they get wrong. Free, no form first.',
    ctas: [{ label: 'Run the diagnostic', path: '/instant-diagnostic' }],
    blocks: [
      { h: 'What you get', kind: 'cards', items: ['How AI describes you — the actual answers, side by side', 'Whether AI recommends you — for the questions your buyers ask', 'What it gets wrong — the facts to fix first', 'A score, and what to do next'] },
      { h: 'Step 1 of 2', p: 'This is the free first look. The Deep Diagnostic & Roadmap is the full picture: 124 checkpoints, competitor context, and a prioritized plan.', links: [deep] },
      { h: 'Why AI has an opinion about you', p: 'Buyers ask AI who to trust before they call anyone. AI answers from what it can find and verify about your company, and it eliminates before it ranks.' },
    ],
    connects: [{ text: 'Same tool, on the Endless Customers side', link: { label: 'endlesscustomers.com/instant-diagnostic', path: '/instant-diagnostic', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/deep-diagnostic': {
    lede: 'The first thing everyone buys. Three weeks, 124 checkpoints across 13 areas of your business, a leadership working session, and a 3, 6, and 12-month roadmap your team can run with or without us. $5,000.',
    ctas: [{ label: 'Book an Explore Call', path: '/talk' }, instant],
    blocks: [
      { h: 'The problem', p: 'Buyers ask AI who to trust. Getting recommended is half the story; the hard part is knowing what to fix first.' },
      { h: 'What it is', kind: 'cards', items: ['124 checkpoints across 13 areas — AI visibility, website, content, sales process, CRM, reviews, team, and more', 'Competitor context — how AI and buyers see you next to the companies you lose to', 'A 90-minute leadership working session — what we found, and what your team already knows', 'Key Findings Report — the diagnosis, in plain language', 'A prioritized roadmap — what to do in the next 3, 6, and 12 months, in order', 'A live walkthrough with an Endless Customers coach'] },
      { h: 'How it works', kind: 'steps', items: ['Explore Call — 30 minutes to confirm it’s the right first step', 'Kickoff — your team fills in a short worksheet; we start the investigation', 'Working session — 90 minutes with leadership', 'Delivery — the report and roadmap, walked through live, three weeks after kickoff'] },
      { h: 'Pricing', kind: 'pricing', items: ['Deep Diagnostic & Roadmap — $5,000 one-time', 'Covered by the 100% money-back guarantee'] },
      { h: 'What happens after', p: 'The roadmap is yours with no obligation. Run it in-house, hand it to another specialist, or pick the IMPACT service it points to. Many clients start coaching; some start with HubSpot or a website.', links: [{ label: 'All services', path: '/services' }] },
      { h: 'Questions', kind: 'faq', items: ['Why does it cost $5,000? — Because three experts spend three weeks on it, and because a free assessment would tell you what you want to hear.', 'What if we already have a marketing team? — Then the roadmap becomes their plan. Most of our clients have one.', 'Do we have to keep working with IMPACT? — No. About half do.', 'What if we already know what’s wrong? — Then we’ll confirm it in a week and spend the other two on the order to fix it in.'] },
    ],
    connects: [
      { text: 'Before this: the free instant diagnostic', link: instant },
      { text: 'After this: the service the roadmap points to', link: { label: 'Services we offer', path: '/services' } },
      { text: 'Endless Customers describes the diagnostic as the first step of any implementation', link: { label: 'How to implement', path: '/how-to-implement', site: 'ec' } },
    ],
    source: 'This site is the source.',
  },
  '/guarantee': {
    lede: 'Every coaching call, every training, every deliverable. Tell us within 7 days, we redo the work, and if we still miss, you get your money back. No cap on claims, no “reasonable use” clause.',
    blocks: [
      { h: 'How it works', kind: 'steps', items: ['Tell us within 7 days — email your coach or strategist and say what missed', 'We make it right — we redo the work at no cost', 'Your money back — if it still misses, a full refund on a written explanation'] },
      { h: 'What’s covered', kind: 'cards', items: ['Coaching — every call, training, quarterly planning, and Alignment Day', 'Deep Diagnostic & Roadmap', 'Website work — audits, strategy, redesigns, optimization, Learning Center and self-service tool builds', 'HubSpot projects and training', 'Paid media management fees'] },
      { h: 'What’s not', kind: 'cards', items: ['Third-party costs — ad spend, travel, software licenses', 'Endless Customers Live — has its own refund policy', 'Endless Customers Academy — has its own refund policy'] },
      { h: 'Who to write to', p: 'Your coach or strategist, or the president directly. The address is on this page on the live site.' },
    ],
    connects: [{ text: 'Every price this guarantee covers', link: { label: 'Pricing', path: '/pricing' } }],
    source: 'This site is the source.',
  },
  '/compare': {
    lede: 'Four ways to get this done: IMPACT, a marketing agency, a freelancer, or your own team. Cost, speed, what you own at the end, and who each is right for. Written the way we teach clients to write comparisons: honestly, including when we lose.',
    blocks: [
      { h: 'The comparison', kind: 'cards', items: ['IMPACT — diagnostic first; we do the work with you and train your team to own it. Best when you want the capability to stay.', 'A marketing agency — they do the work for you and you rent the result. Best when you have no one internal and don’t plan to.', 'A freelancer — one skill, one person, cheapest per hour. Best for a single defined project.', 'Your own team — highest control, slowest start. Best when you already have the people and just need a system.'] },
      { h: 'Where we’re not the best choice', p: 'If you want everything outsourced forever, an agency is cheaper than us. If you need one landing page, hire a freelancer. If distributors sit between you and your buyer, our system underperforms.' },
      { h: 'What you own at the end', p: 'With us: the content, the site, the CRM, and a team that runs them. With an agency: a contract.' },
      { h: 'Decide', kind: 'links', links: [{ label: 'Pricing', path: '/pricing' }, { label: 'The guarantee', path: '/guarantee' }, deep] },
    ],
    connects: [{ text: 'Linked from the How We Help menu on every page', link: { label: 'Home', path: '/' } }],
  },
  '/letter': {
    lede: 'One email a week from Bob Ruffolo: what changed for buyers this week, and what to do about it. No pitch. Unsubscribe anytime.',
    blocks: [
      { h: 'Subscribe', p: 'Email field and button. Nothing else on the form.' },
      { h: 'Recent letters', kind: 'cards', tag: 'Archive, ungated', items: ['Letter title — one-line summary', 'Letter title — one-line summary', 'Letter title — one-line summary'] },
      { h: 'Why a letter', p: 'Speaking and the letter are IMPACT’s main engines for reaching owners who haven’t heard of us. Everything recorded gets repurposed.' },
    ],
  },
  '/search': { lede: 'Site search across both sites: pages, Learning Center, podcast, and coaches.', blocks: [{ h: 'Results', p: 'Answer-first: the matching Learning Center answer shows above the page results.' }] },

  '/services': {
    lede: 'Six services, one system behind them, one way in. Every service is a section of this site with its own pages, pricing, results, and experts.',
    ctas: [deep, talk],
    blocks: [
      { h: 'Start here', kind: 'cards', items: ['Deep Diagnostic & Roadmap — $5,000. Where everyone starts. Three weeks to a plan.'], links: [deep] },
      { h: 'Then the service the roadmap points to', kind: 'links', links: [{ label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'HubSpot Services', path: '/hubspot' }, { label: 'Website Services', path: '/websites' }, { label: 'Paid Media Services', path: '/paid-media' }, { label: 'Workshops', path: '/workshops' }] },
      { h: 'How they fit together', p: 'Coaching installs the system. HubSpot, website, and paid media build and amplify the foundation. Workshops are one day for teams that need a start. All of it is covered by the guarantee and all of it has a published price.' },
    ],
    connects: [{ text: 'The system all of these run on', link: { label: 'endlesscustomers.com', path: '/', site: 'ec' } }],
  },
  '/coaching/how-it-works': {
    lede: 'Alignment Day, a 90-day plan, then coaching and training every week or two until your team owns the system.',
    blocks: [
      { h: 'The sequence', kind: 'steps', items: ['Deep Diagnostic & Roadmap — the diagnosis and the plan (before coaching starts)', 'Alignment Day — leadership, sales, and marketing in one room; everyone understands the system and their role', 'First 90-day plan — benchmark where you are, set priorities', 'Coaching and training — content and video, website, assignment selling, revenue team meetings, HubSpot, practical AI', 'Quarterly planning — track, refine, reset priorities', 'Mastery — your team runs it; coaching gets lighter or ends'] },
      { h: 'What your coach does', p: 'Works like a fractional chief revenue officer: in your leadership meetings, pushing on the hard things, holding the team to the plan.' },
      { h: 'What your team owns', kind: 'cards', items: ['A content manager — writes and publishes weekly', 'A videographer — often; sometimes the content manager', 'Sales — uses content in every deal', 'Leadership — shows up to the quarterly planning'] },
    ],
    connects: [{ text: 'The same page, from the Endless Customers side', link: { label: 'How to implement', path: '/how-to-implement', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/coaching/alignment-day': {
    lede: 'The first month of coaching: one day with leadership, sales, and marketing together, so the system is a company priority and not a marketing project.',
    blocks: [
      { h: 'The day', kind: 'steps', items: ['Morning — the system, and why buyers changed', 'Midday — your business: what the diagnostic found', 'Afternoon — roles, the first 90 days, and what each team commits to'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Virtual — $10,000', 'In person — $12,500 + travel'] },
    ],
  },
  '/coaching/results': {
    lede: 'Companies that did the coaching, and what happened, in their words.',
    blocks: [
      { h: 'Results', kind: 'proof', items: ['7x revenue growth in three years — Patrick Moorhead, former CMO, Pricefx', 'Sales opportunities tripled in one year — Mike Ritzema, Founder and President, Superior Trucking Payroll', 'From one store to six — Steve Sheinkopf, CEO, Yale Appliance', '1,500 leads a month within a year — Tony Paille, CMO, AIIM International'] },
      { h: 'All success stories', kind: 'links', links: [{ label: 'Success stories', path: '/results/success-stories' }, { label: 'Reviews', path: '/results/reviews' }] },
    ],
    connects: [{ text: 'The same stories, told from the system’s side', link: { label: 'endlesscustomers.com/success-stories', path: '/success-stories', site: 'ec' } }],
  },
  '/coaching/pricing': {
    lede: 'Coaching is priced by plan, month to month, after the Deep Diagnostic and an Alignment Day.',
    blocks: [
      { h: 'Before coaching', kind: 'pricing', items: ['Deep Diagnostic & Roadmap — $5,000 one-time', 'Alignment Day — $10,000 virtual · $12,500 + travel in person'] },
      { h: 'Monthly plans', kind: 'pricing', tag: live, items: ['Guidance — $5,500/mo · bi-weekly coaching, one track', 'Mastery (recommended) — $8,000/mo · weekly coaching, sales and marketing', 'Mastery Accelerated — $10,500/mo · everything in Mastery, compressed', 'Month to month, 30-day notice'] },
      { h: 'What the full implementation costs', p: 'Coaching is one line. The others are people, video, a website that can carry it, and HubSpot. The Endless Customers pricing page lays out the total.', links: [{ label: 'Total cost of implementing the system', path: '/pricing', site: 'ec' }] },
      { h: 'Covered', p: 'Every call, training, and deliverable is covered by the 100% money-back guarantee.', links: [{ label: 'The guarantee', path: '/guarantee' }] },
    ],
    source: 'This site is the source.',
  },

  '/hubspot/training': {
    lede: 'HubSpot is only as powerful as the team using it. Training in your own portal, by certified trainers, until your team owns it.',
    blocks: [
      { h: 'Programs', kind: 'pricing', tag: live, items: ['Core — $3,500/mo · two sessions a month, one specialist, one department up to 10 people', 'Advanced — $6,000/mo · weekly sessions, multiple departments, deeper curriculum', 'Organization — $10,000/mo · multiple weekly tracks, role-based, with leadership coordination', 'On-site workshop — $12,500 + travel · a full day at your office plus 4–6 weeks of virtual follow-up', 'Minimum engagement: 3 months'] },
      { h: 'How it works', kind: 'steps', items: ['Discovery & kickoff — worksheet, then a deep dive with your specialist', 'Training roadmap — priorities and a curriculum for your team', 'Sessions — screen-share in your actual portal; your team applies it between sessions', 'Independence — the program ends when your team owns the portal'] },
      { h: 'Who trains you', kind: 'cards', items: ['Jessica Palmeri — Director of HubSpot Training', 'Joe Bachir — HubSpot Trainer', 'Kaitlyn Petro — HubSpot Trainer'] },
    ],
  },
  '/hubspot/onboarding': {
    lede: 'New to HubSpot, or starting over. Portal setup, pipelines, marketing hub activation, dashboards, and Breeze AI, configured for how your team actually sells.',
    blocks: [
      { h: 'What we set up', kind: 'cards', items: ['CRM & sales pipeline — stages, properties, automation', 'Marketing Hub — forms, email, workflows, lead scoring', 'Reporting — dashboards your leadership team believes', 'Breeze AI — agents and assistants configured to your data'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Onboarding projects — $3,000 to $15,000+, quoted after a scoping call'] },
      { h: 'Then training', p: 'Onboarding without training is a portal nobody uses. Most onboarding clients continue with Core training.', links: [{ label: 'Training', path: '/hubspot/training' }] },
    ],
  },
  '/hubspot/cleanup': {
    lede: '“Our HubSpot is a mess and nobody trusts the numbers.” A portal audit, then the cleanup: data, properties, workflows, and reporting, so the numbers mean something again.',
    blocks: [
      { h: 'The audit', kind: 'cards', items: ['Data — duplicates, dead contacts, broken associations', 'Properties — what’s used, what’s noise', 'Workflows — what’s firing, what’s fighting', 'Reporting — which dashboards are lying'] },
      { h: 'The cleanup', kind: 'steps', items: ['Audit — a written findings report', 'Fix — in priority order, with your team watching', 'Train — so it stays clean'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Portal audit & cleanup — $3,000 to $15,000+, quoted'] },
    ],
  },
  '/hubspot/integrations': {
    lede: 'HubSpot connected to the systems you run on: ERP, accounting, e-commerce, field service, and the migrations that come with them.',
    blocks: [
      { h: 'What we integrate', kind: 'cards', items: ['Migrations — from Salesforce and other CRMs', 'ERP and accounting — NetSuite, QuickBooks, and others', 'E-commerce — Shopify and others', 'Custom — via our integration partner where the work needs engineers'] },
      { h: 'How we set migrations up for success', kind: 'steps', items: ['Map — what moves, what dies', 'Test — in a sandbox, with your data', 'Cut over — with a rollback plan', 'Train — on the new setup'] },
      { h: 'Pricing', kind: 'pricing', items: ['Quoted per project after scoping'] },
    ],
  },
  '/hubspot/trust-theme': {
    lede: 'The Trust theme: IMPACT’s HubSpot CMS theme, built so a marketing manager with no developer can build and maintain a site that looks like it had one.',
    blocks: [
      { h: 'What it is', kind: 'cards', items: ['A module library — pages built from proven, flexible blocks', 'Conversion-ready — pricing, comparison, and Learning Center patterns built in', 'Yours to run — your team changes pages without calling anyone'] },
      { h: 'In their words', kind: 'proof', items: ['We were able to quickly rebuild our entire website — Chase Shugarman, Shugarman’s Bath', 'I really love how easy it is to build pages optimized for conversions — Ingrid Ellis, The Metiss Group'] },
      { h: 'Get it', p: 'Included in every IMPACT website build; available on the HubSpot marketplace on its own.', links: [{ label: 'Website Services', path: '/websites' }] },
    ],
    connects: [{ text: 'Shared between HubSpot Services and Website Services', link: { label: 'Website Services', path: '/websites' } }],
  },
  '/hubspot/results': {
    lede: 'What HubSpot clients say, and the numbers behind it.',
    blocks: [
      { h: 'In their words', kind: 'proof', items: ['IMPACT’s overall customized approach and strategy to training is far superior to anything else — Chris Garnett, Chief Marketing & Sales Officer, PartnerMD', 'From knowing almost nothing about online marketing to taking on my own projects within HubSpot, in just months — Janine Estolas, Western States Metal Roofing', 'They trained our team on how to utilize the HubSpot platform… Hands down the best decision our business made — Nikki Oerum, The Paseo Club'] },
      { h: 'Independently', kind: 'cards', items: ['5.0 on the HubSpot directory — 327+ reviews', 'HubSpot Diamond Solutions Partner — 15+ years, 2x Partner of the Year, 27 certifications'] },
    ],
  },
  '/hubspot/pricing': {
    lede: 'Training by program, projects by scope. All of it on this page.',
    blocks: [
      { h: 'Training', kind: 'pricing', tag: live, items: ['Core — $3,500/mo', 'Advanced — $6,000/mo', 'Organization — $10,000/mo', 'On-site workshop — $12,500 + travel', 'Minimum engagement: 3 months'] },
      { h: 'Projects', kind: 'pricing', tag: live, items: ['Onboarding, audit & cleanup, pipeline configuration, Marketing Hub activation, dashboards, Breeze AI — $3,000 to $15,000+', 'Migrations and integrations — quoted'] },
      { h: 'What makes it bigger or smaller', kind: 'cards', items: ['People — how many need training', 'Departments — one or several', 'Portal state — clean or a rescue', 'Systems — what has to connect'] },
      { h: 'Covered', p: 'Every project and training session is covered by the 100% money-back guarantee.', links: [{ label: 'The guarantee', path: '/guarantee' }] },
    ],
    connects: [{ text: 'All IMPACT pricing on one page', link: { label: 'Pricing', path: '/pricing' } }],
  },
  '/hubspot/experts': {
    lede: 'The HubSpot team. Certified, in your portal, and the same people every session.',
    blocks: [
      { h: 'The team', kind: 'cards', items: ['Jessica Palmeri — Director of HubSpot Training', 'Joe Bachir — HubSpot Trainer', 'Kaitlyn Petro — HubSpot Trainer', 'Integration partner — engineers for migrations and custom integrations'] },
      { h: 'Credentials', kind: 'cards', items: ['HubSpot Diamond Solutions Partner', '27 certifications across the team', '2x HubSpot Partner of the Year'] },
    ],
    connects: [{ text: 'The whole company', link: { label: 'Meet our team', path: '/team' } }],
  },

  '/websites/redesign': {
    lede: 'A website your buyers and AI can trust, built on a proven modular framework by experienced strategists, and handed to your team to run.',
    blocks: [
      { h: 'What you get', kind: 'cards', items: ['Strategy & site architecture', 'Messaging & homepage content', 'The Trust theme module library', 'Content direction & coaching', 'Page building & development', 'SEO & AI discoverability', 'Launch support & optimization'] },
      { h: 'How it works', kind: 'steps', items: ['Discovery & scoping', 'Strategy & research', 'Content & design', 'Build', 'QA, redirects & migration', 'Launch', 'Training & optimization'] },
      { h: 'Timelines', kind: 'cards', items: ['Simple migration — 3 months', 'Typical redesign — 4 to 7 months', 'Complex custom build — 12+ months'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Enhanced — $30,000 to $60,000', 'Elite — from $63,000', 'Full range — $25,000 to $155,000'] },
      { h: 'Results', kind: 'proof', items: ['$900K+ highest-grossing day in company history; 700+ leads in the first month — Zintex Home Remodeling', '55% more organic traffic, 4x qualified pipeline, 7x revenue over three years — Patrick Moorhead, Pricefx'] },
    ],
  },
  '/websites/optimization': {
    lede: 'You have a site. It isn’t working hard enough. Monthly optimization and training so your team makes it better every week.',
    blocks: [
      { h: 'What we do monthly', kind: 'cards', items: ['Conversion — what stops people, fixed', 'AI discoverability — what AI can’t verify, fixed', 'Speed and health', 'Training — your team learns each fix'] },
      { h: 'Pricing', kind: 'pricing', items: ['Monthly, quoted by site size and scope'] },
    ],
  },
  '/websites/learning-center-builds': {
    lede: 'A Learning Center is the engine of the system: search first, filters for problem, role, and industry, answer-first, ungated. We build it on your site.',
    blocks: [
      { h: 'What it is', kind: 'cards', items: ['Search first', 'Filters — problem, role, industry, and focus area', 'Type on the card — article, video, tool', 'Answer-first, ungated'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Learning Center build — from $5,000'] },
    ],
    connects: [{ text: 'Ours, as the reference', link: { label: 'The IMPACT Learning Center', path: '/learn' } }],
  },
  '/websites/self-service-tools': {
    lede: 'Pricing calculators, self-assessments, product selectors: the tools that let buyers answer their own question and trust you for letting them.',
    blocks: [
      { h: 'Examples', kind: 'cards', items: ['Pricing calculator', 'Self-assessment / diagnostic', 'Product or service selector', 'Cost comparison'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Strategy — $3,000', 'Builds — $5,000 to $70,000'] },
    ],
  },
  '/websites/pricing': {
    lede: 'Every website service, priced.',
    blocks: [
      { h: 'Prices', kind: 'pricing', tag: live, items: ['Redesign — $25,000 to $155,000 (Enhanced $30K–$60K; Elite from $63K)', 'Optimization & training — monthly, quoted', 'Learning Center build — from $5,000', 'Self-service tools — strategy $3,000; builds $5,000 to $70,000'] },
      { h: 'What drives cost up', kind: 'cards', items: ['Page count and custom templates', 'Migration complexity and redirects', 'Custom tools and integrations', 'Content we write versus content you write'] },
      { h: 'Covered', p: 'Every website deliverable is covered by the 100% money-back guarantee.', links: [{ label: 'The guarantee', path: '/guarantee' }] },
    ],
    connects: [{ text: 'All IMPACT pricing on one page', link: { label: 'Pricing', path: '/pricing' } }],
  },
  '/websites/experts': {
    lede: 'Experienced strategists lead every project, not junior staff.',
    blocks: [{ h: 'The team', kind: 'cards', items: ['Mary Brown — Lead Website Strategist', 'Janet Mendez — Website Strategist', 'Joe Rinaldi — Creative Director, Brand', 'Melissa Smith — Web Team Manager, Sr. Front-end Developer', 'Daniel Escardo — Sr. Front-end Developer'] }],
    connects: [{ text: 'The whole company', link: { label: 'Meet our team', path: '/team' } }],
  },

  '/paid-media/management': {
    lede: 'Do it for you: campaign management, creative, optimization, and reporting tied to revenue, on Google, Meta, LinkedIn, Microsoft, YouTube, and more.',
    blocks: [
      { h: 'What’s included', kind: 'cards', items: ['Campaign management', 'Ad copy & creative', 'Routine optimization', 'Real-time spend visibility', 'Reporting tied to revenue', 'Bi-weekly strategy calls'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['$20K–$100K monthly spend — $5,000/mo base + 15% (to $29,999), 12% ($30K–$64,999), 10% ($65K–$99,999)', '$100K+ monthly spend — $7,000/mo base + negotiated performance fee', 'Minimum ad spend — $20,000/mo'] },
    ],
  },
  '/paid-media/consulting': {
    lede: 'Do it with you: a strategist trains your team to run the ads, so the capability stays in-house.',
    blocks: [
      { h: 'What you get', kind: 'cards', items: ['Monthly strategy call', 'Account reviews', 'Skill training — search, social, video, measurement', 'Async support'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Consulting & training — $4,000/mo', 'Minimum ad spend — $10,000/mo'] },
    ],
  },
  '/paid-media/results': {
    lede: 'What Swell clients say.',
    blocks: [{ h: 'In their words', kind: 'proof', items: ['Our return on ad spend is about 13x — Matthew Marshall, Southwest Exteriors', 'Highly intelligent, proactive, and communicative — Matt Bowley, Illume Fertility', 'An extension of our internal team — Kara Consigli, Circle Furniture', 'Average client relationship 3 to 4 years; longest 7+'] }],
  },
  '/paid-media/pricing': {
    lede: 'Two ways to work with the Swell team, both priced here.',
    blocks: [
      { h: 'Management', kind: 'pricing', tag: live, items: ['$5,000/mo base + 10–15% performance fee on $20K–$100K monthly spend', '$7,000/mo base + negotiated fee above $100K'] },
      { h: 'Consulting & training', kind: 'pricing', tag: live, items: ['$4,000/mo'] },
      { h: 'Minimums', kind: 'cards', items: ['Managed — $20,000/mo ad spend', 'Consulting — $10,000/mo ad spend'] },
      { h: 'Covered', p: 'Management fees are covered by the guarantee; ad spend is not.', links: [{ label: 'The guarantee', path: '/guarantee' }] },
    ],
    connects: [{ text: 'All IMPACT pricing on one page', link: { label: 'Pricing', path: '/pricing' } }],
  },
  '/paid-media/experts': {
    lede: 'The Swell team.',
    blocks: [{ h: 'The team', kind: 'cards', items: ['Jason Linde — Google Ads Lead, Paid Media Specialist', 'Tanner Holman — Paid Social Strategist'] }],
    connects: [{ text: 'The whole company', link: { label: 'Meet our team', path: '/team' } }],
  },
  '/workshops': {
    lede: 'One day with your leadership or sales team, in person or virtual. You leave with a plan they’ll actually run. The only service that isn’t a section of its own.',
    ctas: [talk],
    blocks: [
      { h: 'Workshops', kind: 'cards', items: ['Endless Customers for leadership — the system, and what it asks of the company', 'Assignment selling for sales teams — using content in every deal', 'HubSpot on-site — a day in your portal', 'AI for marketing teams — practical, in your tools'] },
      { h: 'Pricing', kind: 'pricing', items: ['Quoted by room size and travel'] },
    ],
    connects: [{ text: 'Speaking is the other way to bring this to a room', link: { label: 'Request a speaker', path: '/speaking' } }],
  },

  '/results/success-stories': {
    lede: 'Companies that did the work, and what happened. Filter by service and industry.',
    blocks: [
      { h: 'Stories', kind: 'proof', items: ['7x revenue growth in three years — Patrick Moorhead, former CMO, Pricefx', 'Sales opportunities tripled — Mike Ritzema, Superior Trucking Payroll', 'From one store to six — Steve Sheinkopf, CEO, Yale Appliance', '$900K+ highest-grossing day after the site launch — Zintex Home Remodeling', '1,500 leads a month — Tony Paille, CMO, AIIM International'] },
      { h: 'Filters', kind: 'cards', items: ['By service — coaching, HubSpot, website, paid media', 'By industry — the eight we serve', 'By problem — the eight we solve'] },
    ],
    connects: [{ text: 'The same stories on the Endless Customers side, told from the system’s point of view', link: { label: 'endlesscustomers.com/success-stories', path: '/success-stories', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/results/website-portfolio': {
    lede: 'Sites we built, with what they were built to do and what happened after.',
    blocks: [{ h: 'Portfolio', kind: 'cards', tag: 'From the live site', items: ['Zintex Home Remodeling', 'Bird Technologies', 'McClone Insurance', 'Brennan Corp', 'Deep Root Analytics', 'PSM Brokerage'] }],
    connects: [{ text: 'The service behind it', link: { label: 'Website Services', path: '/websites' } }],
  },
  '/results/awards': {
    lede: 'What others have said about the work.',
    blocks: [{ h: 'Recognition', kind: 'cards', items: ['HubSpot Diamond Solutions Partner', '2x HubSpot Partner of the Year', 'BBB A+, accredited since 2011', 'Clutch and DesignRush verified'] }],
  },
  '/results/reviews': {
    lede: 'Links to every third-party review profile. We never host review markup ourselves; the point is that you can check.',
    blocks: [{ h: 'Where to read them', kind: 'cards', items: ['HubSpot directory — 5.0, 327+ reviews', 'Google — 5.0, 36+ reviews', 'Clutch — 4.9', 'Facebook — 94% recommend', 'BBB — A+'] }],
  },

  '/about': {
    lede: 'A marketing and sales training company, founded in 2009 in Cheshire, Connecticut, that runs on the system it teaches.',
    blocks: [
      { h: 'Our story', p: 'Started as an agency in 2009. Learned that clients who owned their growth kept it, and became a training and coaching company that also does the work. The company behind Endless Customers.' },
      { h: 'Mission', p: 'Creating heroes, growing businesses, changing lives.' },
      { h: 'Values', kind: 'cards', items: ['Say what others won’t', 'Teach, don’t do it for them', 'Own the outcome', 'Run on the system'] },
      { h: 'Facts', kind: 'cards', items: ['Founded 2009', '125 Commerce Ct STE 9, Cheshire, CT 06410', 'HubSpot Diamond Solutions Partner', 'Runs on EOS'] },
    ],
    connects: [{ text: 'The system’s own story', link: { label: 'What is Endless Customers?', path: '/what-is-endless-customers', site: 'ec' } }],
  },
  '/team': {
    lede: 'Everyone at IMPACT, by team. Coaches also appear in the Endless Customers coach directory, which lists certified independent coaches too.',
    blocks: [
      { h: 'Leadership', kind: 'cards', items: ['Bob Ruffolo — Founder and CEO', 'Katie Coelho — President', 'Nicole Cimo — VP of Sales & Marketing', 'Rachel Palmateer — VP of Agency Services', 'Melanie Moore — VP of Finance & Admin', 'Marcus Sheridan — Partner, Author, Keynote Speaker'] },
      { h: 'Coaches', kind: 'cards', items: ['Allison Belles — Executive Coach', 'Vin Gaeta — Executive Coach', 'Brian Casey — Sr. Coach', 'John Becker — Coach', 'Reagan Cotton — Coach', 'Austin Mock — Coach', 'Mandy York — Coach', 'Derek Baer — Sales Coach and Advisor'], links: [{ label: 'The full coach directory, including certified independent coaches', path: '/coaches', site: 'ec' }] },
      { h: 'HubSpot', kind: 'cards', items: ['Jessica Palmeri — Director of HubSpot Training', 'Joe Bachir — HubSpot Trainer', 'Kaitlyn Petro — HubSpot Trainer'] },
      { h: 'Websites', kind: 'cards', items: ['Mary Brown — Lead Website Strategist', 'Janet Mendez — Website Strategist', 'Joe Rinaldi — Creative Director', 'Melissa Smith — Web Team Manager', 'Daniel Escardo — Sr. Front-end Developer'] },
      { h: 'Paid media (Swell)', kind: 'cards', items: ['Jason Linde — Google Ads Lead', 'Tanner Holman — Paid Social Strategist'] },
    ],
    connects: [{ text: 'Coach profiles live on endlesscustomers.com; this page links to them rather than duplicating them', link: { label: 'endlesscustomers.com/coaches', path: '/coaches', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/speaking': {
    lede: 'Bob Ruffolo and Marcus Sheridan speak to owner groups and industry events about what AI changed for buyers, and what to do about it.',
    blocks: [
      { h: 'Keynotes', kind: 'cards', items: ['Will AI recommend you? — how buyers choose now, and how to be the answer', 'Endless Customers — the system, for leadership audiences', 'Conversations that close — assignment selling for sales teams'] },
      { h: 'Request', p: 'Event, date, audience, and what you want them to leave with. We publish speaking fees.' },
    ],
    connects: [{ text: 'Marcus’s own speaking site', link: { label: 'marcussheridan.com', path: '/', site: 'impact' } }],
  },
  '/careers': { lede: 'Do work that makes clients better at their jobs.', blocks: [{ h: 'Open roles', kind: 'cards', tag: 'Feed', items: ['Role — team, location'] }, { h: 'How we work', p: 'Remote-first, runs on EOS, everyone learns the system.' }] },
  '/learn': {
    lede: 'Answers first, no forms. Search, then filter by the problem you have, your role, and your industry. Every piece is labeled by type. One library, with a door on each site.',
    blocks: [
      { h: 'Search', p: 'The search box is the page. Results are answer-first: the matching answer shows before the list.' },
      { h: 'Filters', kind: 'cards', items: ['Problem — the eight we solve', 'Role — owner, marketing, sales', 'Industry — the eight we serve', 'Focus area — AI visibility, content, video, HubSpot, website, sales, team'] },
      { h: 'Types', kind: 'cards', items: ['Article', 'Video', 'Podcast', 'Webinar', 'Tool', 'Guide'] },
      { h: 'Free tools', kind: 'links', links: [instant, { label: 'AI Visibility Study', path: '/ai-visibility-study' }] },
    ],
    connects: [{ text: 'The same library, through the Endless Customers door', link: { label: 'endlesscustomers.com/learn', path: '/learn', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/ai-visibility-study': {
    lede: 'How AI describes your industry, which companies it recommends, and why. Our own research, updated as the answers change.',
    blocks: [{ h: 'By industry', kind: 'links', links: industries.filter((l) => !l.whenProof).map((l) => ({ label: l.label, path: l.path })) }, { h: 'Method', p: 'The prompts a buyer would use, run against ChatGPT, Gemini, and Perplexity, recorded and compared over time.' }],
  },
  '/events': {
    lede: 'Live sessions on what’s changing and what to do about it, plus the conference.',
    blocks: [{ h: 'Upcoming', kind: 'cards', tag: 'Feed', items: ['Endless Customers Live — Hartford, CT, October 5–7, 2026', 'Endless Customers Live — Chicago, IL, April 5–7, 2027', 'Webinar — title, date'] }],
    connects: [{ text: 'The conference lives on the Endless Customers site', link: { label: 'endlesscustomers.com/conference', path: '/conference', site: 'ec' } }],
  },
  '/privacy': { lede: 'Privacy policy.', blocks: [{ h: 'Policy', p: 'Carried over from the live site.' }] },
  '/terms': { lede: 'Terms of service.', blocks: [{ h: 'Terms', p: 'Carried over from the live site.' }] },
};

// Problem router pages: the problem in the buyer's words, how IMPACT approaches it, which services
// apply, proof, and where to start. Short on purpose; the Learning Center carries the depth.
const problemServices: Record<string, NavLink[]> = {
  '/help/ai-visibility': [deep, { label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'Website Services', path: '/websites' }],
  '/help/leads': [deep, { label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'Paid Media Services', path: '/paid-media' }],
  '/help/sales': [{ label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'HubSpot Services', path: '/hubspot' }, { label: 'Workshops', path: '/workshops' }],
  '/help/content': [{ label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'Website Services', path: '/websites' }],
  '/help/reviews': [{ label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'HubSpot Services', path: '/hubspot' }],
  '/help/crm': [{ label: 'HubSpot Services', path: '/hubspot' }],
  '/help/ai': [{ label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'HubSpot Services', path: '/hubspot' }, { label: 'Workshops', path: '/workshops' }],
  '/help/team': [{ label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'Workshops', path: '/workshops' }],
};
for (const u of useCases) {
  impact[u.path] = {
    lede: `A short router page. The problem in your words, how IMPACT approaches ${u.label.toLowerCase()}, which services apply, proof from companies that had the same problem, and where to start.`,
    ctas: [instant, talk],
    blocks: [
      { h: 'Sound familiar?', p: 'Three or four sentences in the buyer’s words, taken from real sales calls, so the reader knows within ten seconds they’re in the right place.' },
      { h: 'How we approach it', p: 'The Endless Customers position on this problem, in plain language, with the one thing most companies get wrong.' },
      { h: 'Services that apply', kind: 'links', links: problemServices[u.path] ?? [deep] },
      { h: 'Proof', kind: 'proof', tag: 'From the testimonials library', items: ['A result from a company that came with this problem — name, title, company'] },
      { h: 'Learn more', kind: 'links', links: [{ label: `Learning Center, filtered to ${u.label.toLowerCase()}`, path: '/learn' }] },
      { h: 'Where to start', kind: 'links', links: [instant, deep] },
    ],
    connects: [{ text: 'Listed under How We Help › Problems we solve on every page', link: { label: 'Home', path: '/' } }],
  };
}
for (const i of industries) {
  impact[i.path] = {
    lede: `Who we have worked with in ${i.label.toLowerCase()}, what works in this market, how AI describes it, and the proof.`,
    ctas: [instant, talk],
    blocks: [
      { h: 'How buyers choose in this market', p: 'What they search, what they ask AI, what they need to see before they call. From our AI Visibility Study for this industry.', links: [{ label: 'AI Visibility Study', path: '/ai-visibility-study' }] },
      { h: 'What works here', p: 'The three or four moves that reliably work in this industry, and the one that doesn’t.' },
      { h: 'Companies we have worked with', kind: 'cards', tag: i.whenProof ? 'Hidden from the nav until there is proof' : 'From the testimonials library', items: ['Company — result, in their words'] },
      { h: 'Services that fit', kind: 'links', links: [deep, { label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'Website Services', path: '/websites' }] },
      { h: 'Learn more', kind: 'links', links: [{ label: `Learning Center, filtered to ${i.label.toLowerCase()}`, path: '/learn' }] },
    ],
    connects: [{ text: 'Listed under How We Help › Industries we serve on every page', link: { label: 'Home', path: '/' } }],
  };
}

const ec: Record<string, Outline> = {
  '/book': {
    lede: 'Endless Customers, by Marcus Sheridan. The national best-seller, previously They Ask, You Answer, on becoming the most known, trusted, and recommended company in your market. Read the first chapter free.',
    ctas: [{ label: 'Get the first chapter', path: '/book' }, { label: 'Buy the book', path: '/book' }],
    blocks: [
      { h: 'What it teaches', kind: 'cards', items: ['Say what others won’t — the questions buyers ask, answered honestly', 'Show what others hide — pricing, problems, comparisons', 'Sell with content — assignment selling', 'Build the team — content manager, videographer, and a sales team that uses it', 'Be recommended by AI — the new chapter'] },
      { h: 'The companion guide', p: 'The 90-day starter guide and the toolkit, free.' },
      { h: 'Where to buy', kind: 'cards', items: ['Amazon', 'Barnes & Noble', 'Audible', 'Bulk orders for teams'] },
      { h: 'After the book', kind: 'links', links: [{ label: 'How to implement', path: '/how-to-implement' }, { label: 'Get coaching & training', path: '/coaching' }] },
    ],
    source: 'This site is the source.',
  },
  '/pricing': {
    lede: 'What it really costs to implement Endless Customers, with and without a coach. People, video, a website that can carry it, HubSpot, and coaching, in ranges, so you decide with your eyes open.',
    blocks: [
      { h: 'On your own', kind: 'pricing', items: ['The book and guides — under $50', 'A content manager — a full-time salary', 'Video — a videographer or a content manager who shoots', 'A website that can carry a Learning Center — $25,000 to $155,000 if you rebuild', 'HubSpot — license plus setup'] },
      { h: 'With the Academy', kind: 'pricing', items: ['Endless Customers Academy — per-seat, annual'] },
      { h: 'With a coach', kind: 'pricing', tag: live, items: ['Deep Diagnostic & Roadmap — $5,000', 'Alignment Day — $10,000 virtual · $12,500 + travel', 'Coaching — $5,500 to $10,500/mo, month to month'] },
      { h: 'The specifics', p: 'Coaching, HubSpot, website, and paid media prices in full are on IMPACT’s pricing page; IMPACT delivers them.', links: [{ label: 'impactplus.com/pricing', path: '/pricing', site: 'impact' }] },
    ],
    connects: [{ text: 'Every IMPACT service, priced', link: { label: 'impactplus.com/pricing', path: '/pricing', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/book-a-call': {
    lede: 'A 30-minute conversation with someone at IMPACT who has done this with hundreds of companies. What you’re trying to do, what’s in the way, and whether the Deep Diagnostic is the right first step.',
    blocks: [
      { h: 'Who you’ll talk to', p: 'IMPACT’s team. IMPACT is the company behind Endless Customers and the one that delivers coaching.' },
      { h: 'Book', p: 'The calendar, on this page.' },
      { h: 'Not ready?', kind: 'links', links: [{ label: 'Free instant AI diagnostic', path: '/instant-diagnostic' }, { label: 'How to implement', path: '/how-to-implement' }] },
    ],
    connects: [{ text: 'The same booking on the IMPACT side', link: { label: 'impactplus.com/talk', path: '/talk', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/success-stories': {
    lede: 'Companies that became the most known, trusted, and recommended in their market. What they changed, and the numbers.',
    blocks: [
      { h: 'Stories', kind: 'proof', items: ['7x revenue growth in three years — Patrick Moorhead, former CMO, Pricefx', 'Sales opportunities tripled — Mike Ritzema, Superior Trucking Payroll', 'From one store to six — Steve Sheinkopf, CEO, Yale Appliance', 'All of our new prospects are chasing us — Brian Paulson, CSI Accounting and Payroll'] },
      { h: 'Hear them tell it', kind: 'links', links: [{ label: 'The Podcast', path: '/podcast' }, { label: 'The Conference', path: '/conference' }] },
    ],
    connects: [{ text: 'The same stories on the IMPACT side, filtered by service', link: { label: 'impactplus.com/results/success-stories', path: '/results/success-stories', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/coaches': {
    lede: 'Every certified Endless Customers coach, in one place: IMPACT’s own coaches and certified independent coaches, listed together. Who they are, what they’ve done, and which industries they know.',
    blocks: [
      { h: 'IMPACT coaches', kind: 'cards', items: ['Allison Belles — Executive Coach', 'Vin Gaeta — Executive Coach', 'Brian Casey — Sr. Coach', 'John Becker — Coach', 'Reagan Cotton — Coach', 'Austin Mock — Coach', 'Mandy York — Coach'] },
      { h: 'Certified independent coaches', kind: 'cards', tag: 'From the live coach directory', items: ['Coach — company, region, industries'] },
      { h: 'Filter', kind: 'cards', items: ['By industry', 'By region', 'By specialty — content, video, sales, HubSpot'] },
      { h: 'Want to be listed?', kind: 'links', links: [{ label: 'Become a coach', path: '/become-a-coach' }] },
    ],
    connects: [{ text: 'IMPACT’s team page links here rather than duplicating profiles', link: { label: 'impactplus.com/team', path: '/team', site: 'impact' } }],
    source: 'This site is the source.',
  },
  '/become-a-coach': {
    lede: 'Teach the system. Build a practice around it. IMPACT’s certified coach program for consultants and agencies.',
    blocks: [
      { h: 'What you get', kind: 'cards', items: ['Certification', 'The playbooks and tools', 'A listing in the directory', 'Referrals'] },
      { h: 'What it takes', kind: 'cards', items: ['Experience implementing the system', 'Training and assessment', 'Annual renewal'] },
      { h: 'Apply', p: 'A short form and a conversation.' },
    ],
  },
  '/learn': {
    lede: 'Everything we know about the system, free and ungated. The same library as IMPACT’s, through the Endless Customers door.',
    blocks: [{ h: 'Search', p: 'Answer-first, filters for problem, role, industry, and focus area.' }, { h: 'Start with', kind: 'links', links: [{ label: 'What is Endless Customers?', path: '/what-is-endless-customers' }, { label: 'How to implement', path: '/how-to-implement' }, { label: 'The Podcast', path: '/podcast' }] }],
    connects: [{ text: 'One library, two doors', link: { label: 'impactplus.com/learn', path: '/learn', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/what-is-endless-customers': {
    lede: 'The system, in five minutes. Built for a world where buyers research everything online, ask AI who to trust, and choose the company that shows up as the most credible and helpful.',
    blocks: [
      { h: 'The idea', p: 'Become the most known, trusted, and recommended company in your market by answering what buyers ask, showing what others hide, and teaching your own team to do it.' },
      { h: 'The five parts', kind: 'cards', items: ['Content — the questions buyers research, answered', 'Website — your most powerful sales asset', 'Sales — assignment selling with content', 'Technology — CRM, automation, analytics, AI', 'Culture — sales and marketing on one strategy'] },
      { h: 'In the age of AI', p: 'Brands that consistently publish trustworthy, educational content are the ones AI recommends. The system is how you become one.' },
      { h: 'Next', kind: 'links', links: [{ label: 'The book', path: '/book' }, { label: 'How to implement', path: '/how-to-implement' }] },
    ],
    source: 'This site is the source.',
  },
  '/academy': {
    lede: 'Learn the system, course by course, with your team. For companies that want structure without a coach.',
    blocks: [{ h: 'Courses', kind: 'cards', items: ['Content that sells', 'Video for business', 'Assignment selling', 'HubSpot for Endless Customers', 'AI in the system'] }, { h: 'Pricing', kind: 'pricing', items: ['Per seat, annual'] }, { h: 'Log in', p: 'Academy login is the account icon in the header.' }],
  },
  '/instant-diagnostic': {
    lede: 'Ask AI about your company. See what it says. Free, about a minute.',
    blocks: [{ h: 'The tool', p: 'The same instant diagnostic as on impactplus.com.' }, { h: 'Then', kind: 'links', links: [{ label: 'How to implement', path: '/how-to-implement' }, { label: 'Get coaching & training', path: '/coaching' }] }],
    connects: [{ text: 'Same tool, IMPACT side', link: { label: 'impactplus.com/instant-diagnostic', path: '/instant-diagnostic', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/conference': {
    lede: 'Endless Customers Live. Two days with the people actually doing this. Hartford, CT, October 5–7, 2026, and Chicago, IL, April 5–7, 2027.',
    ctas: [{ label: 'Register for Hartford', path: '/conference' }],
    blocks: [
      { h: 'Upcoming', kind: 'cards', items: ['Hartford, CT — October 5–7, 2026', 'Chicago, IL — April 5–7, 2027'] },
      { h: 'What it’s like', p: 'Sessions from clients on stage, workshops with coaches, and two days with a few hundred people running the same system.' },
      { h: 'Pages', kind: 'cards', items: ['What it’s like', 'Past events', 'Become a sponsor', 'Convince your boss'] },
    ],
    connects: [{ text: 'IMPACT’s events page points here', link: { label: 'impactplus.com/events', path: '/events', site: 'impact' } }],
    source: 'This site is the source.',
  },
  '/webinars': { lede: 'Live sessions on what’s changing and what to do about it.', blocks: [{ h: 'Upcoming and on demand', kind: 'cards', tag: 'Feed', items: ['The Great Agency Reckoning: What’s Still Worth Paying For in the Age of AI', 'How to Prepare for Agentic Buying and the Future of Search'] }] },
  '/podcast': { lede: 'Real conversations about how companies win attention, build trust, and grow with the Endless Customers System. Weekly.', blocks: [{ h: 'Latest', kind: 'cards', tag: 'Feed', items: ['Ep. 175 — How He Built a 600-page Website Without Knowing How to Code', 'Ep. 174 — How Far Can AI Take Your Endless Customers Strategy?', 'Ep. 173 — Who Should Use ChatGPT Ads, and Who Should Wait?'] }, { h: 'Listen', kind: 'cards', items: ['Apple Podcasts', 'Spotify', 'YouTube'] }] },
  '/privacy': { lede: 'Privacy policy.', blocks: [{ h: 'Policy', p: 'Shared with impactplus.com.' }] },
  '/terms': { lede: 'Terms of service.', blocks: [{ h: 'Terms', p: 'Shared with impactplus.com.' }] },
};

export const outlines: Record<SiteId, Record<string, Outline>> = { impact, ec };
