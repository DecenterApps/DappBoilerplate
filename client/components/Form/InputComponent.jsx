import React from 'react';
import PropTypes from 'prop-types';
import '../App/app.scss';

const InputComponent = ({
  input, placeholder, wrapperClassName, inputClassName, errorClassName, showErrorText,
  type, id, showLabel, labelText, labelClass, meta: { touched, error }
}) => (
  <div styleName={wrapperClassName}>
    <input
      {...input}
      placeholder={placeholder}
      id={id || ''}
      styleName={`${inputClassName} ${touched && error ? errorClassName : ''}`}
      type={type}
    />
    {showLabel && <label styleName={labelClass} htmlFor={id || ''}>{ labelText }</label>}
    {touched && ((error && showErrorText && <div styleName={errorClassName}>{error}</div>))}
  </div>
);

InputComponent.defaultProps = {
  showLabel: false,
  labelText: '',
  labelClass: '',
  id: '',
  placeholder: '',
  showErrorText: false,
};

InputComponent.propTypes = {
  input: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string.isRequired,
  inputClassName: PropTypes.string.isRequired,
  errorClassName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  showLabel: PropTypes.bool,
  labelText: PropTypes.string,
  labelClass: PropTypes.string,
  meta: PropTypes.object.isRequired,
  showErrorText: PropTypes.bool
};

export default InputComponent;
