import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';

export default combineReducers({
  signinReducer,
});
