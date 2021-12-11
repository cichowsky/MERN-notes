import { useState, useEffect } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import Note from 'components/organisms/Note/Note';

const mockedNote = {
  _id: 'askbndfsirvbfgadvds',
  title: 'Shopping list',
  body: 'eggs, milk, water, cookies, bread, cola',
};

const NoteView = () => {
  const [note, setNote] = useState(mockedNote);

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
