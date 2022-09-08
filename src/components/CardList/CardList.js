import React, { useState, useEffect } from 'react';
import './CardList.css';
import NewsCard from '../NewsCard/NewsCard.js';

export default function CardList({
  onSavedArticlesPage,
  loggedIn,
  cards, 
  savedArticles, 
  displayedCards,
  setDisplayedCards,
  onSaveArticleClick,
  onDeleteArticleClick,
  savedCardsArray,
  setSavedCardsArray,
  onSignInClick,
}) {
  const [next, setNext] = useState(2);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  
  useEffect(() => {
    if (!onSavedArticlesPage) {
      setDisplayedCards(cards?.slice(0, 3));
    }
  }, [cards, onSavedArticlesPage, setDisplayedCards]);

  useEffect(() => {
    if (onSavedArticlesPage) {
      setSavedCardsArray(savedArticles);
    }
  },[onSavedArticlesPage, savedArticles, setSavedCardsArray])
  
  useEffect(() => {
    if (displayedCards?.length < cards?.length) {
      setIsButtonHidden(false);
    } else {
      setIsButtonHidden(true);
    }
  }, [displayedCards?.length, cards?.length]);
  
  function handleShowMoreCards() {
    const cardsLimit = 3;
    setDisplayedCards(cards.slice(0, next + cardsLimit));
    setNext(next + cardsLimit);
  }

  return onSavedArticlesPage ? (
    <section className="card-list card-list_saved-articles">
      <div className="card-list__container">
        <ul className="card-list__card-grid card-list__card-grid_saved-articles">
          {savedCardsArray?.map((newscard) => (
            <li className="card-list__card" key={newscard._id}>
              <NewsCard
                data={newscard}
                onSavedArticlesPage={onSavedArticlesPage}
                loggedIn={loggedIn}
                onDeleteArticleClick={onDeleteArticleClick}
                savedArticles={savedArticles}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  ) : (
    <section className="card-list">
      <div className="card-list__container">
        <h3 className="card-list__title">Search results</h3>
        <ul className="card-list__card-grid">
          {displayedCards?.map((newscard, index) => (
            <li className="card-list__card" key={index}>
              <NewsCard
                data={newscard}
                onSavedArticlesPage={onSavedArticlesPage}
                loggedIn={loggedIn}
                onSaveArticleClick={onSaveArticleClick}
                onDeleteArticleClick={onDeleteArticleClick}
                savedArticles={savedArticles}
                onSignInClick={onSignInClick}
              />
            </li>
          ))}
        </ul>
        {!onSavedArticlesPage && !isButtonHidden && (
          <button
            className={`card-list__show-more-button`}
            onClick={handleShowMoreCards}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}

 
