import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';
import recipeReducer from './recipe/recipeReducer';
import userReducer from './auth/userReducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  recipeReducer,
  userReducer
});
