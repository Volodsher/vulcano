import React from 'react';
import logo from '../../images/vulcanoWhite.png';
import me from '../../images/me.jpg';
import np from '../../images/vulcanoLogoNavy.png';
import styles from './About.module.css';

export default function About() {
  const textStretcher = (
    <span style={{ display: 'inline-block', width: '100%' }}> </span>
  );
  return (
    <div
      className={styles.aboutContainer}
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        marginTop: '2rem',
        marginRight: '-1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <div className={styles.aboutText1}>
          <p className={styles.p1}>
            Hello, I'm Volodymyr Sheremeta - a web developer. {textStretcher}
          </p>
          <p className={styles.p2}>
            Here you can find some of my projects. {textStretcher}
          </p>
          <p className={styles.p3}>
            I usually work with React.js, Node.js {textStretcher}
          </p>
          <p className={styles.p4}>
            (Express), MySQL, or MongoDB. If the {textStretcher}
          </p>
          <p className={styles.p5}>
            project requires a simple, quick solution{textStretcher}
          </p>
          <p className={styles.p6}>
            with blogging capabilities, I usualy{textStretcher}
          </p>
          <p className={styles.p7}>
            choose Wordpress, as the best option.{textStretcher}
          </p>
        </div>
        <div className={styles.aboutImageWrapper}>
          <div
            className={styles.aboutImage}
            style={{
              backgroundImage: `url('${me}')`,
            }}
          ></div>
        </div>
      </div>
      <p
        style={{
          lineHeight: '2',
          marginRight: '1rem',
          textAlign: 'justify',
        }}
      >
        At the same time, I am always eager to learn new things. I also enjoy
        creating designs and illustrations using vector graphics, especially
        logos that effectively communicate a company's essence. A great logo
        should be both aesthetically pleasing and easily recognizable. Thank you
        for your attention, and have a great day!
      </p>
    </div>
  );
}
