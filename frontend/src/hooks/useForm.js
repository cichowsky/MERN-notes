import { useState, useEffect } from 'react';
import { validate } from 'helpers/validation';

const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (fieldName, fieldValue) => {
    const fieldRules = validationRules[fieldName];
    if (!fieldRules) return;

    const error = validate(fieldRules, fieldValue);
    // remove previously error (whatever it was)
    const { [fieldName]: removedError, ...restErrors } = errors;
    // add recent error (if exist)
    setErrors({ ...restErrors, ...(error && { [fieldName]: error }) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (!touched[name]) return;
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // was the field blured
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateForm = () => {
    // todo: return if no errors, but form was modified
    const formValidation = Object.keys(values).reduce(
      (form, fieldName) => {
        const fieldValue = values[fieldName];
        const fieldRules = validationRules[fieldName];

        const newError = validate(fieldRules, fieldValue); // todo: add condtition if fieldRules?
        const newTouched = { [fieldName]: true };

        return {
          errors: { ...form.errors, ...(newError && { [fieldName]: newError }) },
          touched: { ...form.touched, ...newTouched },
        };
      },
      {
        errors: { ...errors }, // initial errors object (errors from state)
        touched: { ...touched }, // initial touched object (touched from state)
      }
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);
    // todo: return true if no errors and then pass callback?
  };

  useEffect(() => {
    // todo: add conditions to check if form is valid (validation fields touched?)
    const errorsNumber = Object.values(errors).length;
    setIsFormValid(!errorsNumber);
  }, [errors]);

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    validateForm();
    callback();
  };

  return { values, errors, isFormValid, handleChange, handleBlur, resetForm, handleSubmit };
};

export default useForm;
