import { useState, useEffect, useContext } from 'react';
import NotesContext from 'context/NotesContext';
import { useParams } from 'react-router-dom';
import usePageTitle from 'hooks/usePageTitle';
import MainTemplate from 'components/templates/MainTemplate';
import Note from 'components/organisms/Note/Note';
import Alert from 'components/atoms/Alert/Alert';
import Loader from 'components/atoms/Loader/Loader';
import Redirection from 'components/atoms/Redirection/Redirection';

const NoteView = () => {
  usePageTitle('Note');
  const { id } = useParams();
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
      <Redirection />
      {loading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {note && <Note {...note} />}
    </MainTemplate>
  );
};

export default NoteView;
