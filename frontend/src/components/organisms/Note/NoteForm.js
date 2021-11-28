import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';

const NoteForm = ({ editedNote }) => {
  const editedNoteId = editedNote?.id;
  const inititalTitle = editedNote?.title || '';
  const inititalDescription = editedNote?.body || '';

  const [title, setTitle] = useState(inititalTitle);
  const [description, setDescription] = useState(inititalDescription);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
  };

  const resetForm = () => {
    setTitle(inititalTitle);
    setDescription(inititalDescription);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate
    // handle save note or handle edit note
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold pb-3 border-b-2 mb-4">
        {editedNoteId ? 'Edit note' : 'Add new note'}
      </h2>
      <Input label="Title" name="title" placeholder="Title" value={title} onChange={handleChange} />
      <Input
        textarea
        label="Description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-3 mt-2">
        <Button color="gray" isBig onClick={resetForm}>
          Reset
        </Button>
        <Button type="submit" isBig>
          {editedNoteId ? 'Save note' : 'Add note'}
        </Button>
      </div>
    </form>
  );
};

NoteForm.propTypes = {
  editedNote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};

export default NoteForm;
