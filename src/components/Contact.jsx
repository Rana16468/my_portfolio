import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

/* ── Quill dark styles injected once ── */
const quillCSS = `
  .ql-editor { background:transparent!important; color:#e2e8f0!important; min-height:130px; font-family:'Syne',sans-serif; }
  .ql-toolbar.ql-snow { border:none!important; border-bottom:1px solid rgba(255,255,255,.08)!important; background:rgba(255,255,255,.03)!important; }
  .ql-container.ql-snow { border:none!important; }
  .ql-snow .ql-stroke { stroke:#94a3b8!important; }
  .ql-snow .ql-fill,.ql-snow .ql-stroke.ql-fill { fill:#94a3b8!important; }
  .ql-editor.ql-blank::before { color:rgba(148,163,184,.4)!important; font-style:normal!important; }
`;

/* ── Particle canvas background ── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const count = 60;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167,139,250,.5)";
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dx = a.x - b.x, dy = a.y - b.y, dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(167,139,250,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ── Magnetic tilt card ── */
function MagneticCard({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    rx.set(py * 14);
    ry.set(-px * 14);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Glowing input ── */
const GlowInput = ({ label, id, type = "text", placeholder, required, name }) => (
  <div className="group relative">
    <label htmlFor={id} className="block text-xs font-semibold tracking-widest uppercase text-violet-300 mb-2">{label}</label>
    <input
      type={type} id={id} name={name || id} placeholder={placeholder} required={required}
      className="w-full bg-white/[.04] border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all duration-300"
      style={{ fontFamily: "'Syne', sans-serif" }}
    />
  </div>
);

/* ── Info row ── */
const InfoRow = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 group">
    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="text-white text-base" />
    </div>
    <div>
      <p className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold">{label}</p>
      <p className="text-slate-100 text-sm font-medium mt-0.5 break-all">{value}</p>
    </div>
  </div>
);

/* ── Gradient text helper ── */
const Grad = ({ children, from = "#a78bfa", to = "#38bdf8" }) => (
  <span style={{ background: `linear-gradient(135deg, ${from}, ${to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

/* ════════════════════════════════════════ MAIN COMPONENT ════════════════════════════════════════ */
const Contact = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = quillCSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    if (!message || message === "<p><br></p>") { toast.error("Please write a message ✍️"); return; }
    setIsSubmitting(true);
    const emaildata = `My Name is ${name}. Email: ${email}. Message: ${message}`;
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/my_contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ emaildata }),
    })
      .then(r => { if (!r.ok) throw new Error("Network error"); return r.json(); })
      .then(data => { form.reset(); setMessage(""); setSent(true); toast.success(data?.message || "Message sent! 🚀"); setTimeout(() => setSent(false), 4000); })
      .catch(err => toast.error(err.message || "Something went wrong"))
      .finally(() => setIsSubmitting(false));
  };

  /* ── container variants ── */
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } };

  return (
    <>
      {/* ── Google Font ── */}
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet" />

      <div
        name="contact"
        style={{ fontFamily: "'DM Sans', sans-serif", background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(124,58,237,.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(14,165,233,.2) 0%, transparent 60%), #050811" }}
        className="relative min-h-screen overflow-hidden text-white py-24 px-4 sm:px-6"
      >
        {/* Background layers */}
        <ParticleField />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath d%3D%22M0 60 L60 0%22 stroke%3D%22rgba(255%2C255%2C255%2C.015)%22 stroke-width%3D%.5%22/%3E%3C/svg%3E')] opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-violet-400 font-semibold mb-4">Let's collaborate</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              <Grad from="#c4b5fd" to="#67e8f9">Get In</Grad>
              <br />
              <span className="text-white">Touch</span>
            </h1>
            <p className="mt-6 text-slate-400 max-w-lg mx-auto text-base leading-relaxed">
              Have a project in mind or just want to say hello?<br />Drop me a message — I read every word.
            </p>

            {/* Divider ornament */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500/60" />
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/60" />
            </div>
          </motion.div>

          {/* ── CONTENT GRID ── */}
          <motion.div
            variants={container} initial="hidden" animate="show"
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
          >

            {/* ── FORM (3/5 cols) ── */}
            <motion.div variants={item} className="lg:col-span-3">
              <MagneticCard className="relative rounded-3xl overflow-hidden p-[1px]" style={{ background: "linear-gradient(135deg, rgba(167,139,250,.4), rgba(56,189,248,.2), rgba(255,255,255,.05))" }}>
                <div className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl" style={{ background: "rgba(5,8,17,.75)" }}>

                  {/* Form header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <FaPaperPlane className="text-violet-300 text-sm" />
                    </div>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700 }} className="text-xl text-slate-100">Send a message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <GlowInput label="Your Name" id="name" placeholder="John Doe" required />
                      <GlowInput label="Your Email" id="email" type="email" placeholder="john@email.com" required />
                    </div>

                    {/* Quill */}
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-violet-300 mb-2">Your Message</label>
                      <div className="rounded-xl overflow-hidden border border-white/10 focus-within:border-violet-400/50 focus-within:ring-2 focus-within:ring-violet-400/20 transition-all duration-300">
                        <ReactQuill theme="snow" value={message} onChange={setMessage} placeholder="Write your message here…" />
                      </div>
                    </div>

                    {/* Submit */}
                    <AnimatePresence mode="wait">
                      {sent ? (
                        <motion.div key="sent" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold text-sm">
                          ✓ Message sent successfully!
                        </motion.div>
                      ) : (
                        <motion.button key="btn" type="submit" disabled={isSubmitting}
                          whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(167,139,250,.4)" }}
                          whileTap={{ scale: 0.98 }}
                          style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", fontFamily: "'Syne',sans-serif", fontWeight: 700 }}
                          className="w-full py-4 rounded-2xl text-white text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 transition-all duration-300">
                          {isSubmitting ? (
                            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                          ) : (
                            <><FaPaperPlane className="text-violet-200" />Send Message</>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </MagneticCard>
            </motion.div>

            {/* ── SIDEBAR (2/5 cols) ── */}
            <motion.div variants={item} className="lg:col-span-2 flex flex-col gap-6">

              {/* Contact Info */}
              <div className="relative rounded-3xl p-[1px] overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(56,189,248,.3), rgba(167,139,250,.2), rgba(255,255,255,.04))" }}>
                <div className="rounded-3xl p-7 backdrop-blur-xl" style={{ background: "rgba(5,8,17,.8)" }}>
                  <p className="text-xs tracking-widest uppercase text-sky-400 font-semibold mb-6">Reach me at</p>
                  <div className="space-y-6">
                    <InfoRow icon={FaPhoneAlt} label="Phone & WhatsApp" value="01722305054" color="bg-gradient-to-br from-violet-600 to-violet-800" />
                    <div className="h-px bg-white/[.06]" />
                    <InfoRow icon={FaEnvelope} label="Primary Email" value="rana16-468@diu.edu.bd" color="bg-gradient-to-br from-sky-600 to-sky-800" />
                    <div className="h-px bg-white/[.06]" />
                    <InfoRow icon={FaEnvelope} label="Alt. Email" value="shohelbd2021@outlook.com" color="bg-gradient-to-br from-indigo-600 to-indigo-800" />
                  </div>
                </div>
              </div>

              {/* Social / Connect */}
              <div className="relative rounded-3xl p-[1px] overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(167,139,250,.25), rgba(56,189,248,.15), rgba(255,255,255,.04))" }}>
                <div className="rounded-3xl p-7 backdrop-blur-xl" style={{ background: "rgba(5,8,17,.8)" }}>
                  <p className="text-xs tracking-widest uppercase text-violet-400 font-semibold mb-2">Connect</p>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">Follow along for updates, projects, and more.</p>
                  <div className="flex gap-3">
                    {[
                      { href: "https://github.com/rana16468/", icon: FaGithub, label: "GitHub", bg: "bg-slate-800 hover:bg-slate-700" },
                      { href: "https://linkedin.com/in/ali-mohammad-sohel-rana-377050216/", icon: FaLinkedin, label: "LinkedIn", bg: "bg-blue-700 hover:bg-blue-600" },
                      { href: "https://twitter.com/username", icon: FaTwitter, label: "Twitter", bg: "bg-sky-600 hover:bg-sky-500" },
                    ].map(({ href, icon: Icon, label, bg }) => (
                      <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl ${bg} transition-colors duration-200`}
                      >
                        <Icon className="text-white text-lg" />
                        <span className="text-[10px] font-semibold tracking-wide text-white/70">{label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-500/[.08] border border-emerald-500/20"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <p className="text-emerald-300 text-xs font-semibold tracking-wide">Available for new opportunities</p>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

        {/* Bottom ambient glow */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(124,58,237,.18) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>
    </>
  );
};

export default Contact;