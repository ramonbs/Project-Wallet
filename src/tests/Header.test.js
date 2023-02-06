import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const initialEntries = ['/carteira'];
const initialState = {
  user: {
    email: 'teste@gmail.com',
    password: '1234567',
  },
};
const emailForTest = 'teste@gmail.com';

let rendered;

describe('Testing Wallet', () => {
  beforeEach(() => {
    rendered = renderWithRouterAndRedux(<App />, { initialState, initialEntries });
  });

  it('renders a title "Tribe Wallet"', async () => {
    const title = await rendered.getByRole('heading', {
      name: /trybe wallet/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
  });

  it('verify if the email is on the header', async () => {
    const email = await screen.getByText(emailForTest);
    expect(email).toBeInTheDocument();
  });

  it('verify if the "Despesas" is started with 0 on the header', async () => {
    const expenses = await screen.findByTestId('total-field');
    expect(expenses).toBeInTheDocument();
    expect(expenses).toHaveTextContent('0');
  });

  it('verify if "despesas" is updated when a new expense was added', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData) });

    const description = 'description-input';
    const value = 'value-input';

    const descriptionInput = await screen.findByTestId(description);
    const valueInput = await screen.findByTestId(value);

    const addExpenseButton = await screen.findByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(descriptionInput, 'Teste');
    userEvent.type(valueInput, '10');

    act(() => {
      userEvent.click(addExpenseButton);
    });

    await waitFor(() => {
      const expenses = screen.findByTestId('total-field');
      expect(expenses.value).not.toBe('0');
    });
  });
});
