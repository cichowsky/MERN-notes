import { useContext, useEffect } from 'react';
import { NotesContext } from 'context/NotesContext';
import MainTemplate from 'components/templates/MainTemplate';
import Button from 'components/atoms/Button/Button';
import Note from 'components/organisms/Note/Note';
import NoteForm from 'components/organisms/Note/NoteForm';
import Modal from 'components/organisms/Modal/Modal';
import useModal from 'components/organisms/Modal/useModal';

const NotesListView = () => {
  const { notesState, notesActions } = useContext(NotesContext);
  const { notes } = notesState;
  const { getAllNotes } = notesActions;

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <MainTemplate title="Notes list">
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-semibold">Notes: {notes.length}</p>
        <Button isBig onClick={handleOpenModal}>
          + Add note
        </Button>
      </div>
      {notes.map((note) => (
        <Note {...note} key={note._id} isCard />
      ))}

      {isModalOpen && (
        <Modal handleClose={handleCloseModal}>
          <NoteForm closeForm={handleCloseModal} />
        </Modal>
      )}
    </MainTemplate>
  );
};

export default NotesListView;
