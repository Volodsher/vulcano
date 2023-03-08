import React from 'react';
import logo from '../../vulcanoWhite.png';

export default function About() {
  return (
    <div
      style={{
        overflow: 'hidden',
        // display: 'grid',
        // gridAutoFlow: 'column',
        // gridTemplateAreas: `
        //   'logo aboutText'
        //   'aboutText aboutText'
        // `,
      }}
    >
      <img
        src={logo}
        style={{
          float: 'left',
          width: '7rem',
          height: '7rem',
          margin: '1rem',
          // gridArea: 'logo',
        }}
        alt="lofo of vulcano.top"
      />

      <div
        style={{
          // gridArea: 'aboutText',
          color: 'white',
          textAlign: 'justify',
        }}
      >
        <p>
          Hello, I’m Volodymyr Sheremeta, a web developer. Here you can find
          some of my projects and read my blog about programming and business. I
          usually work with React.js, Wordpress and WIX. At the same time, I
          like learning new things as well. I also enjoy creating designs and
          illustrations in vector graphics. Especially brand logos that
          effectively communicate a company's essence. A great logo should be
          both aesthetically pleasing and easily recognizable. Thank you for
          your attention, have a great day!
        </p>
      </div>
    </div>
  );
}
