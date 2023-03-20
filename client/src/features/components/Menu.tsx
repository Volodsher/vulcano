import styles from './Menu.module.css';
import HamburgerButton from './HamburgerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';

export default function Menu({
  changeMenuStatus,
  menuOpen,
}: {
  changeMenuStatus: () => void;
  menuOpen: boolean;
}): JSX.Element {
  return (
    <div
      style={{
        overflow: 'clip',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        right: '0',
        marginTop: '-7rem',
        marginBottom: '2rem',
        width: '4rem',
        zIndex: 1,
      }}
    >
      <button
        className={styles.menuButton}
        style={{
          top: '3rem',
          width: '4rem',
          height: '4rem',
          zIndex: '1',
        }}
        onClick={changeMenuStatus}
      >
        <HamburgerButton
          changeMenuStatus={changeMenuStatus}
          menuOpen={menuOpen}
        />
      </button>

      <a
        href="https://github.com/Volodsher"
        className={styles.menuLink}
        style={{
          marginTop: menuOpen ? '0' : '-4rem',
          top: menuOpen ? '7.5rem' : '3rem',
        }}
      >
        <button className={styles.menuButton} onClick={changeMenuStatus}>
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </button>
      </a>
      <a
        href="https://medium.com/@volodsher"
        className={styles.menuLink}
        style={{
          marginTop: menuOpen ? '0' : '-4rem',
          top: menuOpen ? '11rem' : '3rem',
        }}
      >
        <button className={styles.menuButton} onClick={changeMenuStatus}>
          <FontAwesomeIcon icon={faMedium} size="2x" />
        </button>
      </a>
      <a
        href="https://www.linkedin.com/in/volodymyr-sheremeta"
        className={styles.menuLink}
        style={{
          marginTop: menuOpen ? '0' : '-4rem',
          top: menuOpen ? '14.5rem' : '3rem',
        }}
      >
        <button className={styles.menuButton} onClick={changeMenuStatus}>
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </button>
      </a>

      <a
        href="#contact"
        className={styles.menuLink}
        style={{
          marginTop: menuOpen ? '0' : '-4rem',
          top: menuOpen ? '18rem' : '3rem',
        }}
      >
        <button className={styles.menuButton} onClick={changeMenuStatus}>
          {' '}
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </button>
      </a>
    </div>
  );
}
