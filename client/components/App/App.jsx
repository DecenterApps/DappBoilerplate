import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

const styles = require('./app.scss');

const App = ({ increment, counter }) => (
  <div className={styles.app}>
    <h1>Hello World {counter}</h1>
    <button onClick={increment}>Click</button>
  </div>
);

const mapStateToProps = (state) => ({
  counter: state.counter.counter
});

App.propTypes = {
  increment: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { increment: actions.increment })(App);
