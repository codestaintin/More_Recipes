import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import signupReducer from '../../../src/reducers/auth/signupReducer';

describe('signupReducer test', () => {
  const initialState = {
    success: false,
    errors: null,
    fails: null
  };
  it('should set success to true on SIGNUP_SUCCESSFUL', () => {
    const signupAction = {
      type: actionTypes.SIGNUP_SUCCESSFUL
    };
    const newState = signupReducer(initialState, signupAction);
    expect(newState.fails).toEqual(null);
    expect(newState.errors).toEqual(null);
    expect(newState.success).toEqual(true);
  });
  it('should set values for errors on SIGNUP_VALIDATION_ERROR', () => {
    const signupAction = {
      type: actionTypes.SIGNUP_VALIDATION_ERROR,
      payload: 'Invalid credentials'
    };
    const newState = signupReducer(initialState, signupAction);
    expect(newState.success).toEqual(false);
    expect(newState.errors).toEqual(signupAction.payload);
  });
  it('should set success to false on SIGNUP_UNSUCCESSFUL', () => {
    const signupAction = {
      type: actionTypes.SIGNUP_UNSUCCESSFUL,
      payload: 'A user with those credentials already exists'
    };
    const newState = signupReducer(initialState, signupAction);
    expect(newState.success).toEqual(false);
    expect(newState.fails).toEqual(signupAction.payload);
  });
  it('should return the initial state when no actions is passed', () => {
    const action = {
      success: false,
      errors: null,
      fails: null
    };
    const newState = signupReducer(initialState, action);
    expect(newState.success).toEqual(false);
    expect(newState.errors).toEqual(null);
    expect(newState.fails).toEqual(null);
  });
});
