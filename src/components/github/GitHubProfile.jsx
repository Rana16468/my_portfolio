import { MapPin, Globe, Calendar, Users, Archive, Star, GitBranch, Activity, Mail, Twitter, Building2, Briefcase, Link, BookOpen, Code2 } from "lucide-react";
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
    overflow: hidden;
    position: relative;
  }

  .gh-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(148,163,184,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  .gh-wrapper {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
  }

  .gh-layout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .gh-layout {
      flex-direction: row;
      gap: 1.5rem;
    }
  }

  /* ── SIDEBAR ── */
  .gh-sidebar {
    width: 100%;
  }

  @media (min-width: 768px) {
    .gh-sidebar { width: 300px; flex-shrink: 0; }
  }

  .gh-card {
    background: rgba(15, 20, 35, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.08);
    border-radius: 16px;
    padding: 1.25rem;
    backdrop-filter: blur(16px);
    position: relative;
    overflow: hidden;
  }

  .gh-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(56,189,248,0.15) 0%, transparent 50%, rgba(99,102,241,0.1) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* ── INFO ROWS ── */
  .gh-info-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(148,163,184,0.06);
    transition: background 0.2s, border-color 0.2s;
  }

  .gh-info-row:hover {
    background: rgba(56,189,248,0.06);
    border-color: rgba(56,189,248,0.15);
  }

  .gh-info-row span, .gh-info-row a {
    font-size: 13px;
    color: #94a3b8;
    text-decoration: none;
    line-height: 1.4;
  }

  .gh-info-row a {
    color: #38bdf8;
    transition: color 0.2s;
  }

  .gh-info-row a:hover { color: #7dd3fc; }

  .gh-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #38bdf8;
    opacity: 0.8;
  }

  .gh-info-stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 1rem;
  }

  /* ── STATS PANEL ── */
  .gh-stats-panel {
    margin-top: 1.25rem;
    border-radius: 12px;
    background: rgba(10, 15, 30, 0.6);
    border: 1px solid rgba(56,189,248,0.1);
    overflow: hidden;
  }

  .gh-stats-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(56,189,248,0.08);
    background: linear-gradient(90deg, rgba(56,189,248,0.08) 0%, rgba(99,102,241,0.06) 100%);
  }

  .gh-stats-header span {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-family: 'Fira Code', monospace;
  }

  .gh-stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(148,163,184,0.04);
    transition: background 0.15s;
  }

  .gh-stat-row:last-child { border-bottom: none; }

  .gh-stat-row:hover {
    background: rgba(56,189,248,0.04);
  }

  .gh-stat-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #64748b;
    font-family: 'Fira Code', monospace;
    letter-spacing: 0.02em;
  }

  .gh-stat-value {
    font-size: 13px;
    font-weight: 600;
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
    background: rgba(56,189,248,0.08);
    padding: 2px 8px;
    border-radius: 6px;
    border: 1px solid rgba(56,189,248,0.15);
  }

  /* ── QUICK LINKS ── */
  .gh-section {
    margin-top: 1.25rem;
    border-radius: 12px;
    background: rgba(10,15,30,0.5);
    border: 1px solid rgba(148,163,184,0.06);
    overflow: hidden;
  }

  .gh-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 14px;
    border-bottom: 1px solid rgba(148,163,184,0.05);
    background: rgba(255,255,255,0.02);
  }

  .gh-section-header span {
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: 'Fira Code', monospace;
  }

  .gh-link-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 9px 14px;
    font-size: 13px;
    color: #64748b;
    text-decoration: none;
    border-bottom: 1px solid rgba(148,163,184,0.04);
    transition: background 0.15s, color 0.15s, padding-left 0.2s;
  }

  .gh-link-item:last-child { border-bottom: none; }

  .gh-link-item:hover {
    background: rgba(56,189,248,0.05);
    color: #38bdf8;
    padding-left: 18px;
  }

  /* ── ACCOUNT INFO ── */
  .gh-account-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
    border-bottom: 1px solid rgba(148,163,184,0.04);
  }

  .gh-account-row:last-child { border-bottom: none; }

  .gh-account-label {
    font-size: 12px;
    color: #475569;
    font-family: 'Fira Code', monospace;
  }

  .gh-account-value {
    font-size: 12px;
    font-weight: 500;
    color: #cbd5e1;
    font-family: 'Fira Code', monospace;
  }

  /* ── RIGHT CONTENT ── */
  .gh-content {
    flex: 1;
    min-width: 0;
  }

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
    return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}`;
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
              {/* ── LEFT SIDEBAR ── */}
              <div className="gh-sidebar">
                <div className="gh-card">
                  {/* Info rows */}
                  <div className="gh-info-stack">
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
                  <div className="gh-stats-panel">
                    <div className="gh-stats-header">
                      <Activity size={14} style={{ color: "#38bdf8" }} />
                      <span>GitHub Stats</span>
                    </div>

                    <div className="gh-stat-row">
                      <span className="gh-stat-label">
                        <Archive size={13} />
                        Repositories
                      </span>
                      <span className="gh-stat-value">{profileData?.public_repos}</span>
                    </div>

                    <div className="gh-stat-row">
                      <span className="gh-stat-label">
                        <Star size={13} />
                        Gists
                      </span>
                      <span className="gh-stat-value">{profileData?.public_gists || 0}</span>
                    </div>

                    <div className="gh-stat-row">
                      <span className="gh-stat-label">
                        <GitBranch size={13} />
                        Exp
                      </span>
                      <span className="gh-stat-value" style={{ fontSize: "11px" }}>{calculateTenure()}</span>
                    </div>

                    <div className="gh-stat-row">
                      <span className="gh-stat-label">
                        <Users size={13} />
                        Followers
                      </span>
                      <span className="gh-stat-value">{profileData?.followers}</span>
                    </div>

                    <div className="gh-stat-row">
                      <span className="gh-stat-label">
                        <Users size={13} />
                        Following
                      </span>
                      <span className="gh-stat-value">{profileData?.following}</span>
                    </div>
                  </div>

                  {/* ── QUICK LINKS ── */}
                  <div className="gh-section">
                    <div className="gh-section-header">
                      <Link size={13} style={{ color: "#38bdf8" }} />
                      <span>Quick Links</span>
                    </div>

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
                  <div className="gh-section">
                    <div className="gh-section-header">
                      <Briefcase size={13} style={{ color: "#38bdf8" }} />
                      <span>Account Info</span>
                    </div>

                    <div className="gh-account-row">
                      <span className="gh-account-label">Account Type</span>
                      <span className="gh-account-value" style={{ textTransform: "capitalize" }}>
                        {profileData?.type || "User"}
                      </span>
                    </div>
                    <div className="gh-account-row">
                      <span className="gh-account-label">Site Admin</span>
                      <span
                        className="gh-account-value"
                        style={{ color: profileData?.site_admin ? "#fbbf24" : "#475569" }}>
                        {profileData?.site_admin ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="gh-account-row">
                      <span className="gh-account-label">User ID</span>
                      <span className="gh-account-value" style={{ color: "#38bdf8" }}>
                        #{profileData?.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT CONTENT ── */}
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