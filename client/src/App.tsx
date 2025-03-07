import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
} from 'react-router-dom';
import Layout from './features/components/Layout';
import Home from './home/Home';
import Blog from './blog/Blog';
// import BlogSmall from './features/components/BlogSmall';
// import About from './features/components/About';
// import Projects from './features/components/Projects';
// import BrandLogos from './features/components/BrandLogos';
// import Contact from './features/components/Contact';

// function Home() {
//   const location = useLocation();

//   useEffect(() => {
//     if (location.hash) {
//       const element = document.getElementById(location.hash.substring(1)); // Remove '#' from hash
//       if (element) {
//         setTimeout(() => {
//           element.scrollIntoView({ behavior: 'smooth' });
//         }, 100); // Delay to ensure the page is rendered first
//       }
//     }
//   }, [location]); // Runs when the location changes
//   return (
//     <>
//       <About />
//       <BlogSmall />
//       <Projects />
//       <BrandLogos />
//       <Contact />
//     </>
//   );
// }

function App() {
  const [menuStatus, setMenuStatus] = useState(false);
  const togleMenu = () => setMenuStatus(!menuStatus);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout togleMenu={togleMenu} menuStatus={menuStatus} />}
        >
          <Route index element={<Home />} /> {/* Home Page */}
          <Route path="blog" element={<Blog />} /> {/* Blog Page */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
