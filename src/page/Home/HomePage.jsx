import React from 'react';
import Home from '../../components/Home';
import About from '../../components/About';
import Portfolio from '../../components/Portfolio';
import Experience from '../../components/Experience';
import Statistic from '../../components/Statistic';
import Contact from '../../components/Contact';
import SocialLinks from '../../components/SocialLinks';
import MyBlog from '../../components/MyBlog';

const HomePage = () => {
    return (
        <>
             <Home />
          <About />
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