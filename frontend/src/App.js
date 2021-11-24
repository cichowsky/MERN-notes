import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotesListView from 'views/NotesListView';
import NoteView from 'views/NoteView';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/notes" element={<NotesListView />} />
        <Route path="/notes/:id" element={<NoteView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
