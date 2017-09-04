import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from 'react-tooltip-lite';
import { increment } from '../../actions/counterActions';
import ModalRoot, { EXAMPLE_MODAL } from '../Modals/ModalRoot';
import toggleModal from '../../actions/modalsActions';

const styles = require('./app.scss');

const App = ({ $increment, counter, $toggleModal }) => (
  <div className={styles.app}>
    <ModalRoot />

    <h1>Counter {counter}</h1>
    <button onClick={$increment}>Increment</button>
    <div>
      <button onClick={() => { $toggleModal(EXAMPLE_MODAL, {}, true); }}>Open example modal</button>
    </div>
    <span>
      <Tooltip
        tagName="span"
        useDefaultStyles
        content="Example tooltip text"
      >
        Example tooltip
      </Tooltip>
    </span>
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
