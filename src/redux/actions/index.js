// Coloque aqui suas actions
export const USER_ADD = 'USER_ADD';
export const WALLET_CURRENCY = 'WALLET_CURRENCY';
export const REQUEST_CURRENCIES_STARTED = 'REQUEST_CURRENCIES_STARTED';
export const REQUEST_CURRENCIES_FAILED = 'REQUEST_CURRENCIES_FAILED';
export const EXPENSES_ADD = 'EXPENSES_ADD';
export const EXPENSES_REMOVE = 'EXPENSES_REMOVE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_START = 'EDIT_START';
export const REQUEST_FAILED = 'REQUEST_FAILED';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const action = (type, name, payload) => ({
  type,
  name,
  payload,
});

const requestCurrenciesStarted = (payload) => ({
  type: REQUEST_CURRENCIES_STARTED,
  payload,
});

const receiveCurrencies = (payload) => ({
  type: WALLET_CURRENCY,
  payload,
});

const requestCurrenciesFailed = (payload) => ({
  type: REQUEST_CURRENCIES_FAILED,
  payload,
});

const saveExpenses = (data, payload) => ({
  type: EXPENSES_ADD,
  payload: {
    exchangeRates: data,
    ...payload,
  },
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: error,
});

const editExpense = (data, payload) => ({
  type: EDIT_EXPENSE,
  payload: {
    ...payload,
    exchangeRates: data,
  },
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrenciesStarted(true));
  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch currencies');
      }
      return response.json();
    })
    .then((data) => {
      dispatch(receiveCurrencies(Object.keys(data)));
    })
    .catch((error) => {
      console.error(error);
      dispatch(requestCurrenciesFailed(error));
    });
};

export const addExpense = (payload) => (dispatch) => fetch(URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    return response.json();
  })
  .then((data) => {
    dispatch(saveExpenses(data, payload));
  })
  .catch((error) => {
    console.error(error);
    dispatch(requestFailed(error));
  });

export const editingExpense = (payload) => (dispatch) => fetch(URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    return response.json();
  })
  .then((data) => {
    dispatch(editExpense(data, payload));
  })
  .catch((error) => {
    console.error(error);
    dispatch(requestFailed(error));
  });
