import { useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';

const mockedNote = {
  id: 'askbndfsirvbfgadvds',
  title: 'Shopping list',
  body: 'eggs, milk, water, cookies, bread, cola',
};

const NoteView = () => {
  const [note, setNote] = useState(mockedNote);

  return (
    <MainTemplate>
      <div className="pl-4 pt-1 pb-4 border-l-4 border-indigo-600 mb-8">
        <h1 className="text-gray-800 text-4xl font-semibold">{note.title}</h1>
        <p className="mt-4 text-xl text-gray-600">{note.body}</p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          className="text-lg font-semibold inline-flex bg-purple-600 hover:bg-purple-700 text-white rounded-full py-1 px-4 justify-center items-center"
        >
          Edit note
        </button>
        <button
          type="button"
          className="text-lg font-semibold inline-flex bg-pink-600 hover:bg-pink-700 text-white rounded-full py-1 px-4 justify-center items-center"
        >
          Delete note
        </button>
      </div>
    </MainTemplate>
  );
};

export default NoteView;
