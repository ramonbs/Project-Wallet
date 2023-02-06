import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Table.style.css';
import { action, EDIT_START, EXPENSES_REMOVE } from '../redux/actions';

function Table(props) {
  const { expenses, dispatch } = props;

  function handleEdit(e) {
    const { id } = e.target;
    dispatch(action(EDIT_START, 'id', Number(id)));
  }

  function deleteExpense(e) {
    const { id } = e.target;
    dispatch(action(EXPENSES_REMOVE, 'expense', Number(id)));
  }

  return (
    <div>
      <table>

        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>
                {expense.exchangeRates[expense.currency]
                && expense.exchangeRates[expense.currency].name}

              </td>
              <td>
                {expense.exchangeRates[expense.currency]
                && parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                {expense.exchangeRates[expense.currency]
                && (expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ (e) => handleEdit(e) }
                  id={ expense.id }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ (e) => deleteExpense(e) }
                  id={ expense.id }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    },
  )).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
