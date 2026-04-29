import React, { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaUniversity,
  FaMapMarkerAlt,
  FaLaptopCode,
} from "react-icons/fa";

const About = () => {
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible((v) => ({ ...v, [i]: true }));
        },
        { threshold: 0.15 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const cards = [
    {
      icon: <FaUser />,
      label: "Who I Am",
      color: "#f97316",
      text: "My name is Ali Mohammad Sohel Rana and I am a student at Daffodil International University. I am from the beautiful town of Dinajpur Thakurgoan, where I grew up and spent most of my life. I am currently completed my education at the university and working With Paid Contructural, And Software Engineer in Tech Group Application.",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "My Roots",
      color: "#22d3ee",
      text: "I am proud of my hometown and my roots, and I strive to make a positive impact in both my community and my university. My background has shaped who I am today and continues to influence my approach to work and life.",
    },
    {
      icon: <FaLaptopCode />,
      label: "Web Development",
      color: "#a78bfa",
      text: "As a university student, I have recently delved into the world of web development and have been working hard to learn as much as I can. I am determined to become a skilled web developer. I am eager to apply my knowledge to real-world projects.",
    },
    {
      icon: <FaUniversity />,
      label: "My Journey",
      color: "#34d399",
      text: "I am committed to delivering high-quality work. I know that I still have a lot to learn, but I am dedicated to continuing my education and expanding my skills in this field. I believe that with my strong work ethic and willingness to learn, I have the potential to become a valuable asset to any development team.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .about-root {
          font-family: 'DM Sans', sans-serif;
          background: #060914;
          min-height: 100vh;
          color: #e2e8f0;
          overflow-x: hidden;
          position: relative;
        }

        .about-mesh {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(249,115,22,.13) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(167,139,250,.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 55% 45%, rgba(34,211,238,.08) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .about-dots {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.018'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .about-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 24px 120px;
        }

        .hero { text-align: center; margin-bottom: 80px; }

        .hero-eyebrow {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #f97316;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp .7s .1s forwards;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(48px, 9vw, 96px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          animation: fadeUp .7s .25s forwards;
          margin: 0;
        }

        .hero-title span {
          background: linear-gradient(90deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 28px auto;
          opacity: 0;
          animation: fadeUp .7s .4s forwards;
        }

        .hero-divider-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #f97316);
        }
        .hero-divider-line:last-child {
          background: linear-gradient(90deg, #f97316, transparent);
        }

        .hero-divider-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
          box-shadow: 0 0 12px #f97316;
        }

        .hero-subtitle {
          font-size: 16px;
          font-weight: 300;
          color: #94a3b8;
          letter-spacing: 0.05em;
          opacity: 0;
          animation: fadeUp .7s .5s forwards;
          margin: 0;
        }

        .badges {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 70px;
          opacity: 0;
          animation: fadeUp .7s .65s forwards;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(10px);
          color: #cbd5e1;
          transition: all .3s;
          cursor: default;
        }
        .badge:hover {
          border-color: rgba(249,115,22,.5);
          background: rgba(249,115,22,.08);
          color: #f97316;
          transform: translateY(-2px);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
        }

        .card {
          position: relative;
          border-radius: 20px;
          padding: 32px;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          backdrop-filter: blur(12px);
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity .6s, transform .6s, box-shadow .3s, border-color .3s;
        }

        .card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,.4);
          border-color: rgba(255,255,255,.14);
          transform: translateY(-4px) !important;
        }

        .card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: .25;
          transition: opacity .3s;
        }
        .card:hover::before { opacity: .45; }

        .card-0::before { background: #f97316; }
        .card-1::before { background: #22d3ee; }
        .card-2::before { background: #a78bfa; }
        .card-3::before { background: #34d399; }

        .card:nth-child(2) { transition-delay: .1s; }
        .card:nth-child(3) { transition-delay: .2s; }
        .card:nth-child(4) { transition-delay: .3s; }

        .card-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .card-label {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -.01em;
          color: #f1f5f9;
          margin-bottom: 14px;
          margin-top: 0;
          position: relative;
          z-index: 1;
        }

        .card-text {
          font-size: 14px;
          line-height: 1.75;
          color: #94a3b8;
          position: relative;
          z-index: 1;
          margin: 0;
        }

        .glow-line {
          margin: 70px auto 0;
          text-align: center;
        }
        .glow-line-bar {
          width: 1px;
          height: 80px;
          background: linear-gradient(180deg, #f97316, transparent);
          margin: 0 auto 20px;
          opacity: .6;
        }
        .glow-line-text {
          font-size: 11px;
          letter-spacing: .3em;
          text-transform: uppercase;
          color: #475569;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div name="about" className="about-root">
        <div className="about-mesh" />
        <div className="about-dots" />

        <div className="about-inner">
          <div className="hero">
         
            <h1 className="hero-title">
              About <span>Me</span>
            </h1>
            <div className="hero-divider">
              <div className="hero-divider-line" />
              <div className="hero-divider-dot" />
              <div className="hero-divider-line" />
            </div>
          
          </div>

          <div className="badges">
            <span className="badge"><FaUser /> Ali Mohammad Sohel Rana</span>
            <span className="badge"><FaUniversity /> Daffodil International University</span>
            <span className="badge"><FaMapMarkerAlt /> Dinajpur Thakurgoan</span>
            <span className="badge"><FaLaptopCode /> Software Engineer</span>
          </div>

          <div className="cards-grid">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`card card-${i}${visible[i] ? " visible" : ""}`}
                ref={(el) => (sectionRefs.current[i] = el)}
              >
                <div
                  className="card-icon-wrap"
                  style={{
                    background: `${card.color}22`,
                    color: card.color,
                    boxShadow: `0 0 0 1px ${card.color}33`,
                  }}
                >
                  {card.icon}
                </div>
                <div className="card-label">{card.label}</div>
                <p className="card-text">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="glow-line">
            <div className="glow-line-bar" />
            <div className="glow-line-text">End of profile</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;