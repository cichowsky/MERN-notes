import PropTypes from 'prop-types';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import useForm from 'hooks/useForm';

const NoteForm = ({ editedNote }) => {
  const editedNoteId = editedNote?.id;

  const initialValues = {
    title: editedNote?.title || '',
    description: editedNote?.body || '',
  };

  const validationRules = {
    title: { required: true, minLength: 3, maxLength: 100 },
    description: { required: true, maxLength: 500 },
  };

  const { values, errors, isFormValid, handleChange, handleBlur, resetForm, handleSubmit } =
    useForm(initialValues, validationRules);

  const onSubmit = () => {
    // callback
  };

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
        <Button color="gray" isBig onClick={resetForm}>
          Reset
        </Button>
        <Button type="submit" isBig>
          {editedNoteId ? 'Save note' : 'Add note'}
        </Button>
      </div>
      {isFormValid ? 'Validated' : 'NOT VALIDATED'}
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
