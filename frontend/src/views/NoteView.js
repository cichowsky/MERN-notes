import { useState, useEffect, useContext } from 'react';
import { NotesContext } from 'context/NotesContext';
import MainTemplate from 'components/templates/MainTemplate';
import Note from 'components/organisms/Note/Note';

const mockedNote = {
  _id: 'askbndfsirvbfgadvds',
  title: 'Shopping list',
  body: 'eggs, milk, water, cookies, bread, cola',
};

const NoteView = () => {
  const [note, setNote] = useState(mockedNote);

  const { notesActions } = useContext(NotesContext);
  const { getNote } = notesActions;

  useEffect(() => {
    // getNote(id)
  }, []);

  return (
    <MainTemplate title="Note">
      <Note {...note} />
    </MainTemplate>
  );
};

export default NoteView;
