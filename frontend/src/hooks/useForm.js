import { useState } from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues); // e.g. {title: '', description: ''}

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
