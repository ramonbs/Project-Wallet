import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const description = 'description-input';
const tag = 'tag-input';
const method = 'method-input';
const value = 'value-input';
const currency = 'currency-input';

const initialEntries = ['/carteira'];
const initialState = {
  idCounter: 0,
  currencies: [],
  isLoading: false,
  error: '',
  expenses: [],
  edit: false,
  id: 0,
};

let rendered;

describe('Testing Wallet', () => {
  beforeEach(() => {
    rendered = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });
  });

  it('renders a title "Carteira"', () => {
    const title = rendered.getByRole('heading', {
      name: /carteira/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('check if inputs were rendered', async () => {
    const inputDescription = await rendered.findByTestId(description);
    const inputTag = await rendered.findByTestId(tag);
    const inputMethod = await rendered.findByTestId(method);
    const inputValue = await rendered.findByTestId(value);
    const inputCurrency = await rendered.findByTestId(currency);

    expect(inputDescription).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
  });

  it('check if button was rendered', async () => {
    const button = await rendered.findByText(/adicionar despesa/i);
    expect(button).toBeInTheDocument();
  });

  it('check if entered values were saved on table', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData) });

    const inputDescription = await screen.findByTestId(description);
    const inputValue = await screen.findByTestId(value);

    userEvent.type(inputDescription, 'description');
    expect(inputDescription).toHaveValue('description');
    userEvent.type(inputValue, '10');
    expect(inputValue).toHaveValue('10');

    const button = await rendered.findByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(async () => {
      const tableBody = await screen.findAllByRole('rowgroup');
      expect(tableBody).toHaveLength(2);
    });
  });
});
