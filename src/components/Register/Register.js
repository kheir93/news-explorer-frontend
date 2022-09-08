import React, { useEffect } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import useFormValidator from '../../utils/useFormValidator';

export default function Register({
  isOpen,
  onClose,
  onRegisterSubmit,
  onSignInClick,
  hasError,
}) {
  const { data, handleChange, errors, isValid, resetForm } =
    useFormValidator();
  
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterSubmit(data.email, data.password, data.name);
  }

  return (
    <PopupWithForm
      name="sign-up"
      title="Sign up"
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
          id="email-register"
          autoComplete="off"
          placeholder="Enter email"
          name="email"
          value={data.email || ''}
          onChange={handleChange}
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
          id={`password-register`}
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

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="username-input">
          Username
        </label>
        <input
          type="name"
          className="popup__input"
          id="username-register"
          autoComplete="on"
          placeholder="Enter username"
          name="name"
          value={data.name || ''}
          onChange={handleChange}
          required
        />
        <p id="password-input-error" className="popup__error">
          {errors.name || ''}
        </p>
      </div>
      {hasError && (
        <p className="popup__error popup__error_type_form">
          This email is unavailable
        </p>
      )}
      <button
        className={`popup__submit-button ${
          isValid ? 'popup__submit-button_active' : ''
        }`}
        type="submit"
        aria-label="Sign up"
        disabled={!isValid}
      >
        Sign up
      </button>
      <p className="popup__signin-signup">
        or{' '}
        <span className="popup__link" onClick={onSignInClick}>
          Sign in
        </span>
      </p>
    </PopupWithForm>
  );
}