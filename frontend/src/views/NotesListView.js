import { useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import Note from 'components/Note/Note';
import Button from 'components/Button/Button';

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

  return (
    <MainTemplate title="Notes list">
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-semibold">Notes: {notes.length}</p>
        <Button isBig>+ Add note</Button>
      </div>

      {notes.map(({ id, title, body }) => (
        <Note key={id} title={title} body={body} isCard />
      ))}
    </MainTemplate>
  );
};

export default NotesListView;
