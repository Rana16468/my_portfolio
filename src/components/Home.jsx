import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroImage from "../assets/mypic.jpg";

const skillCategories = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Redux"],
  backend: ["Node.js", "NestJS", "GraphQL", "Socket.IO", "Docker", "Express.js", "Prisma"],
  database: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
  mobile: ["React Native"],
  testing: ["Mocha", "Chai"],
  hosting: ["AWS", "Vercel", "Netlify", "Firebase", "Namecheap"],
};

const highlightedSkills = ["React", "Next.js", "Node.js", "NestJS", "React Native", "TypeScript"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

  .port-root {
    min-height: 100vh;
    width: 100%;
    background: #05080f;
    font-family: 'Outfit', sans-serif;
    color: #e8eaf0;
    overflow: hidden;
    position: relative;
    padding: 6rem 2rem 4rem;
  }

  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(56,189,248,.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,.06) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .accent-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  .orb1 { width: 350px; height: 350px; background: rgba(56,189,248,.12); top: -100px; right: 10%; }
  .orb2 { width: 250px; height: 250px; background: rgba(99,102,241,.1); bottom: 80px; left: 5%; }

  .port-inner {
    position: relative;
    z-index: 2;
    max-width: 1024px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    align-items: start;
  }

  .port-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(56,189,248,.08);
    border: 0.5px solid rgba(56,189,248,.25);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: #67e8f9;
    letter-spacing: .06em;
    margin-bottom: 1.2rem;
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22d3ee;
    animation: pulseDot 2s infinite;
  }

  .port-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 1.1;
    margin-bottom: 1rem;
    color: #f0f4ff;
  }

  .port-headline em {
    font-style: italic;
    background: linear-gradient(135deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .port-sub {
    font-size: 15px;
    line-height: 1.75;
    color: rgba(232,234,240,.6);
    max-width: 480px;
    margin-bottom: 2rem;
  }

  .skills-grid { display: flex; flex-direction: column; gap: .75rem; margin-bottom: 2rem; }

  .skill-row { display: flex; align-items: flex-start; gap: .75rem; }

  .cat-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: .08em;
    color: rgba(232,234,240,.35);
    min-width: 72px;
    text-align: right;
    padding-top: 5px;
    flex-shrink: 0;
  }

  .tags { display: flex; flex-wrap: wrap; gap: 5px; }

  .tag {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    padding: 3px 9px;
    border-radius: 4px;
    background: rgba(255,255,255,.04);
    border: 0.5px solid rgba(255,255,255,.1);
    color: rgba(232,234,240,.7);
    transition: background .2s, border-color .2s, color .2s;
    cursor: default;
  }

  .tag:hover {
    background: rgba(56,189,248,.1);
    border-color: rgba(56,189,248,.35);
    color: #7dd3fc;
  }

  .tag.hl {
    background: rgba(56,189,248,.08);
    border-color: rgba(56,189,248,.2);
    color: #67e8f9;
  }

  .port-divider {
    border: none;
    border-top: 0.5px solid rgba(255,255,255,.07);
    margin: 1.5rem 0;
  }

  .port-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    color: #fff;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: opacity .2s, transform .15s;
    font-family: 'Outfit', sans-serif;
  }

  .port-cta:hover { opacity: .88; transform: translateY(-1px); }

  .photo-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: .5rem;
  }

  .avatar-wrap { position: relative; width: 170px; height: 170px; }

  .avatar-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #38bdf8, #818cf8, #38bdf8);
    animation: spinRing 8s linear infinite;
  }

  .avatar-bg {
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: #05080f;
  }

  .avatar-img-wrap {
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f172a;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: transform .5s;
  }

  .avatar-img:hover { transform: scale(1.05); }

  .stat-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 170px;
  }

  .stat-card {
    background: rgba(255,255,255,.04);
    border: 0.5px solid rgba(255,255,255,.1);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }

  .stat-num {
    font-family: 'DM Mono', monospace;
    font-size: 18px;
    font-weight: 500;
    color: #7dd3fc;
    display: block;
  }

  .stat-lbl {
    font-size: 10px;
    letter-spacing: .05em;
    color: rgba(232,234,240,.4);
    display: block;
    margin-top: 2px;
  }

  @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes spinRing { to{transform:rotate(360deg)} }

  @media (max-width: 640px) {
    .port-inner { grid-template-columns: 1fr; }
    .photo-col { flex-direction: row; flex-wrap: wrap; justify-content: center; }
    .port-root { padding: 5rem 1rem 3rem; }
  }
`;

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div name="home" className="port-root">
        <div className="grid-bg" />
        <div className="accent-orb orb1" />
        <div className="accent-orb orb2" />

        <div className="port-inner">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -40 }}
            transition={{ duration: 0.7 }}
          >
            <div className="port-badge">
              <span className="pulse-dot" />
              available for work
            </div>

            <h1 className="port-headline">
              Full Stack<br />
              <em>Developer</em>
            </h1>

            <p className="port-sub">
              3.5 years crafting responsive web apps and robust APIs — from
              pixel-perfect UIs to scalable backend systems.
            </p>

            <div className="skills-grid">
              {Object.entries(skillCategories).map(([cat, skills], i) => (
                <motion.div
                  key={cat}
                  className="skill-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <span className="cat-label">{cat}</span>
                  <div className="tags">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className={`tag${highlightedSkills.includes(skill) ? " hl" : ""}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <hr className="port-divider" />

            <motion.a
              href="https://drive.google.com/file/d/1RwbGzniiZd69aYBvpLUYeeh4ZtIqPGGE/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="port-cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <DownloadIcon />
              Download CV
            </motion.a>
          </motion.div>

          {/* Right column — photo + stats */}
        {/* Right column — photo + stats */}
<motion.div
  className="photo-col"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 40 }}
  transition={{ duration: 0.7, delay: 0.15 }}
>
  <style>{`
    .photo-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.4rem;
      padding-top: .5rem;
    }

    /* ── Avatar ── */
    .avatar-wrap {
      position: relative;
      width: 180px;
      height: 180px;
    }

    /* Soft glow halo behind the ring */
    .avatar-halo {
      position: absolute;
      inset: -18px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(56,189,248,.22) 0%, transparent 70%);
      animation: haloPulse 3s ease-in-out infinite;
      pointer-events: none;
    }

    /* Conic spinning ring */
    .avatar-ring {
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #38bdf8 0%, #818cf8 40%, transparent 60%, #38bdf8 100%);
      animation: spinRing 6s linear infinite;
    }

    /* Counter-spin second ring for depth */
    .avatar-ring-2 {
      position: absolute;
      inset: -9px;
      border-radius: 50%;
      background: conic-gradient(from 180deg, transparent 60%, rgba(129,140,248,.4) 80%, transparent 100%);
      animation: spinRing 10s linear infinite reverse;
    }

    .avatar-bg {
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      background: #05080f;
    }

    .avatar-img-wrap {
      position: absolute;
      inset: 6px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f172a;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: transform .6s cubic-bezier(.34,1.56,.64,1);
    }

    .avatar-img:hover { transform: scale(1.07); }

    /* Floating particles */
    .avatar-particles {
      position: absolute;
      inset: -30px;
      pointer-events: none;
      border-radius: 50%;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      background: #38bdf8;
      opacity: 0;
      animation: floatParticle var(--dur) ease-in-out infinite var(--delay);
    }

    /* ── Stat cards ── */
    .stat-cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 180px;
    }

    .stat-row {
      display: flex;
      gap: 8px;
    }

    .stat-card {
      position: relative;
      flex: 1;
      overflow: hidden;
      background: rgba(255,255,255,.03);
      border: 0.5px solid rgba(255,255,255,.08);
      border-radius: 10px;
      padding: 12px 10px;
      text-align: center;
      transition: border-color .3s, background .3s, transform .3s;
      cursor: default;
    }

    .stat-card:hover {
      background: rgba(56,189,248,.06);
      border-color: rgba(56,189,248,.3);
      transform: translateY(-2px);
    }

    /* Shimmer sweep */
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.05), transparent);
      animation: shimmer 4s ease-in-out infinite var(--shimmer-delay, 0s);
    }

    .stat-card:nth-child(1) { --shimmer-delay: 0s; }
    .stat-card:nth-child(2) { --shimmer-delay: .8s; }

    .stat-card-wide {
      position: relative;
      overflow: hidden;
      background: rgba(56,189,248,.04);
      border: 0.5px solid rgba(56,189,248,.15);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      transition: border-color .3s, background .3s, transform .3s;
      cursor: default;
    }

    .stat-card-wide:hover {
      background: rgba(56,189,248,.08);
      border-color: rgba(56,189,248,.35);
      transform: translateY(-2px);
    }

    .stat-card-wide::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(56,189,248,.08), transparent);
      animation: shimmer 4s ease-in-out infinite 1.6s;
    }

    .stat-num {
      font-family: 'DM Mono', monospace;
      font-size: 22px;
      font-weight: 500;
      color: #7dd3fc;
      display: block;
      line-height: 1;
    }

    .stat-lbl {
      font-size: 10px;
      letter-spacing: .06em;
      color: rgba(232,234,240,.38);
      display: block;
      margin-top: 4px;
      text-transform: uppercase;
    }

    .lang-dots {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .lang-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .lang-names {
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      color: #67e8f9;
      letter-spacing: .04em;
    }

    .lang-sublbl {
      font-size: 10px;
      letter-spacing: .06em;
      color: rgba(232,234,240,.38);
      text-transform: uppercase;
    }

    /* ── Status pill ── */
    .status-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(34,197,94,.07);
      border: 0.5px solid rgba(34,197,94,.2);
      border-radius: 20px;
      padding: 5px 12px;
      font-size: 11px;
      font-family: 'DM Mono', monospace;
      color: #86efac;
      letter-spacing: .05em;
    }

    .status-blink {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ade80;
      animation: pulseDot 1.8s infinite;
      flex-shrink: 0;
    }

    @keyframes haloPulse {
      0%,100% { opacity: .7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.08); }
    }

    @keyframes floatParticle {
      0% { opacity: 0; transform: translateY(0) scale(.5); }
      20% { opacity: .8; }
      80% { opacity: .5; }
      100% { opacity: 0; transform: translateY(calc(var(--rise) * -1px)) translateX(calc(var(--drift) * 1px)) scale(1); }
    }

    @keyframes shimmer {
      0% { left: -100%; }
      40%,100% { left: 160%; }
    }
  `}</style>

  {/* Avatar */}
  <div className="avatar-wrap">
    <div className="avatar-halo" />
    <div className="avatar-ring-2" />
    <div className="avatar-ring" />
    <div className="avatar-bg" />
    <div className="avatar-img-wrap">
      <img src={HeroImage} alt="Profile" className="avatar-img" />
    </div>

    {/* Floating particles */}
    <div className="avatar-particles">
      {[
        { size: 3, top: "10%", left: "80%", dur: "3.2s", delay: "0s",  rise: 60, drift: -10 },
        { size: 2, top: "25%", left: "5%",  dur: "4s",   delay: ".5s", rise: 50, drift: 8  },
        { size: 4, top: "70%", left: "88%", dur: "3.6s", delay: "1s",  rise: 55, drift: -5 },
        { size: 2, top: "85%", left: "15%", dur: "5s",   delay: "1.8s",rise: 65, drift: 12 },
        { size: 3, top: "50%", left: "95%", dur: "2.8s", delay: "2.2s",rise: 45, drift: -8 },
        { size: 2, top: "5%",  left: "40%", dur: "4.4s", delay: ".9s", rise: 70, drift: 6  },
      ].map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            width: p.size, height: p.size,
            top: p.top, left: p.left,
            "--dur": p.dur, "--delay": p.delay,
            "--rise": p.rise, "--drift": p.drift,
          }}
        />
      ))}
    </div>
  </div>

  {/* Stats */}
  <div className="stat-cards">
    <div className="stat-row">
      <motion.div
        className="stat-card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="stat-num">3.5</span>
        <span className="stat-lbl">yrs exp</span>
      </motion.div>
      <motion.div
        className="stat-card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="stat-num">7+</span>
        <span className="stat-lbl">stacks</span>
      </motion.div>
    </div>

    <motion.div
      className="stat-card-wide"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div>
        <span className="lang-names">TS · JS · Java</span>
        <span className="lang-sublbl">core languages</span>
      </div>
      <div className="lang-dots">
        <span className="lang-dot" style={{ background: "#3178c6" }} />
        <span className="lang-dot" style={{ background: "#f7df1e" }} />
        <span className="lang-dot" style={{ background: "#f89820" }} />
      </div>
    </motion.div>
  </div>

  {/* Status pill */}
  <motion.div
    className="status-pill"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.85, type: "spring", stiffness: 200 }}
  >
    <span className="status-blink" />
    open to opportunities
  </motion.div>
</motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;