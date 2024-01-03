import { useState } from 'react';
import { ContactsItem } from './ContactsItem';

export const Contacts = ({ contacts, onDelete }) => {
  if (!contacts || contacts.length === 0) {
    return <h1>No contacts found</h1>;
  }

  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {contacts.map(({ name, number, id }) => (
        <ContactsItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
