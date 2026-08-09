import { MapPin, Globe, Calendar, Users, Archive, Star, GitBranch, Activity, Mail, Twitter, Building2, Briefcase, Link, BookOpen, Code2, BadgeCheck } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import ErrorPage from "../ErrorPage";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import GitHubRepo from "./GitHubRepo";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

  .gh-root {
    min-height: 100vh;
    background: #060910;
    background-image:
      radial-gradient(ellipse 80% 50% at 20% 10%, rgba(56, 189, 248, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 50% 50%, rgba(16, 185, 129, 0.04) 0%, transparent 70%);
    font-family: 'Space Grotesk', sans-serif;
    overflow-x: hidden;
    position: relative;
  }

  .gh-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(148,163,184,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .gh-wrapper {
    position: relative;
    z-index: 1;
    max-width: 1040px;
    margin: 0 auto;
    padding: 1.25rem 1rem;
  }

  @media (min-width: 640px) {
    .gh-wrapper { padding: 1.75rem 1.5rem; }
  }

  @media (min-width: 1024px) {
    .gh-wrapper { padding: 2rem 1.5rem; }
  }

  /* ── COLUMN LAYOUT (stacked on every breakpoint) ── */
  .gh-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .gh-sidebar { width: 100%; }

  .gh-card {
    background: rgba(15, 20, 35, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.08);
    border-radius: 14px;
    padding: 0.875rem;
    backdrop-filter: blur(16px);
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 640px) {
    .gh-card { padding: 1rem; }
  }

  .gh-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(56,189,248,0.15) 0%, transparent 50%, rgba(99,102,241,0.1) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* ── IDENTITY HEADER ── */
  .gh-identity {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 0.875rem;
    margin-bottom: 0.875rem;
    border-bottom: 1px solid rgba(148,163,184,0.08);
  }

  .gh-avatar {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    border: 1.5px solid rgba(56,189,248,0.3);
    flex-shrink: 0;
    object-fit: cover;
  }

  .gh-identity-text { min-width: 0; }

  .gh-name-row {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .gh-name {
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gh-username {
    font-size: 12px;
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
    margin-top: 1px;
  }

  .gh-bio {
    font-size: 12px;
    color: #64748b;
    margin-top: 6px;
    line-height: 1.45;
  }

  /* ── SECTION LABEL ── */
  .gh-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10.5px;
    font-weight: 600;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    font-family: 'Fira Code', monospace;
    margin: 0.875rem 0 0.5rem;
  }

  .gh-label:first-of-type { margin-top: 0; }

  /* ── INFO GRID (compact, adaptive columns) ── */
  .gh-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 6px;
  }

  .gh-info-row {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 9px;
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(148,163,184,0.06);
    transition: background 0.2s, border-color 0.2s;
    min-width: 0;
  }

  .gh-info-row:hover {
    background: rgba(56,189,248,0.06);
    border-color: rgba(56,189,248,0.15);
  }

  .gh-info-row span, .gh-info-row a {
    font-size: 12px;
    color: #94a3b8;
    text-decoration: none;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gh-info-row a { color: #38bdf8; }
  .gh-info-row a:hover { color: #7dd3fc; }

  .gh-icon {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
    color: #38bdf8;
    opacity: 0.8;
  }

  /* ── STATS GRID (compact tiles) ── */
  .gh-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 6px;
  }

  .gh-stat-tile {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 10px;
    border-radius: 9px;
    background: rgba(10, 15, 30, 0.6);
    border: 1px solid rgba(56,189,248,0.1);
    transition: background 0.15s, border-color 0.15s;
  }

  .gh-stat-tile:hover {
    background: rgba(56,189,248,0.05);
    border-color: rgba(56,189,248,0.2);
  }

  .gh-stat-tile-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    color: #64748b;
    font-family: 'Fira Code', monospace;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .gh-stat-tile-value {
    font-size: 15px;
    font-weight: 600;
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
    line-height: 1.2;
  }

  /* ── QUICK LINKS (compact chip grid) ── */
  .gh-link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 6px;
  }

  .gh-link-item {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 10px;
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    text-decoration: none;
    border-radius: 8px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(148,163,184,0.06);
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gh-link-item:hover {
    background: rgba(56,189,248,0.06);
    color: #38bdf8;
    border-color: rgba(56,189,248,0.18);
  }

  .gh-link-item svg { flex-shrink: 0; color: #38bdf8; opacity: 0.85; }

  /* ── ACCOUNT INFO (compact chips) ── */
  .gh-account-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .gh-account-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(148,163,184,0.08);
    font-size: 11px;
    font-family: 'Fira Code', monospace;
  }

  .gh-account-chip-label { color: #475569; }
  .gh-account-chip-value { color: #cbd5e1; font-weight: 500; }

  /* ── CONTENT ── */
  .gh-content { width: 100%; min-width: 0; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 4px; }
`;

export default function GitHubProfile() {
  const {
    data: profileData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myGitProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`https://api.github.com/users/Rana16468`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch profile: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const calculateTenure = () => {
    const createdDate = new Date(profileData?.created_at);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    return `${years}y ${months}m`;
  };

  const formatUpdatedAt = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="gh-root">
        <div className="gh-wrapper">
          <main>
            <div className="gh-layout">
              {/* ── SIDEBAR ── */}
              <div className="gh-sidebar">
                <div className="gh-card">
                  {/* ── IDENTITY ── */}
                  <div className="gh-identity">
                    {profileData?.avatar_url && (
                      <img
                        className="gh-avatar"
                        src={profileData.avatar_url}
                        alt={profileData?.login || "avatar"}
                      />
                    )}
                    <div className="gh-identity-text">
                      <div className="gh-name-row">
                        <span className="gh-name">{profileData?.name || profileData?.login}</span>
                        {profileData?.site_admin && (
                          <BadgeCheck size={14} style={{ color: "#fbbf24", flexShrink: 0 }} />
                        )}
                      </div>
                      <div className="gh-username">@{profileData?.login}</div>
                      {profileData?.bio && <div className="gh-bio">{profileData.bio}</div>}
                    </div>
                  </div>

                  {/* ── INFO ── */}
                  <div className="gh-label">
                    <MapPin size={12} />
                    Profile
                  </div>
                  <div className="gh-info-grid">
                    {profileData?.company && (
                      <div className="gh-info-row">
                        <Building2 className="gh-icon" />
                        <span>{profileData.company}</span>
                      </div>
                    )}

                    <div className="gh-info-row">
                      <MapPin className="gh-icon" />
                      <span>{profileData?.location || "No location provided"}</span>
                    </div>

                    {profileData?.email && (
                      <div className="gh-info-row">
                        <Mail className="gh-icon" />
                        <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
                      </div>
                    )}

                    {profileData?.twitter_username && (
                      <div className="gh-info-row">
                        <Twitter className="gh-icon" />
                        <a
                          href={`https://twitter.com/${profileData.twitter_username}`}
                          target="_blank"
                          rel="noreferrer">
                          @{profileData.twitter_username}
                        </a>
                      </div>
                    )}

                    {profileData.blog && (
                      <div className="gh-info-row">
                        <Globe className="gh-icon" />
                        <a href={profileData.blog} rel="noreferrer" target="_blank">
                          Portfolio Website
                        </a>
                      </div>
                    )}

                    <div className="gh-info-row">
                      <Calendar className="gh-icon" />
                      <span>Joined {formatDate(profileData?.created_at)}</span>
                    </div>

                    {profileData?.updated_at && (
                      <div className="gh-info-row">
                        <Activity className="gh-icon" />
                        <span>Updated {formatUpdatedAt(profileData.updated_at)}</span>
                      </div>
                    )}
                  </div>

                  {/* ── STATS ── */}
                  <div className="gh-label">
                    <Activity size={12} />
                    GitHub Stats
                  </div>
                  <div className="gh-stats-grid">
                    <div className="gh-stat-tile">
                      <span className="gh-stat-tile-label"><Archive size={11} /> Repos</span>
                      <span className="gh-stat-tile-value">{profileData?.public_repos}</span>
                    </div>
                    <div className="gh-stat-tile">
                      <span className="gh-stat-tile-label"><Star size={11} /> Gists</span>
                      <span className="gh-stat-tile-value">{profileData?.public_gists || 0}</span>
                    </div>
                    <div className="gh-stat-tile">
                      <span className="gh-stat-tile-label"><GitBranch size={11} /> Exp</span>
                      <span className="gh-stat-tile-value" style={{ fontSize: "13px" }}>{calculateTenure()}</span>
                    </div>
                    <div className="gh-stat-tile">
                      <span className="gh-stat-tile-label"><Users size={11} /> Followers</span>
                      <span className="gh-stat-tile-value">{profileData?.followers}</span>
                    </div>
                    <div className="gh-stat-tile">
                      <span className="gh-stat-tile-label"><Users size={11} /> Following</span>
                      <span className="gh-stat-tile-value">{profileData?.following}</span>
                    </div>
                  </div>

                  {/* ── QUICK LINKS ── */}
                  <div className="gh-label">
                    <Link size={12} />
                    Quick Links
                  </div>
                  <div className="gh-link-grid">
                    <a
                      href={profileData?.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="gh-link-item">
                      <Code2 size={13} />
                      GitHub Profile
                    </a>
                    <a
                      href={`${profileData?.html_url}?tab=repositories`}
                      target="_blank"
                      rel="noreferrer"
                      className="gh-link-item">
                      <Archive size={13} />
                      All Repositories
                    </a>
                    <a
                      href={`${profileData?.html_url}?tab=stars`}
                      target="_blank"
                      rel="noreferrer"
                      className="gh-link-item">
                      <Star size={13} />
                      Starred Repos
                    </a>
                    <a
                      href={`${profileData?.html_url}?tab=followers`}
                      target="_blank"
                      rel="noreferrer"
                      className="gh-link-item">
                      <Users size={13} />
                      Followers List
                    </a>
                    {profileData?.public_gists > 0 && (
                      <a
                        href={`https://gist.github.com/${profileData?.login}`}
                        target="_blank"
                        rel="noreferrer"
                        className="gh-link-item">
                        <BookOpen size={13} />
                        Public Gists
                      </a>
                    )}
                  </div>

                  {/* ── ACCOUNT INFO ── */}
                  <div className="gh-label">
                    <Briefcase size={12} />
                    Account Info
                  </div>
                  <div className="gh-account-grid">
                    <div className="gh-account-chip">
                      <span className="gh-account-chip-label">Type</span>
                      <span className="gh-account-chip-value" style={{ textTransform: "capitalize" }}>
                        {profileData?.type || "User"}
                      </span>
                    </div>
                    <div className="gh-account-chip">
                      <span className="gh-account-chip-label">Admin</span>
                      <span
                        className="gh-account-chip-value"
                        style={{ color: profileData?.site_admin ? "#fbbf24" : "#cbd5e1" }}>
                        {profileData?.site_admin ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="gh-account-chip">
                      <span className="gh-account-chip-label">ID</span>
                      <span className="gh-account-chip-value" style={{ color: "#38bdf8" }}>
                        #{profileData?.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CONTENT ── */}
              <div className="gh-content">
                <GitHubRepo />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}