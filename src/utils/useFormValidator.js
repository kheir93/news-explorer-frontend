import { useState, useCallback } from 'react';

export default function useFormValidator() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (formData = {}, formErrors = {}, formIsValid = false) => {
      setData(formData);
      setErrors(formErrors);
      setIsValid(formIsValid);
    },
    [setData, setErrors, setIsValid]
  );

  return {
    data,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}

 
