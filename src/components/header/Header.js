import React, { useState, useEffect, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import mobileMenuIconWhite from '../../images/mobile-menu-icon-white.svg';
import mobileMenuIconBlack from '../../images/mobile-menu-icon-black.svg';
import MenuCloseIcon from '../../images/menu-close-icon.svg';
import logoutIconWhite from '../../images/logout-icon-white.svg';
import logoutIconBlack from '../../images/logout-icon-black.svg';

export default function Header({
  loggedIn,
  currentUser,
  onSignInClick,
  setIsCardListOpen,
  setSearchKeyword,
  onSavedArticlesPage,
  onLogOut
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [mobileMenu, setMobileMenu] = useState();
  // const [mobileMenuOverlay, setMobileMenuOverley] = useState(false);
  const [logoutIconDisplay, setLogoutIconDisplay] = useState();
  const [mobile, setMobile] = useState(false);
  let mobileRef = createRef();

  useEffect(() => {
    function checkSize() {
      const width = window.matchMedia('(max-width: 520px)');
      if (width.matches) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  });
  
  useEffect(() => {
    if (!isMenuOpen && onSavedArticlesPage) {      
      setMobileMenu(mobileMenuIconBlack);
    } else if (!isMenuOpen && !onSavedArticlesPage) {
      setMobileMenu(mobileMenuIconWhite);
    } else if (isMenuOpen) {
      setMobileMenu(MenuCloseIcon);
    }
  }, [isMenuOpen, onSavedArticlesPage]);

  useEffect(() => {
    if (mobile) {
      setLogoutIconDisplay(logoutIconWhite);
    } else if (onSavedArticlesPage) {
      setLogoutIconDisplay(logoutIconBlack);
    } else if (!onSavedArticlesPage) {
      setLogoutIconDisplay(logoutIconWhite);
    }
  }, [mobile, onSavedArticlesPage]);

  useEffect((e) => {
    window.addEventListener('click', closeOnClickOutside);
    return () => window.removeEventListener('click', closeOnClickOutside);
  });

  function closeOnClickOutside(e) {
    if (mobileRef.current && !mobileRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function onMobileMenuClick() {
    setIsMenuOpen(!isMenuOpen);
    // setMobileMenuOverley(true);
  }

  function handleNavClick() {      
    setIsMenuOpen(false);
    setIsCardListOpen(false);
    setSearchKeyword('');
  }

  function handleLogButtonClick() {
    onSignInClick();
    handleNavClick();   
  }

  function logOut() {
    handleNavClick();
    onLogOut();
  }

  return loggedIn ? (
    <header
      ref={mobileRef}
      className={`header ${
        isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'
      }`}
    >
      <NavLink
        className={`header__title ${
          onSavedArticlesPage && 'header__title_saved-articles'
          } ${isMenuOpen && 'header__title_menu-open'}`}
        exact
        to="/"
        onClick={handleNavClick}
      >
        NewsExplorer
      </NavLink>
      <img
        className="header__menu-icon"
        alt="menu icon"
        src={mobileMenu}
        onClick={onMobileMenuClick}
      />
      <nav
        className={`header__navigation ${
          mobile && isMenuOpen
            ? 'header__navigation_mobile-login'
            : 'header__navigation_mobile-inactive'
        }`}
      >
        <MobileNavigation mobile={mobile}>
          <NavLink
            className={`header__link-home ${
              onSavedArticlesPage && 'header_black'
            }`}
            activeClassName={
              onSavedArticlesPage
                ? 'header__active_black'
                : 'header__active_white'
            }
            exact
            to="/"
            onClick={handleNavClick}
          >
            Home
          </NavLink>
          <NavLink
            className={`header__link-saved-articles ${
              onSavedArticlesPage && 'header_black'
            }`}
            activeClassName={
              onSavedArticlesPage
                ? 'header__active_black'
                : 'header__active_white'
            }
            to="/saved-articles"
            onClick={handleNavClick}
          >
            Saved articles
          </NavLink>
          <NavLink
            className={`header__button header__signout-button header__button_login ${
              onSavedArticlesPage && 'header__button_saved-articles'
            }`}
            to=""
            onClick={logOut}
          >
            <p className="header__button-username">{currentUser.name}</p>
            <img
              className="header__button-logout-icon"
              src={logoutIconDisplay}
              alt="logout icon"
            />
          </NavLink>
        </MobileNavigation>
      </nav>
    </header>
  ) : (
    <header
      ref={mobileRef}
      className={`header ${
        isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'
        }`}
    >
      <NavLink className="header__title" exact to="/" onClick={handleNavClick}>
        NewsExplorer
      </NavLink>
      <img
        className="header__menu-icon"
        alt="menu icon"
        src={mobileMenu}
        onClick={onMobileMenuClick}
      />
      <div
        className={`header__navigation ${
          mobile && isMenuOpen
            ? 'header__navigation_mobile-logout'
            : 'header__navigation_mobile-inactive'
        }`}
      >
        <MobileNavigation mobile={mobile}>
          <NavLink
            className="header__link-home"
            activeClassName="header__active_white"
            exact
            to="/"
            onClick={handleNavClick}
          >
            Home
          </NavLink>
          <NavLink
            className={
              'header__button header__signin-button header__button_logout'
            }
            to=""
            onClick={handleLogButtonClick}
          >
            Sign In
          </NavLink>
        </MobileNavigation>
      </div>
    </header>
  );
}
