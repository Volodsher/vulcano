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
          // overflow: 'hidden',
          display: 'flex',
          // height: '100%',
        }}
      >
        <div className={styles.aboutText1}>
          <p className={styles.p1}>
            Hello, I'm Volodymyr Sheremeta - web developer. {textStretcher}
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
            project requires a simple, quick{textStretcher}
          </p>
          <p className={styles.p6}>
            solution with blogging capabilities,{textStretcher}
          </p>
          <p className={styles.p7}>
            I usually choose Wordpress,{textStretcher}
          </p>
          <p className={styles.p8}> as the best option.{textStretcher}</p>
        </div>
        <div
          style={{
            // display: 'inline-block',
            width: '100%',
            marginLeft: '-2rem',
            marginRight: '-20rem',
            backgroundPositionY: 'center',
            // maxWidth: 'calc(0.25*1920px)',
            // maxWidth: '500px',
            // minWidth: '150px',
            // paddingTop: '1.5rem',
            // margin: '0 1rem',
            backgroundColor: 'green',
            transform: 'skew(-33deg)',
            overflow: 'hidden',

            // background-size: cover;
          }}
        >
          <div
            style={{
              // display: 'inline-block',
              marginLeft: '-5rem',
              width: '100%',
              height: '100%',
              backgroundColor: 'blue',

              transform: 'skew(33deg)',
              backgroundImage: `url('${me}')`,

              backgroundSize: 'cover',
            }}
          ></div>
        </div>
      </div>
      <p
        style={{
          lineHeight: '2',
          // display: 'inline-block',
          // width: '400px',
          // maxWidth: 'calc(0.25*1920px)',
          // maxWidth: '500px',
          // minWidth: '150px',
          // paddingTop: '1.5rem',
          // margin: '0 1rem',
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

//and read my blog about programming and business ()
