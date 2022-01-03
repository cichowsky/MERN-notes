import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from 'context/AuthContext';

const navLinkClassName = ({ isActive }) => {
  return `${isActive ? 'text-white' : 'text-gray-300 hover:text-gray-100'} py-3 mr-4`;
};

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="flex justify-center items-center h-12 bg-gray-600 shadow-md">
      <nav className="max-w-2xl w-full px-4">
        {!user ? (
          <>
            <NavLink to="/auth/login" className={navLinkClassName}>
              Log in
            </NavLink>
            <NavLink to="/auth/register" className={navLinkClassName}>
              Create account
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              className="text-gray-300 hover:text-gray-100 py-3 mr-4"
              onClick={logoutUser}
            >
              Log out
            </button>
            <NavLink end to="/notes" className={navLinkClassName}>
              Notes list
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
