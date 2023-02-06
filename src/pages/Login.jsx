import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { action, USER_ADD } from '../redux/actions';
import './Login.style.css';

function Login(props) {
  const { email, password } = props;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { dispatch } = props;

  function loginButtonValidator() {
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH
        && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setIsButtonDisabled(false);
      console.log('entrou');
    } else {
      setIsButtonDisabled(true);
      console.log('saiu');
    }
  }

  useEffect(() => {
    loginButtonValidator();
  });

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(action(USER_ADD, name, value));
  }

  return (
    <section className="container">
      <div>
        <h1>
          Wallet
        </h1>
        <div className="input-container">
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ (e) => handleChange(e) }
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ (e) => handleChange(e) }
            />
          </label>
        </div>
        <Link
          to="/carteira"
        >
          <button
            type="submit"
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
        </Link>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Login);
