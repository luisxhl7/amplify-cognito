import React, { useState } from 'react';
import axios from 'axios';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../../../constans/api-constants';
import './table-users.scss';

function TableUsers({ handlegetUsers, users }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [infoUser, setInfoUser] = useState();
  const [userDt, setUserDt] = useState({
    nameUser: '',
    documentUser: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    document: '',
  });

  const handleOpenModalUpdate = async (id) => {
    try {
      const result = await axios.get(getUser + id);
      const userData = result?.data?.user;

      setUserDt({
        nameUser: userData.nameUser,
        documentUser: userData.documentUser,
      });

      setInfoUser(userData);
      setModalOpen(true);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleUpdate = async (event, id) => {
    event.preventDefault();
    const { nameUser, documentUser } = userDt;
    const newErrors = { name: '', document: '' };

    if (nameUser.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (documentUser.trim().length < 10) {
      newErrors.document = 'El documento debe tener al menos 10 numeros.';
    }

    if (newErrors.name || newErrors.document) {
      setErrors(newErrors);
      return;
    }

    const data = await {
      nameUser: userDt.nameUser,
      documentUser: userDt.documentUser,
    };
    axios
      .put(updateUser + id, data)
      .then((response) => {
        handlegetUsers();
        setModalOpen(false);
        console.log(response.data);
        setUserDt({
          nameUser: '',
          documentUser: '',
        });
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(deleteUser + id);
      handlegetUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <section className="table-users">
      <div className="table-users__content">
        <div className="table-users__content__title">
          <div>
            <h3>Nombre</h3>
          </div>
          <div>
            <h3>Documento</h3>
          </div>
        </div>
        <div className="table-users__content__info">
          {users?.map((item) => (
            <div key={item.id} className="table-users__info">
              <div>
                <p> {item.nameUser}</p>
              </div>
              <div>
                <p>{item.documentUser}</p>
              </div>
              <button
                type="button"
                className="table-users__button-delete"
                onClick={() => handleDelete(item.id)}
              >
                Eliminar
              </button>
              <button
                type="button"
                className="table-users__button-update"
                onClick={() => handleOpenModalUpdate(item.id)}
              >
                Modificar
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="table-users__modal-update-user">
          <div className="table-users__content-modal-update-user">
            <button
              type="button"
              className="table-users__content-modal-update-user__close-button"
              onClick={() => {
                setModalOpen(false);
                setUserDt({
                  nameUser: '',
                  documentUser: '',
                });
              }}
            >
              x
            </button>
            <form onSubmit={(event) => handleUpdate(event, infoUser?.id)}>
              <h2 className="table-users__content-modal-update-user__title">
                Modificar usuario
              </h2>
              <input
                type="text"
                name="nameUser"
                id="nameUser"
                className="table-users__content-modal-update-user__input"
                value={userDt.nameUser}
                onChange={(e) =>
                  setUserDt({ ...userDt, nameUser: e.target.value })
                }
              />
              {errors.name && <p className="error-message">{errors.name}</p>}

              <input
                type="number"
                name="documentUser"
                id="documentUser"
                className="table-users__content-modal-update-user__input"
                value={userDt.documentUser}
                onChange={(e) =>
                  setUserDt({ ...userDt, documentUser: e.target.value })
                }
              />
              {errors.document && (
                <p className="error-message">{errors.document}</p>
              )}

              <button
                type="submit"
                className="table-users__content-modal-update-user__button"
              >
                Modificar
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default TableUsers;
