import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from '../__mocks__/mockData';
import localStorage from '../__mocks__/localStorageMock';
import signupAction from '../../src/actions/auth/signupAction';
import actionType from '../../src/actions/actionTypes';
import { signInAction } from '../../src/actions/auth/signinAction';
import getUser from '../../src/actions/auth/getUser';

const {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL,
  SIGNIN_SUCCESSFUL,
  SIGNIN_UNSUCCESSFUL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE
} = actionType;

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// noinspection JSAnnotator
window.localStorage = localStorage;

describe('Authentication actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should sign up a user when SIGNUP_SUCCESSFUL is dispatched', (done) => {
    const { userDetails, signUpResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: signUpResponse
      });
    });
    const expectedActions = [{
      type: SIGNUP_SUCCESSFUL
    },
    {
      type: SIGNIN_SUCCESSFUL
    }];
    const store = mockStore({});
    store.dispatch(signupAction(userDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it('should dispatch SIGNUP_UNSUCCESSFUL when an error occurs', (done) => {
    const { signUpFailureData, signUpFailResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: signUpFailResponse
      });
    });
    const expectedActions = [{
      type: SIGNUP_UNSUCCESSFUL,
      payload: 'Registration Failed'
    }];
    const store = mockStore({});
    store.dispatch(signupAction(signUpFailureData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('signs in a user when SIGNIN_SUCCESSFUL is dispatched', (done) => {
    const { loginDetails, signinResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: signinResponse
      });
    });
    const expectedActions = [{
      type: SIGNIN_SUCCESSFUL
    }];
    const store = mockStore({});
    store.dispatch(signInAction(loginDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch SIGNIN_UNSUCCESSFUL when an error occurs during sign in', (done) => {
    const { signInFailureData, signInFailResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: signInFailResponse
      });
    });
    const expectedActions = [{
      type: SIGNIN_UNSUCCESSFUL,
      payload: "Invalid Credentials"
    }];
    const store = mockStore({});
    store.dispatch(signInAction(signInFailureData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_USER_PROFILE_SUCCESS', (done) => {
    const { getUserResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getUserResponse
      });
    });
    const expectedActions = [{
      type: GET_USER_PROFILE_SUCCESS,
      data: getUserResponse.user
    }];
    const store = mockStore({});
    store.dispatch(getUser(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should dispatch GET_USER_PROFILE_FAILURE', (done) => {
    const { getUserResponse } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: getUserResponse
      });
    });
    const expectedActions = [{
      type: GET_USER_PROFILE_FAILURE,
      errors: getUserResponse.error
    }];
    const store = mockStore({});
    store.dispatch(getUser(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});