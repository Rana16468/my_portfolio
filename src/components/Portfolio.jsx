import React from "react";
import installNode from "../assets/portfolio/installNode.jpg";
import navbar from "../assets/portfolio/navbar.jpg";
import reactParallax from "../assets/portfolio/reactParallax.jpg";
import reactSmooth from "../assets/portfolio/reactSmooth.jpg";
import petmanagement from '../assets/portfolio/petpoint.jpg'
import shoes from '../assets/portfolio/shoes.png';
import interior from '../assets/portfolio/interirorDesign.png'
import jobbox from '../assets/portfolio/jobbox.avif'
import course from '../assets/portfolio/course.png'
const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src:  interior ,
      demo:"https://interiordesign-d389c.web.app/",
      code:"https://github.com/Rana16468/Interior-Design-Frontend.git"

    },
    {
      id: 2,
      src: reactParallax,
       demo:"https://nikereplica.netlify.app/",
      code:"https://github.com/sohelrana2250/nikereplica.git"
    },
    {
      id: 3,
      src: navbar,
       demo:"https://luxury-bubblegum-95e885.netlify.app/",
      code:"https://github.com/sohelrana2250/t-shart-hybrid-application.git"
    },
    {
      id: 4,
      src: reactSmooth,
       demo:"https://b612-inventory-store.web.app/",
      code:"https://github.com/sohelrana2250/ema-john-simple.git"
    },
    {
      id: 5,
      src: installNode,
       demo:"https://b612-inventory-store.web.app/",
      code:"https://github.com/sohelrana2250/ema-john-simple.git"
    },
    {
      id: 6,
      src: petmanagement,
       demo:"https://pat-adoption-orpin.vercel.app/",
      code:"https://github.com/Rana16468/Assigment9-fontend.git"
    },
    {
      id: 7,
      src: shoes ,
       demo:" https://adidas-shoes-three.vercel.app/login",
      code:" https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-fronten-Rana16468.git"
    },
    {
      id: 8,
      src: jobbox ,
       demo:"https://employeebox-a254f.web.app/",
      code:"https://github.com/sohelrana2250/Final-Year-project.git"
    },
    {
      id: 9,
      src: course,
       demo:" https://learning-platform-client-52212.web.app",
       code:"https://github.com/Porgramming-Hero-web-course/b6a11-service-review-client-side-sohelrana2250.git"
    },
   
   
  ];

  return (
    <div
      name="portfolio"
      className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen "
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8 mt-5 ">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Projects
          </p>
          <p className="py-6">Check out some of my work right here</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0 mb-24">
          {portfolios.map(({ id, src,demo, code }) => (
            <div key={id} className="shadow-md shadow-gray-600 rounded-lg">
            <div className="avatar">
           <div className="w-full h-44">
           <img
                src={src}
                alt=""
                className="rounded-md duration-200 hover:scale-105"
              />
           </div>
            </div>
              <div className="flex items-center justify-center">
                <a  target="_blank" rel="noreferrer"  href={demo}className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                  Demo
                </a>
                <a target="_blank" rel="noreferrer" href={code} className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
