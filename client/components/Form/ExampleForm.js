import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputComponent from './InputComponent';
import './forms.scss';

const exampleFormValidator = (values) => {
  const errors = {};

  if (!values.username) errors.username = 'Required';
  if (!values.password) errors.password = 'Required';

  return errors;
};

let ExampleForm = ({ handleSubmit, pristine, invalid }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="username"
      showErrorText
      component={InputComponent}
      placeholder="Username"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="password"
      showErrorText
      component={InputComponent}
      placeholder="Password"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <button
      styleName="submit-button"
      type="submit"
      disabled={pristine || invalid}
    >
      Submit
    </button>
  </form>
);

ExampleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
};

const validate = exampleFormValidator;

ExampleForm = reduxForm({ form: 'exampleForm', validate })(ExampleForm);

export default connect(null, { onSubmit: () => (dispatch) => { console.log('submit', dispatch); } })(ExampleForm);
