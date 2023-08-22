import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import PageLayout from './page-layout';

describe('render component page layout', () => {
  it('should render with children and user props', () => {
    const user = { attributes: { email: 'test@example.com' } };
    const { getByText } = render(
      <PageLayout user={user}>
        <div>Test Children</div>
      </PageLayout>
    );
    expect(getByText('RETO PRAGMA AWS')).toBeInTheDocument();
    expect(getByText('Test Children')).toBeInTheDocument();
    expect(getByText('test@example.com')).toBeInTheDocument();
  });
  it('should toggle the menu when the user div is clicked', async () => {
    const user = { attributes: { email: 'test@example.com' } };
    const { getByText, getByRole } = render(
      <PageLayout user={user}>
        <div>Test Children</div>
      </PageLayout>
    );
    fireEvent.click(getByText('test@example.com'));
    await waitFor(() => {
      expect(getByRole('button')).toBeInTheDocument();
    });
  });
  it('should call the signOut function when the sign out button is clicked', () => {
    const user = { attributes: { email: 'test@example.com' } };
    const signOut = jest.fn();
    const { getByText } = render(
      <PageLayout user={user} signOut={signOut}>
        <div>Test Children</div>
      </PageLayout>
    );
    fireEvent.click(getByText('Cerrar sesion'));
    expect(signOut).toHaveBeenCalled();
  });
  it('should render correctly when the children prop is null or undefined', () => {
    const user = { attributes: { email: 'test@example.com' } };
    const { getByText } = render(<PageLayout user={user} />);
    expect(getByText('RETO PRAGMA AWS')).toBeInTheDocument();
    expect(getByText('test@example.com')).toBeInTheDocument();
  });
});
