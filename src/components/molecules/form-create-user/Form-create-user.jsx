import axios from 'axios';
import React, { useState } from 'react';
import { addUsers } from '../../../constans/api-constants';
import './form-create-user.scss';

function FormCreateUser({ handlegetUsers }) {
  const [newUser, setNewUser] = useState({
    name: '',
    document: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    document: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, document } = newUser;
    const newErrors = { name: '', document: '' };

    if (name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (document.trim().length < 10) {
      newErrors.document = 'El documento debe tener al menos 10 numeros.';
    }

    if (newErrors.name || newErrors.document) {
      setErrors(newErrors);
      return;
    }

    const data = {
      nameUser: name,
      documentUser: document,
    };
    axios
      .post(addUsers, data)
      .then((response) => {
        console.log('response ', response.data);
        handlegetUsers();
        setNewUser({ name: '', document: '' });
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  return (
    <div className="content-form">
      <h2>Crear usuario</h2>
      <form className="content-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Ingrese nombre usuario"
          className="content-form__input"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <input
          type="number"
          name="document"
          id="document"
          placeholder="Ingrese documento"
          className="content-form__input"
          value={newUser.document}
          onChange={(e) => setNewUser({ ...newUser, document: e.target.value })}
        />
        {errors.document && <p className="error-message">{errors.document}</p>}

        <button
          type="submit"
          id="button_save_user"
          name="button_save_user"
          className="content-form__button"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default FormCreateUser;
