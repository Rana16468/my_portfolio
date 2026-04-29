import React from "react";
import { FaGithub, FaLinkedin, FaQuora } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CiFacebook } from "react-icons/ci";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
          LinkedIn <FaLinkedin size={30} />
        </>
      ),
      href: "https://www.linkedin.com/in/ali-mohammad-sohel-rana-377050216/",
      style: "bg-blue-600 rounded-tr-md",
      hoverColor: "hover:bg-blue-700",
    },
    {
      id: 2,
      child: (
        <>
          GitHub <FaGithub size={30} />
        </>
      ),
      href: "https://github.com/rana16468/",
      style: "bg-gray-800",
      hoverColor: "hover:bg-gray-900",
    },
    {
      id: 3,
      child: (
        <>
          Mail <HiOutlineMail size={30} />
        </>
      ),
      href: "mailto:rana16-468@diu.edu.bd", // Fixed to include mailto:
      style: "bg-red-500",
      hoverColor: "hover:bg-red-600",
    },
    {
      id: 4,
      child: (
        <>
          Facebook <CiFacebook size={30} />
        </>
      ),
      href: "https://www.facebook.com/amsohel.rana.90",
      style: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: 5,
      child: (
        <>
          Quora <FaQuora size={30} />
        </>
      ),
      href: "https://www.quora.com/profile/A-M-S-R",
      style: "bg-red-600 rounded-br-md",
      hoverColor: "hover:bg-red-700",
    }
  ];

  return (
    <div className="hidden lg:flex flex-col top-[35%] left-0 fixed z-10">
      <ul className="shadow-lg">
        {links.map(({ id, child, href, style, hoverColor }) => (
          <li
            key={id}
            className={`
              flex justify-between items-center w-40 h-14 px-4 ml-[-100px] 
              hover:ml-[-10px] duration-300 ${style} ${hoverColor}
              transition-all ease-in-out border-l-4 border-white
            `}
          >
            <a
              href={href}
              className="flex justify-between items-center w-full text-white font-medium"
              target="_blank"
              rel="noreferrer"
            >
              {child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;