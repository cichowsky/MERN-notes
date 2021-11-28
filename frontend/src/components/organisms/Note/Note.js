import PropTypes from 'prop-types';
import Button from 'components/atoms/Button/Button';

const Note = ({ id, title, body, isCard }) => {
  return isCard ? (
    <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
      <h2 className="text-gray-800 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 mb-4 text-gray-600">{body}</p>

      <div className="flex justify-end gap-3">
        <Button color="purple">Edit</Button>
        <Button color="pink">Delete</Button>
      </div>
    </div>
  ) : (
    <>
      <div className="pl-4 pt-1 pb-4 border-l-4 border-indigo-600 mb-8">
        <h2 className="text-gray-800 text-4xl font-semibold">{title}</h2>
        <p className="mt-4 text-xl text-gray-600">{body}</p>
      </div>

      <div className="flex gap-4">
        <Button color="purple" isBig>
          Edit note
        </Button>
        <Button color="pink" isBig>
          Delete note
        </Button>
      </div>
    </>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isCard: PropTypes.bool,
};

export default Note;
