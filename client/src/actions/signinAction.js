import axios from 'axios';
import actionTypes from './actionTypes';
import { decodeToken } from '../utils/helpers';
import history from '../utils/history';

const signinAction = userCredentials => (dispatch) => {
  axios.post('/api/v1/users/signin', userCredentials)
    .then((res) => {
      const token = res.data.token; // get the token
      window.sessionStorage.setItem('token', token);
      if (decodeToken(token)) {
        history.push('/');
        dispatch({ type: actionTypes.SIGNIN_SUCCESSFUL });
      }
    })
    .catch(() => {
      dispatch({ type: actionTypes.SIGNIN_UNSUCCESSFUL, payload: 'Invalid Credentials' });
    });
};

export default signinAction;
