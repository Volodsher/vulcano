import BlogSmall from '../features/components/BlogSmall';
import About from '../features/components/About';
import Projects from '../features/components/Projects';
import BrandLogos from '../features/components/BrandLogos';
import Contact from '../features/components/Contact';

export default function Home() {
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
