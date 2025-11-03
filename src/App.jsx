import { useState, useMemo, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";


function App() {

  const [introdone, setIntroDone] = useState(false);

  return (
    <>
      {!introdone && < IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introdone && (
        <div className='related gradient text-white'>
          <CustomCursor />
          {/* <ParticlesBackground /> */}
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          {/* <Testimonial /> */}
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
