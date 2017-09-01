import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increment } from '../../actions/counterActions';
import ModalRoot, { EXAMPLE_MODAL } from '../Modals/ModalRoot';
import toggleModal from '../../actions/modalsActions';

const styles = require('./app.scss');

const App = ({ $increment, counter, $toggleModal }) => (
  <div className={styles.app}>
    <ModalRoot />

    <h1>Hello World {counter}</h1>
    <button onClick={$increment}>Click</button>
    <button onClick={() => { $toggleModal(EXAMPLE_MODAL, {}, true); }}>Open example modal</button>
  </div>
);

App.propTypes = {
  $increment: PropTypes.func.isRequired,
  $toggleModal: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  counter: state.counter.counter
});

const mapDispatchToProps = {
  $increment: increment,
  $toggleModal: toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
