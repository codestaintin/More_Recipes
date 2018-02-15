import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import signinReducer from '../../../src/reducers/auth/signinReducer';

describe('signinReducer', () => {
  const initialState = {
    success: false,
    fails: null
  };
  it('should set success to true on SIGNIN_SUCCESSFUL', () => {
    const signinAction = {
      type: actionTypes.SIGNIN_SUCCESSFUL
    };
    const newState = signinReducer(initialState, signinAction);
    expect(newState.success).toEqual(true);
    expect(newState.fails).toEqual(null);
  });
  it('should set success to false on SIGNIN_UNSUCCESSFUL', () => {
    const signinAction = {
      type: actionTypes.SIGNIN_UNSUCCESSFUL,
      payload: 'Invalid login details'
    };
    const newState = signinReducer(initialState, signinAction);
    expect(newState.success).toEqual(false);
    expect(newState.fails).toEqual(signinAction.payload);
  });
  it('should set success to false on LOG_OUT_SUCCESS', () => {
    const signAction = {
      type: actionTypes.LOG_OUT_SUCCESS
    };
    const newState = signinReducer(initialState, signAction);
    expect(newState.success).toEqual(false);
  });
  it('should return the initial state when no actions is passed', () => {
    const action = {};
    const newState = signinReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});