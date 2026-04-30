import React, { useState } from 'react';

const skillCategories = {
  Frontend: ["React Js", "Next.js", "Nuxt Js", "Tailwind CSS", "TypeScript", "Redux", "Java Script"],
  Backend: ["Node Js", "Java", "Prisma ORM", "Express Js", "GraphQL", "Docker", "Socket.IO"],
  Database: ["My SQL", "PostgreSQL", "MongoDB"],
  "UI Libraries": ["Tailwindcss", "Daisyui", "Ant Design", "Material UI"],
  Mobile: ["React Native", "My SQL", "PostgreSQL", "MongoDB", "Node Js", "Java"],
  Testing: ["Mocha", "Chai"],
  Hosting: ["Namecheap", "Hostinger", "Firebase", "AWS", "Dhaka-WEb-Hosting"],
};

const iconMap = {
  "React Js": "https://media.licdn.com/dms/image/v2/D4D12AQF1EyeWwTqYRQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1704297354332?e=2147483647&v=beta&t=ZEb56MEQ8i1R9nwGipQ7599SCFnYmDI0ssZabyLZ_bI",
  "Next.js": "https://teamraft.com/wp-content/uploads/nextjs.jpg",
  TypeScript: "https://images.ctfassets.net/23aumh6u8s0i/1GpPK36EMwOOZZcQPV4YRD/8acc95b8c3639be1be1d445e5e762dae/typescript",
  "Node Js": "https://logowik.com/content/uploads/images/node-js6304.logowik.com.webp",
  "Express Js": "https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png",
  Java: "https://minhphanjavahome.wordpress.com/wp-content/uploads/2019/04/java_logo_640.jpg",
  "Ant Design": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKBKbgGZthcVsW4vVOTAZOKzOpXDLfC8PMrw&s",
  MongoDB: "https://w7.pngwing.com/pngs/634/68/png-transparent-mongo-db-mongodb-database-document-oriented-nosql-mongodb-logo-3d-icon.png",
  "Nuxt Js": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_U3tzLtxZK5NTXGtyAT0SEVDdN42jqZMos_6MsvhWKvqFlPNNsblj2nPeJ0gYiB48ONA&usqp=CAU",
  "Tailwind CSS": "https://pbs.twimg.com/profile_images/1730334391501488129/G0R0sjHH_400x400.jpg",
  Redux: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRlH5x8oBQAqXxQBNwTIGAnoBBrjEWHP2pw&s",
  "Java Script": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "Prisma ORM": "https://blog.logrocket.com/wp-content/uploads/2024/03/Prisma-adoption-guide-Overview-examples-alternatives.png",
  GraphQL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0DWOc8XNKmGT1zW1AZu8wMsY_p7wMSGXzO63o50w3dyWe8ZrZi04S0yNHWsfylrX4TFY&usqp=CAU",
  "My SQL": "https://ih1.redbubble.net/image.5536116430.2042/st,small,507x507-pad,600x600,f8f8f8.jpg",
  PostgreSQL: "https://w7.pngwing.com/pngs/441/460/png-transparent-postgresql-plain-wordmark-logo-icon-thumbnail.png",
  "React Native": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSaDruEVyNREIC5U5kX3nKRgMoxpbGw6VtPA&s",
  Mocha: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfguoOl1V9f5MOmo298QW-GcSKWHY44HMpsg&s",
  Chai: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz3lUPoXoLdlC6zxYF5rJxebHBifiEXHBf4w&s",
  Namecheap: "https://images.seeklogo.com/logo-png/27/2/namecheap-logo-png_seeklogo-273737.png",
  Hostinger: "https://i.pinimg.com/736x/e5/be/d0/e5bed0ffbd779f3ab22afd026ca383bd.jpg",
  "Dhaka-WEb-Hosting": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMXYTUN8mlo-FB5zO7EoeGjMZv5z6NkUbR6Q&s",
  Firebase: "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png",
  Tailwindcss: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNhoXisDruJMDAq3Ltd-wuaMW2lGxck9wAKw&s",
  Daisyui: "https://images.seeklogo.com/logo-png/61/1/daisyui-logo-png_seeklogo-616852.png",
  "Material UI": "https://s3-ap-south-1.amazonaws.com/trt-blog-ghost/2023/01/MATERIAL-UI.png",
  Docker: "https://miro.medium.com/1*vQK4s0lOiK1ZkcXxFNIMDQ.png",
  "Socket.IO": "https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg",
  AWS: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  default: "https://img.freepik.com/premium-vector/professional-skills-vector-icon-isolated-white-background_775815-968.jpg",
};

const getIcon = (skill) => iconMap[skill] || iconMap.default;

const totalSkills = Object.values(skillCategories).reduce((a, b) => a + b.length, 0);
const totalCategories = Object.keys(skillCategories).length;

/* ─── SkillCard ───────────────────────────────────────────────────── */
const SkillCard = ({ skill, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const isExpert = index < 2;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(219,39,119,0.12))"
          : "rgba(255,255,255,0.04)",
        border: hovered
          ? "0.5px solid rgba(192,132,252,0.5)"
          : isExpert
          ? "0.5px solid rgba(192,132,252,0.25)"
          : "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "16px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 20px 40px rgba(124,58,237,0.25), 0 0 0 1px rgba(192,132,252,0.15)"
          : "none",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.05}s` : "0s",
        textAlign: "center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
          border: "0.5px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}
      >
        <img
          src={getIcon(skill)}
          alt={skill}
          onError={(e) => { e.target.src = iconMap.default; }}
          style={{
            width: 34,
            height: 34,
            objectFit: "contain",
            borderRadius: 8,
            transform: hovered ? "scale(1.12)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: hovered ? "#e9d5ff" : "rgba(255,255,255,0.8)",
          lineHeight: 1.3,
          transition: "color 0.2s ease",
          wordBreak: "break-word",           // ✅ prevents overflow on narrow cards
        }}
      >
        {skill}
      </span>

      {isExpert && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 20,
            background: "rgba(192,132,252,0.15)",
            color: "#c084fc",
            border: "0.5px solid rgba(192,132,252,0.3)",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          ⭐ Expert
        </span>
      )}
    </div>
  );
};

/* ─── OrbitScene ──────────────────────────────────────────────────── */
const OrbitScene = ({ skills }) => {
  const displayed = skills.slice(0, 8);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 240,           // ✅ never wider than 240px
        aspectRatio: "1 / 1",   // ✅ always square regardless of parent width
        position: "relative",
        margin: "0 auto",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: "0.5px solid rgba(192,132,252,0.2)",
        animation: "spin 20s linear infinite",
      }} />
      <div style={{
        position: "absolute", inset: 28, borderRadius: "50%",
        border: "0.5px solid rgba(244,114,182,0.15)",
        animation: "spinReverse 30s linear infinite",
      }} />
      <div style={{
        position: "absolute", inset: "30%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
        animation: "pulse 3s ease-in-out infinite",
      }} />

      {displayed.map((skill, i) => (
        <div
          key={skill}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 38, height: 38,
            marginTop: -19, marginLeft: -19,
            animation: "orbitItem 20s linear infinite",
            animationDelay: `${-(i / displayed.length) * 20}s`,
          }}
        >
          <div style={{
            width: 38, height: 38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(192,132,252,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
            animation: "counterSpin 20s linear infinite",
            animationDelay: `${-(i / displayed.length) * 20}s`,
          }}>
            <img
              src={getIcon(skill)}
              alt={skill}
              onError={(e) => { e.target.src = iconMap.default; }}
              style={{ width: 26, height: 26, objectFit: "contain", borderRadius: "50%" }}
            />
          </div>
        </div>
      ))}

      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 72, height: 72,
        background: "linear-gradient(135deg, #7c3aed, #db2777)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26,
        boxShadow: "0 0 32px rgba(124,58,237,0.6), 0 0 64px rgba(219,39,119,0.3)",
        zIndex: 2,
      }}>
        ⚡
      </div>
    </div>
  );
};

/* ─── Main Skills Component ──────────────────────────────────────── */
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [gridVisible, setGridVisible] = useState(true);

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    setGridVisible(false);
    setTimeout(() => {
      setActiveCategory(cat);
      setGridVisible(true);
    }, 180);
  };

  const skills = skillCategories[activeCategory];

  return (
    <div
      name="skills"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #04021a 0%, #0c042e 40%, rgb(0,0,20) 70%, #0f0c29 100%)",
        color: "#fff",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(219,39,119,0.1) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "30%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 16px 60px", position: "relative" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#c084fc",
            background: "rgba(192,132,252,0.1)",
            border: "0.5px solid rgba(192,132,252,0.3)",
            borderRadius: 20,
            padding: "4px 14px",
            marginBottom: 14,
          }}>
            Professional Toolkit
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 10px" }}>
            My{" "}
            <span style={{
              background: "linear-gradient(90deg, #c084fc, #f472b6, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Skills
            </span>
          </h1>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", fontWeight: 400, margin: 0 }}>
            Technologies I work with every day
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {Object.keys(skillCategories).map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 24,
                  border: isActive ? "none" : "0.5px solid rgba(255,255,255,0.12)",
                  background: isActive
                    ? "linear-gradient(135deg, #7c3aed, #db2777)"
                    : "rgba(255,255,255,0.05)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 4px 20px rgba(124,58,237,0.45)" : "none",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",   // ✅ tabs don't break mid-word
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Body Layout ── */}
        {/* ✅ KEY FIX: use a real <style> block that targets real element IDs/classes */}
        <style>{`
          #skills-body {
            display: grid;
            grid-template-columns: 1fr 280px;
            gap: 28px;
            align-items: start;
          }
          #skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 12px;
          }
          @media (max-width: 680px) {
            #skills-body {
              grid-template-columns: 1fr;
            }
            #orbit-panel {
              display: none;     /* hide the decorative orbit on mobile */
            }
            #skills-grid {
              grid-template-columns: repeat(2, 1fr);   /* 2-col on narrow phones */
            }
          }
          @media (min-width: 681px) and (max-width: 900px) {
            #skills-body {
              grid-template-columns: 1fr 220px;
            }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes spinReverse {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50%       { opacity: 1;   transform: scale(1.15); }
          }
          @keyframes orbitItem {
            from { transform: rotate(0deg) translateY(-110px); }
            to   { transform: rotate(360deg) translateY(-110px); }
          }
          @keyframes counterSpin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
        `}</style>

        <div id="skills-body">

          {/* Skills Grid */}
          <div
            id="skills-grid"
            style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {skills.map((skill, i) => (
              <SkillCard key={skill} skill={skill} index={i} visible={gridVisible} />
            ))}
          </div>

          {/* Right panel */}
          <div id="orbit-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>

            <OrbitScene skills={skills} />

            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center", margin: 0 }}>
              {skills.length} skills in this category
            </p>

            <div style={{ display: "flex", gap: 8, width: "100%" }}>
              {[
                { num: totalCategories, label: "Categories" },
                { num: totalSkills, label: "Total skills" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    padding: "12px 8px",
                    textAlign: "center",
                  }}
                >
                  <div style={{
                    fontSize: 20,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #c084fc, #f472b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {num}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              width: "100%",
              background: "rgba(124,58,237,0.08)",
              border: "0.5px solid rgba(192,132,252,0.2)",
              borderRadius: 14,
              padding: "14px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}>
              <div style={{ fontSize: 10, color: "#c084fc", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 5 }}>
                ACTIVE CATEGORY
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                {activeCategory}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                {skills[0]} · {skills[1] || ""}{skills[2] ? ` · ${skills[2]}` : ""}
                {skills.length > 3 ? ` + ${skills.length - 3} more` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;