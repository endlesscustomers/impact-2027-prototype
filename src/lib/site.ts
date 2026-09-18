// The two web properties in this prototype and how their URLs are shaped.
//
// Real domain            Prototype path
// impactplus.com/x       /impactpluscom/x/
// endlesscustomers.com/x /endlesscustomerscom/x/

export type SiteId = 'impact' | 'ec';

export const SITES: Record<SiteId, { id: SiteId; name: string; domain: string; dir: string }> = {
  impact: { id: 'impact', name: 'IMPACT', domain: 'impactplus.com', dir: 'impactpluscom' },
  ec: { id: 'ec', name: 'Endless Customers', domain: 'endlesscustomers.com', dir: 'endlesscustomerscom' },
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Absolute prototype URL for a path on a given site. `path` is the real-site path, e.g. "/pricing". */
export function href(site: SiteId, path: string = '/'): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${BASE}/${SITES[site].dir}/${clean}/` : `${BASE}/${SITES[site].dir}/`;
}

/** The prototype's own entry page. */
export function entryHref(): string {
  return `${BASE}/`;
}

/** What the real URL would be, for the "you're on" strip and page indexes. */
export function realUrl(site: SiteId, path: string = '/'): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${SITES[site].domain}/${clean}`;
}

// ---------- Navigation model ----------

export interface NavLink {
  label: string;
  /** Real-site path. */
  path: string;
  /** Which site the path lives on; defaults to the menu's own site. */
  site?: SiteId;
  /** Small grey line under the label (desktop only). */
  sub?: string;
  /** Hidden until the page has proof behind it (Cybersecurity). */
  whenProof?: boolean;
}

export interface NavGroup {
  /** Small grey heading above the group; omit for none. */
  heading?: string;
  links: NavLink[];
  /** Draw a rule above this group instead of a heading. */
  rule?: boolean;
}

export type NavItem =
  | { kind: 'link'; label: string; path: string }
  | { kind: 'panel'; id: string; label: string; columns: { heading: string; className: string; links: NavLink[] }[]; foot: { lead: string; links: NavLink[]; why: NavLink } }
  | { kind: 'menu'; id: string; label: string; groups: NavGroup[] };
