import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';

export default combineReducers({
  signinReducer,
  signupReducer
});
