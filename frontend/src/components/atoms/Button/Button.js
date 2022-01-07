import PropTypes from 'prop-types';

const backgrounds = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
  pink: 'bg-pink-500 hover:bg-pink-600',
  gray: 'bg-gray-500 hover:bg-gray-600',
};

const Button = ({ children, bg = 'blue', isBig, disabled, ...props }) => {
  return (
    <button
      type="button"
      className={
        `inline-flex justify-center items-center ${backgrounds[bg]} text-white rounded-lg transition-colors ` +
        `${isBig ? 'px-5 py-1.5 text-lg font-normal' : 'px-4 py-1'}` +
        `${disabled ? ' pointer-events-none select-none opacity-50' : ''}`
      }
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  bg: PropTypes.oneOf(['blue', 'purple', 'pink', 'gray']),
  isBig: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
