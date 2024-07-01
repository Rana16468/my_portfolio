import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CiFacebook } from "react-icons/ci";
import { FaQuora } from "react-icons/fa";
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
      style: "rounded-tr-md",
    },
    {
      id: 2,
      child: (
        <>
          GitHub <FaGithub size={30} />
        </>
      ),
      href: "https://github.com/sohelrana2250",
    },
    {
      id: 3,
      child: (
        <>
          Mail <HiOutlineMail size={30} />
        </>
      ),
      href: "rana16-468@diu.edu.bd",
    },
    {
      
        id: 4,
        child: (
          <>
            Facebook <CiFacebook size={30} />
          </>
        ),
        href: "https://www.facebook.com/amsohel.rana.90",
      
    },
    {
      id: 5,
      child: (
        <>
          Quora <FaQuora size={30} />
        </>
      ),
      href: "https://www.quora.com/profile/A-M-S-R",
    }
    // {
    //   id: 4,
    //   child: (
    //     <>
    //       Resume <BsFillPersonLinesFill size={30} />
    //     </>
    //   ),
    //   href: "/resume.pdf",
    //   style: "rounded-br-md",
    //   download: true,
    // },
  ];

  return (
    <div className="hidden lg:flex flex-col top-[35%] left-0 fixed">
      <ul>
        {links.map(({ id, child, href, style, download }) => (
          <li
            key={id}
            className={
              "flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500" +
              " " +
              style
            }
          >
            <a
              href={href}
              className="flex justify-between items-center w-full text-white"
              download={download}
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
