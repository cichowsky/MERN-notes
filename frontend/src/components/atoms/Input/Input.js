import PropTypes from 'prop-types';

const colors = {
  red: 'text-red-600 placeholder-red-600 border-red-500 focus:ring-red-200',
  gray: 'text-gray-800 placeholder-gray-400 border-gray-300 focus:ring-gray-200',
};

const Input = ({ label, name, errorMessage = '', textarea, ...props }) => {
  const TagInput = textarea ? 'textarea' : 'input';
  const variant = errorMessage ? 'red' : 'gray';

  return (
    <>
      {label && (
        <label htmlFor={name} className="mb-1.5 text-gray-700 block select-none font-medium">
          {label}
        </label>
      )}

      <TagInput
        id={name}
        name={name}
        type="text"
        className={
          `px-4 py-2 w-full rounded-lg border focus:outline-none focus:ring ${colors[variant]}` +
          `${textarea ? ' h-40 align-top' : ''}`
        }
        {...props}
      />

      <div className="mt-1 h-5 text-sm text-right text-red-600">{errorMessage}</div>
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  textarea: PropTypes.bool,
};

export default Input;
