import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full  h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div >
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>

        <p className="text-xl mt-10">
        My name is  Ali Mohammad Sohel Rana  and I am a student at Daffodil International University. I am from the beautiful town of Dinajpur Thakurgoan, where I grew up and spent most of my life. I am currently completed my education at the university and working  With Paid Contructural Application. I am proud of my hometown and my roots, and I strive to make a positive impact in both my community and my university.
        </p>

        <br />

        <p className="text-xl mb-24">
        As a university student, I have recently delved into the world of web development and have been working hard to learn as much as I can. I am determined to become a skilled web developer. I am eager to apply my knowledge to real-world projects and am committed to delivering high-quality work. I know that I still have a lot to learn, but I am dedicated to continuing my education and expanding my skills in this field. I believe that with my strong work ethic and willingness to learn, I have the potential to become a valuable asset to any development team.
        </p>
      </div>
    </div>
  );
};

export default About;
