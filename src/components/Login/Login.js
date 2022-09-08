import React, { useEffect } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import useFormValidator from '../../utils/useFormValidator';

export default function Login({ isOpen, onClose, onLogInSubmit, onSignUpClick, hasError }) {
  const { data, handleChange, errors, isValid, resetForm } =
    useFormValidator();
  
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogInSubmit(data.email, data.password);
  }

  return (
    <PopupWithForm
      name="login"
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="email-input">
          Email
        </label>
        <input
          type="email"
          className="popup__input"
          id="email-login"
          autoComplete="on"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
          value={data.email || ''}
          required
        />
        <p id="email-input-error" className="popup__error">
          {errors.email || ''}
        </p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="password-input">
          Password
        </label>
        <input
          type="password"
          className="popup__input"
          id={`password-login`}
          autoComplete="on"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
          value={data.password || ''}
          minLength="5"
          maxLength="30"
          required
        />
        <p id="password-input-error" className="popup__error">
          {errors.password || ''}
        </p>
      </div>
      {hasError && (
        <p className="popup__error popup__error_type_form">
          Incorrect email or password
        </p>
      )}
      <button
        className={`popup__submit-button ${
          isValid ? 'popup__submit-button_active' : ''
        }`}
        type="submit"
        aria-label="Sign in"
        disabled={!isValid}
      >
        Sign in
      </button>
      <p className="popup__signin-signup">
        or{' '}
        <span className="popup__link" onClick={onSignUpClick}>
          Sign up
        </span>
      </p>
    </PopupWithForm>
  );
}
