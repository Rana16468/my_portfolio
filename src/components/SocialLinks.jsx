import React from "react";
import { FaGithub, FaLinkedin, FaQuora, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CiFacebook } from "react-icons/ci";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      label: "LinkedIn",
      icon: <FaLinkedin size={22} />,
      href: "https://www.linkedin.com/in/ali-mohammad-sohel-rana-377050216/",
      style: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      label: "GitHub",
      icon: <FaGithub size={22} />,
      href: "https://github.com/rana16468/",
      style: "from-gray-700 to-black",
    },
    {
      id: 3,
      label: "Email",
      icon: <HiOutlineMail size={22} />,
      href: "mailto:rana16-468@diu.edu.bd",
      style: "from-red-500 to-red-700",
    },
    {
      id: 4,
      label: "Facebook",
      icon: <CiFacebook size={24} />,
      href: "https://www.facebook.com/amsohel.rana.90",
      style: "from-blue-400 to-blue-600",
    },
    {
      id: 5,
      label: "Quora",
      icon: <FaQuora size={22} />,
      href: "https://www.quora.com/profile/A-M-S-R",
      style: "from-red-600 to-red-800",
    },

    {
      id: 6,
      label: "WhatsApp",
      icon: <FaWhatsapp size={22} />,
      href: "https://wa.me/8801884557649",
      style: "from-green-500 to-green-700",
    },
    {
      id: 7,
      label: "Telegram",
      icon: <FaTelegram size={22} />,
      href: "https://t.me/8801722305054",
      style: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col fixed top-[35%] left-0 z-20">
      <ul className="space-y-2">
        {links.map(({ id, label, icon, href, style }) => (
          <li
            key={id}
            className={`
              group flex items-center w-44 h-14 ml-[-110px] hover:ml-0 
              duration-300 rounded-r-xl shadow-lg
              bg-gradient-to-r ${style}
            `}
          >
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full px-4 text-white"
            >
              <span className="font-semibold tracking-wide">
                {label}
              </span>

              <span className="transition-transform duration-300 group-hover:scale-125">
                {icon}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;