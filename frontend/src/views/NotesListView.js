import { useContext, useEffect, useState } from 'react';
import { NotesContext } from 'context/NotesContext';
import MainTemplate from 'components/templates/MainTemplate';
import Button from 'components/atoms/Button/Button';
import Note from 'components/organisms/Note/Note';
import NoteForm from 'components/organisms/Note/NoteForm';
import Modal from 'components/organisms/Modal/Modal';
import useModal from 'components/organisms/Modal/useModal';
import Loader from 'components/atoms/Loader/Loader';

const NotesListView = () => {
  const { notesState, notesActions } = useContext(NotesContext);
  const { notes } = notesState;
  const { getAllNotes } = notesActions;

  const [isFormModalOpen, handleOpenFormModal, handleCloseFormModal] = useModal(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notes.length) return;

    const getNotes = async () => {
      setLoading(true);
      await getAllNotes();
      setLoading(false);
    };
    getNotes();
  }, []);

  return (
    <MainTemplate title="Notes list">
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-semibold">Notes: {notes.length}</p>
        <Button isBig onClick={handleOpenFormModal}>
          + Add note
        </Button>
      </div>

      {loading && <Loader />}

      {notes.map((note) => (
        <Note {...note} key={note._id} isCard />
      ))}

      {isFormModalOpen && (
        <Modal handleClose={handleCloseFormModal}>
          <NoteForm closeForm={handleCloseFormModal} />
        </Modal>
      )}
    </MainTemplate>
  );
};

export default NotesListView;
