import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import api from 'axiosInstance';
import useApiProtected from 'utils/useApiProtected';

const NotesContext = React.createContext();

const NotesProvider = ({ children }) => {
  const apiProtected = useApiProtected();

  // CONST
  const GET_ALL_NOTES = 'GET_ALL_NOTES';
  const ADD_NOTE = 'ADD_NOTE';
  const DELETE_NOTE = 'DELETE_NOTE';
  const EDIT_NOTE = 'EDIT_NOTE';

  // INITIAL STATE
  const initialState = {
    notes: [],
  };

  // REDUCER
  const notesReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case GET_ALL_NOTES:
        return {
          ...state,
          notes: payload.notes,
        };
      case ADD_NOTE:
        return {
          ...state,
          notes: [...state.notes, payload.newNote],
        };
      case DELETE_NOTE:
        const filteredNotes = [...state.notes].filter((note) => note._id !== payload.noteId);
        return {
          ...state,
          notes: filteredNotes,
        };
      case EDIT_NOTE:
        const updatedNotes = [...state.notes];
        const noteIndex = updatedNotes.findIndex((note) => note._id === payload.noteData._id);
        updatedNotes[noteIndex] = payload.noteData;
        return {
          ...state,
          notes: updatedNotes,
        };
      default:
        throw new Error();
    }
  };

  const [notesState, dispatch] = useReducer(notesReducer, initialState);

  // ACTIONS
  const notesActions = {
    async getAllNotes() {
      const response = await apiProtected.get('/notes');
      const notes = response.data;
      dispatch({ type: GET_ALL_NOTES, payload: { notes } });
    },
    async addNote(noteData) {
      const response = await apiProtected.post('/notes', noteData);
      const newNote = response.data;
      dispatch({ type: ADD_NOTE, payload: { newNote } });
    },
    async deleteNote(noteId) {
      await apiProtected.delete(`/notes/${noteId}`);
      dispatch({ type: DELETE_NOTE, payload: { noteId } });
    },
    async editNote(noteData) {
      await apiProtected.put(`/notes/${noteData._id}`, noteData);
      dispatch({ type: EDIT_NOTE, payload: { noteData } });
    },
    async fetchNote(noteId) {
      let note;
      let err;

      try {
        const response = await api.get(`/notes/${noteId}`);
        note = response.data;
      } catch (error) {
        err = error.response.data.message;
      }

      return [note, err];
    },
  };

  return (
    <NotesContext.Provider value={{ notesState, notesActions }}>{children}</NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export { NotesContext, NotesProvider };
