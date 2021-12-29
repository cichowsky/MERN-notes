import { NavLink } from 'react-router-dom';

const navLinkClassName = ({ isActive }) => {
  return `${isActive ? 'text-white' : 'text-gray-300 hover:text-gray-100'} py-3 mr-4`;
};

const Header = () => {
  return (
    <header className="flex justify-center items-center h-12 bg-gray-600 shadow-md">
      <nav className="max-w-2xl w-full px-4">
        <NavLink to="/auth" className={navLinkClassName}>
          Authentication
        </NavLink>
        <NavLink end to="/notes" className={navLinkClassName}>
          Notes list
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
