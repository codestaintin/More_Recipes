import jwtDecode from 'jwt-decode';
import history from '../utils/history';

const decodeToken = token => jwtDecode(token);

const logout = () => {
  window.localStorage.removeItem('token');
  history.push('/');
};

const authorization = () => ({
  headers: {
    'x-access-token': window.localStorage.token
  }
});

const recipeResponseType = {
  FAILURE: 0,
  ADD_RECIPE_SUCCESS: 1,
  EDIT_RECIPE_SUCCESS: 2,
  VIEW_RECIPE_SUCCESS: 3,
  GET_REVIEW_SUCCESS: 4,
  POST_REVIEW_SUCCESS: 5,
  CLEAR_RECIPE_MESSAGE: 6,
  DELETE_RECIPE_SUCCESS: 7,
  GET_ALL_RECIPES_SUCCESS: 9,
  CREATE_USER_FAVOURITE: 10,
  GET_USER_FAVORITE_SUCCESS: 11,
  CREATE_UPVOTE_SUCCESSFUL: 12,
  CREATE_DOWNVOTE_SUCCESSFUL: 13,
  GET_ALL_FAVORITES_SUCCESS: 14,
  SEARCH_RECIPE_SUCCESS: 15,
  GET_USER_RECIPES_SUCCESS: 16
};

const userResponseType = {
  FAILURE: 0,
  GET_USER_PROFILE_SUCCESS: 1
};

export {
  recipeResponseType,
  userResponseType,
  decodeToken,
  logout,
  authorization
};
