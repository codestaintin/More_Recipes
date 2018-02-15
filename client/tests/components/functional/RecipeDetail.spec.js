import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockData from '../../__mocks__/mockData';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import RecipeDetail from '../../../src/components/RecipeDetail.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<RecipeDetail>', () => {
  const store = mockStore({ recipeReducer: { recipeState: {} } });
  const connectedRecipeDetail = mountWrap(RecipeDetail, store, {
    match: {
      params: {
        recipeId: 1
      }
    }
  });
  it('should render the RecipeDetail component', (done) => {
    expect(toJson(connectedRecipeDetail)).toMatchSnapshot();
    done();
  });
});