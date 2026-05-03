import { useState } from "react";
import { FaGithub, FaLinkedinIn, FaQuora, FaTelegram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const links = [
  {
    id: 1,
    label: "LinkedIn",
    icon: <FaLinkedinIn size={20} />,
    href: "https://www.linkedin.com/in/ali-mohammad-sohel-rana-377050216/",
    gradient: "linear-gradient(135deg, #0B77C2, #2563EB)",
  },
  {
    id: 2,
    label: "GitHub",
    icon: <FaGithub size={20} />,
    href: "https://github.com/rana16468/",
    gradient: "linear-gradient(135deg, #24292e, #111827)",
  },
  {
    id: 3,
    label: "Email",
    icon: <HiOutlineMail size={21} />,
    href: "mailto:rana16-468@diu.edu.bd",
    gradient: "linear-gradient(135deg, #E53E3E, #C0392B)",
  },
  {
    id: 4,
    label: "Facebook",
    icon: <FaFacebookF size={20} />,
    href: "https://www.facebook.com/amsohel.rana.90",
    gradient: "linear-gradient(135deg, #1877F2, #1558C0)",
  },
  {
    id: 5,
    label: "Quora",
    icon: <FaQuora size={20} />,
    href: "https://www.quora.com/profile/A-M-S-R",
    gradient: "linear-gradient(135deg, #B92B27, #8E1E1B)",
  },
  {
    id: 6,
    label: "WhatsApp",
    icon: <FaWhatsapp size={20} />,
    href: "https://wa.me/8801884557649",
    gradient: "linear-gradient(135deg, #25D366, #128C7E)",
  },
  {
    id: 7,
    label: "Telegram",
    icon: <FaTelegram size={20} />,
    href: "https://t.me/8801722305054",
    gradient: "linear-gradient(135deg, #229ED9, #0E76A8)",
  },
];

const SocialLinks = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="hidden lg:flex flex-col fixed top-[30%] left-0 z-50 gap-[10px] py-6">
      {links.map(({ id, label, icon, href, gradient }) => {
        const isHovered = hoveredId === id;

        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              background: gradient,
              width: isHovered ? 170 : 52,
              transition: "width 0.32s cubic-bezier(.34,1.2,.64,1), box-shadow 0.25s ease",
              boxShadow: isHovered
                ? "0 8px 24px rgba(0,0,0,0.22)"
                : "0 2px 8px rgba(0,0,0,0.15)",
            }}
            className="flex items-center overflow-hidden rounded-r-2xl no-underline text-white whitespace-nowrap"
          >
            {/* Icon — always visible */}
            <span
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 52,
                height: 52,
                background: "rgba(0,0,0,0.15)",
                transform: isHovered ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              {icon}
            </span>

            {/* Label — fades in as card expands */}
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.02em",
                paddingLeft: 10,
                paddingRight: 14,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.18s ease 0.1s",
              }}
            >
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;