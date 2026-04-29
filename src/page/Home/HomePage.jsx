import React from 'react';
import Home from '../../components/Home';
import About from '../../components/About';
import Portfolio from '../../components/Portfolio';
import Experience from '../../components/Experience';
import Statistic from '../../components/Statistic';
import Contact from '../../components/Contact';
import SocialLinks from '../../components/SocialLinks';
import MyBlog from '../../components/MyBlog';
import Skills from '../../components/Skills';
import MyGitHub from '../../components/github/MyGitHub';

const HomePage = () => {
    return (
        <>
             <Home />
             <MyGitHub/>
          <About />
          <Skills/>
       <Portfolio />
      <Experience />
      <Statistic />
      <MyBlog/>
      <Contact />
      <SocialLinks />
        </>
    );
};

export default HomePage;