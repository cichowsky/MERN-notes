import { useState, useEffect } from 'react';
import { validate } from 'helpers/validation';

const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const updateFieldError = (fieldName, fieldValue) => {
    const rules = validationRules[fieldName];
    if (!rules) return;

    const error = validate(rules, fieldValue);
    // remove previously error (whatever it was)
    const { [fieldName]: removedError, ...restErrors } = errors;
    // add recent error (if exist)
    setErrors({ ...restErrors, ...(error && { [fieldName]: error }) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (!touched[name]) return;
    updateFieldError(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // was the field focused
    setTouched({ ...touched, [name]: true });
    updateFieldError(name, value);
  };

  // TODO - add method that validate whole form

  useEffect(() => {
    const errorsNumber = Object.values(errors).length;
    setIsFormValid(errorsNumber === 0);
  }, [errors]);

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    // if validation pass execute callback
    // setErrors(validateAllFields(validationRules, values));
    console.log('values', values);
    console.log('touched', touched);
    console.log('errors', errors);
    console.log('isFormValid', isFormValid);
    callback();
  };

  return { values, errors, isFormValid, handleChange, handleBlur, resetForm, handleSubmit };
};

export default useForm;
