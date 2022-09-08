import React, { useEffect, useState } from 'react';
import './SavedNewsHeader.css';

export default function SavedNewsHeader({ currentUser, savedArticles }) {
  const [keywordArray, setKeyWordArray] = useState([]);

  useEffect(() => {    
    const allKeywordsArray = savedArticles.map((value) => value.keyword);

    allKeywordsArray.map(
      (keyword) => keyword.charAt(0).toUpperCase() + keyword.substr(1)
    );
    
    var countKeywords = allKeywordsArray.reduce(function (keyword, value) {
      keyword[value] = (keyword[value] || 0) + 1;
      return keyword;
    }, {});
    
    var sortedArray = Object.keys(countKeywords).sort(function (a, b) {
      return countKeywords[b] - countKeywords[a];
    });
    setKeyWordArray(sortedArray);
  }, [savedArticles]);

  return (
    <section className="saved">
      <div className="saved__content">
        <p className="saved__title">Saved articles</p>
        <h1 className="saved__heading">
          {currentUser.name}, you have {savedArticles.length} saved articles
        </h1>
        <p className="saved__keywords">
          By keywords:{' '}
          <span className="saved__keywords_bold">
            {keywordArray.length > 3
              ? `${keywordArray[0]}, ${keywordArray[1]}, and ${
                  keywordArray.length - 2
                } others`
              : keywordArray.join(', ')}
          </span>
        </p>
      </div>
    </section>
  );
}
