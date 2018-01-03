import actionTypes from '../../actions/actionTypes';

const initialState = {
  addRecipeSuccess: '',
  addRecipeFailure: '',
  isCreating: false
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        addRecipeSuccess: action.message
      };
    case actionTypes.ADD_RECIPE_FAILURE:
      return {
        ...state,
        addRecipeFailure: action.error
      };
    case actionTypes.IS_RECIPE_CREATING:
      return {
        ...state,
        isCreating: action.bool
      };
    default:
      return state;
  }
};

export default recipeReducer;