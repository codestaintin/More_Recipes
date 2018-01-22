import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const recipeValidate = (data) => {
  const name = data.name.trim(),
    description = data.description.trim(),
    ingredient = data.ingredient.trim();
  const errors = {};

  if (!Validator.isEmpty(name)) {
    const hasNumber = name.split('').filter(character => Validator.toInt(character));
    if (hasNumber.length !== 0) {
      errors.name = 'recipe name must contain alphabetic characters only';
    }
  } else { errors.name = 'recipe name is required'; }

  if (!Validator.isEmpty(description)) {
    if (!Validator.isLength(description, { min: 4, max: undefined })) {
      errors.description = 'recipe description must be at least 4 characters';
    }
  } else { errors.description = 'recipe description is required'; }

  if (!Validator.isEmpty(ingredient)) {
    if (!Validator.isLength(ingredient, { min: 3, max: undefined })) {
      errors.ingredient = 'recipe ingredient must be at least 3 characters';
    }
  } else { errors.ingredient = 'recipe ingredient is required'; }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default recipeValidate;