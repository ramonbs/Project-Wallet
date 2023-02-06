import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testing editForm', () => {
  it('Testing if is possible to edit a expense', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: 'test@gmail.com',
        },
      },
    });

    const descriptionInput = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(descriptionInput, 'teste');
    userEvent.click(buttonAdd);

    const buttonEdit = await screen.findByRole('button', { name: 'Editar' });
    userEvent.click(buttonEdit);

    const descriptionInputEdit = screen.getByTestId('description-input');
    const buttonEditForm = screen.getByRole('button', { name: 'Editar despesa' });

    userEvent.type(descriptionInputEdit, 'teste2');
    userEvent.click(buttonEditForm);

    const description = await screen.findByText('teste2');
    expect(description).toBeInTheDocument();
  });
});
