import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (nav && !e.target.closest(".navbar-container")) setNav(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [nav]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const links = [
    { id: 1, link: "home", icon: "⌂" },
    { id: 2, link: "my-github", icon: "◈" },
    { id: 3, link: "about", icon: "◉" },
    { id: 4, link: "project", icon: "◫" },
    { id: 5, link: "experience", icon: "◎" },
    { id: 6, link: "skills", icon: "◐" },
    { id: 7, link: "statistic", icon: "◑" },
    { id: 8, link: "blogs", icon: "◻" },
    { id: 9, link: "contact", icon: "◬" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --nav-bg: rgba(4, 4, 12, 0.92);
          --accent: #00f5d4;
          --accent2: #f72585;
          --text: #e8e8f0;
          --muted: #6b6b8a;
          --border: rgba(0, 245, 212, 0.15);
        }

        .navbar-root { font-family: 'Syne', sans-serif; }

        .navbar-glass {
          background: var(--nav-bg);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 0 80px rgba(0, 245, 212, 0.03);
        }

        .navbar-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mx, 50%) var(--my, 50%),
            rgba(0, 245, 212, 0.04),
            transparent 60%
          );
          pointer-events: none;
          transition: background 0.1s;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #00f5d4 0%, #00b4d8 50%, #f72585 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .logo-badge {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.7;
          display: block;
          margin-top: -4px;
        }

        .nav-item {
          position: relative;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 6px 14px;
          cursor: pointer;
          transition: color 0.25s ease;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 14px;
          right: 14px;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left;
        }

        .nav-item:hover { color: var(--text); }
        .nav-item:hover::after { transform: scaleX(1); }
        .nav-item.active { color: var(--accent); }
        .nav-item.active::after { transform: scaleX(1); }

        .nav-icon {
          font-size: 0.7rem;
          opacity: 0.5;
          transition: opacity 0.25s;
        }

        .nav-item:hover .nav-icon,
        .nav-item.active .nav-icon { opacity: 1; }

        .logo-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          display: inline-block;
          margin-left: 4px;
          animation: pulse-dot 2s infinite;
          vertical-align: middle;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .nav-pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 6px 8px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .ham-btn {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
        }

        .ham-btn:hover {
          border-color: var(--accent);
          background: rgba(0, 245, 212, 0.05);
        }

        .ham-line {
          height: 1.5px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ham-line-1 { width: 20px; }
        .ham-line-2 { width: 14px; }
        .ham-line-3 { width: 20px; }

        .ham-btn.open .ham-line-1 { transform: translateY(6.5px) rotate(45deg); width: 20px; }
        .ham-btn.open .ham-line-2 { opacity: 0; width: 0; }
        .ham-btn.open .ham-line-3 { transform: translateY(-6.5px) rotate(-45deg); width: 20px; }

        .mobile-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw);
          background: rgba(4, 4, 12, 0.98);
          backdrop-filter: blur(40px);
          border-left: 1px solid var(--border);
          z-index: 100;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          padding: 80px 40px 60px;
        }

        .mobile-drawer.open { transform: translateX(0); }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 99;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .mobile-overlay.open { opacity: 1; pointer-events: auto; }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-nav-item:hover .mobile-nav-label {
          color: var(--accent);
          transform: translateX(6px);
        }

        .mobile-nav-icon {
          font-size: 1rem;
          color: var(--muted);
          width: 24px;
          text-align: center;
          transition: color 0.25s;
        }

        .mobile-nav-item:hover .mobile-nav-icon { color: var(--accent); }

        .mobile-nav-label {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text);
          text-transform: capitalize;
          transition: color 0.25s, transform 0.25s;
        }

        .mobile-nav-num {
          margin-left: auto;
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: var(--muted);
        }

        .drawer-close {
          position: absolute;
          top: 24px; right: 24px;
          width: 36px; height: 36px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.1rem;
          transition: border-color 0.2s, color 0.2s;
        }

        .drawer-close:hover { border-color: var(--accent2); color: var(--accent2); }

        .drawer-footer {
          margin-top: auto;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }

        .drawer-footer-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .status-dot {
          width: 5px; height: 5px;
          background: var(--accent);
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
          animation: pulse-dot 2s infinite;
        }

        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-animate { animation: fade-in-down 0.5s ease both; }

        @media (min-width: 768px) {
          #desktop-nav { display: flex !important; }
          .ham-btn { display: none !important; }
        }
      `}</style>

      <div className="navbar-root">
        <div
          ref={navRef}
          className="navbar-container navbar-glass nav-animate"
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 50,
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            transition: "all 0.3s ease",
            "--mx": `${mousePos.x}px`,
            "--my": `${mousePos.y}px`,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span className="logo-text">
              A M Sohel Rana
              <span className="logo-dot" />
            </span>
            <span className="logo-badge">Portfolio · Dev</span>
          </div>

          {/* Desktop Nav */}
          <nav className="nav-pill" style={{ display: "none" }} id="desktop-nav">
            {links.map(({ id, link, icon }) => (
              <Link
                key={id}
                to={link}
                smooth
                duration={500}
                spy
                onSetActive={() => setActiveLink(link)}
                className={`nav-item ${activeLink === link ? "active" : ""}`}
              >
                <span className="nav-icon">{icon}</span>
                {link.replace("-", " ")}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className={`ham-btn ${nav ? "open" : ""}`}
            onClick={() => setNav(!nav)}
            aria-label="Toggle Menu"
          >
            <div className="ham-line ham-line-1" />
            <div className="ham-line ham-line-2" />
            <div className="ham-line ham-line-3" />
          </button>
        </div>

        {/* Mobile Overlay */}
        <div
          className={`mobile-overlay ${nav ? "open" : ""}`}
          onClick={() => setNav(false)}
        />

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${nav ? "open" : ""}`}>
          <button className="drawer-close" onClick={() => setNav(false)}>
            ✕
          </button>

          <div style={{ marginBottom: "8px" }}>
            <span className="logo-badge" style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}>
              NAVIGATION
            </span>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {links.map(({ id, link, icon }) => (
              <li key={id}>
                <Link to={link} smooth duration={500} onClick={() => setNav(false)}>
                  <div className="mobile-nav-item">
                    <span className="mobile-nav-icon">{icon}</span>
                    <span className="mobile-nav-label">{link.replace("-", " ")}</span>
                    <span className="mobile-nav-num">0{id}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="drawer-footer">
            <p className="drawer-footer-label">
              <span className="status-dot" />
              Available for work
            </p>
            <p className="logo-text" style={{ fontSize: "0.95rem", marginTop: "8px" }}>
              A M Sohel Rana
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;