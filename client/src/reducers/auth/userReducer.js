import actionTypes from '../../actions/actionTypes';
import { userResponseType } from '../../utils/helpers';

const intialState = {
  responseType: null,
  user: { }
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        responseType: userResponseType.GET_USER_PROFILE_SUCCESS,
        user: action.data
      };
    case actionTypes.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        responseType: userResponseType.FAILURE
      };
    default:
      return state;
  }
};

export default userReducer;
