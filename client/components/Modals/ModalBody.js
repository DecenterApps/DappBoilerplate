import React from 'react';
import PropTypes from 'prop-types';

const mBStyle = require('./modals.scss');

const ModalBody = ({ children }) => (
  <div className={mBStyle['modal-body']}>
    { children }
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
