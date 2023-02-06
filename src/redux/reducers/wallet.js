// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  EDIT_EXPENSE,
  EDIT_START,
  EXPENSES_ADD,
  EXPENSES_REMOVE,
  REQUEST_CURRENCIES_STARTED,
  REQUEST_FAILED,
  WALLET_CURRENCY,
} from '../actions';

const initialState = {
  idCounter: 0,
  currencies: [],
  isLoading: false,
  error: '',
  expenses: [],
  edit: false,
  id: 0,
};

const handleRequestCurrenciesStarted = (state, action) => ({
  ...state,
  isLoading: action.payload,
});

const handleWalletCurrencies = (state, action) => ({
  ...state,
  currencies: action.payload.filter((currency) => currency !== 'USDT'),
  isLoading: false,
});

const handleRequestCurrenciesFailed = (state, action) => ({
  ...state,
  error: action.payload,
  isLoading: false,
});

const handleExpensesAdd = (state, action) => ({
  ...state,
  expenses: [...state.expenses, {
    id: state.idCounter,
    value: action.payload.value === '' ? 0 : action.payload.value,
    description: action.payload.description,
    currency: action.payload.currency,
    method: action.payload.method,
    tag: action.payload.tag,
    exchangeRates: action.payload.exchangeRates,
  }],
  idCounter: state.idCounter + 1,
});

const handleExpensesRemove = (state, action) => ({
  ...state,

  expenses: state.expenses.filter((expense) => expense.id !== action.payload),
});

const handleEditStart = (state, action) => ({
  ...state,
  edit: true,
  id: action.payload,
});

const handleEditExpense = (state, action) => ({
  ...state,
  expenses: state.expenses.map((expense) => {
    if (expense.id === state.id) {
      return {
        ...expense,
        value: action.payload.value,
        description: action.payload.description,
        currency: action.payload.currency,
        method: action.payload.method,
        tag: action.payload.tag,
      };
    }
    return expense;
  }),
  edit: false,
  id: 0,
});

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_STARTED:
    return handleRequestCurrenciesStarted(state, action);
  case WALLET_CURRENCY:
    return handleWalletCurrencies(state, action);
  case REQUEST_FAILED:
    return handleRequestCurrenciesFailed(state, action);
  case EXPENSES_ADD:
    return handleExpensesAdd(state, action);
  case EXPENSES_REMOVE:
    return handleExpensesRemove(state, action);
  case EDIT_START:
    return handleEditStart(state, action);
  case EDIT_EXPENSE:
    return handleEditExpense(state, action);
  default:
    return state;
  }
};

export default walletReducer;
