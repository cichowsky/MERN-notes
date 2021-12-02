import { useState } from 'react';
import validate from 'helpers/validation';

const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues); // e.g. {title: '', description: ''}
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // setErrors({
    //   ...errors,
    //   [name]: validate(validationRules[name], values[name]),
    // });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    // if validation pass execute callback
    callback();
  };

  return { values, errors, handleChange, resetForm, handleSubmit };
};

export default useForm;
