import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, CartesianGrid, Legend, Bar, Area, AreaChart
} from 'recharts';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

/* ─── Floating particle background ─────────────────────────── */
const Particles = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    dur: Math.random() * 18 + 10,
    delay: Math.random() * -20,
    opacity: Math.random() * 0.35 + 0.08,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {particles.map(p => (
        <span key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, #a78bfa, #38bdf8)`,
          opacity: p.opacity,
          animation: `floatUp ${p.dur}s ${p.delay}s infinite linear`,
        }} />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0)   scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-120vh) scale(0.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/* ─── Animated section reveal ───────────────────────────────── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
};

/* ─── Glassy card ───────────────────────────────────────────── */
const GlassCard = ({ children, accent = '#a78bfa', style = {} }) => (
  <div style={{
    background: 'rgba(15,15,35,0.65)',
    border: `1px solid ${accent}33`,
    borderRadius: 20,
    padding: '28px 24px',
    backdropFilter: 'blur(18px)',
    boxShadow: `0 0 40px ${accent}18, 0 8px 32px rgba(0,0,0,0.5)`,
    position: 'relative',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s',
    ...style,
  }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 70px ${accent}40, 0 12px 48px rgba(0,0,0,0.6)`}
    onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 40px ${accent}18, 0 8px 32px rgba(0,0,0,0.5)`}
  >
    {/* top-left glow orb */}
    <div style={{
      position: 'absolute', top: -40, left: -40,
      width: 130, height: 130,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
      pointerEvents: 'none',
    }} />
    {children}
  </div>
);

/* ─── Section heading ───────────────────────────────────────── */
const SectionTitle = ({ children, from, to }) => (
  <div style={{ textAlign: 'center', marginBottom: 32 }}>
    <h2 style={{
      fontSize: 'clamp(1.6rem,4vw,2.4rem)',
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      background: `linear-gradient(135deg, ${from}, ${to})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em',
      margin: 0,
    }}>{children}</h2>
    <div style={{
      height: 3,
      width: 60,
      margin: '12px auto 0',
      borderRadius: 99,
      background: `linear-gradient(90deg, ${from}, ${to})`,
    }} />
  </div>
);

/* ─── Chart title ───────────────────────────────────────────── */
const ChartTitle = ({ children, color }) => (
  <h3 style={{
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  }}>{children}</h3>
);

/* ─── Custom Tooltip ────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(10,10,30,0.92)',
      border: '1px solid rgba(167,139,250,0.4)',
      borderRadius: 12,
      padding: '10px 16px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 24px rgba(167,139,250,0.2)',
    }}>
      <p style={{ color: '#e2e8f0', fontWeight: 700, margin: '0 0 4px', fontFamily: "'Syne',sans-serif" }}>{label}</p>
      <p style={{ color: '#a78bfa', margin: 0, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>
        {payload[0].name}: <span style={{ color: '#38bdf8' }}>{payload[0].value}</span>
      </p>
    </div>
  );
};

/* ─── Stat badge ────────────────────────────────────────────── */
const StatBadge = ({ label, value, color }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '14px 22px',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    border: `1px solid ${color}30`,
  }}>
    <span style={{ fontSize: '1.7rem', fontWeight: 800, color, fontFamily: "'Syne',sans-serif" }}>{value}</span>
    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
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

  useEffect(() => {
    fetch('extraCA.json').then(r => r.json()).then(d => { setLearningActivity(d); setSpinner(false); }).catch(e => toast.error(e?.message));
  }, []);
  useEffect(() => {
    fetch('Eduction.json').then(r => r.json()).then(d => { setAcademicResult(d); setSpinner(false); }).catch(e => toast.error(e?.message));
  }, []);
  useEffect(() => {
    fetch('BSC.json').then(r => r.json()).then(d => { setBscResult(d); setSpinner(false); }).catch(e => toast.error(e?.message));
  }, []);

  if (spinner) return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#050814,#0f0c29,#302b63)',
    }}>
      <LoadingSpinner />
      <Link to="/dashboard/allprojects" style={{
        marginTop: 24, padding: '10px 28px',
        background: 'linear-gradient(135deg,#6366f1,#a855f7)',
        color: '#fff', borderRadius: 99, textDecoration: 'none',
        fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
        boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
      }}>← Back to Projects</Link>
    </div>
  );

  const maxResult = learningActivity.length ? Math.max(...learningActivity.map(d => d.result)) : '—';
  const avgCgpa   = bscResult.length ? (bscResult.reduce((s, d) => s + d.cgpa, 0) / bscResult.length).toFixed(2) : '—';

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #05080f; }
        ::-webkit-scrollbar { width: 6px; background: #0a0d1a; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 99px; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseRing {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%     { opacity: 0.15; transform: scale(1.3); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeSlide {
          from { opacity:0; transform:translateY(-20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #c084fc, #38bdf8, #f472b6, #a78bfa, #c084fc);
          background-size: 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }
      `}</style>

      <Particles />

      <div name="statistic" style={{
        width: '100%', minHeight: '100vh',
        background: 'linear-gradient(160deg, #05080f 0%, #0a0d1e 40%, #0d0a20 70%, #060b1a 100%)',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        paddingBottom: 80,
      }}>

        {/* ── Hero Header ────────────────────────────────────── */}
        <div style={{
          position: 'relative',
          paddingTop: 80,
          paddingBottom: 60,
          textAlign: 'center',
          animation: 'fadeSlide 0.8s ease both',
        }}>
          {/* big glow orbs */}
          <div style={{ position:'absolute',top:-80,left:'10%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,0.18),transparent 70%)',pointerEvents:'none' }} />
          <div style={{ position:'absolute',top:-60,right:'8%',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(236,72,153,0.14),transparent 70%)',pointerEvents:'none' }} />

          {/* spinning ring */}
          <div style={{
            display:'inline-block',position:'relative',marginBottom:20,
          }}>
            <div style={{
              width:90,height:90,borderRadius:'50%',
              border:'2px dashed rgba(167,139,250,0.4)',
              animation:'rotateSlow 12s linear infinite',
              position:'absolute',top:-10,left:-10,
            }}/>
            <div style={{
              width:70,height:70,borderRadius:'50%',
              background:'linear-gradient(135deg,#6366f1,#a855f7)',
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 0 30px rgba(99,102,241,0.6)',
              fontSize:28,
            }}>🎓</div>
          </div>

          <h1 className="shimmer-text" style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.4rem,7vw,4.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            My Educational Journey
          </h1>

          <p style={{
            color:'#94a3b8', fontSize:'1.05rem',
            fontWeight:500, maxWidth:500, margin:'0 auto',
            lineHeight:1.7,
          }}>
            A visual deep-dive into academic milestones,<br />certificates &amp; continuous growth.
          </p>

          {/* quick stats row */}
          <div style={{
            display:'flex', gap:16, justifyContent:'center',
            flexWrap:'wrap', marginTop:40,
          }}>
            <StatBadge label="Top Score" value={maxResult} color="#10b981" />
            <StatBadge label="Avg CGPA" value={avgCgpa} color="#6366f1" />
            <StatBadge label="Semesters" value={bscResult.length || '—'} color="#f472b6" />
            <StatBadge label="Certificates" value={learningActivity.length || '—'} color="#38bdf8" />
          </div>
        </div>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 20px' }}>

          {/* ── Extra Curricular ──────────────────────────────── */}
          <Reveal delay={0.1}>
            <GlassCard accent="#10b981" style={{ marginBottom:36 }}>
              {/* decorative number */}
              <span style={{
                position:'absolute',top:12,right:20,
                fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'5rem',
                color:'rgba(16,185,129,0.06)',lineHeight:1,userSelect:'none',
              }}>01</span>

              <SectionTitle from="#10b981" to="#38bdf8">Extra Curricular Certificates</SectionTitle>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>

                {/* Area chart */}
                <div style={{ background:'rgba(0,0,0,0.3)', borderRadius:16, padding:20, border:'1px solid rgba(16,185,129,0.15)' }}>
                  <ChartTitle color="#10b981">Performance Timeline</ChartTitle>
                  <div style={{ height:280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={learningActivity} margin={{ top:10, right:20, left:-10, bottom:0 }}>
                        <defs>
                          <linearGradient id="cEmerald" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#10b981" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.02}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 6" stroke="#1e293b" />
                        <XAxis dataKey="courseName" stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <YAxis stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="result" stroke="#10b981" strokeWidth={2.5}
                          fillOpacity={1} fill="url(#cEmerald)"
                          dot={{ fill:'#10b981', strokeWidth:0, r:4 }}
                          activeDot={{ r:7, fill:'#10b981', boxShadow:'0 0 12px #10b981' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar chart */}
                <div style={{ background:'rgba(0,0,0,0.3)', borderRadius:16, padding:20, border:'1px solid rgba(244,114,182,0.15)' }}>
                  <ChartTitle color="#f472b6">Certificate Scores</ChartTitle>
                  <div style={{ height:280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={learningActivity} margin={{ top:10, right:20, left:-10, bottom:0 }}>
                        <defs>
                          <linearGradient id="cPink" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"  stopColor="#f472b6" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#9d174d" stopOpacity={0.6}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 6" stroke="#1e293b" />
                        <XAxis dataKey="courseName" stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <YAxis stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color:'#94a3b8', fontSize:12 }} />
                        <Bar dataKey="result" fill="url(#cPink)" radius={[6,6,0,0]} barSize={28} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* ── Academic Performance ──────────────────────────── */}
          <Reveal delay={0.15}>
            <GlassCard accent="#6366f1">
              <span style={{
                position:'absolute',top:12,right:20,
                fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'5rem',
                color:'rgba(99,102,241,0.06)',lineHeight:1,userSelect:'none',
              }}>02</span>

              <SectionTitle from="#6366f1" to="#a855f7">Academic Performance</SectionTitle>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>

                {/* BSc CGPA bar */}
                <div style={{ background:'rgba(0,0,0,0.3)', borderRadius:16, padding:20, border:'1px solid rgba(99,102,241,0.15)' }}>
                  <ChartTitle color="#818cf8">BSc CGPA by Semester</ChartTitle>
                  <div style={{ height:280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bscResult} margin={{ top:10, right:20, left:-10, bottom:0 }}>
                        <defs>
                          <linearGradient id="cIndigo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"  stopColor="#818cf8" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#3730a3" stopOpacity={0.6}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 6" stroke="#1e293b" />
                        <XAxis dataKey="semester" stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <YAxis stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color:'#94a3b8', fontSize:12 }} />
                        <Bar dataKey="cgpa" fill="url(#cIndigo)" radius={[6,6,0,0]} barSize={28} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Course results line */}
                <div style={{ background:'rgba(0,0,0,0.3)', borderRadius:16, padding:20, border:'1px solid rgba(56,189,248,0.15)' }}>
                  <ChartTitle color="#38bdf8">Course Results</ChartTitle>
                  <div style={{ height:280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={academicResult} margin={{ top:10, right:20, left:-10, bottom:0 }}>
                        <defs>
                          <linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#38bdf8" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 6" stroke="#1e293b" />
                        <XAxis dataKey="course" stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <YAxis stroke="#4b5563" tick={{ fill:'#94a3b8', fontSize:11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="result" stroke="none" fill="url(#cSky)" />
                        <Line type="monotone" dataKey="result" stroke="#38bdf8" strokeWidth={2.5}
                          dot={{ fill:'#38bdf8', strokeWidth:0, r:5 }}
                          activeDot={{ r:8, fill:'#fff', stroke:'#38bdf8', strokeWidth:2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* ── Footer CTA ────────────────────────────────────── */}
         

        </div>
      </div>
    </>
  );
};

export default Statistic;