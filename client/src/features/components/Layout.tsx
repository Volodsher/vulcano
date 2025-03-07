import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import Banner from './Banner';
import Footer from './Footer';
import logo from '../../images/vulcanoWhite.png';
import '../../App.css';

const Layout = ({
  togleMenu,
  menuStatus,
}: {
  togleMenu: () => void;
  menuStatus: boolean;
}) => {
  return (
    <div className="App">
      <header>
        <img
          src={logo}
          style={{
            position: 'absolute',
            top: '0.3rem',
            width: '7rem',
            height: '7rem',
            margin: '1rem',
          }}
          alt="logo of volodsher.com"
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
        }}
      >
        <Menu changeMenuStatus={togleMenu} menuOpen={menuStatus} />
        <Banner />
        <Outlet /> {/* This will render the page content dynamically */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
