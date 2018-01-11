import actionTypes from '../../actions/actionTypes';

const initialState = {
  addRecipeSuccess: '',
  addRecipeFailure: '',
  isCreating: false,
  getUserRecipesSuccess: [],
  getUserRecipesFailure: '',
  viewRecipeSuccess: [],
  viewRecipeFailure: ''
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
    case actionTypes.GET_USER_RECIPES_SUCCESS:
      return {
        ...state,
        getUserRecipesSuccess: action.data
      };
    case actionTypes.GET_USER_RECIPES_FAILURE:
      return {
        ...state,
        getUserRecipesFailure: action.error
      };
    case actionTypes.VIEW_RECIPE_SUCCESS:
      return {
        ...state,
        viewRecipeSuccess: action.data
      };
    case actionTypes.VIEW_RECIPE_FAILURE:
      return {
        ...state,
        viewRecipeFailure: action.error
      };
    default:
      return state;
  }
};

export default recipeReducer;