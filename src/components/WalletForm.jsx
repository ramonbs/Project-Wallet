import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WalletForm.style.css';
import { fetchCurrencies, addExpense } from '../redux/actions';

function WalletForm(props) {
  const { dispatch, currencies, idCounter } = props;
  const [formState, setFormState] = useState({
    id: idCounter,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addExpense({ ...formState }));
    setFormState({
      id: idCounter,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  if (currencies) {
    return (
      <form onSubmit={ handleSubmit }>
        <h2>
          Carteira
        </h2>
        <label htmlFor="value">
          Despesas
          <input
            className="input"
            type="text"
            name="value"
            data-testid="value-input"
            value={ formState.value }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            className="input"
            type="text"
            name="description"
            data-testid="description-input"
            value={ formState.description }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moedas
          <select
            name="currency"
            data-testid="currency-input"
            value={ formState.currency }
            onChange={ handleChange }
          >
            {currencies.map((curr) => (
              <option
                key={ curr }
                value={ curr }
              >
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
            value={ formState.method }
            onChange={ handleChange }
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
            value={ formState.tag }
            onChange={ handleChange }
          >
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
            <option value="Lazer">Lazer</option>
            <option value="Alimentação">Alimentação</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  isLoading: wallet.isLoading,
  idCounter: wallet.idCounter,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idCounter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
