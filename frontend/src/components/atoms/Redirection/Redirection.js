import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from 'context/AuthContext';

const Redirection = () => {
  const { user } = useContext(AuthContext);
  return (
    <Link
      to={user ? '/notes' : '/auth/login'}
      className="inline-block mb-6 text-xl text-gray-600 font-semibold hover:text-indigo-700 transition-colors underline"
    >
      {user ? '📝 back to your list' : '🔑 log in here to add notes!'}
    </Link>
  );
};

export default Redirection;
