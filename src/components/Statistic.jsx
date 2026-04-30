import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, CartesianGrid,  Bar, AreaChart, Area,
} from 'recharts';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

/* ─── CSS Injection ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #f5f0e8;
      --ink: #1a1410;
      --muted: #7a6f63;
      --accent1: #c84b31;
      --accent2: #2d6a4f;
      --accent3: #e9b44c;
      --accent4: #264653;
      --cream: #faf7f2;
      --border: rgba(26,20,16,0.12);
      --serif: 'Playfair Display', Georgia, serif;
      --sans: 'Outfit', sans-serif;
    }

    html { scroll-behavior: smooth; }
    body { background: var(--bg); }
    ::-webkit-scrollbar { width: 5px; background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent1); border-radius: 99px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes drawLine {
      from { stroke-dashoffset: 300; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes scalePop {
      0%   { transform: scale(0.92); opacity: 0; }
      100% { transform: scale(1);    opacity: 1; }
    }

    .stat-card {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 60px rgba(26,20,16,0.12);
    }

    .tab-btn {
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .tab-btn.active {
      background: var(--ink);
      color: var(--cream);
    }
    .tab-btn:not(.active):hover {
      background: rgba(26,20,16,0.06);
    }

    @media (max-width: 768px) {
      .hero-title { font-size: 2.4rem !important; }
      .grid-2 { grid-template-columns: 1fr !important; }
      .stat-row { flex-direction: column; gap: 12px !important; }
      .section-pad { padding: 40px 16px !important; }
      .marquee-track { animation-duration: 18s !important; }
    }
    @media (max-width: 480px) {
      .hero-title { font-size: 1.9rem !important; }
      .chart-area { height: 220px !important; }
    }
  `}</style>
);

/* ─── Marquee Banner ────────────────────────────────────────── */
const MarqueeBanner = ({ items, color }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', borderTop: `1px solid ${color}30`, borderBottom: `1px solid ${color}30`, background: color, padding: '10px 0' }}>
      <div className="marquee-track" style={{ display: 'flex', gap: 48, animation: 'marquee 28s linear infinite', width: 'max-content' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '0.85rem', color: '#fff', whiteSpace: 'nowrap', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {t} <span style={{ opacity: 0.5, marginLeft: 16 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Reveal on scroll ──────────────────────────────────────── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
};

/* ─── Big Stat Number ───────────────────────────────────────── */
const BigStat = ({ value, label, color = 'var(--ink)', accent = 'var(--accent1)' }) => (
  <div className="stat-card" style={{
    background: 'var(--cream)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    padding: '28px 24px',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: accent }} />
    <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem,5vw,3.2rem)', fontWeight: 900, color, lineHeight: 1, paddingLeft: 8 }}>
      {value}
    </div>
    <div style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 8, paddingLeft: 8 }}>
      {label}
    </div>
  </div>
);

/* ─── Section Header ────────────────────────────────────────── */
const SectionHeader = ({ number, title, subtitle, accent }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3.5rem,8vw,5.5rem)', fontWeight: 900, color: accent, lineHeight: 1, opacity: 0.18, userSelect: 'none', letterSpacing: '-0.04em' }}>
        {number}
      </span>
      <div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontFamily: 'var(--sans)', color: 'var(--muted)', fontSize: '0.9rem', marginTop: 6, fontWeight: 400 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
    <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}, transparent)`, marginTop: 20 }} />
  </div>
);

/* ─── Chart Container ───────────────────────────────────────── */
const ChartBox = ({ title, children, accent }) => (
  <div style={{
    background: 'var(--cream)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    padding: '24px 20px',
    position: 'relative',
  }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40, background: accent, clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
    <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: 18 }}>
      {title}
    </p>
    <div className="chart-area" style={{ height: 260 }}>
      {children}
    </div>
  </div>
);

/* ─── Custom Tooltip ────────────────────────────────────────── */
const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--ink)',
      color: 'var(--cream)',
      borderRadius: 4,
      padding: '10px 14px',
      fontFamily: 'var(--sans)',
      fontSize: '0.82rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4, opacity: 0.7 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{payload[0].name}: <span style={{ color: 'var(--accent3)' }}>{payload[0].value}</span></div>
    </div>
  );
};

/* ─── Tab Switcher ──────────────────────────────────────────── */
const Tabs = ({ options, value, onChange }) => (
  <div style={{ display: 'flex', gap: 2, background: 'rgba(26,20,16,0.06)', borderRadius: 4, padding: 3, width: 'fit-content', flexWrap: 'wrap' }}>
    {options.map(o => (
      <button key={o} className={`tab-btn${value === o ? ' active' : ''}`} onClick={() => onChange(o)}
        style={{
          border: 'none', background: 'transparent', fontFamily: 'var(--sans)',
          fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', padding: '8px 18px', borderRadius: 3,
          color: value === o ? 'var(--cream)' : 'var(--muted)',
        }}>
        {o}
      </button>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const Statistic = () => {
  const [spinner, setSpinner] = useState(true);
  const [learningActivity, setLearningActivity] = useState([]);
  const [academicResult, setAcademicResult] = useState([]);
  const [bscResult, setBscResult] = useState([]);
  const [activeChart, setActiveChart] = useState('Area');

  useEffect(() => {
    Promise.all([
      fetch('extraCA.json').then(r => r.json()),
      fetch('Eduction.json').then(r => r.json()),
      fetch('BSC.json').then(r => r.json()),
    ])
      .then(([ca, edu, bsc]) => {
        setLearningActivity(ca);
        setAcademicResult(edu);
        setBscResult(bsc);
        setSpinner(false);
      })
      .catch(e => toast.error(e?.message));
  }, []);

  if (spinner) return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: 'var(--bg)',
    }}>
      <GlobalStyles />
      <LoadingSpinner />
      <Link to="/dashboard/allprojects" style={{
        marginTop: 24, padding: '12px 32px',
        border: '2px solid var(--ink)',
        color: 'var(--ink)', borderRadius: 4, textDecoration: 'none',
        fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.85rem',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        transition: 'all 0.2s',
      }}>← Back to Projects</Link>
    </div>
  );

  const maxResult = learningActivity.length ? Math.max(...learningActivity.map(d => d.result)) : '—';
  const avgCgpa   = bscResult.length ? (bscResult.reduce((s, d) => s + d.cgpa, 0) / bscResult.length).toFixed(2) : '—';
  const bestCgpa  = bscResult.length ? Math.max(...bscResult.map(d => d.cgpa)).toFixed(2) : '—';

  const marqueeItems = ['Academic Excellence', 'Certificate Mastery', 'Continuous Growth', 'Data Visualization', 'Learning Journey'];

  return (
    <>
      <GlobalStyles />

      <div name="statistic" style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--sans)',
      }}>

        {/* ── HERO ─────────────────────────────────────────── */}
        <header style={{
          padding: 'clamp(48px,8vw,100px) clamp(20px,6vw,80px) 0',
          maxWidth: 1280,
          margin: '0 auto',
          animation: 'fadeUp 0.7s ease both',
        }}>

          {/* top label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: 'var(--accent1)' }} />
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent1)' }}>
              Portfolio Analytics
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'end' }}>
            <div>
              <h1 className="hero-title" style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.8rem,7vw,5rem)',
                fontWeight: 900,
                color: 'var(--ink)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}>
                Educational<br />
                <em style={{ fontStyle: 'italic', color: 'var(--accent1)' }}>Journey</em>
              </h1>
            </div>

            <div>
              <p style={{ color: 'var(--muted)', fontSize: 'clamp(0.9rem,1.8vw,1.05rem)', lineHeight: 1.75, fontWeight: 400, maxWidth: 380 }}>
                A curated record of academic milestones, certificates earned, and the ongoing pursuit of knowledge — presented through the lens of data.
              </p>
              
            </div>
          </div>

          {/* Stat row */}
          <div className="stat-row" style={{ display: 'flex', gap: 16, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { v: maxResult, l: 'Top Score',    a: 'var(--accent1)' },
              { v: avgCgpa,   l: 'Avg CGPA',     a: 'var(--accent2)' },
              { v: bestCgpa,  l: 'Best CGPA',    a: 'var(--accent3)' },
              { v: bscResult.length || '—',       l: 'Semesters',     a: 'var(--accent4)' },
              { v: learningActivity.length || '—', l: 'Certificates', a: 'var(--accent1)' },
            ].map(s => (
              <div key={s.l} style={{ flex: '1 1 140px' }}>
                <BigStat value={s.v} label={s.l} accent={s.a} />
              </div>
            ))}
          </div>

          {/* divider */}
          <div style={{ height: 1, background: 'var(--border)', marginTop: 48 }} />
        </header>

        {/* ── MARQUEE ──────────────────────────────────────── */}
        <div style={{ marginTop: 0 }}>
          <MarqueeBanner items={marqueeItems} color="var(--accent1)" />
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <main style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)' }}>

          {/* ── Section 01: Certificates ─────────────────── */}
          <Reveal delay={0.05}>
            <section className="section-pad" style={{ marginBottom: 72 }}>
              <SectionHeader
                number="01"
                title="Extra Curricular Certificates"
                subtitle="Performance across online courses and skill certifications"
                accent="var(--accent2)"
              />

              {/* Tab switcher */}
              <div style={{ marginBottom: 24 }}>
                <Tabs options={['Area', 'Bar']} value={activeChart} onChange={setActiveChart} />
              </div>

              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>

                {activeChart === 'Area' ? (
                  <ChartBox title="Performance Timeline" accent="var(--accent2)">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={learningActivity} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"  stopColor="#2d6a4f" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#2d6a4f" stopOpacity={0.01} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 8" stroke="rgba(26,20,16,0.07)" />
                        <XAxis dataKey="courseName" tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                        <YAxis tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                        <Tooltip content={<Tip />} />
                        <Area type="monotone" dataKey="result" stroke="#2d6a4f" strokeWidth={2.5} fill="url(#g1)"
                          dot={{ fill: '#2d6a4f', r: 4, strokeWidth: 0 }}
                          activeDot={{ r: 7, fill: '#2d6a4f', stroke: '#fff', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartBox>
                ) : (
                  <ChartBox title="Certificate Scores" accent="var(--accent1)">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={learningActivity} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"  stopColor="#c84b31" stopOpacity={1} />
                            <stop offset="100%" stopColor="#c84b31" stopOpacity={0.5} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 8" stroke="rgba(26,20,16,0.07)" />
                        <XAxis dataKey="courseName" tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                        <YAxis tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                        <Tooltip content={<Tip />} />
                        <Bar dataKey="result" fill="url(#g2)" radius={[3, 3, 0, 0]} barSize={26} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartBox>
                )}

                {/* Score table */}
                <div style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)' }}>Score Breakdown</p>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent2)' }} />
                  </div>
                  <div style={{ overflowY: 'auto', maxHeight: 260 }}>
                    {learningActivity.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 20px', borderBottom: '1px solid var(--border)',
                        transition: 'background 0.15s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,20,16,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, width: 20 }}>{i + 1}.</span>
                          <span style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--ink)', fontWeight: 500 }}>{item.courseName}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 60, height: 4, background: 'rgba(26,20,16,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{ width: `${(item.result / maxResult) * 100}%`, height: '100%', background: 'var(--accent2)', borderRadius: 99 }} />
                          </div>
                          <span style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', minWidth: 30, textAlign: 'right' }}>{item.result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* ── Divider ───────────────────────────────────── */}
          <Reveal delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 72 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <div style={{ width: 8, height: 8, background: 'var(--accent3)', transform: 'rotate(45deg)' }} />
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
          </Reveal>

          {/* ── Section 02: Academic Performance ─────────── */}
          <Reveal delay={0.1}>
            <section className="section-pad">
              <SectionHeader
                number="02"
                title="Academic Performance"
                subtitle="BSc semester results and individual course grades"
                accent="var(--accent4)"
              />

              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>

                {/* BSc CGPA */}
                <ChartBox title="BSc CGPA by Semester" accent="var(--accent4)">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bscResult} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"  stopColor="#264653" stopOpacity={1} />
                          <stop offset="100%" stopColor="#264653" stopOpacity={0.45} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 8" stroke="rgba(26,20,16,0.07)" />
                      <XAxis dataKey="semester" tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                      <YAxis tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                      <Tooltip content={<Tip />} />
                      <Bar dataKey="cgpa" fill="url(#g3)" radius={[3, 3, 0, 0]} barSize={26} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartBox>

                {/* Course Results line */}
                <ChartBox title="Course Results" accent="var(--accent3)">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={academicResult} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"  stopColor="#e9b44c" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#e9b44c" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 8" stroke="rgba(26,20,16,0.07)" />
                      <XAxis dataKey="course" tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                      <YAxis tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--sans)' }} stroke="var(--border)" />
                      <Tooltip content={<Tip />} />
                      <Area type="monotone" dataKey="result" stroke="none" fill="url(#g4)" />
                      <Line type="monotone" dataKey="result" stroke="#e9b44c" strokeWidth={2.5}
                        dot={{ fill: '#e9b44c', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 7, fill: '#fff', stroke: '#e9b44c', strokeWidth: 2.5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartBox>

              </div>

              {/* CGPA progress strip */}
              {bscResult.length > 0 && (
                <div style={{ marginTop: 20, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 4, padding: '20px 24px' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: 16 }}>
                    CGPA Trend per Semester
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {bscResult.map((s, i) => (
                      <div key={i} style={{ flex: '1 1 60px', textAlign: 'center' }}>
                        <div style={{ height: 6, background: 'rgba(26,20,16,0.08)', borderRadius: 99, marginBottom: 8, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${(s.cgpa / 4) * 100}%`,
                            background: `linear-gradient(90deg, var(--accent4), var(--accent3))`,
                            borderRadius: 99,
                            transition: 'width 1s ease',
                          }} />
                        </div>
                        <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{s.cgpa}</span>
                        <br />
                        <span style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.semester}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </Reveal>
        </main>

       
      </div>
    </>
  );
};

export default Statistic;