import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);
  console.log(hoveredLink)



  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (nav && !e.target.closest(".navbar-container")) setNav(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [nav]);

  const links = [
    { id: 1, link: "home",       label: "Home",       num: "01" },
    { id: 2, link: "my-github",  label: "GitHub",     num: "02" },
    { id: 3, link: "about",      label: "About",      num: "03" },
    { id: 4, link: "project",    label: "Projects",   num: "04" },
    { id: 5, link: "experience", label: "Experience", num: "05" },
    { id: 6, link: "skills",     label: "Skills",     num: "06" },
    { id: 7, link: "statistic",  label: "Stats",      num: "07" },
    { id: 8, link: "blogs",      label: "Blogs",      num: "08" },
    { id: 9, link: "contact",    label: "Contact",    num: "09" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --ink: #0a0a0f;
          --paper: #f5f0e8;
          --gold: #c9a84c;
          --gold-light: #e8cc7a;
          --gold-dim: rgba(201,168,76,0.18);
          --gold-glow: rgba(201,168,76,0.35);
          --ivory: #f0e9d6;
          --smoke: rgba(245,240,232,0.06);
          --line: rgba(201,168,76,0.2);
          --red-accent: #c0392b;
        }

        /* ─── Reset & Base ─── */
        .nb-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .nb-root { font-family: 'Outfit', sans-serif; }

        /* ─── Main Bar ─── */
        .nb-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9000;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 36px;
          transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        .nb-bar.scrolled {
          background: rgba(10,10,15,0.96);
          backdrop-filter: blur(28px);
          border-bottom: 1px solid var(--line);
          height: 64px;
          box-shadow: 0 2px 60px rgba(0,0,0,0.6), 0 0 0 0.5px var(--line);
        }

        .nb-bar:not(.scrolled) {
          background: linear-gradient(
            180deg,
            rgba(10,10,15,0.88) 0%,
            rgba(10,10,15,0.0) 100%
          );
        }

        /* ─── Gold top edge line ─── */
        .nb-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--gold) 30%,
            var(--gold-light) 50%,
            var(--gold) 70%,
            transparent 100%
          );
          opacity: 0.9;
        }

        /* ─── LOGO ─── */
        .nb-logo-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
        }

        .nb-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: 1.55rem;
          letter-spacing: 0.04em;
          color: var(--ivory);
          line-height: 1;
          position: relative;
          display: inline-block;
        }

        .nb-logo-name em {
          font-style: normal;
          color: var(--gold);
        }

        .nb-logo-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.52rem;
          font-weight: 300;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.75;
          padding-left: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nb-logo-sub::before {
          content: '';
          width: 16px;
          height: 1px;
          background: var(--gold);
          opacity: 0.6;
          display: inline-block;
        }

        /* ─── Desktop Nav ─── */
        .nb-desktop {
          display: none;
          align-items: center;
          gap: 0;
        }

        @media (min-width: 1024px) {
          .nb-desktop { display: flex !important; }
          .nb-ham { display: none !important; }
        }

        .nb-link {
          position: relative;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(240,233,214,0.5);
          padding: 6px 16px;
          cursor: pointer;
          transition: color 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          border: none;
          background: none;
          text-decoration: none;
        }

        .nb-link-num {
          font-size: 0.42rem;
          letter-spacing: 0.1em;
          color: var(--gold);
          opacity: 0;
          transition: opacity 0.25s;
          font-family: 'DM Mono', monospace;
        }

        .nb-link:hover .nb-link-num,
        .nb-link.active .nb-link-num {
          opacity: 0.7;
        }

        .nb-link:hover { color: var(--ivory); }
        .nb-link.active { color: var(--gold-light); }

        /* Animated underline */
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1), left 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        .nb-link:hover::after,
        .nb-link.active::after {
          width: calc(100% - 32px);
          left: 16px;
        }

        /* Vertical separator lines between links */
        .nb-link + .nb-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 12px;
          width: 1px;
          background: var(--line);
        }

        /* ─── CTA Button ─── */
        .nb-cta {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink);
          background: var(--gold);
          border: none;
          padding: 9px 22px;
          cursor: pointer;
          margin-left: 24px;
          position: relative;
          overflow: hidden;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nb-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold-light);
          transform: translateX(-101%);
          transition: transform 0.3s ease;
        }

        .nb-cta:hover::before { transform: translateX(0); }
        .nb-cta span { position: relative; z-index: 1; }

        /* ─── Hamburger ─── */
        .nb-ham {
          width: 44px;
          height: 44px;
          background: var(--smoke);
          border: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
          position: relative;
          overflow: hidden;
        }

        .nb-ham::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold-dim);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .nb-ham:hover::before { opacity: 1; }
        .nb-ham:hover { border-color: var(--gold); }

        .nb-ham-line {
          width: 22px;
          height: 1.5px;
          background: var(--ivory);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          z-index: 1;
        }

        .nb-ham-line-mid { width: 15px; margin-right: -7px; }

        .nb-ham.open .nb-ham-line-top { transform: translateY(7.5px) rotate(45deg); width: 22px; background: var(--gold); }
        .nb-ham.open .nb-ham-line-mid { opacity: 0; transform: scaleX(0); }
        .nb-ham.open .nb-ham-line-bot { transform: translateY(-7.5px) rotate(-45deg); background: var(--gold); }

        /* ─── Mobile Overlay ─── */
        .nb-overlay {
          position: fixed;
          inset: 0;
          z-index: 8998;
          background: rgba(10,10,15,0.7);
          backdrop-filter: blur(8px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        .nb-overlay.open { opacity: 1; pointer-events: auto; }

        /* ─── Mobile Drawer ─── */
        .nb-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(340px, 88vw);
          z-index: 8999;
          background: #0d0d14;
          border-left: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          transform: translateX(105%);
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
        }

        .nb-drawer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
        }

        .nb-drawer.open { transform: translateX(0); }

        .nb-drawer-head {
          padding: 28px 36px 24px;
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .nb-drawer-close {
          width: 36px; height: 36px;
          background: transparent;
          border: 1px solid var(--line);
          color: rgba(240,233,214,0.5);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
        }

        .nb-drawer-close:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: var(--gold-dim);
        }

        .nb-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 0;
        }

        .nb-mob-item {
          display: flex;
          align-items: center;
          padding: 0 36px;
          height: 64px;
          cursor: pointer;
          position: relative;
          transition: background 0.25s;
          border-bottom: 1px solid rgba(201,168,76,0.06);
          text-decoration: none;
        }

        .nb-mob-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--gold);
          transform: scaleY(0);
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          transform-origin: bottom;
        }

        .nb-mob-item:hover::before,
        .nb-mob-item.active::before { transform: scaleY(1); }

        .nb-mob-item:hover {
          background: var(--gold-dim);
        }

        .nb-mob-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.52rem;
          color: var(--gold);
          opacity: 0.6;
          margin-right: 20px;
          letter-spacing: 0.08em;
          min-width: 22px;
        }

        .nb-mob-label {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: rgba(240,233,214,0.65);
          letter-spacing: 0.04em;
          transition: color 0.25s, transform 0.25s;
          flex: 1;
        }

        .nb-mob-item:hover .nb-mob-label,
        .nb-mob-item.active .nb-mob-label {
          color: var(--ivory);
          transform: translateX(6px);
        }

        .nb-mob-arrow {
          font-size: 0.85rem;
          color: var(--gold);
          opacity: 0;
          transition: opacity 0.25s, transform 0.25s;
        }

        .nb-mob-item:hover .nb-mob-arrow { opacity: 1; transform: translateX(4px); }

        /* ─── Drawer Footer ─── */
        .nb-drawer-footer {
          padding: 24px 36px 32px;
          border-top: 1px solid var(--line);
        }

        .nb-drawer-footer-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .nb-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #2ecc71;
          position: relative;
        }

        .nb-pulse::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1px solid #2ecc71;
          animation: nb-ripple 2s infinite;
        }

        @keyframes nb-ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .nb-status-text {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,233,214,0.4);
        }

        .nb-drawer-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ivory);
          letter-spacing: 0.04em;
        }

        .nb-drawer-role {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.7;
          margin-top: 4px;
        }

        /* ─── Fade-in animation for bar ─── */
        @keyframes nb-drop {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nb-bar { animation: nb-drop 0.7s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <div className="nb-root">
        {/* ── Main Bar ── */}
        <header
          ref={navRef}
          className={`nb-bar navbar-container ${scrolled ? "scrolled" : ""}`}
        >
          {/* Logo */}
          <div className="nb-logo-wrap">
            <span className="nb-logo-name">
              A M <em>Sohel</em> Rana
            </span>
            
          </div>

          {/* Desktop Nav */}
          <nav className="nb-desktop" style={{ display: "none" }} id="desktop-nav">
            {links.map(({ id, link, label, num }) => (
              <Link
                key={id}
                to={link}
                smooth
                duration={600}
                spy
                offset={-72}
                onSetActive={() => setActiveLink(link)}
                className={`nb-link ${activeLink === link ? "active" : ""}`}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="nb-link-num">{num}</span>
                {label}
              </Link>
            ))}

            <a
  href="https://drive.google.com/file/d/1-quvJP4Yn3HzbJKAeVGXf2BebbImPoxF/view"
  target="_blank"
  rel="noreferrer"
  className="nb-cta"
>
  Hire Me
</a>
          </nav>

          {/* Hamburger */}
          <button
            className={`nb-ham ${nav ? "open" : ""}`}
            onClick={() => setNav(!nav)}
            aria-label="Toggle Menu"
          >
            <div className="nb-ham-line nb-ham-line-top" />
            <div className="nb-ham-line nb-ham-line-mid" />
            <div className="nb-ham-line nb-ham-line-bot" />
          </button>
        </header>

        {/* ── Overlay ── */}
        <div className={`nb-overlay ${nav ? "open" : ""}`} onClick={() => setNav(false)} />

        {/* ── Mobile Drawer ── */}
        <aside className={`nb-drawer ${nav ? "open" : ""}`}>
          <div className="nb-drawer-head">
            <div>
              <div className="nb-drawer-name">A M Sohel Rana</div>
              <div className="nb-drawer-role">Full Stack Developer</div>
            </div>
            <button className="nb-drawer-close" onClick={() => setNav(false)}>✕</button>
          </div>

          <nav className="nb-drawer-body">
            {links.map(({ id, link, label, num }) => (
              <Link
                key={id}
                to={link}
                smooth
                duration={600}
                offset={-72}
                onClick={() => setNav(false)}
              >
                <div className={`nb-mob-item ${activeLink === link ? "active" : ""}`}>
                  <span className="nb-mob-num">{num}</span>
                  <span className="nb-mob-label">{label}</span>
                  <span className="nb-mob-arrow">→</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="nb-drawer-footer">
            <div className="nb-drawer-footer-status">
              <div className="nb-pulse" />
              <span className="nb-status-text">Available for work</span>
            </div>
            <div className="nb-drawer-name" style={{ fontSize: "1rem" }}>
              A M Sohel Rana
            </div>
            <div className="nb-drawer-role">Portfolio · 2025</div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default NavBar;