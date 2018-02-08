import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mockData from '../../__mocks__/mockData';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import UserRecipe from '../../../src/components/UserRecipe.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<UserRecipe>', () => {
  const { userRecipeResponse: { recipes } } = mockData;
  const store = mockStore({ recipeReducer: { getUserRecipesSuccess: [...recipes] } });
  const connectedUserRecipe = mountWrap(UserRecipe, store, {
    match: {},
  });
  it('should render the UserRecipe Component', (done) => {
    expect(toJson(connectedUserRecipe)).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    connectedUserRecipe.find('UserRecipe').instance().componentWillReceiveProps({
      userRecipes: {
        pagination: {
          pageCount: 1
        },
        recipes
      },
    });
  });
  it('should simulate setState', (done) => {
    connectedUserRecipe.find('UserRecipe').instance().setState({
      pageCount: 1
    });
    done();
  });
});