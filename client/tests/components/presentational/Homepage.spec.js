import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import mockData from "../../__mocks__/mockData";
import Homepage from '../../../src/components/Homepage.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<Homepage>', () => {
  const store = mockStore({ signinReducer: {}, signupReducer: {} });
  const connectedHomepage = mountWrap(Homepage, store, {
    history: {
      push: () => {}
    }
  });
  it('should render the UserRecipe Component', (done) => {
    expect(toJson(connectedHomepage)).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    connectedHomepage.find('HomePage').instance().componentWillReceiveProps({
      recipeState: {
        responseType: 'GET_ALL_RECIPES_SUCCESS'
      },
    });
  });
  it('should simulate setState', (done) => {
    connectedHomepage.find('HomePage').instance().setState({
      recipes: [],
      pageCount: 1
    });
    done();
  });
});