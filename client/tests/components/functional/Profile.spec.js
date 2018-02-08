import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import mockData from "../../__mocks__/mockData";
import localStorageMock from '../../__mocks__/localStorageMock';
import Profile from '../../../src/components/Profile.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<Profile>', () => {
  const store = mockStore({});
  const connectedProfile = mountWrap(Profile, store, {
    match: {}
  });
  it('should render the Profile Component', (done) => {
    expect(toJson(connectedProfile)).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    connectedProfile.find('Profile').instance().componentWillReceiveProps({
      getUserState: {
        responseType: 'GET_USER_PROFILE_SUCCESS',
      },
    });
  });
});