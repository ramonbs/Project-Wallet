import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.style.css';

function Header(props) {
  const { email, expenses } = props;
  return (
    <header>
      <h1>Trybe Wallet</h1>
      <h3 data-testid="email-field">{email}</h3>
      <div>
        <p>
          Débito
          {' '}
          <span>R$</span>
          <span data-testid="total-field">

            {expenses && expenses.reduce((acc, { value, currency, exchangeRates }) => {
              const valueInBRL = value * exchangeRates[currency].ask;
              return acc + valueInBRL;
            }, 0).toFixed(2)}

          </span>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
