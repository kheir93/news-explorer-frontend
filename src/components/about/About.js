import React from 'react';
import './About.css';
import AuthorImage from '../../images/rs6.jpg';

export default function About() {
  return (
    <section className="about">
      <img src={AuthorImage} alt="avatar" className="about__image" />
      <div className="about__description">
        <h2 className="about__header">About the author</h2>
        <p className="about__paragraph">          
          This projects purpose is to demonstrate how the "newsapi" api can be used with the React combined with the Express.js frameworks.
        </p>
        <p className="about__paragraph">          
          The knowledge and skills used were teached by Practicum, HTML markup, CSS, JS vanilla, React, Express ... The material teached is complete to assist companies to develop their own web sites.
        </p>
      </div>
    </section>
  );
}
