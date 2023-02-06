import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const initialEntries = ['/carteira'];
const initialState = {
  user: {
    email: 'teste@gmail.com',
  },
};

describe('API', () => {
  it('test api call on reducer', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        USD: { ask: 5.5 },
        EUR: { ask: 6.5 },
      }),
    }));

    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  it('test if reducer throw errors with an different url', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('error')));

    try {
      renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    } catch (error) {
      console.error(error);
    }

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');

    global.fetch.mockRestore();
  });
});
