import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormCreateUser from './Form-create-user';

describe('render component form-create-user', () => {
  it('should update the state of newUser when typing in the name input', async () => {
    render(<FormCreateUser handlegetUsers={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Ingrese nombre usuario');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });
  it('should update the state of newUser when typing in the document input', async () => {
    render(<FormCreateUser handlegetUsers={() => {}} />);
    const documentInput = screen.getByPlaceholderText('Ingrese documento');
    fireEvent.change(documentInput, { target: { value: '123456789' } });
    expect(documentInput.value).toBe('123456789');
  });
  it('should clear the input fields when submitting the form', async () => {
    render(<FormCreateUser handlegetUsers={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Ingrese nombre usuario');
    const documentInput = screen.getByPlaceholderText('Ingrese documento');
    const submitButton = screen.getByRole('button', { name: 'Guardar' });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(documentInput, { target: { value: '12345678910' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(documentInput.value).toBe('');
    });
  });
});
