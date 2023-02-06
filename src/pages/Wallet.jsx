import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditForm from '../components/EditForm';
import './Wallet.style.css';
import Footer from '../components/Footer';

function Wallet(props) {
  const { edit } = props;

  return (
    <section className="main-container">
      <Header />
      { !edit && <WalletForm />}
      {edit && <EditForm />}
      <Table />
      <Footer />
    </section>
  );
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  edit: wallet.edit,
});

Wallet.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
