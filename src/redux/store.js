import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducer';

export const store = configureStore({
  reducer: {
    contacts: reducers.contacts,
    search: reducers.search,
  },
});
