import { useState, useEffect, useContext } from 'react';
import NotesContext from 'context/NotesContext';
import AuthContext from 'context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate';
import Note from 'components/organisms/Note/Note';
import Alert from 'components/atoms/Alert/Alert';
import Loader from 'components/atoms/Loader/Loader';

const NoteView = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { notesState, notesActions } = useContext(NotesContext);
  const { notes } = notesState;
  const { fetchNote } = notesActions;

  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNote = async () => {
      setLoading(true);

      const searchedNote = notes.find((n) => n._id === id);
      if (searchedNote) {
        setNote(searchedNote);
        setLoading(false);
        return;
      }

      const [fetchedNote, fetchedError] = await fetchNote(id);
      if (fetchedNote) setNote(fetchedNote);
      if (fetchedError) setError(fetchedError);

      setLoading(false);
    };
    getNote();
  }, [notes]);

  return (
    <MainTemplate title="Note">
      <Link
        to={user ? '/notes' : '/auth/login'}
        className="inline-block mb-6 text-xl text-gray-600 font-semibold hover:text-gray-700"
      >
        {user ? '🡠 back to your list' : 'log in here to add notes!'}
      </Link>

      {loading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {note && <Note {...note} />}
    </MainTemplate>
  );
};

export default NoteView;
