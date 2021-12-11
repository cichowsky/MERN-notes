import React, { useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const NotesContext = React.createContext();

const NotesProvider = ({ children }) => {
  // CONST
  const GET_NOTES = 'GET_NOTES';
  const ADD_NOTE = 'ADD_NOTE';

  // INITIAL STATE
  const initialState = {
    notes: [],
  };

  // REDUCER
  const notesReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case GET_NOTES:
        return {
          ...state,
          notes: payload.notes,
        };
      case ADD_NOTE:
        return {
          ...state,
          notes: [...state.notes, payload.newNote],
        };
      default:
        throw new Error();
    }
  };

  const [notesState, dispatch] = useReducer(notesReducer, initialState);

  // ACTIONS
  const notesActions = {
    async getNotes() {
      const response = await axios.get('http://localhost:3001/api/notes');
      const notes = response.data;
      dispatch({ type: GET_NOTES, payload: { notes } });
    },
    async addNote(noteData) {
      const response = await axios.post('http://localhost:3001/api/notes', noteData);
      const newNote = response.data;
      dispatch({ type: ADD_NOTE, payload: { newNote } });
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
