import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import mockData from "../../__mocks__/mockData";
import SignUp from '../../../src/components/auth/SignUp.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<SignUp>', () => {
  const store = mockStore({ signupReducer: { signUpState: {} } });
  const connectedSignUp = mountWrap(SignUp, store, { history: { push() {} } });

  it('should render SignUp component', (done) => {
    expect(connectedSignUp).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    connectedSignUp.find('SignUp').instance().componentWillReceiveProps({
      signUpState: {
        success: '',
      },
    });
  });
  it('should simulate handleChange', (done) => {
    connectedSignUp.find('input').at(0).simulate('change');
    done();
  });
  it('should simulate handleSubmit', (done) => {
    connectedSignUp.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    connectedSignUp.find('SignUp').instance().setState({
      regDetails: {
        firstName: 'Chibueze',
        lastName: 'Ayogu',
        username: 'Chebo',
        email: 'chebo@gmail.com',
        password: 'anything',
        confirmPassword: 'anything'
      }
    });
    connectedSignUp.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    done();
  });
});
