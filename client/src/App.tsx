import React from 'react';
import { useState, Fragment } from 'react';
import Menu from './features/components/Menu';
import Banner from './features/components/Banner';
import About from './features/components/About';
import Projects from './features/components/Projects';
import BrandLogos from './features/components/BrandLogos';
import Contact from './features/components/Contact';
import Footer from './features/components/Footer';
import logo from './images/vulcanoWhite.png';
import Blog from './blog/Blog';

import './App.css';

function App() {
  const [menuStatus, setMenuStatus] = useState(false);

  const togleMenu = () => {
    setMenuStatus(!menuStatus);
  };

  return (
    <div className="App">
      <header>
        <img
          src={logo}
          style={{
            position: 'absolute',
            // float: 'left',
            top: '0.3rem',
            width: '7rem',
            height: '7rem',
            margin: '1rem',
            // gridArea: 'logo',
          }}
          alt="logo of vulcano.top"
        />
      </header>
      <main
        style={{
          position: 'relative',
          backgroundColor: 'rgb(70, 128, 179, 0.9)',
          borderRadius: '20rem / 5rem',
          padding: '1rem 1rem 3rem',
          marginTop: '2rem',
          marginBottom: '2rem',
          // overflow: 'hidden',
        }}
      >
        <Menu changeMenuStatus={togleMenu} menuOpen={menuStatus} />
        <Banner />
        <About />
        <Blog />
        <Projects />
        <BrandLogos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
