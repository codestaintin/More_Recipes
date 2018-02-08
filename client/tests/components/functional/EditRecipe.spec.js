import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import sinon from 'sinon';
import mockData from '../../__mocks__/mockData';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import { recipeResponseType } from '../../../src/utils/helpers';
import localStorageMock from '../../__mocks__/localStorageMock';
import EditRecipe from '../../../src/components/EditRecipe.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<EditRecipe>', () => {
  const history = {
    push: () => {}
  };
  const store = mockStore({ recipeReducer: { recipeState: {} } });
  const connectedEditRecipe = mountWrap(EditRecipe, store, {
    history,
    match: {
      params: {
        recipeId: 1
      }
    },
  });
  it('should render the AddRecipe Component', (done) => {
    expect(toJson(connectedEditRecipe)).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    const pushSpy = sinon.spy(history, 'push');
    const { recipe } = mockData.updateRecipeResponse;
    connectedEditRecipe.find('EditRecipe').instance().componentWillReceiveProps({
      recipeState: {
        message: 'Recipe updated successfully',
        responseType: recipeResponseType.EDIT_RECIPE_SUCCESS,
        recipe,
      },
    });
    expect(pushSpy.called).toEqual(true);
  });

  it('should check for componentWillReceiveProps on no responseType', () => {
    const { recipe } = mockData.updateRecipeResponse;
    connectedEditRecipe.find('EditRecipe').instance().componentWillReceiveProps({
      recipeState: {
        message: 'Recipe updated successfully',
        responseType: null,
        recipe,
      },
    });
  });

  it('should simulate handleSubmit', (done) => {
    connectedEditRecipe.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    connectedEditRecipe.find('EditRecipe').instance().setState({
      recipeDetails: { recipe: '' }
    });
    done();
  });

  it('should return true after checkValidity function call', (done) => {
    const { recipe } = mockData.updateRecipeResponse;
    connectedEditRecipe.find('EditRecipe').instance().setState({
      recipeDetails: { ...recipe }
    });
    expect(connectedEditRecipe.find('EditRecipe').instance().checkValidity()).toEqual(true);
    connectedEditRecipe.find('EditRecipe').instance().setState({
      recipeDetails: { ...recipe, name: '' }
    });
    expect(connectedEditRecipe.find('EditRecipe').instance().checkValidity()).toEqual(false);
    done();
  });

  it('should simulate handleChange', (done) => {
    const { recipe } = mockData.updateRecipeResponse;
    connectedEditRecipe.find('EditRecipe').instance().setState({
      recipeDetails: { ...recipe }
    });
    connectedEditRecipe.find('form').find('input').at(0).simulate('change', {
      preventDefault: () => {},
      target: {
        name: 'name',
        value: 'recipe name changed'
      }
    });
    expect(connectedEditRecipe.find('EditRecipe').instance().state.recipeDetails.name).toEqual('recipe name changed');
    done();
  });

  it('should simulate handleChange', (done) => {
    connectedEditRecipe.find('input').at(0).simulate('change');
    done();
  });
});
