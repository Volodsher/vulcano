import styles from './HamburgerButton.module.css';

interface HamburgerButtonProps {
  changeMenuStatus: () => void;
  menuOpen: boolean;
}

export default function HamburgerButton(props: HamburgerButtonProps) {
  return (
    <div style={{
      // position: 'absolute',
      // right: '2rem',
      // bottom: '2rem'
    }}>
      <div 
        className={styles.hamburgerMenuButton}
        onClick={props.changeMenuStatus}
      >
        <div 
          className={
            props.menuOpen
            ? `${styles.firstLine} ${styles.firstLineAngle}`
            : styles.firstLine}
        />
        <div
          className={props.menuOpen
            ? `${styles.secondLine} ${styles.secondLineAngle}`
            : styles.secondLine}
        />
        <div
          className={props.menuOpen
            ? `${styles.thirdLine} ${styles.thirdLineAngle}`
            : styles.thirdLine}
        />
      </div>
    </div>
  )
}
