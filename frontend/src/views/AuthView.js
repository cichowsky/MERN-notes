import { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import MainTemplate from 'components/templates/MainTemplate';
import AuthForm from 'components/organisms/AuthForm/AuthForm';

const AuthView = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/notes');
    }
  }, [user]);

  const { pathname } = useLocation();
  const authAction = pathname.substring(pathname.lastIndexOf('/') + 1);

  return (
    <MainTemplate title="Authentication">
      <p className="mb-4">
        {authAction === 'login' ? 'Do not have account yet?' : 'Do You have account?'}
        <Link
          to={authAction === 'login' ? 'register' : 'login'}
          className="underline text-blue-800 ml-2"
        >
          {authAction === 'login' ? 'Register here' : 'Log in here'}
        </Link>
      </p>

      <Routes>
        <Route path="" element={<Navigate to="login" />} />
        <Route path="login" element={<AuthForm />} />
        <Route path="register" element={<AuthForm isRegisterForm />} />
      </Routes>
    </MainTemplate>
  );
};

export default AuthView;
