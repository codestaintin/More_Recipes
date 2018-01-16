import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: null,
  message: '',
  isCreating: false,
  getUserRecipesSuccess: [],
  getUserRecipesFailure: '',
  recipe: { }
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message
      };
    case actionTypes.ADD_RECIPE_FAILURE:
      return {
        ...state,
        success: false,
        message: action.error
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
        success: true,
        recipe: action.data
      };
    case actionTypes.VIEW_RECIPE_FAILURE:
      return {
        ...state,
        success: false,
      };
    case actionTypes.EDIT_RECIPE_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message
      };
    case actionTypes.EDIT_RECIPE_FAILURE:
      return {
        ...state,
        success: false,
        message: action.error
      };
    case actionTypes.CLEAR_RECIPE_MESSAGE:
      return {
        ...state,
        success: null,
        message: ''
      };
    default:
      return state;
  }
};

export default recipeReducer;