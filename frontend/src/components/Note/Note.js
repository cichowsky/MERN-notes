import PropTypes from 'prop-types';

const Note = ({ title, body }) => {
  return (
    <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
      <h2 className="text-gray-800 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 mb-4 text-gray-600">{body}</p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="inline-flex bg-purple-600 hover:bg-purple-700 text-white rounded-full py-1 px-4 justify-center items-center"
        >
          Edit
        </button>
        <button
          type="button"
          className="inline-flex bg-pink-600 hover:bg-pink-700 text-white rounded-full py-1 px-4 justify-center items-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

Note.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default Note;
