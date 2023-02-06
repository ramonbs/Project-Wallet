import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const initialState = {
  user: {
    email: 'teste@gmail.com',
  },
};

const initialEntries = ['/carteira'];

describe('TableRow', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, {
      initialState,
      initialEntries,
    });
  });

  it('test if the button "Adicionar despesa" is working', async () => {
    const buttonAdd = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(buttonAdd);

    const buttonDespesas = screen.queryByRole('button', { name: 'Editar despesa' });
    expect(buttonDespesas).not.toBeInTheDocument();

    const buttonEdit = await screen.findByRole('button', { name: 'Editar' });
    userEvent.click(buttonEdit);

    expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument();
  });

  it('test if the button "Excluir" is working', async () => {
    const descriptionInput = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(descriptionInput, 'teste');

    userEvent.click(buttonAdd);

    await screen.findAllByText('teste');

    const buttonRemove = screen.queryByRole('button', { name: 'Excluir' });
    userEvent.click(buttonRemove);

    expect(screen.queryByText('teste')).not.toBeInTheDocument();
  });
});
