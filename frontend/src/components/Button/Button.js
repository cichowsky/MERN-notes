import PropTypes from 'prop-types';

const Button = ({ children, color = 'indigo', isBig, ...props }) => {
  return (
    <button
      type="button"
      className={
        `inline-flex justify-center items-center bg-${color}-600 hover:bg-${color}-700 text-white rounded-full py-1 px-4` +
        `${isBig ? ' text-lg font-semibold' : ''}`
      }
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  color: PropTypes.string,
  isBig: PropTypes.bool,
};

export default Button;
