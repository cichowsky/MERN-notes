import { useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import Note from 'components/organisms/Note/Note';

const mockedNote = {
  id: 'askbndfsirvbfgadvds',
  title: 'Shopping list',
  body: 'eggs, milk, water, cookies, bread, cola',
};

const NoteView = () => {
  const [note, setNote] = useState(mockedNote);

  return (
    <MainTemplate title="Note">
      <Note title={note.title} body={note.body} />
    </MainTemplate>
  );
};

export default NoteView;
