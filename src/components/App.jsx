import React, { useEffect } from 'react';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { actions } from '../redux/contacts/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../redux/contacts/selectors';
import {
  fetchContacts,
  addContact,
  removeContact,
} from '../redux/contacts/operations';

const App = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectors.getSearch);
  const contacts = useSelector(selectors.getContacts);
  const isLoading = useSelector(selectors.getContactsLoading);
  const error = useSelector(selectors.getContactsError);
  

  const handleSubmit = (name, number) => {
    const isNameAlreadyExists = contacts.some(contact => contact.name === name);

    if (isNameAlreadyExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name,
      number,
    };

    dispatch(addContact(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const handleChange = value => {
    dispatch(actions.setSearch(value));
  };


  const normalizedFilter = search.toLowerCase();
  const visibleContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      `${number}`.includes(normalizedFilter)
  );

  return (
      <div style={{ marginLeft: '30px' }}>
        <h1 className="title">Phonebook</h1>
        <Phonebook onSubmit={handleSubmit} />
        <h1 className="title">Contacts</h1>
        <Filter onChange={handleChange} filter={search} />
        {isLoading && !error ? (
          <p>Loading, please wait...</p>
        ) : (
          <Contacts
            contacts={visibleContacts}
            onChange={handleChange}
            filter={search}
            onDelete={handleDeleteContact}
          />
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
};
export default App;
