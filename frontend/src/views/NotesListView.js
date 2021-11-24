import { useState } from 'react';
import Note from 'components/Note/Note';
import MainTemplate from 'components/templates/MainTemplate';

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
        <button
          type="button"
          className="text-lg font-semibold inline-flex bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-1 px-4 justify-center items-center"
        >
          + Add note
        </button>
      </div>

      {notes.map(({ id, title, body }) => (
        <Note key={id} title={title} body={body} />
      ))}
    </MainTemplate>
  );
};

export default NotesListView;
