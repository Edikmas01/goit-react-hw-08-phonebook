import React, { useEffect } from 'react';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { actions } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../redux/selectors';
import { fetchContacts, addContact,removeContact } from '../redux/operations';

const App = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectors.getSearch);
  const contacts = useSelector(selectors.getContacts);
  const isLoading = useSelector(selectors.getContactsLoading);
  const error = useSelector(selectors.getContactsError);

  const handleSubmit = (name, phone) => {
    const isNameAlreadyExists = contacts.some(contact => contact.name === name);

    if (isNameAlreadyExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name,
      phone,
    };

    dispatch(addContact(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const handleChange = value => {
    dispatch(actions.setSearch(value));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const normalizedFilter = search.toLowerCase();

  const visibleContacts = contacts.filter(
    ({ name, phone }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      `${phone}`.includes(normalizedFilter)
  );

  console.log(error, 'this is error');
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
