import { useState } from 'react';
import { ContactsItem } from './ContactsItem';

export const Contacts = ({ contacts, onDelete }) => {
  return (
    <>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {contacts.map(({ name, phone, id }) => (
          <ContactsItem
            key={id}
            id={id}
            name={name}
            phone={phone}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </>
  );
};
