import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const reviewValidate = (data) => {
  const content = data.content.trim();
  const errors = {};

  if (!Validator.isEmpty(content)) {
    if (!Validator.isLength(content, { min: 4, max: undefined })) {
      errors.content = 'Review  must be at least 4 characters';
    }
  } else { errors.content = 'Review details is required'; }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default reviewValidate;