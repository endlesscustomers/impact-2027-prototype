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
const instant: NavLink = { label: 'Free Instant Diagnostic', path: '/instant-diagnostic' };
const deep: NavLink = { label: 'Deep Diagnostic & Roadmap', path: '/deep-diagnostic' };
const ecCall: NavLink = { label: 'Book a Free Call', path: '/book-a-call' };
const live = 'Live-site figure, to verify for 2027';

const impact: Record<string, Outline> = {
  '/pricing': {
    lede: 'Every price we charge, on one page. Ranges where the work varies, and what moves the number. Three in five agencies we checked won’t do this; we tell our clients to, so we do.',
    ctas: [deep, talk],
    blocks: [
      { h: 'Where Everyone Starts', kind: 'pricing', items: ['Free Instant Diagnostic — $0, about a minute, how AI describes you today', 'Deep Diagnostic & Roadmap — $5,000 one-time, three weeks, 124 checkpoints and a 3/6/12-month roadmap'] },
      { h: 'Endless Customers Coaching', kind: 'pricing', tag: live, items: ['Alignment Day (First Month) — $10,000 virtual · $12,500 + travel in person', 'Guidance — $5,500/mo', 'Mastery (Recommended) — $8,000/mo', 'Mastery Accelerated — $10,500/mo', 'All Plans Month-To-Month, 30-Day Notice'], links: [{ label: 'Coaching Pricing in Detail', path: '/coaching/pricing' }] },
      { h: 'HubSpot Services', kind: 'pricing', tag: live, items: ['Core Training — $3,500/mo', 'Advanced Training — $6,000/mo', 'Organization Training — $10,000/mo', 'On-Site Workshop — $12,500 + travel', 'Projects (Onboarding, Cleanup, Integrations, Dashboards) — $3,000 to $15,000+, quoted'], links: [{ label: 'HubSpot Pricing in Detail', path: '/hubspot/pricing' }] },
      { h: 'Website Services', kind: 'pricing', tag: live, items: ['Redesign — $25,000 to $155,000 (Enhanced $30K-$60K; Elite from $63K)', 'Learning Center Build — from $5,000', 'Self-Service Tool — strategy $3,000; builds $5,000 to $70,000', 'Optimization & Training — monthly, quoted'], links: [{ label: 'Website Pricing in Detail', path: '/websites/pricing' }] },
      { h: 'Paid Media Services', kind: 'pricing', tag: live, items: ['Management — $5,000/mo base + 10-15% performance fee ($20K-$100K monthly spend); $7,000/mo base above $100K', 'Consulting & Training — $4,000/mo', 'Minimum Ad Spend — $20,000/mo managed; $10,000/mo consulting'], links: [{ label: 'Paid Media Pricing in Detail', path: '/paid-media/pricing' }] },
      { h: 'Workshops', kind: 'pricing', items: ['One-Day Workshop — quoted by room size and travel'] },
      { h: 'What Changes the Price', kind: 'cards', items: ['Team Size — more people in the room means more sessions', 'Departments — sales and marketing together costs more than one', 'Speed — accelerated plans compress the same work into fewer months', 'Complexity — integrations, migrations, and custom builds are quoted'] },
      { h: 'Every Service Is Covered', p: 'Tell us within 7 days, we redo the work, and if we still miss, you get your money back in full. No cap, no “reasonable use” clause.', links: [{ label: 'Read the Guarantee', path: '/guarantee' }] },
    ],
    connects: [
      { text: 'What implementing the system costs in total, with or without a coach', link: { label: 'endlesscustomers.com/pricing', path: '/pricing', site: 'ec' } },
      { text: 'How we compare to an agency, a freelancer, or in-house', link: { label: 'Compare Your Options', path: '/compare' } },
    ],
    source: 'This site is the source.',
  },
  '/talk': {
    lede: 'One page for every conversation. Pick what you want to talk about and book it, or ask a question and a person answers within a business day.',
    blocks: [
      { h: 'Book a Call', kind: 'cards', items: ['Explore Call — 30 minutes about your business and whether the Deep Diagnostic is the right first step', 'HubSpot — talk to a HubSpot expert about training, onboarding, or a rescue', 'Website — talk to a website strategist about a redesign or optimization', 'Paid Media — a free ads assessment with the Swell team', 'Speaking — bring Bob or Marcus to your event'] },
      { h: 'Or Just Ask', p: 'A short form: name, company, website, what’s on your mind. No dropdowns, no budget field.' },
      { h: 'Not Ready to Talk?', p: 'Run the free instant diagnostic first. Most people do.', links: [instant] },
    ],
    connects: [{ text: 'The same booking, from the Endless Customers side', link: { label: 'endlesscustomers.com/book-a-call', path: '/book-a-call', site: 'ec' } }],
  },
  '/why-impact': {
    lede: 'A training company that also does the work. Here’s why that matters, and what it means for what you own at the end.',
    blocks: [
      { h: 'We Teach You to Own It', p: 'Agencies rent you results. We build the systems and the internal capabilities inside your business that keep it going without us.' },
      { h: 'We Run on the System We Sell', p: 'Endless Customers is how IMPACT markets IMPACT. Published pricing, honest comparisons, a guarantee. This site is the proof.' },
      { h: 'One Way In', p: 'Nobody buys the wrong thing, because everyone starts with the same diagnostic.' },
      { h: 'Proof', kind: 'links', links: [{ label: 'Success Stories', path: '/results/success-stories' }, { label: 'Reviews', path: '/results/reviews' }, { label: 'Compare Your Options', path: '/compare' }] },
    ],
    connects: [{ text: 'Overlaps with the compare page; one of the two may fold into the other', link: { label: 'Compare Your Options', path: '/compare' } }],
  },
  '/instant-diagnostic': {
    lede: 'Enter your website. In about a minute you’ll see how ChatGPT, Google, and Perplexity describe your company, whether they recommend you, and what they get wrong. Free, no form first.',
    ctas: [{ label: 'Run the Diagnostic', path: '/instant-diagnostic' }],
    blocks: [
      { h: 'What You Get', kind: 'cards', items: ['How AI Describes You — the actual answers, side by side', 'Whether AI Recommends You — for the questions your buyers ask', 'What It Gets Wrong — the facts to fix first', 'A Score, and What to Do Next'] },
      { h: 'Step 1 of 2', p: 'This is the free first look. The Deep Diagnostic & Roadmap is the full picture: 124 checkpoints, competitor context, and a prioritized plan.', links: [deep] },
      { h: 'Why AI Has an Opinion About You', p: 'Buyers ask AI who to trust before they call anyone. AI answers from what it can find and verify about your company, and it eliminates before it ranks.' },
    ],
    connects: [{ text: 'Same tool, on the Endless Customers side', link: { label: 'endlesscustomers.com/instant-diagnostic', path: '/instant-diagnostic', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/deep-diagnostic': {
    lede: 'The first thing everyone buys. Three weeks, 124 checkpoints across 13 areas of your business, a leadership working session, and a 3, 6, and 12-month roadmap your team can run with or without us. $5,000.',
    ctas: [{ label: 'Book an Explore Call', path: '/talk' }, instant],
    blocks: [
      { h: 'The Problem', p: 'Buyers ask AI who to trust. Getting recommended is half the story; the hard part is knowing what to fix first.' },
      { h: 'What It Is', kind: 'cards', items: ['124 Checkpoints Across 13 Areas — AI visibility, website, content, sales process, CRM, reviews, team, and more', 'Competitor Context — how AI and buyers see you next to the companies you lose to', 'A 90-Minute Leadership Working Session — what we found, and what your team already knows', 'Key Findings Report — the diagnosis, in plain language', 'A Prioritized Roadmap — what to do in the next 3, 6, and 12 months, in order', 'A Live Walkthrough With an Endless Customers Coach'] },
      { h: 'How It Works', kind: 'steps', items: ['Explore Call — 30 minutes to confirm it’s the right first step', 'Kickoff — your team fills in a short worksheet; we start the investigation', 'Working Session — 90 minutes with leadership', 'Delivery — the report and roadmap, walked through live, three weeks after kickoff'] },
      { h: 'Pricing', kind: 'pricing', items: ['Deep Diagnostic & Roadmap — $5,000 one-time', 'Covered by the 100% Money-Back Guarantee'] },
      { h: 'What Happens After', p: 'The roadmap is yours with no obligation. Run it in-house, hand it to another specialist, or pick the IMPACT service it points to. Many clients start coaching; some start with HubSpot or a website.', links: [{ label: 'All Services', path: '/services' }] },
      { h: 'Questions', kind: 'faq', items: ['Why Does It Cost $5,000? — Because three experts spend three weeks on it, and because a free assessment would tell you what you want to hear.', 'What If We Already Have a Marketing Team? — Then the roadmap becomes their plan. Most of our clients have one.', 'Do We Have to Keep Working With IMPACT? — No. About half do.', 'What If We Already Know What’s Wrong? — Then we’ll confirm it in a week and spend the other two on the order to fix it in.'] },
    ],
    connects: [
      { text: 'Before this: the free instant diagnostic', link: instant },
      { text: 'After this: the service the roadmap points to', link: { label: 'Services We Offer', path: '/services' } },
      { text: 'Endless Customers describes the diagnostic as the first step of any implementation', link: { label: 'How to Implement', path: '/how-to-implement', site: 'ec' } },
    ],
    source: 'This site is the source.',
  },
  '/guarantee': {
    lede: 'Every coaching call, every training, every deliverable. Tell us within 7 days, we redo the work, and if we still miss, you get your money back. No cap on claims, no “reasonable use” clause.',
    blocks: [
      { h: 'How It Works', kind: 'steps', items: ['Tell Us Within 7 Days — email your coach or strategist and say what missed', 'We Make It Right — we redo the work at no cost', 'Your Money Back — if it still misses, a full refund on a written explanation'] },
      { h: 'What’s Covered', kind: 'cards', items: ['Coaching — every call, training, quarterly planning, and Alignment Day', 'Deep Diagnostic & Roadmap', 'Website Work — audits, strategy, redesigns, optimization, Learning Center and self-service tool builds', 'HubSpot Projects and Training', 'Paid Media Management Fees'] },
      { h: 'What’s Not', kind: 'cards', items: ['Third-Party Costs — ad spend, travel, software licenses', 'Endless Customers Live — has its own refund policy', 'Endless Customers Academy — has its own refund policy'] },
      { h: 'Who to Write To', p: 'Your coach or strategist, or the president directly. The address is on this page on the live site.' },
    ],
    connects: [{ text: 'Every price this guarantee covers', link: { label: 'Pricing', path: '/pricing' } }],
    source: 'This site is the source.',
  },
  '/compare': {
    lede: 'Four ways to get this done: IMPACT, a marketing agency, a freelancer, or your own team. Cost, speed, what you own at the end, and who each is right for. Written the way we teach clients to write comparisons: honestly, including when we lose.',
    blocks: [
      { h: 'The Comparison', kind: 'cards', items: ['IMPACT — diagnostic first; we do the work with you and train your team to own it. Best when you want the capability to stay.', 'A Marketing Agency — they do the work for you and you rent the result. Best when you have no one internal and don’t plan to.', 'A Freelancer — one skill, one person, cheapest per hour. Best for a single defined project.', 'Your Own Team — highest control, slowest start. Best when you already have the people and just need a system.'] },
      { h: 'Where We’re Not the Best Choice', p: 'If you want everything outsourced forever, an agency is cheaper than us. If you need one landing page, hire a freelancer. If distributors sit between you and your buyer, our system underperforms.' },
      { h: 'What You Own at the End', p: 'With us: the content, the site, the CRM, and a team that runs them. With an agency: a contract.' },
      { h: 'Decide', kind: 'links', links: [{ label: 'Pricing', path: '/pricing' }, { label: 'The Guarantee', path: '/guarantee' }, deep] },
    ],
    connects: [{ text: 'Linked from the How We Help menu on every page', link: { label: 'Home', path: '/' } }],
  },
  '/letter': {
    lede: 'One email a week from Bob Ruffolo: what changed for buyers this week, and what to do about it. No pitch. Unsubscribe anytime.',
    blocks: [
      { h: 'Subscribe', p: 'Email field and button. Nothing else on the form.' },
      { h: 'Recent Letters', kind: 'cards', tag: 'Archive, ungated', items: ['Letter Title — one-line summary', 'Letter Title — one-line summary', 'Letter Title — one-line summary'] },
      { h: 'Why a Letter', p: 'Speaking and the letter are IMPACT’s main engines for reaching owners who haven’t heard of us. Everything recorded gets repurposed.' },
    ],
  },
  '/search': { lede: 'Site search across both sites: pages, Learning Center, podcast, and coaches.', blocks: [{ h: 'Results', p: 'Answer-first: the matching Learning Center answer shows above the page results.' }] },

  '/services': {
    lede: 'Six services, one system behind them, one way in. Every service is a section of this site with its own pages, pricing, results, and experts.',
    ctas: [deep, talk],
    blocks: [
      { h: 'Start Here', kind: 'cards', items: ['Deep Diagnostic & Roadmap — $5,000. Where everyone starts. Three weeks to a plan.'], links: [deep] },
      { h: 'Then the Service the Roadmap Points To', kind: 'links', links: [{ label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'HubSpot Services', path: '/hubspot' }, { label: 'Website Services', path: '/websites' }, { label: 'Paid Media Services', path: '/paid-media' }, { label: 'Workshops', path: '/workshops' }] },
      { h: 'How They Fit Together', p: 'Coaching installs the system. HubSpot, website, and paid media build and amplify the foundation. Workshops are one day for teams that need a start. All of it is covered by the guarantee and all of it has a published price.' },
    ],
    connects: [{ text: 'The system all of these run on', link: { label: 'endlesscustomers.com', path: '/', site: 'ec' } }],
  },
  '/coaching/how-it-works': {
    lede: 'Alignment Day, a 90-day plan, then coaching and training every week or two until your team owns the system.',
    blocks: [
      { h: 'The Sequence', kind: 'steps', items: ['Deep Diagnostic & Roadmap — the diagnosis and the plan (before coaching starts)', 'Alignment Day — leadership, sales, and marketing in one room; everyone understands the system and their role', 'First 90-Day Plan — benchmark where you are, set priorities', 'Coaching and Training — content and video, website, assignment selling, revenue team meetings, HubSpot, practical AI', 'Quarterly Planning — track, refine, reset priorities', 'Mastery — your team runs it; coaching gets lighter or ends'] },
      { h: 'What Your Coach Does', p: 'Works like a fractional chief revenue officer: in your leadership meetings, pushing on the hard things, holding the team to the plan.' },
      { h: 'What Your Team Owns', kind: 'cards', items: ['A Content Manager — writes and publishes weekly', 'A Videographer — often; sometimes the content manager', 'Sales — uses content in every deal', 'Leadership — shows up to the quarterly planning'] },
    ],
    connects: [{ text: 'The same page, from the Endless Customers side', link: { label: 'How to Implement', path: '/how-to-implement', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/coaching/alignment-day': {
    lede: 'The first month of coaching: one day with leadership, sales, and marketing together, so the system is a company priority and not a marketing project.',
    blocks: [
      { h: 'The Day', kind: 'steps', items: ['Morning — the system, and why buyers changed', 'Midday — your business: what the diagnostic found', 'Afternoon — roles, the first 90 days, and what each team commits to'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Virtual — $10,000', 'In Person — $12,500 + travel'] },
    ],
  },
  '/coaching/results': {
    lede: 'Companies that did the coaching, and what happened, in their words.',
    blocks: [
      { h: 'Results', kind: 'proof', items: ['7x revenue growth in three years — Patrick Moorhead, former CMO, Pricefx', 'Sales opportunities tripled in one year — Mike Ritzema, Founder and President, Superior Trucking Payroll', 'From one store to six — Steve Sheinkopf, CEO, Yale Appliance', '1,500 leads a month within a year — Tony Paille, CMO, AIIM International'] },
      { h: 'All Success Stories', kind: 'links', links: [{ label: 'Success Stories', path: '/results/success-stories' }, { label: 'Reviews', path: '/results/reviews' }] },
    ],
    connects: [{ text: 'The same stories, told from the system’s side', link: { label: 'endlesscustomers.com/success-stories', path: '/success-stories', site: 'ec' } }],
  },
  '/coaching/pricing': {
    lede: 'Coaching is priced by plan, month to month, after the Deep Diagnostic and an Alignment Day.',
    blocks: [
      { h: 'Before Coaching', kind: 'pricing', items: ['Deep Diagnostic & Roadmap — $5,000 one-time', 'Alignment Day — $10,000 virtual · $12,500 + travel in person'] },
      { h: 'Monthly Plans', kind: 'pricing', tag: live, items: ['Guidance — $5,500/mo · bi-weekly coaching, one track', 'Mastery (Recommended) — $8,000/mo · weekly coaching, sales and marketing', 'Mastery Accelerated — $10,500/mo · everything in Mastery, compressed', 'Month to Month, 30-Day Notice'] },
      { h: 'What the Full Implementation Costs', p: 'Coaching is one line. The others are people, video, a website that can carry it, and HubSpot. The Endless Customers pricing page lays out the total.', links: [{ label: 'Total Cost of Implementing the System', path: '/pricing', site: 'ec' }] },
      { h: 'Covered', p: 'Every call, training, and deliverable is covered by the 100% money-back guarantee.', links: [{ label: 'The Guarantee', path: '/guarantee' }] },
    ],
    source: 'This site is the source.',
  },

  '/hubspot/training': {
    lede: 'HubSpot is only as powerful as the team using it. Training in your own portal, by certified trainers, until your team owns it.',
    blocks: [
      { h: 'Programs', kind: 'pricing', tag: live, items: ['Core — $3,500/mo · two sessions a month, one specialist, one department up to 10 people', 'Advanced — $6,000/mo · weekly sessions, multiple departments, deeper curriculum', 'Organization — $10,000/mo · multiple weekly tracks, role-based, with leadership coordination', 'On-Site Workshop — $12,500 + travel · a full day at your office plus 4-6 weeks of virtual follow-up', 'Minimum Engagement: 3 Months'] },
      { h: 'How It Works', kind: 'steps', items: ['Discovery & Kickoff — worksheet, then a deep dive with your specialist', 'Training Roadmap — priorities and a curriculum for your team', 'Sessions — screen-share in your actual portal; your team applies it between sessions', 'Independence — the program ends when your team owns the portal'] },
      { h: 'Who Trains You', kind: 'cards', items: ['Jessica Palmeri — Director of HubSpot Training', 'Joe Bachir — HubSpot Trainer', 'Kaitlyn Petro — HubSpot Trainer'] },
    ],
  },
  '/hubspot/onboarding': {
    lede: 'New to HubSpot, or starting over. Portal setup, pipelines, marketing hub activation, dashboards, and Breeze AI, configured for how your team actually sells.',
    blocks: [
      { h: 'What We Set Up', kind: 'cards', items: ['CRM & Sales Pipeline — stages, properties, automation', 'Marketing Hub — forms, email, workflows, lead scoring', 'Reporting — dashboards your leadership team believes', 'Breeze AI — agents and assistants configured to your data'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Onboarding Projects — $3,000 to $15,000+, quoted after a scoping call'] },
      { h: 'Then Training', p: 'Onboarding without training is a portal nobody uses. Most onboarding clients continue with Core training.', links: [{ label: 'Training', path: '/hubspot/training' }] },
    ],
  },
  '/hubspot/cleanup': {
    lede: '“Our HubSpot is a mess and nobody trusts the numbers.” A portal audit, then the cleanup: data, properties, workflows, and reporting, so the numbers mean something again.',
    blocks: [
      { h: 'The Audit', kind: 'cards', items: ['Data — duplicates, dead contacts, broken associations', 'Properties — what’s used, what’s noise', 'Workflows — what’s firing, what’s fighting', 'Reporting — which dashboards are lying'] },
      { h: 'The Cleanup', kind: 'steps', items: ['Audit — a written findings report', 'Fix — in priority order, with your team watching', 'Train — so it stays clean'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Portal Audit & Cleanup — $3,000 to $15,000+, quoted'] },
    ],
  },
  '/hubspot/integrations': {
    lede: 'HubSpot connected to the systems you run on: ERP, accounting, e-commerce, field service, and the migrations that come with them.',
    blocks: [
      { h: 'What We Integrate', kind: 'cards', items: ['Migrations — from Salesforce and other CRMs', 'ERP and Accounting — NetSuite, QuickBooks, and others', 'E-commerce — Shopify and others', 'Custom — via our integration partner where the work needs engineers'] },
      { h: 'How We Set Migrations Up for Success', kind: 'steps', items: ['Map — what moves, what dies', 'Test — in a sandbox, with your data', 'Cut Over — with a rollback plan', 'Train — on the new setup'] },
      { h: 'Pricing', kind: 'pricing', items: ['Quoted per Project After Scoping'] },
    ],
  },
  '/hubspot/trust-theme': {
    lede: 'The Trust theme: IMPACT’s HubSpot CMS theme, built so a marketing manager with no developer can build and maintain a site that looks like it had one.',
    blocks: [
      { h: 'What It Is', kind: 'cards', items: ['A Module Library — pages built from proven, flexible blocks', 'Conversion-Ready — pricing, comparison, and Learning Center patterns built in', 'Yours to Run — your team changes pages without calling anyone'] },
      { h: 'In Their Words', kind: 'proof', items: ['We were able to quickly rebuild our entire website — Chase Shugarman, Shugarman’s Bath', 'I really love how easy it is to build pages optimized for conversions — Ingrid Ellis, The Metiss Group'] },
      { h: 'Get It', p: 'Included in every IMPACT website build; available on the HubSpot marketplace on its own.', links: [{ label: 'Website Services', path: '/websites' }] },
    ],
    connects: [{ text: 'Shared between HubSpot Services and Website Services', link: { label: 'Website Services', path: '/websites' } }],
  },
  '/hubspot/results': {
    lede: 'What HubSpot clients say, and the numbers behind it.',
    blocks: [
      { h: 'In Their Words', kind: 'proof', items: ['IMPACT’s overall customized approach and strategy to training is far superior to anything else — Chris Garnett, Chief Marketing & Sales Officer, PartnerMD', 'From knowing almost nothing about online marketing to taking on my own projects within HubSpot, in just months — Janine Estolas, Western States Metal Roofing', 'They trained our team on how to utilize the HubSpot platform… Hands down the best decision our business made — Nikki Oerum, The Paseo Club'] },
      { h: 'Independently', kind: 'cards', items: ['5.0 on the HubSpot Directory — 327+ reviews', 'HubSpot Diamond Solutions Partner — 15+ years, 2x Partner of the Year, 27 certifications'] },
    ],
  },
  '/hubspot/pricing': {
    lede: 'Training by program, projects by scope. All of it on this page.',
    blocks: [
      { h: 'Training', kind: 'pricing', tag: live, items: ['Core — $3,500/mo', 'Advanced — $6,000/mo', 'Organization — $10,000/mo', 'On-Site Workshop — $12,500 + travel', 'Minimum Engagement: 3 Months'] },
      { h: 'Projects', kind: 'pricing', tag: live, items: ['Onboarding, Audit & Cleanup, Pipeline Configuration, Marketing Hub Activation, Dashboards, Breeze AI — $3,000 to $15,000+', 'Migrations and Integrations — quoted'] },
      { h: 'What Makes It Bigger or Smaller', kind: 'cards', items: ['People — how many need training', 'Departments — one or several', 'Portal State — clean or a rescue', 'Systems — what has to connect'] },
      { h: 'Covered', p: 'Every project and training session is covered by the 100% money-back guarantee.', links: [{ label: 'The Guarantee', path: '/guarantee' }] },
    ],
    connects: [{ text: 'All IMPACT pricing on one page', link: { label: 'Pricing', path: '/pricing' } }],
  },
  '/hubspot/experts': {
    lede: 'The HubSpot team. Certified, in your portal, and the same people every session.',
    blocks: [
      { h: 'The Team', kind: 'cards', items: ['Jessica Palmeri — Director of HubSpot Training', 'Joe Bachir — HubSpot Trainer', 'Kaitlyn Petro — HubSpot Trainer', 'Integration Partner — engineers for migrations and custom integrations'] },
      { h: 'Credentials', kind: 'cards', items: ['HubSpot Diamond Solutions Partner', '27 Certifications Across the Team', '2x HubSpot Partner of the Year'] },
    ],
    connects: [{ text: 'The whole company', link: { label: 'Meet Our Team', path: '/team' } }],
  },

  '/websites/redesign': {
    lede: 'A website your buyers and AI can trust, built on a proven modular framework by experienced strategists, and handed to your team to run.',
    blocks: [
      { h: 'What You Get', kind: 'cards', items: ['Strategy & Site Architecture', 'Messaging & Homepage Content', 'The Trust Theme Module Library', 'Content Direction & Coaching', 'Page Building & Development', 'SEO & AI Discoverability', 'Launch Support & Optimization'] },
      { h: 'How It Works', kind: 'steps', items: ['Discovery & Scoping', 'Strategy & Research', 'Content & Design', 'Build', 'QA, Redirects & Migration', 'Launch', 'Training & Optimization'] },
      { h: 'Timelines', kind: 'cards', items: ['Simple Migration — 3 months', 'Typical Redesign — 4 to 7 months', 'Complex Custom Build — 12+ months'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Enhanced — $30,000 to $60,000', 'Elite — from $63,000', 'Full Range — $25,000 to $155,000'] },
      { h: 'Results', kind: 'proof', items: ['$900K+ highest-grossing day in company history; 700+ leads in the first month — Zintex Home Remodeling', '55% more organic traffic, 4x qualified pipeline, 7x revenue over three years — Patrick Moorhead, Pricefx'] },
    ],
  },
  '/websites/optimization': {
    lede: 'You have a site. It isn’t working hard enough. Monthly optimization and training so your team makes it better every week.',
    blocks: [
      { h: 'What We Do Monthly', kind: 'cards', items: ['Conversion — what stops people, fixed', 'AI Discoverability — what AI can’t verify, fixed', 'Speed and Health', 'Training — your team learns each fix'] },
      { h: 'Pricing', kind: 'pricing', items: ['Monthly, Quoted by Site Size and Scope'] },
    ],
  },
  '/websites/learning-center-builds': {
    lede: 'A Learning Center is the engine of the system: search first, filters for problem, role, and industry, answer-first, ungated. We build it on your site.',
    blocks: [
      { h: 'What It Is', kind: 'cards', items: ['Search First', 'Filters — problem, role, industry, and focus area', 'Type on the Card — article, video, tool', 'Answer-First, Ungated'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Learning Center Build — from $5,000'] },
    ],
    connects: [{ text: 'Ours, as the reference', link: { label: 'The IMPACT Learning Center', path: '/learn' } }],
  },
  '/websites/self-service-tools': {
    lede: 'Pricing calculators, self-assessments, product selectors: the tools that let buyers answer their own question and trust you for letting them.',
    blocks: [
      { h: 'Examples', kind: 'cards', items: ['Pricing Calculator', 'Self-Assessment / Diagnostic', 'Product or Service Selector', 'Cost Comparison'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Strategy — $3,000', 'Builds — $5,000 to $70,000'] },
    ],
  },
  '/websites/pricing': {
    lede: 'Every website service, priced.',
    blocks: [
      { h: 'Prices', kind: 'pricing', tag: live, items: ['Redesign — $25,000 to $155,000 (Enhanced $30K-$60K; Elite from $63K)', 'Optimization & Training — monthly, quoted', 'Learning Center Build — from $5,000', 'Self-Service Tools — strategy $3,000; builds $5,000 to $70,000'] },
      { h: 'What Drives Cost Up', kind: 'cards', items: ['Page Count and Custom Templates', 'Migration Complexity and Redirects', 'Custom Tools and Integrations', 'Content We Write Versus Content You Write'] },
      { h: 'Covered', p: 'Every website deliverable is covered by the 100% money-back guarantee.', links: [{ label: 'The Guarantee', path: '/guarantee' }] },
    ],
    connects: [{ text: 'All IMPACT pricing on one page', link: { label: 'Pricing', path: '/pricing' } }],
  },
  '/websites/experts': {
    lede: 'Experienced strategists lead every project, not junior staff.',
    blocks: [{ h: 'The Team', kind: 'cards', items: ['Mary Brown — Lead Website Strategist', 'Janet Mendez — Website Strategist', 'Joe Rinaldi — Creative Director, Brand', 'Melissa Smith — Web Team Manager, Sr. Front-end Developer', 'Daniel Escardo — Sr. Front-end Developer'] }],
    connects: [{ text: 'The whole company', link: { label: 'Meet Our Team', path: '/team' } }],
  },

  '/paid-media/management': {
    lede: 'Do it for you: campaign management, creative, optimization, and reporting tied to revenue, on Google, Meta, LinkedIn, Microsoft, YouTube, and more.',
    blocks: [
      { h: 'What’s Included', kind: 'cards', items: ['Campaign Management', 'Ad Copy & Creative', 'Routine Optimization', 'Real-Time Spend Visibility', 'Reporting Tied to Revenue', 'Bi-Weekly Strategy Calls'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['$20K-$100K Monthly Spend — $5,000/mo base + 15% (to $29,999), 12% ($30K-$64,999), 10% ($65K-$99,999)', '$100K+ Monthly Spend — $7,000/mo base + negotiated performance fee', 'Minimum Ad Spend — $20,000/mo'] },
    ],
  },
  '/paid-media/consulting': {
    lede: 'Do it with you: a strategist trains your team to run the ads, so the capability stays in-house.',
    blocks: [
      { h: 'What You Get', kind: 'cards', items: ['Monthly Strategy Call', 'Account Reviews', 'Skill Training — search, social, video, measurement', 'Async Support'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Consulting & Training — $4,000/mo', 'Minimum Ad Spend — $10,000/mo'] },
    ],
  },
  '/paid-media/results': {
    lede: 'What Swell clients say.',
    blocks: [{ h: 'In Their Words', kind: 'proof', items: ['Our return on ad spend is about 13x — Matthew Marshall, Southwest Exteriors', 'Highly intelligent, proactive, and communicative — Matt Bowley, Illume Fertility', 'An extension of our internal team — Kara Consigli, Circle Furniture', 'Average client relationship 3 to 4 years; longest 7+'] }],
  },
  '/paid-media/pricing': {
    lede: 'Two ways to work with the Swell team, both priced here.',
    blocks: [
      { h: 'Management', kind: 'pricing', tag: live, items: ['$5,000/mo Base + 10-15% Performance Fee on $20K-$100K Monthly Spend', '$7,000/mo Base + Negotiated Fee Above $100K'] },
      { h: 'Consulting & Training', kind: 'pricing', tag: live, items: ['$4,000/mo'] },
      { h: 'Minimums', kind: 'cards', items: ['Managed — $20,000/mo ad spend', 'Consulting — $10,000/mo ad spend'] },
      { h: 'Covered', p: 'Management fees are covered by the guarantee; ad spend is not.', links: [{ label: 'The Guarantee', path: '/guarantee' }] },
    ],
    connects: [{ text: 'All IMPACT pricing on one page', link: { label: 'Pricing', path: '/pricing' } }],
  },
  '/paid-media/experts': {
    lede: 'The Swell team.',
    blocks: [{ h: 'The Team', kind: 'cards', items: ['Jason Linde — Google Ads Lead, Paid Media Specialist', 'Tanner Holman — Paid Social Strategist'] }],
    connects: [{ text: 'The whole company', link: { label: 'Meet Our Team', path: '/team' } }],
  },
  '/websites': {
    h1: 'A Website Your Buyers Trust and Your Team Can Run',
    lede: 'Redesigns, optimization, Learning Center and self-service tool builds, on HubSpot, by experienced strategists. Built to be found by buyers and AI, and handed to your team to run without a developer.',
    ctas: [{ label: 'Talk to a Website Strategist', path: '/talk' }, { label: 'See Pricing', path: '/websites/pricing' }],
    blocks: [
      { h: 'What We Hear Most Often', kind: 'cards', items: ['Our Site Looks Fine but Nothing Happens — Optimization: conversion, AI discoverability, speed, and training', 'We Need a New Site and We’ve Been Burned Before — Redesign on a proven modular framework, strategists leading, 4 to 7 months', 'We Can’t Change Anything Without Calling a Developer — The Trust theme on HubSpot; your marketing manager runs it', 'We Want a Learning Center Like Yours — Learning Center builds, search-first and ungated', 'Buyers Want to Price It Themselves — Self-service tools: calculators, assessments, selectors'] },
      { h: 'Why Companies Choose IMPACT for a Website', kind: 'cards', items: ['A Proven Modular Framework, Not a Start-From-Scratch Build', 'Experienced Strategists Lead Every Project, Not Junior Staff', 'Optimized for the Age of AI — what AI can find and verify', 'Yours to Run — training is part of every launch'] },
      { h: 'How It Works', kind: 'steps', items: ['Discovery & Scoping', 'Strategy & Research', 'Content & Design', 'Build', 'QA, Redirects & Migration', 'Launch', 'Training & Optimization'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Redesign — $25,000 to $155,000', 'Learning Center Build — from $5,000', 'Self-Service Tools — strategy $3,000; builds $5,000 to $70,000', 'Optimization & Training — monthly, quoted'], links: [{ label: 'Website Pricing in Detail', path: '/websites/pricing' }] },
      { h: 'Results', kind: 'proof', items: ['$900K+ highest-grossing day in company history; 700+ leads in the first month — Zintex Home Remodeling', 'They brought real value beyond just the design — Dana Svilar, Bird Technologies', 'Less like working with a vendor and more like working with an extension of our team — Ashley Rothmann, McClone Insurance'] },
      { h: 'Your Team', kind: 'cards', items: ['Mary Brown — Lead Website Strategist', 'Janet Mendez — Website Strategist', 'Joe Rinaldi — Creative Director, Brand', 'Melissa Smith — Web Team Manager', 'Daniel Escardo — Sr. Front-end Developer'], links: [{ label: 'Our Experts', path: '/websites/experts' }, { label: 'Portfolio', path: '/results/website-portfolio' }] },
    ],
    connects: [
      { text: 'One of six IMPACT services; the Deep Diagnostic says whether the website is first', link: { label: 'All Services', path: '/services' } },
      { text: 'The Trust theme is shared with HubSpot Services', link: { label: 'HubSpot Services', path: '/hubspot' } },
      { text: 'Every site we build carries a Learning Center, the engine of the system', link: { label: 'What Is Endless Customers?', path: '/what-is-endless-customers', site: 'ec' } },
    ],
    source: 'This site is the source.',
  },
  '/paid-media': {
    h1: 'Ads That Reach the Buyers Already Asking the Question',
    lede: 'Google, Meta, LinkedIn, Microsoft, YouTube, and more, run by our Swell team. Do it for you, or do it with you: a strategist who trains your team to run the ads. Reported in revenue, not clicks.',
    ctas: [{ label: 'Get a Free Ads Assessment', path: '/talk' }, { label: 'See Pricing', path: '/paid-media/pricing' }],
    blocks: [
      { h: 'Two Ways to Work With Swell', kind: 'cards', items: ['Management (Do It for You) — campaigns, creative, optimization, real-time spend visibility, reporting tied to revenue, bi-weekly strategy calls', 'Consulting & Training (Do It With You) — a strategist beside your team, monthly, so the capability stays in-house'] },
      { h: 'Is Swell the Right Fit?', kind: 'cards', items: ['You Spend $20,000 a Month or More on Ads, or Plan To', 'You Want to Know What the Spend Returns, in Revenue', 'Your Website and Content Can Carry the Traffic; If Not, We’ll Say So and Point You to the Fix First'] },
      { h: 'How We Work Together', kind: 'steps', items: ['Intro Call — 30 minutes', 'Initial Audit — complimentary', 'Audit Review', 'Kickoff — 60 minutes', 'Ongoing — bi-weekly for management, monthly for consulting'] },
      { h: 'Pricing', kind: 'pricing', tag: live, items: ['Management — $5,000/mo base + 10-15% performance fee ($20K-$100K spend); $7,000/mo base above $100K', 'Consulting & Training — $4,000/mo', 'Minimum Ad Spend — $20,000/mo managed; $10,000/mo consulting'], links: [{ label: 'Paid Media Pricing in Detail', path: '/paid-media/pricing' }] },
      { h: 'Results', kind: 'proof', items: ['Our return on ad spend is about 13x — Matthew Marshall, Southwest Exteriors', 'Highly intelligent, proactive, and communicative — Matt Bowley, Illume Fertility', 'Average client relationship 3 to 4 years; longest 7+'] },
      { h: 'Your Team', kind: 'cards', items: ['Jason Linde — Google Ads Lead, Paid Media Specialist', 'Tanner Holman — Paid Social Strategist'], links: [{ label: 'Our Team', path: '/paid-media/experts' }] },
    ],
    connects: [
      { text: 'Paid media amplifies a foundation; most clients arrive from coaching or a website build', link: { label: 'All Services', path: '/services' } },
      { text: 'Swell is a team name inside IMPACT, not a separate company', link: { label: 'About IMPACT', path: '/about' } },
    ],
    source: 'This site is the source.',
  },
  '/workshops': {
    lede: 'One day with your leadership or sales team, in person or virtual. You leave with a plan they’ll actually run. The only service that isn’t a section of its own.',
    ctas: [talk],
    blocks: [
      { h: 'Workshops', kind: 'cards', items: ['Endless Customers for Leadership — the system, and what it asks of the company', 'Assignment Selling for Sales Teams — using content in every deal', 'HubSpot On-Site — a day in your portal', 'AI for Marketing Teams — practical, in your tools'] },
      { h: 'Pricing', kind: 'pricing', items: ['Quoted by Room Size and Travel'] },
    ],
    connects: [{ text: 'Speaking is the other way to bring this to a room', link: { label: 'Request a Speaker', path: '/speaking' } }],
  },

  '/results/success-stories': {
    lede: 'Companies that did the work, and what happened. Filter by service and industry.',
    blocks: [
      { h: 'Stories', kind: 'proof', items: ['7x revenue growth in three years — Patrick Moorhead, former CMO, Pricefx', 'Sales opportunities tripled — Mike Ritzema, Superior Trucking Payroll', 'From one store to six — Steve Sheinkopf, CEO, Yale Appliance', '$900K+ highest-grossing day after the site launch — Zintex Home Remodeling', '1,500 leads a month — Tony Paille, CMO, AIIM International'] },
      { h: 'Filters', kind: 'cards', items: ['By Service — coaching, HubSpot, website, paid media', 'By Industry — the eight we serve', 'By Problem — the eight we solve'] },
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
    blocks: [{ h: 'Recognition', kind: 'cards', items: ['HubSpot Diamond Solutions Partner', '2x HubSpot Partner of the Year', 'BBB a+, Accredited Since 2011', 'Clutch and DesignRush Verified'] }],
  },
  '/results/reviews': {
    lede: 'Links to every third-party review profile. We never host review markup ourselves; the point is that you can check.',
    blocks: [{ h: 'Where to Read Them', kind: 'cards', items: ['HubSpot Directory — 5.0, 327+ reviews', 'Google — 5.0, 36+ reviews', 'Clutch — 4.9', 'Facebook — 94% recommend', 'BBB — A+'] }],
  },

  '/about': {
    lede: 'A marketing and sales training company, founded in 2009 in Cheshire, Connecticut, that runs on the system it teaches.',
    blocks: [
      { h: 'Our Story', p: 'Started as an agency in 2009. Learned that clients who owned their growth kept it, and became a training and coaching company that also does the work. The company behind Endless Customers.' },
      { h: 'Mission', p: 'Creating heroes, growing businesses, changing lives.' },
      { h: 'Values', kind: 'cards', items: ['Say What Others Won’t', 'Teach, Don’t Do It for Them', 'Own the Outcome', 'Run on the System'] },
      { h: 'Facts', kind: 'cards', items: ['Founded 2009', '125 Commerce Ct STE 9, Cheshire, CT 06410', 'HubSpot Diamond Solutions Partner', 'Runs on EOS'] },
    ],
    connects: [{ text: 'The system’s own story', link: { label: 'What Is Endless Customers?', path: '/what-is-endless-customers', site: 'ec' } }],
  },
  '/team': {
    lede: 'Everyone at IMPACT, by team. Coaches also appear in the Endless Customers coach directory, which lists certified independent coaches too.',
    blocks: [
      { h: 'Leadership', kind: 'cards', items: ['Bob Ruffolo — Founder and CEO', 'Katie Coelho — President', 'Nicole Cimo — VP of Sales & Marketing', 'Rachel Palmateer — VP of Agency Services', 'Melanie Moore — VP of Finance & Admin', 'Marcus Sheridan — Partner, Author, Keynote Speaker'] },
      { h: 'Coaches', kind: 'cards', items: ['Allison Belles — Executive Coach', 'Vin Gaeta — Executive Coach', 'Brian Casey — Sr. Coach', 'John Becker — Coach', 'Reagan Cotton — Coach', 'Austin Mock — Coach', 'Mandy York — Coach', 'Derek Baer — Sales Coach and Advisor'], links: [{ label: 'The Full Coach Directory, Including Certified Independent Coaches', path: '/coaches', site: 'ec' }] },
      { h: 'HubSpot', kind: 'cards', items: ['Jessica Palmeri — Director of HubSpot Training', 'Joe Bachir — HubSpot Trainer', 'Kaitlyn Petro — HubSpot Trainer'] },
      { h: 'Websites', kind: 'cards', items: ['Mary Brown — Lead Website Strategist', 'Janet Mendez — Website Strategist', 'Joe Rinaldi — Creative Director', 'Melissa Smith — Web Team Manager', 'Daniel Escardo — Sr. Front-end Developer'] },
      { h: 'Paid Media (Swell)', kind: 'cards', items: ['Jason Linde — Google Ads Lead', 'Tanner Holman — Paid Social Strategist'] },
    ],
    connects: [{ text: 'Coach profiles live on endlesscustomers.com; this page links to them rather than duplicating them', link: { label: 'endlesscustomers.com/coaches', path: '/coaches', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/speaking': {
    lede: 'Bob Ruffolo and Marcus Sheridan speak to owner groups and industry events about what AI changed for buyers, and what to do about it.',
    blocks: [
      { h: 'Keynotes', kind: 'cards', items: ['Will AI Recommend You? — how buyers choose now, and how to be the answer', 'Endless Customers — the system, for leadership audiences', 'Conversations That Close — assignment selling for sales teams'] },
      { h: 'Request', p: 'Event, date, audience, and what you want them to leave with. We publish speaking fees.' },
    ],
    connects: [{ text: 'Marcus’s own speaking site', link: { label: 'marcussheridan.com', path: '/', site: 'impact' } }],
  },
  '/careers': { lede: 'Do work that makes clients better at their jobs.', blocks: [{ h: 'Open Roles', kind: 'cards', tag: 'Feed', items: ['Role — team, location'] }, { h: 'How We Work', p: 'Remote-first, runs on EOS, everyone learns the system.' }] },
  '/learn': {
    lede: 'Answers first, no forms. Search, then filter by the problem you have, your role, and your industry. Every piece is labeled by type. One library, with a door on each site.',
    blocks: [
      { h: 'Search', p: 'The search box is the page. Results are answer-first: the matching answer shows before the list.' },
      { h: 'Filters', kind: 'cards', items: ['Problem — the eight we solve', 'Role — owner, marketing, sales', 'Industry — the eight we serve', 'Focus Area — AI visibility, content, video, HubSpot, website, sales, team'] },
      { h: 'Types', kind: 'cards', items: ['Article', 'Video', 'Podcast', 'Webinar', 'Tool', 'Guide'] },
      { h: 'Free Tools', kind: 'links', links: [instant, { label: 'AI Visibility Study', path: '/ai-visibility-study' }] },
    ],
    connects: [{ text: 'The same library, through the Endless Customers door', link: { label: 'endlesscustomers.com/learn', path: '/learn', site: 'ec' } }],
    source: 'This site is the source.',
  },
  '/ai-visibility-study': {
    lede: 'How AI describes your industry, which companies it recommends, and why. Our own research, updated as the answers change.',
    blocks: [{ h: 'By Industry', kind: 'links', links: industries.filter((l) => !l.whenProof).map((l) => ({ label: l.label, path: l.path })) }, { h: 'Method', p: 'The prompts a buyer would use, run against ChatGPT, Gemini, and Perplexity, recorded and compared over time.' }],
  },
  '/events': {
    lede: 'Live sessions on what’s changing and what to do about it, plus the conference.',
    blocks: [{ h: 'Upcoming', kind: 'cards', tag: 'Feed', items: ['Endless Customers Live — Hartford, CT, October 5-7, 2026', 'Endless Customers Live — Chicago, IL, April 5-7, 2027', 'Webinar — title, date'] }],
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
      { h: 'Sound Familiar?', p: 'Three or four sentences in the buyer’s words, taken from real sales calls, so the reader knows within ten seconds they’re in the right place.' },
      { h: 'How We Approach It', p: 'The Endless Customers position on this problem, in plain language, with the one thing most companies get wrong.' },
      { h: 'Services That Apply', kind: 'links', links: problemServices[u.path] ?? [deep] },
      { h: 'Proof', kind: 'proof', tag: 'From the testimonials library', items: ['A result from a company that came with this problem — name, title, company'] },
      { h: 'Learn More', kind: 'links', links: [{ label: `Learning Center, filtered to ${u.label.toLowerCase()}`, path: '/learn' }] },
      { h: 'Where to Start', kind: 'links', links: [instant, deep] },
    ],
    connects: [{ text: 'Listed under How We Help › Problems we solve on every page', link: { label: 'Home', path: '/' } }],
  };
}
for (const i of industries) {
  impact[i.path] = {
    lede: `Who we have worked with in ${i.label.toLowerCase()}, what works in this market, how AI describes it, and the proof.`,
    ctas: [instant, talk],
    blocks: [
      { h: 'How Buyers Choose in This Market', p: 'What they search, what they ask AI, what they need to see before they call. From our AI Visibility Study for this industry.', links: [{ label: 'AI Visibility Study', path: '/ai-visibility-study' }] },
      { h: 'What Works Here', p: 'The three or four moves that reliably work in this industry, and the one that doesn’t.' },
      { h: 'Companies We Have Worked With', kind: 'cards', tag: i.whenProof ? 'Hidden from the nav until there is proof' : 'From the testimonials library', items: ['Company — result, in their words'] },
      { h: 'Services That Fit', kind: 'links', links: [deep, { label: 'Endless Customers Coaching', path: '/coaching' }, { label: 'Website Services', path: '/websites' }] },
      { h: 'Learn More', kind: 'links', links: [{ label: `Learning Center, filtered to ${i.label.toLowerCase()}`, path: '/learn' }] },
    ],
    connects: [{ text: 'Listed under How We Help › Industries we serve on every page', link: { label: 'Home', path: '/' } }],
  };
}

const ec: Record<string, Outline> = {
  '/book': {
    lede: 'Endless Customers, by Marcus Sheridan. The national best-seller, previously They Ask, You Answer, on becoming the most known, trusted, and recommended company in your market. Read the first chapter free.',
    ctas: [{ label: 'Get the First Chapter', path: '/book' }, { label: 'Buy the Book', path: '/book' }],
    blocks: [
      { h: 'What It Teaches', kind: 'cards', items: ['Say What Others Won’t — the questions buyers ask, answered honestly', 'Show What Others Hide — pricing, problems, comparisons', 'Sell With Content — assignment selling', 'Build the Team — content manager, videographer, and a sales team that uses it', 'Be Recommended by AI — the new chapter'] },
      { h: 'The Companion Guide', p: 'The 90-day starter guide and the toolkit, free.' },
      { h: 'Where to Buy', kind: 'cards', items: ['Amazon', 'Barnes & Noble', 'Audible', 'Bulk Orders for Teams'] },
      { h: 'After the Book', kind: 'links', links: [{ label: 'How to Implement', path: '/how-to-implement' }, { label: 'Get Coaching & Training', path: '/coaching' }] },
    ],
    source: 'This site is the source.',
  },
  '/pricing': {
    lede: 'What it really costs to implement Endless Customers, with and without a coach. People, video, a website that can carry it, HubSpot, and coaching, in ranges, so you decide with your eyes open.',
    blocks: [
      { h: 'On Your Own', kind: 'pricing', items: ['The Book and Guides — under $50', 'A Content Manager — a full-time salary', 'Video — a videographer or a content manager who shoots', 'A Website That Can Carry a Learning Center — $25,000 to $155,000 if you rebuild', 'HubSpot — license plus setup'] },
      { h: 'With the Academy', kind: 'pricing', items: ['Endless Customers Academy — per-seat, annual'] },
      { h: 'With a Coach', kind: 'pricing', tag: live, items: ['Deep Diagnostic & Roadmap — $5,000', 'Alignment Day — $10,000 virtual · $12,500 + travel', 'Coaching — $5,500 to $10,500/mo, month to month'] },
      { h: 'The Specifics', p: 'Coaching, HubSpot, website, and paid media prices in full are on IMPACT’s pricing page; IMPACT delivers them.', links: [{ label: 'impactplus.com/pricing', path: '/pricing', site: 'impact' }] },
    ],
    connects: [{ text: 'Every IMPACT service, priced', link: { label: 'impactplus.com/pricing', path: '/pricing', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/book-a-call': {
    lede: 'A 30-minute conversation with someone at IMPACT who has done this with hundreds of companies. What you’re trying to do, what’s in the way, and whether the Deep Diagnostic is the right first step.',
    blocks: [
      { h: 'Who You’ll Talk To', p: 'IMPACT’s team. IMPACT is the company behind Endless Customers and the one that delivers coaching.' },
      { h: 'Book', p: 'The calendar, on this page.' },
      { h: 'Not Ready?', kind: 'links', links: [{ label: 'Free Instant AI Diagnostic', path: '/instant-diagnostic' }, { label: 'How to Implement', path: '/how-to-implement' }] },
    ],
    connects: [{ text: 'The same booking on the IMPACT side', link: { label: 'impactplus.com/talk', path: '/talk', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/success-stories': {
    lede: 'Companies that became the most known, trusted, and recommended in their market. What they changed, and the numbers.',
    blocks: [
      { h: 'Stories', kind: 'proof', items: ['7x revenue growth in three years — Patrick Moorhead, former CMO, Pricefx', 'Sales opportunities tripled — Mike Ritzema, Superior Trucking Payroll', 'From one store to six — Steve Sheinkopf, CEO, Yale Appliance', 'All of our new prospects are chasing us — Brian Paulson, CSI Accounting and Payroll'] },
      { h: 'Hear Them Tell It', kind: 'links', links: [{ label: 'The Podcast', path: '/podcast' }, { label: 'The Conference', path: '/conference' }] },
    ],
    connects: [{ text: 'The same stories on the IMPACT side, filtered by service', link: { label: 'impactplus.com/results/success-stories', path: '/results/success-stories', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/coaches': {
    lede: 'Every certified Endless Customers coach, in one place: IMPACT’s own coaches and certified independent coaches, listed together. Who they are, what they’ve done, and which industries they know.',
    blocks: [
      { h: 'IMPACT Coaches', kind: 'cards', items: ['Allison Belles — Executive Coach', 'Vin Gaeta — Executive Coach', 'Brian Casey — Sr. Coach', 'John Becker — Coach', 'Reagan Cotton — Coach', 'Austin Mock — Coach', 'Mandy York — Coach'] },
      { h: 'Certified Independent Coaches', kind: 'cards', tag: 'From the live coach directory', items: ['Coach — company, region, industries'] },
      { h: 'Filter', kind: 'cards', items: ['By Industry', 'By Region', 'By Specialty — content, video, sales, HubSpot'] },
      { h: 'Want to Be Listed?', kind: 'links', links: [{ label: 'Become a Coach', path: '/become-a-coach' }] },
    ],
    connects: [{ text: 'IMPACT’s team page links here rather than duplicating profiles', link: { label: 'impactplus.com/team', path: '/team', site: 'impact' } }],
    source: 'This site is the source.',
  },
  '/become-a-coach': {
    lede: 'Teach the system. Build a practice around it. IMPACT’s certified coach program for consultants and agencies.',
    blocks: [
      { h: 'What You Get', kind: 'cards', items: ['Certification', 'The Playbooks and Tools', 'A Listing in the Directory', 'Referrals'] },
      { h: 'What It Takes', kind: 'cards', items: ['Experience Implementing the System', 'Training and Assessment', 'Annual Renewal'] },
      { h: 'Apply', p: 'A short form and a conversation.' },
    ],
  },
  '/learn': {
    lede: 'Everything we know about the system, free and ungated. The same library as IMPACT’s, through the Endless Customers door.',
    blocks: [{ h: 'Search', p: 'Answer-first, filters for problem, role, industry, and focus area.' }, { h: 'Start With', kind: 'links', links: [{ label: 'What Is Endless Customers?', path: '/what-is-endless-customers' }, { label: 'How to Implement', path: '/how-to-implement' }, { label: 'The Podcast', path: '/podcast' }] }],
    connects: [{ text: 'One library, two doors', link: { label: 'impactplus.com/learn', path: '/learn', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/what-is-endless-customers': {
    lede: 'The system, in five minutes. Built for a world where buyers research everything online, ask AI who to trust, and choose the company that shows up as the most credible and helpful.',
    blocks: [
      { h: 'The Idea', p: 'Become the most known, trusted, and recommended company in your market by answering what buyers ask, showing what others hide, and teaching your own team to do it.' },
      { h: 'The Five Parts', kind: 'cards', items: ['Content — the questions buyers research, answered', 'Website — your most powerful sales asset', 'Sales — assignment selling with content', 'Technology — CRM, automation, analytics, AI', 'Culture — sales and marketing on one strategy'] },
      { h: 'In the Age of AI', p: 'Brands that consistently publish trustworthy, educational content are the ones AI recommends. The system is how you become one.' },
      { h: 'Next', kind: 'links', links: [{ label: 'The Book', path: '/book' }, { label: 'How to Implement', path: '/how-to-implement' }] },
    ],
    source: 'This site is the source.',
  },
  '/academy': {
    lede: 'Learn the system, course by course, with your team. For companies that want structure without a coach.',
    blocks: [{ h: 'Courses', kind: 'cards', items: ['Content That Sells', 'Video for Business', 'Assignment Selling', 'HubSpot for Endless Customers', 'AI in the System'] }, { h: 'Pricing', kind: 'pricing', items: ['Per seat, annual'] }, { h: 'Log In', p: 'Academy login is the account icon in the header.' }],
  },
  '/instant-diagnostic': {
    lede: 'Ask AI about your company. See what it says. Free, about a minute.',
    blocks: [{ h: 'The Tool', p: 'The same instant diagnostic as on impactplus.com.' }, { h: 'Then', kind: 'links', links: [{ label: 'How to Implement', path: '/how-to-implement' }, { label: 'Get Coaching & Training', path: '/coaching' }] }],
    connects: [{ text: 'Same tool, IMPACT side', link: { label: 'impactplus.com/instant-diagnostic', path: '/instant-diagnostic', site: 'impact' } }],
    source: 'impactplus.com is the source; this page is the door.',
  },
  '/conference': {
    lede: 'Endless Customers Live. Two days with the people actually doing this. Hartford, CT, October 5-7, 2026, and Chicago, IL, April 5-7, 2027.',
    ctas: [{ label: 'Register for Hartford', path: '/conference' }],
    blocks: [
      { h: 'Upcoming', kind: 'cards', items: ['Hartford, CT — October 5-7, 2026', 'Chicago, IL — April 5-7, 2027'] },
      { h: 'What It’s Like', p: 'Sessions from clients on stage, workshops with coaches, and two days with a few hundred people running the same system.' },
      { h: 'Pages', kind: 'cards', items: ['What It’s Like', 'Past Events', 'Become a Sponsor', 'Convince Your Boss'] },
    ],
    connects: [{ text: 'IMPACT’s events page points here', link: { label: 'impactplus.com/events', path: '/events', site: 'impact' } }],
    source: 'This site is the source.',
  },
  '/webinars': { lede: 'Live sessions on what’s changing and what to do about it.', blocks: [{ h: 'Upcoming and on Demand', kind: 'cards', tag: 'Feed', items: ['The Great Agency Reckoning: What’s Still Worth Paying for in the Age of AI', 'How to Prepare for Agentic Buying and the Future of Search'] }] },
  '/podcast': { lede: 'Real conversations about how companies win attention, build trust, and grow with the Endless Customers System. Weekly.', blocks: [{ h: 'Latest', kind: 'cards', tag: 'Feed', items: ['Ep. 175 — How He Built a 600-page Website Without Knowing How to Code', 'Ep. 174 — How Far Can AI Take Your Endless Customers Strategy?', 'Ep. 173 — Who Should Use ChatGPT Ads, and Who Should Wait?'] }, { h: 'Listen', kind: 'cards', items: ['Apple Podcasts', 'Spotify', 'YouTube'] }] },
  '/search': { lede: 'Search across both sites: pages, Learning Center, podcast, and coaches.', blocks: [{ h: 'Results', p: 'Answer-first: the matching Learning Center answer shows above the page results.' }] },
  '/privacy': { lede: 'Privacy policy.', blocks: [{ h: 'Policy', p: 'Shared with impactplus.com.' }] },
  '/terms': { lede: 'Terms of service.', blocks: [{ h: 'Terms', p: 'Shared with impactplus.com.' }] },
};

export const outlines: Record<SiteId, Record<string, Outline>> = { impact, ec };
