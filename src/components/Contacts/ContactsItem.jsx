import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from 'redux/contacts/operations';

export const ContactsItem = ({ id, name, number, onDelete }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const [currentName, setCurrentName] = useState(name);
  const [currentNumber, setCurrentNumber] = useState(number);

  const nameInputField = useRef(null);

  const handleSaveContact = () => {
    if (name === currentName && number === setCurrentNumber) {
      setEdit(false);
      return;
    }

    const updatedContact = {
      id,
      name: currentName,
      number: currentNumber,
    };

    dispatch(updateContact(updatedContact));
    setEdit(false);
  };

  // useEffect(() => {
  //   console.log(nameInputField);
  // }, [nameInputField]);

  return (
    <li
      style={{
        display: 'flex',
        width: '400px',
        justifyContent: 'space-between',
      }}
      onDoubleClick={() => setEdit(true)}
    >
      <div
        style={{
          display: edit ? 'none' : 'flex',
          padding: 0,
          border: 'none',
        }}
      >
        {currentName}: {currentNumber}
      </div>

      <div>
        <input
          style={{
            height: edit ? '24px' : 0,
            width: edit ? '40%' : 0,
            padding: 0,
            border: edit ? '1px solid #000' : 'none',
          }}
          type="text"
          value={currentName}
          ref={nameInputField}
          onChange={e => setCurrentName(e.target.value)}
        />
        <input
          style={{
            height: edit ? '24px' : 0,
            width: edit ? '40%' : 0,
            padding: 0,
            border: edit ? '1px solid #000' : 'none',
          }}
          type="text"
          value={currentNumber}
          onChange={e => setCurrentNumber(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {!edit ? (
          <button
            onClick={() => {
              setEdit(true);
              nameInputField.current.focus();
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <button onClick={handleSaveContact}>
            <FontAwesomeIcon icon={faSave} />
          </button>
        )}

        <button
          style={{
            color: 'red',
          }}
          className="contact-btn"
          onClick={() => {
            if (edit) {
              setCurrentName(name);
              setCurrentNumber(number);
              return setEdit(false);
            }
            return onDelete(id);
          }}
        >
          x
        </button>
      </div>
    </li>
  );
};
