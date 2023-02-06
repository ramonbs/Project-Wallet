import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editingExpense } from '../redux/actions';

function EditTable(props) {
  const { currencies, dispatch } = props;

  const [newExpense, setNewExpense] = useState({
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dispatch) {
      dispatch(editingExpense(newExpense));
    }
  };

  const handleChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>
        Editar Carteira
      </h2>
      <label htmlFor="value">
        Despesas
        <input
          className="input"
          type="text"
          name="value"
          data-testid="value-input"
          onChange={ handleChange }
          value={ newExpense.value }
        />
      </label>
      Descrição
      <label htmlFor="description">
        <input
          className="input"
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ handleChange }
          value={ newExpense.description }
        />
      </label>
      <label htmlFor="currencies">
        Moedas
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ handleChange }
          value={ newExpense.currency }
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>
              {curr}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="method">
        Método Pagamento
        <select
          name="method"
          data-testid="method-input"
          onChange={ handleChange }
          value={ newExpense.method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Tipo da despesa
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ handleChange }
          value={ newExpense.tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button type="submit">Editar despesa</button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

EditTable.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EditTable);
