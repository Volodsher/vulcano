import styles from './Menu.module.css';
import HamburgerButton from './HamburgerButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'

interface SideMenuProps {
  changeMenuStatus: () => void;
  menuOpen: boolean;
}

export default function Menu(props: SideMenuProps) {
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
  }}>
    <button
      className={styles.menuButton}
      style={{
        top: '3rem',
        width: '4rem',
        height: '4rem',
        zIndex: '1'
      }}
      onClick={props.changeMenuStatus}
    >
      <HamburgerButton changeMenuStatus={props.changeMenuStatus} menuOpen={props.menuOpen} />
    </button>
    
    <button
      className={styles.menuButton}
      style={{        
        width: '3rem',
        height: '3rem',
        marginTop: props.menuOpen ? '0' : '-4rem',
        top: props.menuOpen ? '7.5rem' : '3rem',
        transition: 'margin-top 0.2s ease, top 0.2s ease',
    
      }}
      onClick={props.changeMenuStatus}
    >
      <FontAwesomeIcon icon={faGithub} size='xl' />
    </button>
    <button
      className={styles.menuButton}
      style={{
        width: '3rem',
        height: '3rem',
        marginTop: props.menuOpen ? '0' : '-4rem',
        top: props.menuOpen ? '11rem' : '3rem',
        transition: 'margin-top 0.2s ease, top 0.2s ease',

      }}
      onClick={props.changeMenuStatus}
    >
      <FontAwesomeIcon icon={faMedium} size='xl' />
    </button>          
    <button
      className={styles.menuButton}
      style={{
        width: '3rem',
        height: '3rem',
        marginTop: props.menuOpen ? '0' : '-4rem',
        top: props.menuOpen ? '14.5rem' : '3rem',
        transition: 'margin-top 0.2s ease, top 0.2s ease',
      }}
      onClick={props.changeMenuStatus}
    >
      <FontAwesomeIcon icon={faLinkedin} size='xl' />
    </button>
    <button
      className={styles.menuButton}
      style={{        
        width: '3rem',
        height: '3rem',
        marginTop: props.menuOpen ? '0' : '-4rem',
        top: props.menuOpen ? '18rem' : '3rem',
        transition: 'margin-top 0.2s ease, top 0.2s ease',
    
      }}
      onClick={props.changeMenuStatus}
    >
      <FontAwesomeIcon icon={faEnvelope} size='xl' />
    </button>
  </div>
  )
}
