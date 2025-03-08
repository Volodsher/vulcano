import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './features/components/Layout';
import Home from './home/Home';
import Blog from './blog/Blog';

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
