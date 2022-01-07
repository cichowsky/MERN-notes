import PropTypes from 'prop-types';

const backgrounds = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
  pink: 'bg-pink-500 hover:bg-pink-600',
  gray: 'bg-gray-500 hover:bg-gray-600',
};

const Button = ({ children, bg = 'blue', isBig, disabled, loading, ...props }) => {
  return (
    <button
      type="button"
      className={
        `inline-flex justify-center items-center ${backgrounds[bg]} text-white rounded-lg transition-colors ` +
        `${isBig ? 'px-5 py-1.5 text-lg font-normal' : 'px-4 py-1'}` +
        `${disabled || loading ? ' pointer-events-none select-none opacity-50' : ''}` +
        `${loading ? ' relative text-transparent' : ''}`
      }
      {...props}
    >
      {loading && (
        <span
          className="absolute inset-0 m-auto animate-spin inline-block w-6 h-6 border-4 rounded-full border-gray-300 border-r-transparent pointer-events-none select-none"
          role="status"
        />
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  bg: PropTypes.oneOf(['blue', 'purple', 'pink', 'gray']),
  isBig: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
