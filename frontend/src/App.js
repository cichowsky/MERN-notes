import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotesProvider } from 'context/NotesContext';
import NotesListView from 'views/NotesListView';
import NoteView from 'views/NoteView';

const App = () => {
  return (
    <BrowserRouter>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/notes" />} />
          <Route path="/notes" element={<NotesListView />} />
          <Route path="/notes/:id" element={<NoteView />} />
        </Routes>
      </NotesProvider>
    </BrowserRouter>
  );
};

export default App;
