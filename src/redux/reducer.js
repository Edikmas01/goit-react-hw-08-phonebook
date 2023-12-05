import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  fetchContacts,
  updateContact,
  removeContact,
} from './operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};
const filterInitialState = '';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    setContacts: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: {
    [fetchContacts.rejected]: handleRejected,
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [addContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending]: handlePending,
    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [updateContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateContact.pending]: handlePending,
    [updateContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      });
    },
    [removeContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeContact.pending]: handlePending,
    [removeContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      );
    },
  },
});

const searchSlice = createSlice({
  name: 'search',
  initialState: filterInitialState,
  reducers: {
    setSearch: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const reducers = {
  contacts: contactsSlice.reducer,
  search: searchSlice.reducer,
};
