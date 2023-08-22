import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TableUsers from './Table-users';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('render component table-users', () => {
  it('should render table with user data', () => {
    render(
      <TableUsers
        handlegetUsers={jest.fn()}
        users={[{ id: 1, nameUser: 'John Doe', documentUser: '12345678922' }]}
      />
    );
    const nameUser = screen.getByText('John Doe');
    const documentUser = screen.getByText('12345678922');
    expect(nameUser).toBeInTheDocument();
    expect(documentUser).toBeInTheDocument();
  });
  it('should delete user when clicking on Eliminar button', async () => {
    const handlegetUsers = jest.fn();
    render(
      <TableUsers
        handlegetUsers={handlegetUsers}
        users={[{ id: 1, nameUser: 'John Doe', documentUser: '12345678955' }]}
      />
    );
    const deleteButton = screen.getByText('Eliminar');
    axios.delete.mockResolvedValueOnce();
    fireEvent.click(deleteButton);
    await waitFor(() => expect(handlegetUsers).toHaveBeenCalledTimes(1));
  });
  // it('should open modal when clicking on Modificar button', async () => {
  //   render(
  //     <TableUsers
  //       handlegetUsers={jest.fn()}
  //       users={[{ id: 1, nameUser: 'John Doe', documentUser: '12345678911' }]}
  //     />
  //   );
  //   const updateButton = screen.getByText('Modificar');
  //   fireEvent.click(updateButton);
  //   await waitFor(() => {
  //     const modalTitle = screen.getByText('Modificar usuario');
  //     expect(modalTitle).toBeInTheDocument();
  //   });
  // });
  it('should handle errors when deleting or updating a user', async () => {
    const handlegetUsers = jest.fn();
    render(
      <TableUsers
        handlegetUsers={handlegetUsers}
        users={[{ id: 1, nameUser: 'John Doe', documentUser: '123456678923' }]}
      />
    );
    const deleteButton = screen.getByText('Eliminar');
    axios.delete.mockRejectedValueOnce(new Error('Error deleting user'));
    fireEvent.click(deleteButton);
    await waitFor(() => expect(handlegetUsers).toHaveBeenCalledTimes(0));
    const updateButton = screen.getByText('Modificar');
    fireEvent.click(updateButton);
    const submitButton = screen.getByText('Modificar');
    axios.put.mockRejectedValueOnce(new Error('Error updating user'));
    fireEvent.click(submitButton);
    await waitFor(() => expect(handlegetUsers).toHaveBeenCalledTimes(0));
  });
});
