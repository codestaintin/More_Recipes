import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import userReducer from '../../../src/reducers/auth/userReducer';
import { userResponseType } from '../../../src/utils/helpers';

describe('userReducer', () => {
  const initialState = {
    responseType: null,
    user: { }
  };
  it('should get response type of success on GET_USER_PROFILE_SUCCESS', () => {
    const userAction = {
      type: actionTypes.GET_USER_PROFILE_SUCCESS,
      responseType: userResponseType.GET_USER_PROFILE_SUCCESS
    };
    const newState = userReducer(initialState, userAction);
    expect(newState.responseType).toEqual(userResponseType.GET_USER_PROFILE_SUCCESS);
  });
  it('should get response type of failure on GET_USER_PROFILE_FAILURE', () => {
    const userAction = {
      type: actionTypes.GET_USER_PROFILE_FAILURE,
      responseType: userResponseType.FAILURE
    };
    const newState = userReducer(initialState, userAction);
    expect(newState.responseType).toEqual(userResponseType.FAILURE);
  });
  it('should return the initial state if no action is passed', () => {
    const action = {};
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});