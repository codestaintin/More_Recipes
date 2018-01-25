import actionTypes from '../../actions/actionTypes';
import { recipeResponseType } from '../../utils/helpers';

const initialState = {
  responseType: null,
  message: '',
  isCreating: false,
  getUserRecipesSuccess: [],
  getUserRecipesFailure: '',
  recipe: { },
  recipes: [],
  review: [],
  favorites: []
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.ADD_RECIPE_SUCCESS,
        message: action.message
      };
    case actionTypes.ADD_RECIPE_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE,
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
        responseType: recipeResponseType.FAILURE,
        getUserRecipesFailure: action.error
      };
    case actionTypes.VIEW_RECIPE_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.VIEW_RECIPE_SUCCESS,
        recipe: action.data
      };
    case actionTypes.VIEW_RECIPE_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE,
      };
    case actionTypes.EDIT_RECIPE_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.EDIT_RECIPE_SUCCESS,
        message: action.message
      };
    case actionTypes.EDIT_RECIPE_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE,
        message: action.error
      };
    case actionTypes.CLEAR_RECIPE_MESSAGE:
      return {
        ...state,
        responseType: recipeResponseType.CLEAR_RECIPE_MESSAGE,
        message: ''
      };
    case actionTypes.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.DELETE_RECIPE_SUCCESS,
        message: action.message
      };
    case actionTypes.DELETE_RECIPE_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE,
        message: action.error
      };
    case actionTypes.POST_REVIEW_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.POST_REVIEW_SUCCESS,
        message: ''
      };
    case actionTypes.POST_REVIEW_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE,
        message: action.error
      };
    case actionTypes.GET_REVIEW_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.GET_REVIEW_SUCCESS,
        message: '',
        review: action.review
      };
    case actionTypes.GET_REVIEW_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE,
        message: action.error
      };
    case actionTypes.GET_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.GET_ALL_RECIPES_SUCCESS,
        recipes: action.data.allRecipes,
        pagination: action.data.pagination
      };
    case actionTypes.GET_ALL_RECIPES_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE,
      };
    case actionTypes.CREATE_USER_FAVORITE_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.CREATE_USER_FAVOURITE
      };
    case actionTypes.CREATE_USER_FAVORITE_FAILURE:
      return {
        ...state,
        responseType: recipeResponseType.FAILURE
      };
    case actionTypes.GET_USER_FAVORITES_SUCCESS:
      return {
        ...state,
        responseType: recipeResponseType.GET_USER_FAVORITE_SUCCESS,
        favorites: action.data.userFavorites,
        pagination: action.data.pagination
      };
    default:
      return state;
  }
};

export default recipeReducer;