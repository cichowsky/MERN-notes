import { useEffect, useContext, useState } from 'react';
import NotesContext from 'context/NotesContext';
import PropTypes from 'prop-types';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import useForm from 'hooks/useForm';

const NoteForm = ({ editedNote, closeForm }) => {
  const { notesActions } = useContext(NotesContext);
  const { addNote, editNote } = notesActions;
  const [loading, setLoading] = useState(false);

  const editedNoteId = editedNote?._id;

  const initialValues = {
    title: editedNote?.title || '',
    description: editedNote?.body || '',
  };

  const validationRules = {
    title: { required: true, maxLength: 100 },
    description: { required: true, maxLength: 500 },
  };

  const { values, errors, isFormValid, handleChange, handleBlur, handleSubmit, validateForm } =
    useForm(initialValues, validationRules);

  const onSubmit = async () => {
    if (!isFormValid) return;

    const noteData = {
      title: values.title,
      body: values.description,
    };

    setLoading(true);
    if (editedNote) {
      noteData._id = editedNoteId;
      noteData._author_id = editedNote._author_id;
      await editNote(noteData);
    } else {
      await addNote(noteData);
    }
    setLoading(false);
    closeForm();
  };

  // validate edit note form on mount
  useEffect(() => {
    if (editedNote) validateForm();
  }, []);

  const isSubmitButtonDisabled = !isFormValid && !!Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-semibold pb-3 border-b-2 mb-4">
        {editedNoteId ? 'Edit note' : 'Add new note'}
      </h2>
      <Input
        label="Title"
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.title}
      />
      <Input
        textarea
        label="Description"
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.description}
      />
      <div className="flex justify-end gap-3 mt-2">
        <Button type="submit" isBig disabled={isSubmitButtonDisabled} loading={loading}>
          {editedNoteId ? 'Save note' : 'Add note'}
        </Button>
      </div>
    </form>
  );
};

NoteForm.propTypes = {
  editedNote: PropTypes.shape({
    _author_id: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  closeForm: PropTypes.func,
};

export default NoteForm;
