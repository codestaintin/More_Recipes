import jwtDecode from 'jwt-decode';
import history from '../utils/history';

const decodeToken = token => jwtDecode(token);

const logout = () => {
  window.localStorage.removeItem('token');
  history.push('/');
};

const recipeResponseType = {
  FAILURE: 0,
  ADD_RECIPE_SUCCESS: 1,
  EDIT_RECIPE_SUCCESS: 2,
  VIEW_RECIPE_SUCCESS: 3,
  GET_REVIEW_SUCCESS: 4,
  POST_REVIEW_SUCCESS: 5,
  CLEAR_RECIPE_MESSAGE: 6,
  DELETE_RECIPE_SUCCESS: 7,
};

export {
  recipeResponseType,
  decodeToken,
  logout
};
