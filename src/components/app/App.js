import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Header from '../header/Header';
import SearchPage from '../searchPage/SearchPage';
import About from '../about/About';
import Footer from '../footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import CardList from '../CardList/CardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Preloader from '../Preloader/Preloader';
import NoResults from '../NoResults/NoResults';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import Tooltip from '../Tooltip/Tooltip';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { register, authorize, checkToken } from '../../utils/auth';
import mainApi from '../../utils/mainApi';
import newsApi from '../../utils/newsApi';

export default function App() {

  //State management//
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [isCardListOpen, setIsCardListOpen] = useState(false);
  const [onSavedArticlesPage, setOnSavedArticlesPage] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const location = useLocation().pathname.substring(1);
  const [hasError, setHasError] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [savedCardsArray, setSavedCardsArray] = useState([]);

  useEffect(() => {
    if (token) {      
        checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }, [history, token]);

  useEffect(() => {
    mainApi
      .getCurrentUser(token)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    mainApi
      .getArticles(token)
      .then((res) => {        
        setSavedArticles(res.articles);
      })
      .catch((err) => console.log(err));
  }, [token]);
  
  useEffect(() => {
    const savedArticlesPath = ['saved-articles'];
    if (savedArticlesPath.includes(location)) {
      setOnSavedArticlesPage(true);
    } else {
      setOnSavedArticlesPage(false);
    }
  }, [location]);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function handleRegisterSubmit(email, password, name) {    
    register(email, password, name)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          handleRegister();
        } else {
          setIsRegistered(false);
          setHasError(true);
        }
      })
      .catch((err) => {
        console.log(`This email is unavailable: ${err.message}`);
        setHasError(true);
      });
  }

  function handleLoginSubmit(email, password) {    
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          handleLogin();
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(`Incorrect email or password: ${err.message}`);
        setHasError(true);
      });
  }

  function handleSaveArticle(data) {
    if (!savedArticles.find((object) => object.title === data.title)) {
      mainApi
        .saveArticle(data, searchKeyword, token)
        .then((data) => {
          if (data) {
            setSavedArticles((savedArticles) => [
              ...savedArticles,
              data.article,
            ]);
            console.log('article saved!');
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('thats already saved!');
    }
  }

  function handleDeleteArticle(data) {
    let articleId;

    if (!onSavedArticlesPage) {
      if (savedArticles.find((object) => object.link === data.url)) {
        const article = savedArticles.find((object) => {
          return object.link === data.url;
        });
        articleId = article._id;
      } else {
        console.log('that card doesnt exist!');
      }
    } else {
      articleId = data._id;
    }

    mainApi
      .deleteArticle(articleId, token)
      .then((data) => {
        setSavedArticles(
          savedArticles.filter((object) => object._id !== data.article._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleSearchSubmit(keyword) {
    setIsCardListOpen(false);
    setIsLoading(true);
    newsApi
      .searchArticles(keyword)
      .then((res) => {
        setIsCardListOpen(true);
        setCards(res);
        if (res.length === 0) {
          setHasResults(false);
        } else {
          setHasResults(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/');
  }

  function handleLogin() {
    setHasError(false);
    setLoggedIn(true);
    setIsSignInOpen(false);
  }

  function handleRegister() {
    setHasError(false);
    setIsSignUpOpen(false);
    setIsTooltipPopupOpen(true);
  }

  function handleSignInClick() {
    setHasError(false);
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsTooltipPopupOpen(false);
  }

  function handleSignUpClick() {
    setHasError(false);
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  }

  function closeAllPopups() {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header
          loggedIn={loggedIn}
          currentUser={currentUser}
          setLoggedIn={setLoggedIn}
          onSignInClick={handleSignInClick}
          setIsCardListOpen={setIsCardListOpen}
          setSearchKeyword={setSearchKeyword}
          onSavedArticlesPage={onSavedArticlesPage}
          onLogOut={handleLogOut}
        />
        <Switch>
          <Route exact path="/">
            <SearchPage
              onSearch={handleSearchSubmit}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}              
            />

            {hasResults && isCardListOpen && (
              <CardList
                onSavedArticlesPage={onSavedArticlesPage}
                loggedIn={loggedIn}
                cards={cards}
                savedArticles={savedArticles}
                onSaveArticleClick={handleSaveArticle}
                onDeleteArticleClick={handleDeleteArticle}
                displayedCards={displayedCards}
                setDisplayedCards={setDisplayedCards}
                onSignInClick={handleSignInClick}
              />
            )}
            {isLoading && <Preloader />}
            {!hasResults && !isLoading && isCardListOpen && (
              <NoResults hasError={hasError} />
            )}
            <About />
          </Route>
          <ProtectedRoute path="/saved-articles" loggedIn={loggedIn}>
            <SavedNewsHeader
              currentUser={currentUser}
              savedArticles={savedArticles}
            />
            <CardList
              onSavedArticlesPage={onSavedArticlesPage}
              loggedIn={loggedIn}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
              token={token}
              displayedCards={displayedCards}
              setDisplayedCards={setDisplayedCards}
              savedCardsArray={savedCardsArray}
              setSavedCardsArray={setSavedCardsArray}
              onDeleteArticleClick={handleDeleteArticle}
            />
          </ProtectedRoute>
        </Switch>
        <Login
          isOpen={isSignInOpen}
          onClose={closeAllPopups}
          onSignUpClick={handleSignUpClick}
          onLogInSubmit={handleLoginSubmit}
          hasError={hasError}
        />
        <Register
          isOpen={isSignUpOpen}
          onClose={closeAllPopups}
          onSignInClick={handleSignInClick}
          onRegisterSubmit={handleRegisterSubmit}
          hasError={hasError}
        />
        <Tooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          onSignInClick={handleSignInClick}
          isRegistered={isRegistered}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

