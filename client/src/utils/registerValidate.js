import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const registerValidate = (data) => {
  const errors = {};
  
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password is required';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default registerValidate;
