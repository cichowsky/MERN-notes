import PropTypes from 'prop-types';

const Button = ({ children, color = 'blue', isBig, ...props }) => {
  return (
    <button
      type="button"
      className={
        `inline-flex justify-center items-center bg-${color}-500 hover:bg-${color}-600 text-white rounded-lg ` +
        `${isBig ? 'px-5 py-1.5 text-lg font-normal' : 'px-4 py-1'}`
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
