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

    // add conditions for checkbox, number etc. if necessary
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
    if (isFormValid) return;

    const formValidation = Object.keys(values).reduce(
      (form, fieldName) => {
        const fieldValue = values[fieldName];
        const fieldRules = validationRules[fieldName];

        const newError = validate(fieldRules, fieldValue);
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
  };

  useEffect(() => {
    const noErrors = !Object.values(errors).length;
    const fieldsToValidTouched = Object.keys(validationRules).every((key) => touched[key] === true);
    setIsFormValid(noErrors && fieldsToValidTouched);
  }, [errors, touched, validationRules]);

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
    setIsFormValid(false);
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    validateForm();
    callback();
  };

  return {
    values,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    resetForm,
  };
};

export default useForm;
