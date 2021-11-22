import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotesListView from 'views/NotesListView';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/notes" element={<NotesListView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
