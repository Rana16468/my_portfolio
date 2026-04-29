import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";
import SecondGithubRepo from "./github/SecondGithubRepo";

/* ── Inline keyframe styles injected once ── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --acid: #b9ff4e;
    --ink: #0a0a0a;
    --fog: #111318;
    --panel: #14171f;
    --rim: rgba(185,255,78,0.18);
    --text-dim: #6b7280;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes pulse-ring {
    0%,100% { box-shadow: 0 0 0 0 rgba(185,255,78,0.35); }
    50%      { box-shadow: 0 0 0 14px rgba(185,255,78,0); }
  }
  @keyframes scan {
    0%   { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }
  @keyframes ticker {
    0%   { transform:translateX(0); }
    100% { transform:translateX(-50%); }
  }

  .hpd-root {
    font-family: 'Syne', sans-serif;
    background: var(--ink);
    min-height: 100vh;
    color: #e8eaf0;
    overflow-x: hidden;
  }

  /* noise grain overlay */
  .hpd-root::before {
    content:'';
    position:fixed; inset:0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events:none; z-index:0;
  }

  /* ── Ticker ── */
  .ticker-wrap { overflow:hidden; background:var(--acid); padding:6px 0; }
  .ticker-track {
    display:flex; gap:0; white-space:nowrap;
    animation: ticker 28s linear infinite;
    font-family:'DM Mono',monospace; font-size:11px; font-weight:500;
    color:var(--ink); letter-spacing:.12em; text-transform:uppercase;
  }
  .ticker-track span { margin-right:48px; }

  /* ── Hero image strip ── */
  .hero-strip {
    position:relative; display:grid; grid-template-columns:1fr 1fr; gap:3px;
    height:340px; overflow:hidden;
  }
  @media(max-width:640px){ .hero-strip { grid-template-columns:1fr; height:220px; } }
  .hero-img {
    width:100%; height:100%; object-fit:cover;
    filter:saturate(0.6) contrast(1.1);
    transition: filter .5s ease, transform .6s ease;
  }
  .hero-img:hover { filter:saturate(1) contrast(1); transform:scale(1.03); }
  .hero-overlay {
    position:absolute; inset:0;
    background: linear-gradient(to top, var(--ink) 0%, transparent 60%);
    pointer-events:none;
  }
  .hero-badge {
    position:absolute; top:20px; left:20px;
    background:var(--acid); color:var(--ink);
    font-family:'DM Mono',monospace; font-size:10px; font-weight:500;
    letter-spacing:.14em; text-transform:uppercase;
    padding:5px 12px; clip-path:polygon(0 0,100% 0,92% 100%,0 100%);
    animation: pulse-ring 2.4s ease infinite;
  }
  .hero-number {
    position:absolute; bottom:20px; right:20px;
    font-size:72px; font-weight:800; line-height:1;
    color:transparent; -webkit-text-stroke:1px rgba(185,255,78,.25);
    pointer-events:none; user-select:none;
  }

  /* ── Body layout ── */
  .hpd-body { position:relative; z-index:1; max-width:900px; margin:0 auto; padding:0 20px 80px; }

  /* ── Project title row ── */
  .project-header {
    display:flex; align-items:flex-end; justify-content:space-between;
    padding:32px 0 24px; border-bottom:1px solid rgba(255,255,255,.06);
    animation: fadeUp .6s ease both;
  }
  .project-title {
    font-size:clamp(28px,5vw,52px); font-weight:800; line-height:1.05;
    letter-spacing:-.02em;
  }
  .project-title em { color:var(--acid); font-style:normal; }
  .project-date {
    font-family:'DM Mono',monospace; font-size:12px;
    color:var(--text-dim); letter-spacing:.1em; text-transform:uppercase;
    white-space:nowrap; padding-bottom:6px;
  }

  /* ── Info grid ── */
  .info-grid {
    display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    gap:2px; margin:28px 0; animation: fadeUp .6s .1s ease both;
  }
  .info-cell {
    background:var(--panel); padding:18px 20px;
    transition: background .2s, transform .2s;
    cursor:default;
  }
  .info-cell:hover { background:#1c2030; transform:translateY(-2px); }
  .info-cell-label {
    font-family:'DM Mono',monospace; font-size:9px;
    color:var(--acid); letter-spacing:.18em; text-transform:uppercase;
    margin-bottom:8px;
  }
  .info-cell-value { font-size:14px; color:#c8ccda; font-weight:600; line-height:1.4; }

  /* ── Long text blocks ── */
  .text-block {
    position:relative; background:var(--panel);
    padding:24px 24px 24px 52px; margin-bottom:3px;
    animation: slideInLeft .5s ease both;
  }
  .text-block-num {
    position:absolute; left:16px; top:24px;
    font-family:'DM Mono',monospace; font-size:10px;
    color:var(--acid); opacity:.7; letter-spacing:.1em;
  }
  .text-block-label {
    font-family:'DM Mono',monospace; font-size:9px;
    color:var(--text-dim); letter-spacing:.18em; text-transform:uppercase;
    margin-bottom:8px;
  }
  .text-block-content { font-size:15px; color:#b8bdd0; line-height:1.7; }

  /* ── Tech pills ── */
  .tech-row {
    display:flex; flex-wrap:wrap; gap:8px;
    margin-top:8px;
  }
  .tech-pill {
    font-family:'DM Mono',monospace; font-size:11px; font-weight:500;
    background: transparent; border:1px solid rgba(185,255,78,.3);
    color:var(--acid); padding:4px 12px; border-radius:2px;
    letter-spacing:.08em; transition: background .2s;
  }
  .tech-pill:hover { background:rgba(185,255,78,.1); }

  /* ── CTA strip ── */
  .cta-strip {
    display:flex; flex-wrap:wrap; gap:3px; margin-top:40px;
    animation: fadeUp .6s .25s ease both;
  }
  .cta-btn {
    flex:1; min-width:130px; text-align:center;
    padding:18px 12px; font-weight:700; font-size:13px;
    letter-spacing:.12em; text-transform:uppercase;
    text-decoration:none; transition: filter .2s, transform .15s;
    position:relative; overflow:hidden;
  }
  .cta-btn::after {
    content:''; position:absolute; inset:0;
    background:rgba(255,255,255,0);
    transition: background .2s;
  }
  .cta-btn:hover::after { background:rgba(255,255,255,.07); }
  .cta-btn:hover { transform:translateY(-2px); filter:brightness(1.1); }
  .cta-btn:active { transform:translateY(0); }

  .cta-demo  { background:var(--acid);  color:var(--ink); }
  .cta-code  { background:#1c2030; color:#e8eaf0; border:1px solid rgba(255,255,255,.08); }
  .cta-server{ background:#1c2030; color:#e8eaf0; border:1px solid rgba(255,255,255,.08); }
  .cta-home  { background:#0f1117; color:var(--text-dim); border:1px solid rgba(255,255,255,.05); }

  /* ── Section divider ── */
  .divider {
    height:1px; margin:32px 0;
    background:linear-gradient(90deg,var(--acid) 0%,rgba(185,255,78,0) 100%);
    opacity:.22;
  }
`;

/* ─── helper: split comma-separated tech into pills ─── */
const TechPills = ({ value }) => {
  if (!value) return null;
  const items = value.split(/[,;\/]/).map(s => s.trim()).filter(Boolean);
  if (items.length <= 1) return <span className="text-block-content">{value}</span>;
  return (
    <div className="tech-row">
      {items.map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
    </div>
  );
};

/* ─── Ticker content ─── */
const TICKER_ITEMS = [
  "Web Development", "Open Source", "Full Stack", "Responsive Design",
  "React", "Node.js", "Portfolio", "Project Showcase",
  "Web Development", "Open Source", "Full Stack", "Responsive Design",
  "React", "Node.js", "Portfolio", "Project Showcase",
];

const HomeProjectDetails = () => {
  const { id } = useParams();
  const [imgError, setImgError] = useState({});

  const {
    data: projectDetails = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projectDetails", id],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/projectdetails/${id}`,
          {
            method: "GET",
            headers: { authorization: `${localStorage.getItem("token")}` },
          }
        );
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      } catch (err) {
        toast.error(`Failed to fetch project: ${err?.message}`);
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  const {
    project,
    projecttype,
    statingTime,
    enddingTime,
    feature,
    src: projectDetailsSrc,
    featureDiscription,
    responsiveDesign,
    technologiesUsed,
  } = projectDetails?.data || {};

  const { src, demo, code, server, createdAt } = project || {};

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "";

  const FALLBACK = "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg";

  const infoItems = [
    { label: "Type",     value: projecttype   },
    { label: "Started",  value: statingTime   },
    { label: "Ended",    value: enddingTime   },
    { label: "Feature",  value: feature       },
    { label: "Uploaded", value: formattedDate },
  ].filter(i => i.value);

  return (
    <>
      <style>{styles}</style>

      <div className="hpd-root">

        {/* ── Ticker ── */}
        <div className="ticker-wrap">
          <div className="ticker-track">
            {TICKER_ITEMS.map((t, i) => <span key={i}>✦ {t}</span>)}
          </div>
        </div>

        {/* ── Hero images ── */}
        <div className="hero-strip">
          <img
            src={imgError.a ? FALLBACK : (src || FALLBACK)}
            alt="Project main"
            className="hero-img"
            onError={() => setImgError(e => ({...e, a:true}))}
          />
          <img
            src={imgError.b ? FALLBACK : (projectDetailsSrc || FALLBACK)}
            alt="Project detail"
            className="hero-img"
            onError={() => setImgError(e => ({...e, b:true}))}
          />
          <div className="hero-overlay" />
          <div className="hero-badge">● Featured Project</div>
          <div className="hero-number">0{id?.slice(-1) || 1}</div>
        </div>

        {/* ── Body ── */}
        <div className="hpd-body">

          {/* Header */}
          <div className="project-header">
            <h1 className="project-title">
              Web<br /><em>Development</em>
            </h1>
            {formattedDate && (
              <span className="project-date">{formattedDate}</span>
            )}
          </div>

          {/* Info grid */}
          {infoItems.length > 0 && (
            <div className="info-grid">
              {infoItems.map(({ label, value }) => (
                <div className="info-cell" key={label}>
                  <div className="info-cell-label">{label}</div>
                  <div className="info-cell-value">{value}</div>
                </div>
              ))}
            </div>
          )}

          <div className="divider" />

          {/* Description */}
          {featureDiscription && (
            <div className="text-block" style={{ animationDelay:'.1s' }}>
              <span className="text-block-num">01</span>
              <div className="text-block-label">Description</div>
              <p className="text-block-content">{featureDiscription}</p>
            </div>
          )}

          {/* Responsive design */}
          {responsiveDesign && (
            <div className="text-block" style={{ animationDelay:'.18s' }}>
              <span className="text-block-num">02</span>
              <div className="text-block-label">Responsive Design</div>
              <p className="text-block-content">{responsiveDesign}</p>
            </div>
          )}

          {/* Technologies */}
          {technologiesUsed && (
            <div className="text-block" style={{ animationDelay:'.26s' }}>
              <span className="text-block-num">03</span>
              <div className="text-block-label">Technologies Used</div>
              <TechPills value={technologiesUsed} />
            </div>
          )}

          {/* CTA buttons */}
          <div className="cta-strip">
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="cta-btn cta-demo">
                ↗ Live Demo
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noreferrer" className="cta-btn cta-code">
                {'<>'} Source Code
              </a>
            )}
            {server && (
              <a href={server} target="_blank" rel="noreferrer" className="cta-btn cta-server">
                ⚙ Server Repo
              </a>
            )}
            <Link to="/" className="cta-btn cta-home">
              ← Back Home
            </Link>
          </div>

          <div className="divider" style={{ marginTop:48 }} />

         
        </div>

      </div>
    </>
  );
};

export default HomeProjectDetails;