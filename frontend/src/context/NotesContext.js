import React, { useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const NotesContext = React.createContext();

const NotesProvider = ({ children }) => {
  // CONST
  const GET_ALL_NOTES = 'GET_ALL_NOTES';
  const GET_NOTE = 'GET_NOTE';
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
      const response = await axios.get('http://localhost:3001/api/notes');
      const notes = response.data;
      dispatch({ type: GET_ALL_NOTES, payload: { notes } });
    },
    async addNote(noteData) {
      const response = await axios.post('http://localhost:3001/api/notes', noteData);
      const newNote = response.data;
      dispatch({ type: ADD_NOTE, payload: { newNote } });
    },
    async deleteNote(noteId) {
      const response = await axios.delete(`http://localhost:3001/api/notes/${noteId}`);
      dispatch({ type: DELETE_NOTE, payload: { noteId } });
    },
    async editNote(noteData) {
      const response = await axios.put(`http://localhost:3001/api/notes/${noteData._id}`, noteData);
      dispatch({ type: EDIT_NOTE, payload: { noteData } });
    },
    async getNote(noteId) {
      const response = await axios.get(`http://localhost:3001/api/notes/${noteId}`);
      const note = response.data;
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
