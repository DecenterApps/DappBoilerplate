import React from 'react';
import PropTypes from 'prop-types';

const fStyle = require('../App/icon-font.scss');
const mHStyle = require('./modals.scss');

const ModalHeader = ({ toggleModal }) => (
  <div className={mHStyle['modal-header']}>
    <i
      className={fStyle['icon-close']}
      role="button"
      tabIndex={0}
      onClick={() => { toggleModal('', {}, false); }}
    />
  </div>
);

ModalHeader.propTypes = {
  toggleModal: PropTypes.func.isRequired
};

export default ModalHeader;
