import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import App from '../../../src/components/App.jsx';
import mockData from "../../__mocks__/mockData";

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<App>', () => {
  const store = mockStore({});
  const connectedHomepage = mountWrap(App, store, {
    children: []
  });
  it('should render the UserRecipe Component', (done) => {
    expect(toJson(connectedHomepage)).toMatchSnapshot();
    done();
  });
});