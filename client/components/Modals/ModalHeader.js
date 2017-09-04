import React from 'react';
import PropTypes from 'prop-types';

const fStyle = require('../App/icon-font.scss');
const mHStyle = require('./modals.scss');

const ModalHeader = ({ toggleModal, modalType }) => (
  <div className={mHStyle['modal-header']}>
    <i
      className={fStyle['icon-close']}
      role="button"
      tabIndex={0}
      onClick={() => { toggleModal(modalType, {}, false); }}
    />
  </div>
);

ModalHeader.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
};

export default ModalHeader;
