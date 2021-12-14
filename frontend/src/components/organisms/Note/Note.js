import { useContext } from 'react';
import { NotesContext } from 'context/NotesContext';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/atoms/Button/Button';
import NoteForm from 'components/organisms/Note/NoteForm';
import Modal from 'components/organisms/Modal/Modal';
import useModal from 'components/organisms/Modal/useModal';

const Note = ({ _id, title, body, isCard }) => {
  const { notesActions } = useContext(NotesContext);
  const { deleteNote } = notesActions;

  const [isFormModalOpen, handleOpenFormModal, handleCloseFormModal] = useModal(false);
  const [isConfirmModalOpen, handleOpenConfirmModal, handleCloseConfirmModal] = useModal(false);

  const navigate = useNavigate();

  const NoteCard = (
    <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
      <Link to={_id}>
        <h2 className="text-gray-800 text-2xl font-semibold">{title}</h2>
        <p className="mt-2 mb-4 text-gray-600">{body}</p>
      </Link>

      <div className="flex justify-end gap-3">
        <Button color="purple" onClick={handleOpenFormModal}>
          Edit
        </Button>
        {/* <Button onClick={() => deleteNote(_id)} color="pink"> */}
        <Button onClick={handleOpenConfirmModal} color="pink">
          Delete
        </Button>
      </div>
    </div>
  );

  const NoteArticle = (
    <>
      <div className="pl-4 pt-1 pb-4 border-l-4 border-indigo-600 mb-8">
        <h2 className="text-gray-800 text-4xl font-semibold">{title}</h2>
        <p className="mt-4 text-xl text-gray-600">{body}</p>
      </div>

      <div className="flex gap-4">
        <Button color="purple" isBig onClick={handleOpenFormModal}>
          Edit note
        </Button>
        <Button onClick={handleOpenConfirmModal} color="pink" isBig>
          Delete note
        </Button>
      </div>
    </>
  );

  return (
    <>
      {isCard ? NoteCard : NoteArticle}

      {isFormModalOpen && (
        <Modal handleClose={handleCloseFormModal}>
          <NoteForm editedNote={{ _id, title, body }} closeForm={handleCloseFormModal} />
        </Modal>
      )}

      {isConfirmModalOpen && (
        <Modal handleClose={handleCloseConfirmModal}>
          <h2 className="text-gray-800 text-2xl font-semibold mb-4">
            Do You confirm deletion of this note?
          </h2>
          <div className="flex justify-end gap-3">
            <Button onClick={handleCloseConfirmModal} color="gray">
              No
            </Button>
            <Button
              onClick={() => {
                deleteNote(_id);
                handleCloseConfirmModal();
                if (!isCard) navigate('/notes');
              }}
              color="blue"
            >
              Yes
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

Note.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isCard: PropTypes.bool,
};

export default Note;
