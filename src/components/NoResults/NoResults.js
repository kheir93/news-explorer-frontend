import React from 'react';
import './NoResults.css';
import NoResultsImage from '../../images/no-results-image.svg';

export default function NoResults({ hasError }) {
  return (
    <section className="no-results">
      <div className="no-results__container">
        <img
          className="no-results__image"
          src={NoResultsImage}
          alt="sad magnifying glass"
        />
        <h3 className="no-results__title">Nothing found</h3>
        <p className="no-results__description">
          {hasError
            ? 'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'
            : 'Sorry, but nothing matched your search terms'}
        </p>
      </div>
    </section>
  );
}
