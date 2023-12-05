import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from 'redux/operations';

export const ContactsItem = ({ id, name, phone, onDelete }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const [currentName, setCurrentName] = useState(name);
  const [currentPhone, setCurrentPhone] = useState(phone);

  const nameInputField = useRef(null);

  console.log(nameInputField);

  const handleSaveContact = () => {
    if (name === currentName && phone === currentPhone) {
      setEdit(false);
      return;
    }

    const updatedContact = {
      id,
      name: currentName,
      phone: currentPhone,
    };

    dispatch(updateContact(updatedContact));
    setEdit(false);
  };

  useEffect(() => {
    console.log(nameInputField);
  }, [nameInputField]);

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
        {currentName}: {currentPhone}
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
          value={currentPhone}
          onChange={e => setCurrentPhone(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {!edit ? (
          <button
            onClick={() => {
              setEdit(true);
              nameInputField.current.focus();

              console.log(nameInputField.current);
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
              setCurrentPhone(phone);
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
