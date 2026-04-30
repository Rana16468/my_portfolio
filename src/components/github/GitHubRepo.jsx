import { useState, useEffect, useCallback } from 'react';

const LANG_COLORS = {
  Python: '#3572A5', TypeScript: '#2b7489', JavaScript: '#f1e05a',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Kotlin: '#A97BFF',
  PowerShell: '#438eff', Java: '#b07219', Go: '#00ADD8', Rust: '#dea584',
  C: '#555555', 'C++': '#f34b7d', Ruby: '#701516', PHP: '#4F5D95',
  'Jupyter Notebook': '#DA5B0B', Dart: '#00B4AB', Swift: '#F05138',
};

const GH_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const GITHUB_USER = 'Rana16468';

function fmtDate(d) {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ── Responsive hook ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return width;
}

// ── Daily Commit Graph ───────────────────────────────────────────────────────
function DailyCommitGraph({ year, repoCount, isMobile }) {
  const jan1 = new Date(year, 0, 1);
  const dec31 = new Date(year, 11, 31);
  const startOffset = jan1.getDay();
  const totalDays = Math.floor((dec31 - jan1) / 86400000) + 1;
  const totalCells = startOffset + totalDays;
  const cols = Math.ceil(totalCells / 7);

  const rng = seededRandom(year * 137 + repoCount * 31);
  const levels = Array.from({ length: totalCells }, (_, i) => {
    if (i < startOffset) return -1;
    const r = rng();
    let lvl = 0;
    if (r > 0.40) lvl = 1;
    if (r > 0.58) lvl = 2;
    if (r > 0.74) lvl = 3;
    if (r > 0.88) lvl = 4;
    return lvl;
  });

  const monthLabels = [];
  for (let m = 0; m < 12; m++) {
    const d = new Date(year, m, 1);
    if (d > dec31) break;
    const dayIndex = Math.floor((d - jan1) / 86400000);
    const col = Math.floor((startOffset + dayIndex) / 7);
    monthLabels.push({ label: MONTHS_SHORT[m], col });
  }

  const cellSize = isMobile ? 9 : 11;
  const gap = isMobile ? 2 : 3;
  const unit = cellSize + gap;
  const svgWidth = cols * unit - gap + 1;
  const svgHeight = 7 * unit - gap;

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
      <div style={{ minWidth: svgWidth }}>
        <div style={{ position: 'relative', height: 16, marginBottom: 4, minWidth: svgWidth }}>
          {monthLabels.map(({ label, col }) => (
            <span key={label} style={{
              position: 'absolute', left: col * unit,
              fontSize: isMobile ? 9 : 10, color: '#8b949e', fontFamily: 'monospace', whiteSpace: 'nowrap',
            }}>{label}</span>
          ))}
        </div>
        <svg width={svgWidth} height={svgHeight} style={{ display: 'block' }}>
          {levels.map((lvl, i) => {
            if (lvl === -1) return null;
            const col = Math.floor(i / 7);
            const row = i % 7;
            const x = col * unit;
            const y = row * unit;
            const dayIndex = i - startOffset;
            const date = new Date(year, 0, 1 + dayIndex);
            const label = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${lvl} commit${lvl !== 1 ? 's' : ''}`;
            return (
              <rect key={i} x={x} y={y} width={cellSize} height={cellSize} rx={2}
                fill={GH_COLORS[lvl]} stroke={lvl === 0 ? '#21262d' : 'none'} strokeWidth={1}>
                <title>{label}</title>
              </rect>
            );
          })}
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8, justifyContent: 'flex-end', fontSize: 10, color: '#8b949e' }}>
          <span>Less</span>
          {GH_COLORS.map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c, border: i === 0 ? '1px solid #21262d' : 'none', flexShrink: 0 }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

// ── Language Bar ─────────────────────────────────────────────────────────────
function LanguageBar({ langStats, isMobile }) {
  if (!langStats.length) return <span style={{ color: '#8b949e', fontSize: 11 }}>No data</span>;
  return (
    <>
      <div style={{ height: 7, borderRadius: 5, overflow: 'hidden', display: 'flex', marginBottom: 8 }}>
        {langStats.map(l => (
          <div key={l.name} style={{ width: `${l.pct}%`, background: l.color, height: '100%' }} title={`${l.name} ${l.pct}%`} />
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr',
        gap: isMobile ? '4px 12px' : 5,
      }}>
        {langStats.slice(0, isMobile ? 8 : 8).map(l => (
          <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
            <span style={{ color: '#e6edf3', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.name}</span>
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 10 }}>{l.pct}%</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Sidebar Card ─────────────────────────────────────────────────────────────
function SideCard({ title, children }) {
  return (
    <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 10, padding: '12px 14px', marginBottom: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</div>
      {children}
    </div>
  );
}

// ── Repo Card ────────────────────────────────────────────────────────────────
function RepoCard({ repo, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const lc = LANG_COLORS[repo.language] || '#888';
  const created = new Date(repo.created_at);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#161b22', border: `1px solid ${hovered ? '#388bfd' : '#21262d'}`,
        borderRadius: 10, padding: isMobile ? '12px 12px' : '14px 16px', transition: 'border-color 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0, flex: 1 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#58a6ff" style={{ flexShrink: 0 }}>
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
          </svg>
          <a href={repo.html_url} target="_blank" rel="noreferrer"
            style={{ color: '#58a6ff', fontWeight: 600, fontSize: isMobile ? 13 : 14, textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {repo.name}
          </a>
          {repo.private
            ? <span style={{ fontSize: 10, border: '1px solid #8b949e', color: '#8b949e', borderRadius: 10, padding: '1px 6px', flexShrink: 0 }}>Private</span>
            : <span style={{ fontSize: 10, border: '1px solid #58a6ff', color: '#58a6ff', borderRadius: 10, padding: '1px 6px', flexShrink: 0 }}>Public</span>
          }
        </div>
        <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: '#8b949e', flexShrink: 0, marginLeft: 8 }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z" />
          </svg>
        </a>
      </div>

      {repo.description && (
        <p style={{ color: '#8b949e', fontSize: 12, lineHeight: 1.5, margin: '0 0 8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {repo.description}
        </p>
      )}

      {repo.topics?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
          {repo.topics.slice(0, isMobile ? 3 : 4).map(t => (
            <span key={t} style={{ background: '#1f3446', color: '#58a6ff', fontSize: 10, borderRadius: 10, padding: '2px 7px' }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? 8 : 12, fontSize: 11, color: '#8b949e' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: lc, display: 'inline-block' }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
        {repo.forks_count > 0 && <span>⑂ {repo.forks_count}</span>}
        {repo.open_issues_count > 0 && <span>◉ {repo.open_issues_count}</span>}
        <span style={{ color: '#58a6ff', marginLeft: isMobile ? 0 : 'auto' }}>
          {created.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </span>
        {!isMobile && repo.updated_at && <span>Updated {fmtDate(repo.updated_at)}</span>}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 40, height: 40, border: '3px solid #21262d', borderTopColor: '#58a6ff', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <span style={{ color: '#8b949e', fontSize: 14 }}>Loading profile…</span>
    </div>
  );
}

function ErrorPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <span style={{ fontSize: 36 }}>⚠️</span>
      <span style={{ color: '#f85149', fontSize: 18, fontWeight: 600 }}>Failed to load data</span>
      <span style={{ color: '#8b949e', fontSize: 14 }}>Check your network or try again later.</span>
    </div>
  );
}

export default function GitHubRepo() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('repositories');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const width = useWindowWidth();
  const isMobile = width < 540;
  const isTablet = width >= 540 && width < 860;
  const isDesktop = width >= 860;

  const PER_PAGE = 6;

  useEffect(() => {
    (async () => {
      try {
        const [rRes, pRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
        ]);
        if (!rRes.ok || !pRes.ok) throw new Error('API error');
        const [reposData, profileData] = await Promise.all([rRes.json(), pRes.json()]);
        const repoList = Array.isArray(reposData) ? reposData : [];
        setRepos(repoList);
        setProfile(profileData);
        const years = [...new Set(repoList.map(r => new Date(r.created_at).getFullYear()))].sort((a, b) => b - a);
        if (years.length) setSelectedYear(years[0]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const paginate = useCallback((n) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error || !profile) return <ErrorPage />;

  const years = [...new Set(repos.map(r => new Date(r.created_at).getFullYear()))].sort((a, b) => b - a);

  const monthsInYear = selectedYear
    ? [...new Set(repos.filter(r => new Date(r.created_at).getFullYear() === selectedYear).map(r => new Date(r.created_at).getMonth()))].sort((a, b) => a - b)
    : [];

  let filtered = repos;
  if (selectedYear) filtered = filtered.filter(r => new Date(r.created_at).getFullYear() === selectedYear);
  if (selectedMonth !== null) filtered = filtered.filter(r => new Date(r.created_at).getMonth() === selectedMonth);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const currentRepos = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
  const totalIssues = repos.reduce((s, r) => s + (r.open_issues_count || 0), 0);

  const langCounts = {};
  repos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
  const langTotal = Object.values(langCounts).reduce((a, b) => a + b, 0);
  const langStats = Object.entries(langCounts)
    .map(([name, count]) => ({ name, count, pct: langTotal > 0 ? +((count / langTotal) * 100).toFixed(1) : 0, color: LANG_COLORS[name] || '#888' }))
    .sort((a, b) => b.count - a.count);

  const memberYear = profile.created_at ? new Date(profile.created_at).getFullYear() : '';
  const tabs = ['overview', 'repositories', 'projects', 'packages', 'stars'];

  const repoCountByYear = {};
  repos.forEach(r => {
    const y = new Date(r.created_at).getFullYear();
    repoCountByYear[y] = (repoCountByYear[y] || 0) + 1;
  });

  const repoCountByMonth = {};
  if (selectedYear) {
    repos.filter(r => new Date(r.created_at).getFullYear() === selectedYear).forEach(r => {
      const m = new Date(r.created_at).getMonth();
      repoCountByMonth[m] = (repoCountByMonth[m] || 0) + 1;
    });
  }

  const graphYear = selectedYear || new Date().getFullYear();

  // ── Sidebar cards (rendered inline on mobile/tablet, in aside on desktop)
  const sidebarContent = (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr',
      gap: 12,
    }}>
      {/* Languages */}
      <SideCard title="Most Used Languages">
        <LanguageBar langStats={langStats} isMobile={isMobile} />
      </SideCard>

      {/* Quick Stats */}
      <SideCard title="Quick Stats">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            ['Issues', totalIssues, '#e6edf3'],
            ['Repos', repos.length, '#e6edf3'],
            ['Stars', totalStars, '#d29922'],
            ['Forks', totalForks, '#58a6ff'],
            ['Followers', profile.followers, '#2ea043'],
            ['Following', profile.following, '#bc8cff'],
          ].map(([label, value, color]) => (
            <div key={label} style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 7, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color, fontFamily: 'monospace', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 9, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </SideCard>

      {/* Streak */}
      <SideCard title="Streak Info">
        <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 7, padding: '10px 8px', textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fd8c73', fontFamily: 'monospace' }}>🔥 N/A</div>
          <div style={{ fontSize: 10, color: '#8b949e', marginTop: 2 }}>Current Streak</div>
          <div style={{ fontSize: 9, color: '#58a6ff', marginTop: 1, fontFamily: 'monospace' }}>Requires auth</div>
        </div>
        <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 7, padding: '10px 8px', textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#d29922', fontFamily: 'monospace' }}>N/A</div>
          <div style={{ fontSize: 10, color: '#8b949e', marginTop: 2 }}>Longest Streak</div>
          <div style={{ fontSize: 9, color: '#58a6ff', marginTop: 1, fontFamily: 'monospace' }}>Requires auth</div>
        </div>
        <div style={{ fontSize: 9, color: '#484f58', marginTop: 6, textAlign: 'center', lineHeight: 1.4 }}>Auth required — not available via public API.</div>
      </SideCard>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#e6edf3', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        .yr-btn{background:#161b22;border:1px solid #21262d;color:#8b949e;border-radius:8px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit;transition:all .2s;white-space:nowrap}
        .yr-btn.active{background:#1f6feb;border-color:#388bfd;color:#fff;font-weight:600}
        .yr-btn:hover:not(.active){border-color:#8b949e;color:#e6edf3}
        .mo-btn{background:#161b22;border:1px solid #21262d;color:#8b949e;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:11px;font-family:inherit;transition:all .2s;white-space:nowrap}
        .mo-btn.active{background:#1f6feb;border-color:#388bfd;color:#fff;font-weight:600}
        .mo-btn:hover:not(.active){border-color:#8b949e;color:#e6edf3}
        .pg-btn{width:32px;height:32px;border-radius:7px;border:1px solid #21262d;background:#161b22;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#58a6ff;transition:background .15s}
        .pg-btn:disabled{color:#484f58;cursor:not-allowed}
        .pg-btn:not(:disabled):hover{background:#21262d}
        .pg-num{width:32px;height:32px;border-radius:7px;border:1px solid #21262d;background:#161b22;color:#c9d1d9;cursor:pointer;font-size:12px;font-family:inherit;transition:background .15s}
        .pg-num:hover:not(.active){background:#21262d}
        .pg-num.active{background:#1f6feb;color:#fff;font-weight:700;border-color:#388bfd}
        .gh-tab{padding:10px 12px;background:none;border:none;border-bottom:2px solid transparent;color:#8b949e;cursor:pointer;font-size:13px;font-weight:500;white-space:nowrap;transition:color .2s;font-family:inherit}
        .gh-tab.active{border-bottom-color:#fd8c73;color:#e6edf3}
        .gh-tab:hover:not(.active){color:#e6edf3}
        .nav-link{background:none;border:none;color:#8b949e;cursor:pointer;font-size:13px;font-weight:500;padding:0;font-family:inherit;transition:color .15s}
        .nav-link:hover{color:#e6edf3}
        .stat-pill{background:#161b22;border:1px solid #21262d;border-radius:8px;padding:7px 10px;display:flex;align-items:center;gap:7px;flex:1;min-width:80px}
      `}</style>

      {/* ── Header ── */}
      <header style={{ background: '#161b22', borderBottom: '1px solid #21262d', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="#8b949e">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700 }}>GitHub</span>
          </div>
          {!isMobile && (
            <nav style={{ display: 'flex', gap: 22 }}>
              {['Pull requests', 'Issues', 'Marketplace', 'Explore'].map(item => (
                <button key={item} className="nav-link">{item}</button>
              ))}
            </nav>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isMobile && (
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b949e', padding: 4, display: 'flex', alignItems: 'center' }}
                onClick={() => setMobileNavOpen(o => !o)}>
                {mobileNavOpen
                  ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                }
              </button>
            )}
            <img src={profile.avatar_url} alt={profile.login} style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #21262d', objectFit: 'cover' }} />
          </div>
        </div>
        {mobileNavOpen && isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', background: '#161b22', borderTop: '1px solid #21262d', padding: '6px 0' }}>
            {['Pull requests', 'Issues', 'Marketplace', 'Explore'].map(item => (
              <button key={item} style={{ background: 'none', border: 'none', color: '#8b949e', textAlign: 'left', padding: '10px 20px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{item}</button>
            ))}
          </div>
        )}
      </header>

      {/* ── Profile Hero ── */}
      <div style={{ background: '#0d1117', borderBottom: '1px solid #21262d', padding: isMobile ? '16px 12px' : '22px 16px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 18, alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={profile.avatar_url} alt={profile.name || profile.login}
                style={{ width: isMobile ? 70 : 80, height: isMobile ? 70 : 80, borderRadius: '50%', border: '3px solid #21262d', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, background: '#2ea043', borderRadius: '50%', border: '2px solid #0d1117' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700 }}>{profile.name || profile.login}</div>
              <div style={{ fontSize: 13, color: '#8b949e', fontFamily: 'monospace', margin: '2px 0 6px' }}>@{profile.login}</div>
              {profile.bio && <div style={{ fontSize: 12, color: '#8b949e', lineHeight: 1.6, maxWidth: 480 }}>{profile.bio}</div>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                {profile.location && <span style={{ fontSize: 11, color: '#8b949e' }}>📍 {profile.location}</span>}
                {memberYear && <span style={{ fontSize: 11, color: '#8b949e' }}>📅 Joined {memberYear}</span>}
                <span style={{ fontSize: 11, color: '#8b949e' }}>📦 {repos.length} repos</span>
                <span style={{ fontSize: 11, color: '#8b949e' }}>👥 {profile.followers} followers · {profile.following} following</span>
                {profile.blog && (
                  <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer"
                    style={{ fontSize: 11, color: '#58a6ff', textDecoration: 'none' }}>🔗 {profile.blog}</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div style={{ background: '#0d1117', borderBottom: '1px solid #21262d', padding: isMobile ? '10px 12px' : '10px 16px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: 6 }}>
          {[
            { icon: '▣', label: 'Repos', value: repos.length, color: '#2ea043' },
            { icon: '★', label: 'Stars', value: totalStars, color: '#d29922' },
            { icon: '⑂', label: 'Forks', value: totalForks, color: '#58a6ff' },
            { icon: '!', label: 'Issues', value: totalIssues, color: '#fd8c73' },
            { icon: '<>', label: 'Languages', value: langStats.length, color: '#bc8cff' },
            { icon: '◎', label: 'Followers', value: profile.followers, color: '#39d353' },
          ].map(s => (
            <div key={s.label} className="stat-pill" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '8px 4px', gap: 3 }}>
              <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: s.color, fontFamily: 'monospace', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ background: '#0d1117', borderBottom: '1px solid #21262d', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 12px', display: 'flex', minWidth: 'max-content' }}>
          {tabs.map(tab => (
            <button key={tab} className={`gh-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}
              style={{ fontSize: isMobile ? 12 : 13, padding: isMobile ? '8px 10px' : '10px 12px' }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '14px 12px 32px' : '18px 16px 40px' }}>

        {/* ── Sidebar ABOVE main on mobile/tablet ── */}
        {!isDesktop && (
          <div style={{ marginBottom: 16 }}>
            {sidebarContent}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '220px 1fr' : '1fr',
          gap: 18,
          alignItems: 'start',
        }}>
          {/* ── Sidebar (desktop only aside) ── */}
          {isDesktop && (
            <aside>
              {sidebarContent}
            </aside>
          )}

          {/* ── Main Panel ── */}
          <main style={{ minWidth: 0 }}>

            {/* ── Daily Commit Graph ── */}
            <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 10, padding: isMobile ? '12px 10px' : '14px 16px', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 4 }}>
                <span style={{ fontSize: isMobile ? 12 : 13, color: '#8b949e' }}>
                  Daily commit activity —{' '}
                  <strong style={{ color: '#e6edf3' }}>{graphYear}</strong>
                </span>
                {!isMobile && <span style={{ fontSize: 11, color: '#484f58', fontFamily: 'monospace' }}>simulated · auth required for real data</span>}
              </div>
              <DailyCommitGraph year={graphYear} repoCount={repos.length} isMobile={isMobile} />
              {isMobile && <div style={{ fontSize: 10, color: '#484f58', marginTop: 6, fontFamily: 'monospace' }}>simulated · auth required for real data</div>}
            </div>

            {/* ── Year Filter ── */}
            <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 10, padding: isMobile ? '12px 10px' : '12px 14px', marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#8b949e', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Filter by Year
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <button className={`yr-btn${!selectedYear ? ' active' : ''}`}
                  onClick={() => { setSelectedYear(null); setSelectedMonth(null); setPage(1); }}>
                  All <span style={{ fontSize: 10, color: !selectedYear ? 'rgba(255,255,255,.6)' : '#484f58' }}>({repos.length})</span>
                </button>
                {years.map(y => (
                  <button key={y} className={`yr-btn${selectedYear === y ? ' active' : ''}`}
                    onClick={() => { setSelectedYear(y); setSelectedMonth(null); setPage(1); }}>
                    {y} <span style={{ fontSize: 10, color: selectedYear === y ? 'rgba(255,255,255,.6)' : '#484f58' }}>({repoCountByYear[y] || 0})</span>
                  </button>
                ))}
              </div>

              {selectedYear && monthsInYear.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 11, color: '#8b949e', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Filter by Month — {selectedYear}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    <button className={`mo-btn${selectedMonth === null ? ' active' : ''}`}
                      onClick={() => { setSelectedMonth(null); setPage(1); }}>All</button>
                    {monthsInYear.map(m => (
                      <button key={m} className={`mo-btn${selectedMonth === m ? ' active' : ''}`}
                        onClick={() => { setSelectedMonth(m); setPage(1); }}>
                        {MONTHS_SHORT[m]} <span style={{ fontSize: 9, color: selectedMonth === m ? 'rgba(255,255,255,.6)' : '#484f58' }}>({repoCountByMonth[m] || 0})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Repo List Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 6 }}>
              <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600 }}>
                {selectedYear ? `${selectedYear}${selectedMonth !== null ? ` — ${MONTHS_SHORT[selectedMonth]}` : ''} Repos` : 'All Repositories'}
                <span style={{ color: '#8b949e', fontWeight: 400, fontSize: 13 }}> ({filtered.length})</span>
              </span>
              <span style={{ fontSize: 12, color: '#8b949e' }}>
                Page <strong style={{ color: '#e6edf3' }}>{safePage}</strong> / <strong style={{ color: '#e6edf3' }}>{totalPages}</strong>
              </span>
            </div>

            {/* ── Repo Cards ── */}
            <div style={{ display: 'grid', gap: 10 }}>
              {currentRepos.length > 0
                ? currentRepos.map(r => <RepoCard key={r.id} repo={r} isMobile={isMobile} />)
                : (
                  <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 10, padding: 24, textAlign: 'center', color: '#8b949e', fontSize: 13 }}>
                    No repositories found for this filter.
                  </div>
                )}
            </div>

            {/* ── Pagination ── */}
            {filtered.length > PER_PAGE && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, flexWrap: 'wrap', marginTop: 18 }}>
                <button className="pg-btn" onClick={() => paginate(safePage - 1)} disabled={safePage === 1}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => {
                  const n = i + 1;
                  const show = n === 1 || n === totalPages || (n >= safePage - 1 && n <= safePage + 1);
                  const ell = (n === 2 && safePage > 3) || (n === totalPages - 1 && safePage < totalPages - 2);
                  if (!show && !ell) return null;
                  if (ell && !show) return <span key={n} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#484f58' }}>…</span>;
                  return (
                    <button key={n} className={`pg-num${safePage === n ? ' active' : ''}`} onClick={() => paginate(n)}>{n}</button>
                  );
                })}
                <button className="pg-btn" onClick={() => paginate(safePage + 1)} disabled={safePage === totalPages}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

    
    </div>
  );
}