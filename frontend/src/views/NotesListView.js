import { useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import Button from 'components/atoms/Button/Button';
import Note from 'components/organisms/Note/Note';
import NoteForm from 'components/organisms/Note/NoteForm';
import Modal from 'components/organisms/Modal/Modal';
import useModal from 'components/organisms/Modal/useModal';

const mockedNotes = [
  {
    id: 'askbndfsirvbfgadvds',
    title: 'Shopping list',
    body: 'eggs, milk, water, cookies, bread, cola',
  },
  {
    id: 'hhggfafvfeawfevfaea',
    title: 'My tasks',
    body: 'go shopping, cook dinner',
  },
];

const NotesListView = () => {
  const [notes, setNotes] = useState(mockedNotes);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);

  return (
    <MainTemplate title="Notes list">
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-semibold">Notes: {notes.length}</p>
        <Button isBig onClick={handleOpenModal}>
          + Add note
        </Button>
      </div>
      {notes.map((note) => (
        <Note {...note} key={note.id} isCard />
      ))}

      <Modal isOpen={isModalOpen} handleClose={handleCloseModal}>
        <NoteForm />
      </Modal>
    </MainTemplate>
  );
};

export default NotesListView;
