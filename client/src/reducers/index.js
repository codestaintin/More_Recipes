import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';
import recipeReducer from './recipe/recipeReducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  recipeReducer
});
