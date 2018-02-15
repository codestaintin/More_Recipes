import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import Recipe from '../../../src/components/recipe/Recipe.jsx';

configure({ adapter: new Adapter() });

describe('<Recipe>', () => {
  const store = mockStore({});
  const connectedRecipe = mountWrap(Recipe, store, { recipe: {} });
  it('should render the Recipe Component', (done) => {
    expect(toJson(connectedRecipe)).toMatchSnapshot();
    done();
  });
});
