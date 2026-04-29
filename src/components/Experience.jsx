import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";

/* ── Compact Skill Pill ─────────────────────────────────────── */
const SkillPill = ({ src, title, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 55}ms`,
        animation: "popIn 0.5s cubic-bezier(.34,1.56,.64,1) both",
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        padding: "8px 14px 8px 10px",
        borderRadius: "50px",
        background: hovered
          ? "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(239,68,68,0.12))"
          : "rgba(255,255,255,0.04)",
        border: hovered
          ? "1px solid rgba(251,191,36,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 4px 24px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        cursor: "default",
        transition: "all 0.28s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-2px) scale(1.04)" : "translateY(0) scale(1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        whiteSpace: "nowrap",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background: hovered
            ? "rgba(251,191,36,0.15)"
            : "rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
          flexShrink: 0,
          transition: "background 0.28s",
        }}
      >
        <img
          src={src}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: hovered
              ? "drop-shadow(0 0 5px rgba(251,191,36,0.7)) brightness(1.15)"
              : "brightness(0.85)",
            transition: "filter 0.28s ease",
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "12.5px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: hovered ? "#fbbf24" : "#94a3b8",
          transition: "color 0.28s ease",
        }}
      >
        {title}
      </span>
    </div>
  );
};

/* ── Main Component ─────────────────────────────────────────── */
const Experience = () => {
  const {
    data: allSkills = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allSkills"],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/skill/`, {
          method: "GET",
          headers: { authorization: `${localStorage.getItem("token")}` },
        });
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
      } catch (error) {
        toast.error(`Failed to fetch skills: ${error?.message}`);
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  const skills = allSkills?.data ?? [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Mulish:wght@400;500&display=swap');

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.75) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift1 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(30px,-20px); }
        }
        @keyframes drift2 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(-25px,18px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
      `}</style>

      <section
        name="experience"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0a0c12 0%, #0f111a 50%, #0c0e16 100%)",
          overflow: "hidden",
          paddingTop: "90px",
          paddingBottom: "90px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", width: 480, height: 480,
            borderRadius: "50%", top: "-80px", left: "-100px",
            background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
            animation: "drift1 16s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 400, height: 400,
            borderRadius: "50%", bottom: "-60px", right: "-80px",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            animation: "drift2 20s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 300, height: 300,
            borderRadius: "50%", top: "40%", left: "50%",
            background: "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)",
            animation: "drift1 24s ease-in-out infinite reverse",
          }} />

          {/* Dot grid */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
            <defs>
              <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#334155" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto", padding: "0 28px", width: "100%" }}>

          {/* ── Header ─────────────────────────────── */}
          <div style={{ marginBottom: "56px", animation: "fadeUp 0.6s 0.1s both" }}>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#fbbf24",
                boxShadow: "0 0 10px #fbbf24",
                animation: "blink 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#fbbf24",
              }}>
                Tech Stack
              </span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(251,191,36,0.3), transparent)" }} />
            </div>

            {/* Title */}
            <h2 style={{
              margin: "0 0 12px",
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#f1f5f9",
            }}>
              Experience
              <span style={{
                display: "inline-block", marginLeft: "12px",
                background: "linear-gradient(135deg, #fbbf24, #ef4444)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>.</span>
            </h2>

            <p style={{
              margin: 0,
              fontFamily: "'Mulish', sans-serif",
              fontSize: "15px", color: "#475569",
              maxWidth: "400px", lineHeight: 1.6,
            }}>
              Tools & technologies I work with daily to build great products.
            </p>
          </div>

          {/* ── Skills Pill Cloud ───────────────────── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              animation: "fadeUp 0.6s 0.3s both",
            }}
          >
            {skills.map(({ _id, src, title }, i) => (
              <SkillPill key={_id} src={src} title={title} index={i} />
            ))}
          </div>

          {/* ── Count strip ─────────────────────────── */}
          {skills.length > 0 && (
            <div style={{
              marginTop: "52px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "28px",
              flexWrap: "wrap",
              animation: "fadeUp 0.6s 0.5s both",
            }}>
              <div>
                <p style={{ margin: 0, fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: "#fbbf24", lineHeight: 1 }}>
                  {skills.length}+
                </p>
                <p style={{ margin: "4px 0 0", fontFamily: "'Mulish', sans-serif", fontSize: "12px", color: "#475569", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Technologies
                </p>
              </div>

              <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.07)" }} />

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "2px solid transparent",
                  borderTopColor: "#fbbf24",
                  borderRightColor: "rgba(251,191,36,0.3)",
                  animation: "spinSlow 3s linear infinite",
                }} />
                <span style={{ fontFamily: "'Mulish', sans-serif", fontSize: "13px", color: "#334155" }}>
                  Always evolving
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Experience;