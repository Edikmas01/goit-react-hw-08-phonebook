import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  fetchContacts,
  updateContact,
  removeContact,
} from './operations';
import {logOut} from '../auth/operations'


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
  extraReducers: (builder) => {
    builder
    .addCase(fetchContacts.rejected, handleRejected)
    .addCase(fetchContacts.pending,handlePending)
    .addCase(fetchContacts.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    })
    .addCase(addContact.rejected,handleRejected)
    .addCase(addContact.pending,handlePending)
    .addCase(addContact.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    }) 
    .addCase(updateContact.rejected, handleRejected)
    .addCase(updateContact.pending ,handlePending)
    .addCase(updateContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    })
    .addCase(removeContact.rejected ,handleRejected)
    .addCase(removeContact.pending, handlePending)
    .addCase(removeContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      );
    })
    .addCase(logOut.pending ,handlePending)
    .addCase(logOut.rejected ,handleRejected)
    .addCase(logOut.fulfilled, (state) => {
      state.error = null;
      state.isLoading = false;
      state.items = [];
    })
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

export const contactsReducers = {
  contacts: contactsSlice.reducer,
  search: searchSlice.reducer,
};
