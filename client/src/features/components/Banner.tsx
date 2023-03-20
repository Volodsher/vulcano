import React from 'react';
import banner from '../../images/slava.png';

export default function Banner() {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <img
        style={{
          width: '5rem',
        }}
        src={banner}
        alt="Slava Ukrsini"
      />
    </div>
  );
}
