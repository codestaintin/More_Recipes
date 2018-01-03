import axios from 'axios';
import actionTypes from '../actionTypes';

const signupAction = userDetails => (dispatch) => {
  axios.post('api/v1/users/signup', userDetails)
    .then((res) => {
      const token = res.data.token;
      window.sessionStorage.setItem('token', token);
      return dispatch({ type: actionTypes.SIGNUP_SUCCESSFUL });
    })
    .catch((err) => {
      if (err.response.data.message === 'A validation error occurred') {
        return dispatch({ type: actionTypes.SIGNUP_VALIDATION_ERROR,
          payload: err.response.data.errors
        });
      }
      return dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL, 
        payload: 'Registration Failed'
      });
    });
};

export default signupAction;
