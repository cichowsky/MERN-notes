import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from 'context/AuthContext';
import usePageTitle from 'hooks/usePageTitle';
import useForm from 'hooks/useForm';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Modal from 'components/organisms/Modal/Modal';

const AuthForm = ({ isRegisterForm }) => {
  const { loginUser, registerUser } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  usePageTitle(isRegisterForm ? 'Register' : 'Log in', [isRegisterForm]);

  const initialValues = {
    email: '',
    password: '',
    ...(isRegisterForm && { repeatPassword: '' }),
  };

  const validationRules = {
    email: { required: true, email: true },
    password: { required: true, minLength: 6 },
    ...(isRegisterForm && { repeatPassword: { required: true } }),
  };

  const {
    values,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm(initialValues, validationRules);

  // force reset form when switch login/register
  useEffect(() => {
    resetForm();
  }, [isRegisterForm]);

  // ultimately it should be moved (it stays here at this point)
  const comparePassword = () => {
    if (!isRegisterForm) return null;
    let errorMessage = '';
    if (touched.password && touched.repeatPassword && values.password !== values.repeatPassword) {
      errorMessage = "Password doesn't match!";
    }
    return errorMessage;
  };

  const register = async (userData) => {
    setLoading(true);
    const [data, error] = await registerUser(userData);
    setLoading(false);
    if (data) setMessage({ text: data.message, variant: 'success' });
    if (error) setMessage({ text: error });
  };

  const login = async (userData) => {
    setLoading(true);
    const [error] = await loginUser(userData);
    setLoading(false);
    if (error) setMessage({ text: error });
  };

  const onSubmit = async () => {
    if (!isFormValid && !comparePassword()) return;

    const userData = {
      email: values.email,
      password: values.password,
    };

    if (isRegisterForm) {
      await register(userData);
    } else {
      await login(userData);
    }
  };

  const isSubmitButtonDisabled =
    (!isFormValid && !!Object.keys(errors).length) || !!comparePassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-semibold mb-4">{isRegisterForm ? 'Register' : 'Log in'}</h2>

      <Input
        type="email"
        label="E-mail"
        name="email"
        placeholder="nick@mail.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.email}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        placeholder="********"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.password}
      />
      {isRegisterForm && (
        <Input
          type="password"
          label="Repeat password"
          name="repeatPassword"
          placeholder="********"
          value={values.repeatPassword || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.repeatPassword || comparePassword()}
        />
      )}
      <div className="flex justify-end mt-2">
        <Button type="submit" isBig disabled={isSubmitButtonDisabled} loading={loading}>
          {isRegisterForm ? 'Register' : 'Log in'}
        </Button>
      </div>

      {message && (
        <Modal handleClose={() => setMessage(null)}>
          <span
            className={`font-semibold ${
              message.variant === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message.text}
          </span>
        </Modal>
      )}
    </form>
  );
};

AuthForm.propTypes = {
  isRegisterForm: PropTypes.bool,
};

export default AuthForm;
