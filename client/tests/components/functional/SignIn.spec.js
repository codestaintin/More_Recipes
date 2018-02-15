import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import SignIn from '../../../src/components/auth/SignIn.jsx';

configure({ adapter: new Adapter() });

describe('<SignIn>', () => {
  const store = mockStore({ signinReducer: { signInState: {} } });
  const connectedSignIn = mountWrap(SignIn, store, {});
  it('should render SignIn component', (done) => {
    expect(connectedSignIn).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    connectedSignIn.find('SignIn').instance().componentWillReceiveProps({
      signInState: {
        success: '',
      },
    });
  });
  it('should simulate handleChange', (done) => {
    connectedSignIn.find('input').at(0).simulate('change');
    done();
  });
  it('should simulate handleSubmit', (done) => {
    connectedSignIn.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    connectedSignIn.find('SignIn').instance().setState({
      loginDetails: {
        email: 'moh@gmail.com',
        password: 'somethiglight'
      }
    });
    connectedSignIn.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    done();
  });
});