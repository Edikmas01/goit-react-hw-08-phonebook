import { Contacts } from 'components/Contacts/Contacts';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import { Phonebook } from 'components/Phonebook/Phonebook';

export default function ContactsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectors.getContactsLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, dispatch)

  return (
    <div>
      <h1>
        Contacts page{' '}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
              </span>
              <Phonebook />
        <Contacts />
      </h1>
    </div>
  );
}
