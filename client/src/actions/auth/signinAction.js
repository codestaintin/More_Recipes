import axios from 'axios';
import actionTypes from '../actionTypes';
import { decodeToken, logout } from '../../utils/helpers';

const signInAction = userCredentials => dispatch =>
  axios.post('/api/v1/users/signin', userCredentials)
    .then((res) => {
      const token = res.data.token;
      if (decodeToken(token)) {
        window.localStorage.setItem('token', token);
        dispatch({ type: actionTypes.SIGNIN_SUCCESSFUL });
      }
    })
    .catch(() => {
      dispatch({
        type: actionTypes.SIGNIN_UNSUCCESSFUL,
        payload: 'Invalid Credentials' });
    });

const logoutAction = () => (dispatch) => {
  dispatch({ type: actionTypes.LOG_OUT_SUCCESS });
  logout();
};

export {
  signInAction,
  logoutAction
};
