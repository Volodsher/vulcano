import React, { useState, useEffect } from 'react';
import BlogSmall from '../features/components/BlogSmall';
import About from '../features/components/About';
import Projects from '../features/components/Projects';
import BrandLogos from '../features/components/BrandLogos';
import Contact from '../features/components/Contact';
import {
  // BrowserRouter as Router,
  // Routes,
  // Route,
  useLocation,
} from 'react-router-dom';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove '#' from hash
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Delay to ensure the page is rendered first
      }
    }
  }, [location]); // Runs when the location changes
  return (
    <>
      <About />
      <BlogSmall />
      <Projects />
      <BrandLogos />
      <Contact />
    </>
  );
}
