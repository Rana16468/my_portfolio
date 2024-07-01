import React from "react";
// import HeroImage from "../assets/heroImage.png";
import HeroImage from "../assets/mypic.jpg";

import { ExternalLink } from 'react-external-link';




const Home = () => {
  
  // const click = () =>{
  //   <Resume></Resume>
  // }

  return (
    <div
      name="home"
      className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800"
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-4xl sm:text-7xl font-bold text-white">
            I'm a Full Stack Developer
          </h2>
          <p className="text-gray-500 py-4 max-w-md">
            I have 3.5 years Learning  of experience building and desgining software.
            Currently, I love to work on web application using technologies like
            React, Tailwind, Next JS and GraphQL, Postgresql, TypeScript, Material-Ui, Ant Design And Etc .
          </p>
          <div className="text-xl font-bold text-gray-500">
          <p>My Contract Number : 01722305054</p>
          <p>Email Address : amsr215019@gmail.com</p>
          <p>OutLook Address : shohelbd2021@outlook.com</p>

          </div>


          <div className="text-white m-3">
      <ExternalLink href="https://drive.google.com/uc?export=download&id=1YH_cldIxcGsUA1XpbLG6O3MMK0hTWnuW">
        <a
          href="https://drive.google.com/uc?export=download&id=1YH_cldIxcGsUA1XpbLG6O3MMK0hTWnuW"
          download="Resume.pdf"
        >
          <button className="btn btn-sm bg-blue-900 rounded p-1">Download Resume</button>
        </a>
      </ExternalLink>
    </div>
        </div>

        <div  className="lg:ml-11"> 
          <img
            
            src={HeroImage}
            alt="my profile"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
