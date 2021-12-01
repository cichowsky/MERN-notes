import PropTypes from 'prop-types';

const Input = ({ label, name, errorMessage = '', textarea, ...props }) => {
  const TagInput = textarea ? 'textarea' : 'input';
  const variant = errorMessage ? 'red' : 'gray';
  const textInt = errorMessage ? '600' : '800';
  const placeholderInt = errorMessage ? '600' : '400';
  const borderInt = errorMessage ? '500' : '300';

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
          `px-4 py-2 w-full rounded-lg border text-${variant}-${textInt} ` +
          `placeholder-${variant}-${placeholderInt} border-${variant}-${borderInt} ` +
          `focus:outline-none focus:ring focus:ring-${variant}-200` +
          `${textarea ? ' h-40 align-top' : ''}`
        }
        {...props}
      />

      <div className={`mt-1 h-5 text-sm text-right text-${variant}-600`}>{errorMessage}</div>
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
