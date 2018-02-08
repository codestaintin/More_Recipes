import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import sinon from 'sinon';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import AddRecipe from '../../../src/components/AddRecipe.jsx';
import { recipeResponseType } from '../../../src/utils/helpers';
import mockData from "../../__mocks__/mockData";

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<AddRecipe>', () => {
  const store = mockStore({ recipeReducer: { recipeState: {} } });
  const history = {
    push: () => {}
  };
  const connectedAddRecipe = mountWrap(AddRecipe, store, {
    history,
  });
  it('should render the AddRecipe Component', (done) => {
    expect(toJson(connectedAddRecipe)).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    const pushSpy = sinon.spy(history, 'push');
    connectedAddRecipe.find('AddRecipe').instance().componentWillReceiveProps({
      recipeState: {
        message: 'Recipe successfully added',
        responseType: recipeResponseType.ADD_RECIPE_SUCCESS,
        recipeId: 4,
      },
    });
    expect(pushSpy.called).toEqual(true);
  });

  it('should check for componentWillReceiveProps', () => {
    connectedAddRecipe.find('AddRecipe').instance().componentWillReceiveProps({
      recipeState: {
        message: 'Recipe successfully added',
        responseType: null,
        recipeId: 4,
      },
    });
  });

  it('should simulate handleSubmit', (done) => {
    connectedAddRecipe.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    done();
  });

  it('should simulate handleChange', (done) => {
    const { recipe } = mockData.updateRecipeResponse;
    connectedAddRecipe.find('AddRecipe').instance().setState({
      recipeDetails: { ...recipe }
    });
    connectedAddRecipe.find('form').find('input').at(0).simulate('change', {
      preventDefault: () => {},
      target: {
        name: 'name',
        value: 'Updated recipe'
      }
    });
    expect(connectedAddRecipe.find('AddRecipe').instance().state.recipeDetails.name).toEqual('Updated recipe');
    done();
  });

  it('should return true after checkValidity function call', (done) => {
    const { recipe } = mockData.updateRecipeResponse;
    connectedAddRecipe.find('AddRecipe').instance().setState({
      recipeDetails: { ...recipe }
    });
    expect(connectedAddRecipe.find('AddRecipe').instance().checkValidity()).toEqual(true);
    connectedAddRecipe.find('AddRecipe').instance().setState({
      recipeDetails: { ...recipe, name: '' }
    });
    expect(connectedAddRecipe.find('AddRecipe').instance().checkValidity()).toEqual(false);
    done();
  });
});
