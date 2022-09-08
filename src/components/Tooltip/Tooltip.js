import React from 'react';

export default function Tooltip(props) {
  function handlePopupClick(e) {
    if (e.target.classList.contains('popup_open')) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_success ${props.isOpen ? 'popup_open' : ''}`}
      onClick={handlePopupClick}
    >
      <div className="popup__wrapper">
        <button
          className="popup__close-button popup__close-button_type_form"
          type="button"
          aria-label="Close popup"
          onClick={props.onClose}
        ></button>
        <div className="popup__form-container">
          <h2 className="popup__title">Registration successfully completed!</h2>
          <p className="popup__signin-link" onClick={props.onSignInClick}>
            Sign in
          </p>
        </div>
      </div>
    </div>
  );
}