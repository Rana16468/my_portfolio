import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio";
import SocialLinks from "./components/SocialLinks";
import { Toaster } from "react-hot-toast";
import Statistic from "./components/Statistic";
function App() {
  return (
    <div>
      <Toaster />
      <NavBar />
      <Home />
      <About />
      <Portfolio />
      <Experience />
      <Statistic />
      <Contact />
      <SocialLinks />
    </div>
  );
}

export default App;
