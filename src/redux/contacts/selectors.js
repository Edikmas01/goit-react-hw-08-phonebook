const getContacts = state => state.contacts.items;
const getContactsError = state => state.contacts.error;
const getContactsLoading = state => state.contacts.isLoading;
const getSearch = state => state.search;

export const selectors = {
  getContacts,
  getContactsError,
  getContactsLoading,
  getSearch,
};
