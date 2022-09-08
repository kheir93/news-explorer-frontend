import React from 'react';
import './Preloader.css';
import PreloaderCircle from '../../images/preloader.png';

export default function PreloaderAnimation() {
  return (
    <section className="preloader">
      <div className="preloader__container">
        <img
          className="preloader__circle"
          src={PreloaderCircle}
          alt="preloader circle"
        />
        <p className="preloader__description">Searching for news...</p>
      </div>
    </section>
  );
}
