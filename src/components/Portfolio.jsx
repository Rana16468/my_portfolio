import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: style.duration,
      repeat: Infinity,
      delay: style.delay,
      ease: "easeInOut",
    }}
  />
);


const GridLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99,179,237,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

/* ─── Glowing Orb ────────────────────────────────────────────────── */
const GlowOrb = ({ cx, cy, color, size, blur }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: cx,
      top: cy,
      width: size,
      height: size,
      background: color,
      filter: `blur(${blur})`,
      transform: "translate(-50%, -50%)",
      opacity: 0.35,
    }}
  />
);

/* ─── Card Glow Border ───────────────────────────────────────────── */
const CardGlowBorder = ({ hovered }) => (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    animate={{
      opacity: hovered ? 1 : 0,
      boxShadow: hovered
        ? "inset 0 0 0 1.5px rgba(99,179,237,0.55), 0 0 32px 4px rgba(99,179,237,0.18)"
        : "inset 0 0 0 1.5px rgba(99,179,237,0)",
    }}
    transition={{ duration: 0.3 }}
  />
);

/* ─── Category Pill ──────────────────────────────────────────────── */
const FilterPill = ({ label, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.07 }}
    whileTap={{ scale: 0.95 }}
    className="relative px-3 py-1 sm:px-5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all"
    style={{
      background: active
        ? "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
        : "rgba(15,30,70,0.7)",
      color: active ? "#e0f2fe" : "#93c5fd",
      border: active ? "none" : "1px solid rgba(99,179,237,0.2)",
      boxShadow: active ? "0 0 18px rgba(14,165,233,0.4)" : "none",
    }}
  >
    {label}
  </motion.button>
);

/* ─── Pagination Button ──────────────────────────────────────────── */
const PageButton = ({ children, disabled, onClick, primary }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.07 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    disabled={disabled}
    onClick={onClick}
    className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide disabled:opacity-30 disabled:cursor-not-allowed transition-shadow"
    style={{
      background:
        primary && !disabled
          ? "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
          : "rgba(15,30,70,0.7)",
      color: primary && !disabled ? "#e0f2fe" : "#93c5fd",
      border: primary && !disabled ? "none" : "1px solid rgba(99,179,237,0.2)",
      boxShadow: primary && !disabled ? "0 0 18px rgba(14,165,233,0.4)" : "none",
    }}
  >
    {children}
  </motion.button>
);

/* ─── Page Number Pill ───────────────────────────────────────────── */
const PageNumber = ({ number, active, onClick }) => (
  <motion.button
    whileHover={{ scale: active ? 1 : 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold"
    style={{
      background: active
        ? "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
        : "transparent",
      color: active ? "#e0f2fe" : "#7dd3fc",
      border: active ? "none" : "1px solid rgba(99,179,237,0.15)",
      boxShadow: active ? "0 0 14px rgba(14,165,233,0.4)" : "none",
    }}
  >
    {number}
  </motion.button>
);

/* ─── Project Card ───────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const { _id, src, demo, code, server } = project;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(10,25,60,0.9) 0%, rgba(6,15,40,0.95) 100%)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(99,179,237,0.12)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardGlowBorder hovered={hovered} />

      {/* ── Image ── */}
      <div className="relative w-full h-40 sm:h-48 md:h-52 overflow-hidden">
        <motion.img
          src={src}
          alt="Project Preview"
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Dark gradient bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,15,40,0.95) 0%, transparent 60%)",
          }}
        />

        {/* Hover Overlay: View Details */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(6,15,60,0.55)", backdropFilter: "blur(2px)" }}
            >
              <Link
                to={`/project_details/${_id}`}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  boxShadow: "0 0 24px rgba(14,165,233,0.5)",
                  letterSpacing: "0.05em",
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Body ── */}
      <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
        {/* Link Row */}
        <div className="flex items-center gap-2">
          {[
            {
              href: demo,
              label: "Demo",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              ),
              gradient: "linear-gradient(135deg,#1d4ed8,#0ea5e9)",
              glow: "rgba(14,165,233,0.35)",
            },
            {
              href: code,
              label: "Code",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              ),
              gradient: "linear-gradient(135deg,#1e3a5f,#2d6a9f)",
              glow: "rgba(45,106,159,0.3)",
            },
            {
              href: server,
              label: "Server",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2H5z" />
              ),
              gradient: "linear-gradient(135deg,#1e3a5f,#2d6a9f)",
              glow: "rgba(45,106,159,0.3)",
            },
          ].map(({ href, label, icon, gradient, glow }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.07, boxShadow: `0 0 16px ${glow}` }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold text-sky-100 tracking-wide"
              style={{ background: gradient }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icon}
              </svg>
              {label}
            </motion.a>
          ))}
        </div>

        {/* Details CTA */}
        <Link to={`/project_details/${_id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 sm:py-2.5 rounded-xl text-center text-xs sm:text-sm font-bold tracking-wide text-white"
            style={{
              background: "linear-gradient(135deg, #0f3460 0%, #0a2040 100%)",
              border: "1px solid rgba(99,179,237,0.25)",
              boxShadow: hovered ? "0 0 20px rgba(14,165,233,0.2)" : "none",
              transition: "box-shadow 0.3s",
              margin: "6px"
            }}
          >
            View Project Details →
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

/* ─── Main Portfolio ─────────────────────────────────────────────── */
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10;
  const filters = ["All", "Frontend", "Full Stack", "Mobile"];

  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 5 + 2}px`,
      height: `${Math.random() * 5 + 2}px`,
      background:
        i % 3 === 0
          ? "rgba(56,189,248,0.7)"
          : i % 3 === 1
          ? "rgba(99,102,241,0.6)"
          : "rgba(255,255,255,0.3)",
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
    }))
  ).current;

  const {
    data: allprojects = {},
    isLoading,
    error,
    isPreviousData,
  } = useQuery({
    queryKey: ["allprojects", page],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/project?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: { authorization: `${localStorage.getItem("token")}` },
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    keepPreviousData: true,
    onError: (err) => toast.error(`Failed to fetch: ${err.message}`),
  });

  // Only show the full-page spinner on the very first load, not on page changes.
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  // ── FIX ──────────────────────────────────────────────────────────
  // The API response shape is:
  // { success, message, data: { meta: { page, limit, total, totalPage }, data: [...] } }
  // so the actual project array lives at allprojects.data.data,
  // and pagination info lives at allprojects.data.meta.
  const projects = allprojects?.data?.data ?? [];
  const totalPages = allprojects?.data?.meta?.totalPage ?? 1;
  const totalCount = allprojects?.data?.meta?.total ?? projects.length;
  // ─────────────────────────────────────────────────────────────────

  // Build a compact page-number list: first, last, current ±1, with ellipses.
  const getPageNumbers = () => {
    const pages = [];
    const window = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - window && i <= page + window)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const handleFilterClick = (f) => {
    setActiveFilter(f);
    setPage(1); // reset to page 1 whenever the filter changes
  };

  return (
    <div
      name="project"
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(160deg, #040d21 0%, #071228 40%, #05193a 70%, #030b1a 100%)",
      }}
    >
      {/* ── Atmospheric Layers ── */}
      <GridLines />
      <GlowOrb cx="15%" cy="10%" color="radial-gradient(circle, #1d4ed8, transparent)" size="600px" blur="90px" />
      <GlowOrb cx="85%" cy="30%" color="radial-gradient(circle, #0369a1, transparent)" size="500px" blur="100px" />
      <GlowOrb cx="50%" cy="80%" color="radial-gradient(circle, #1e3a8a, transparent)" size="700px" blur="120px" />

      {/* ── Particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <Particle key={i} style={p} />
        ))}
      </div>

      {/* ── Scanline ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs font-bold uppercase mb-3 sm:mb-4"
            style={{ color: "#38bdf8", letterSpacing: "0.3em" }}
          >
            ✦ My Work ✦
          </motion.p>

          {/* Title */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 sm:mb-4 leading-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #e0f2fe 0%, #38bdf8 40%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            Projects
          </h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="mx-auto mb-4 sm:mb-6 rounded-full"
            style={{
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #2563eb, #38bdf8, #6366f1)",
              boxShadow: "0 0 16px rgba(56,189,248,0.6)",
              transformOrigin: "center",
            }}
          />

          <p
            className="max-w-xs sm:max-w-md md:max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2"
            style={{ color: "#7dd3fc", fontFamily: "'Inter', sans-serif" }}
          >
            A curated showcase of projects reflecting my passion for crafting
            elegant, performant web experiences.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-14"
        >
          {filters.map((f) => (
            <FilterPill
              key={f}
              label={f}
              active={activeFilter === f}
              onClick={() => handleFilterClick(f)}
            />
          ))}
        </motion.div>

        {/* Grid — dimmed slightly while a new page is fetched in the background */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-7 transition-opacity duration-300"
          style={{ opacity: isPreviousData ? 0.55 : 1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
              style={{
                background: "rgba(30,58,138,0.3)",
                border: "1px solid rgba(99,179,237,0.2)",
              }}
            >
              <svg className="w-9 h-9 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-sky-200 mb-2">No Projects Yet</h3>
            <p className="text-sky-400/70 text-xs sm:text-sm">Start adding projects to showcase your portfolio.</p>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {projects.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col items-center gap-3 mt-10 sm:mt-14"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <PageButton
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                ← Prev
              </PageButton>

              <div className="flex items-center gap-1 sm:gap-1.5">
                {getPageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-sky-500/60 text-xs sm:text-sm">
                      …
                    </span>
                  ) : (
                    <PageNumber
                      key={p}
                      number={p}
                      active={p === page}
                      onClick={() => setPage(p)}
                    />
                  )
                )}
              </div>

              <PageButton
                primary
                disabled={page === totalPages || isPreviousData}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                Next →
              </PageButton>
            </div>

            <p className="text-xs text-sky-500/60">
              Showing page {page} of {totalPages} · {totalCount} project{totalCount === 1 ? "" : "s"} total
            </p>
          </motion.div>
        )}
      </div>

      {/* ── Google Font Import ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
      `}</style>
    </div>
  );
};

export default Portfolio;