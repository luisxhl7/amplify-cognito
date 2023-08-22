import React, { useEffect, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';
import PageLayout from '../templates/page-layout/page-layout';
import TableUsers from '../molecules/table-users/Table-users';
import FormCreateUser from '../molecules/form-create-user/Form-create-user';
import { getUsers } from '../../constans/api-constants';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

function IndexPage({ signOut, user }) {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    handlegetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlegetUsers = async () => {
    const token = await user.signInUserSession.idToken.jwtToken;
    const headers = {
      Authorization: token,
    };
    const config = {
      headers,
    };

    axios
      .get(getUsers, config)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  return (
    <PageLayout user={user} signOut={signOut}>
      <FormCreateUser handlegetUsers={handlegetUsers} />
      <TableUsers handlegetUsers={handlegetUsers} users={users} />
    </PageLayout>
  );
}

export default withAuthenticator(IndexPage);
