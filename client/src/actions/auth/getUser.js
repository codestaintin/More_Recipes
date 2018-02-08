import axios from 'axios';
import actionTypes from '../actionTypes';

const getUserProfileSuccess = data => ({
  type: actionTypes.GET_USER_PROFILE_SUCCESS,
  data
});

const getUserProfileFailure = errors => ({
  type: actionTypes.GET_USER_PROFILE_FAILURE,
  errors
});

/**
 * Get user details
 * 
 * @param {userId} userId - Id of the recipe
 * 
 * @returns {object} user
 */
export default userId => (
  dispatch => axios.get(`/api/v1/users/${userId}`, {
    headers: { 'x-access-token': window.localStorage.token }
  })
    .then((res) => {
      dispatch(getUserProfileSuccess(res.data.user));
    })
    .catch(errors => dispatch(getUserProfileFailure(errors.error)))
);

