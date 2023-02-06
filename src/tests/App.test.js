import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const email = 'email-input';
const password = 'password-input';

const emailForTest = 'testeee@gmail.com';
const passwordForTest = '1234567';

const initialEntries = ['/'];

let rendered;

describe('Testing App', () => {
  beforeEach(() => {
    rendered = renderWithRouterAndRedux(<App />, initialEntries);
  });

  it('renders the home page with a title Trybe wallets', () => {
    const title = screen.getByRole('heading', { name: /trybe wallets/i });
    expect(title).toBeInTheDocument();
  });

  it('renders a text email and a input email', () => {
    const inputEmail = screen.getByTestId(email);
    const emailLabel = screen.getByText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  it('renders a text senha and a input senha', () => {
    const senha = screen.getByText(/senha/i);
    const inputSenha = screen.getByTestId(password);
    expect(senha).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
  });

  it('renders a button Entrar', () => {
    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });

  it('check if button is disabled by default', () => {
    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });

  it('check if button is enabled when email and password are filled correct', () => {
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(password);
    const button = screen.getByText(/Entrar/i);

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, emailForTest);
    userEvent.type(inputSenha, passwordForTest);
    expect(button).toBeEnabled();
  });

  it('check if button is disabled when email is filled and password has less than 6 digits', () => {
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(password);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(inputEmail, emailForTest);
    userEvent.type(inputSenha, '1234');
    expect(button).toBeDisabled();
  });

  it('checks if button is disabled when email is not valid', () => {
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(password);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(inputEmail, 'testando');
    userEvent.type(inputSenha, passwordForTest);
    expect(button).toBeDisabled();
  });

  it('checks if state is changed when email and password are filled correctly', () => {
    const inputEmail = screen.getByTestId(email);
    const inputSenha = screen.getByTestId(password);

    userEvent.type(inputEmail, emailForTest);
    userEvent.type(inputSenha, passwordForTest);

    const { store } = rendered;

    expect(store.getState().user.email).toBe(emailForTest);
    expect(store.getState().user.password).toBe(passwordForTest);
  });
});
