import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { NotesProvider } from 'context/NotesContext';
import PrivateRoute from 'utils/PrivateRoute';
import NotesListView from 'views/NotesListView';
import NoteView from 'views/NoteView';
import AuthView from 'views/AuthView';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/notes" />} />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <NotesListView />
                </PrivateRoute>
              }
            />
            <Route path="/notes/:id" element={<NoteView />} />
            <Route path="/auth/*" element={<AuthView />} />
          </Routes>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
