import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const mStyle = require('./modals.scss');

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { showBackdrop: false, children: null };
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.modalOpen) {
      this.setState({ showBackdrop: false });
      return document.body.classList.toggle('modal-open', false);
    }

    // small delay in order to see the fade in animation
    return setTimeout(() => {
      this.setState({ children: newProps.children, showBackdrop: true });
      document.body.classList.toggle('modal-open', true);
    }, 150);
  }

  render() {
    return (
      <div
        className={`${mStyle['modal-backdrop']} ${this.state.showBackdrop ? mStyle.open : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => { this.props.toggleModal(this.props.modalType, {}, false); }}
      >
        <div
          role="dialog"
          className={mStyle.modal}
          onClick={(e) => { e.stopPropagation(); }}
        >
          {this.state.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalType: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Modal;
