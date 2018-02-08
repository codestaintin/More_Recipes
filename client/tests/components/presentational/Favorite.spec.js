import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import FavoriteRecipe from '../../../src/components/recipe/FavoriteRecipe.jsx';

configure({ adapter: new Adapter() });

describe('<FavoriteRecipe>', () => {
  const store = mockStore({});
  const connectedRecipe = mountWrap(FavoriteRecipe, store, { recipe: {
    User: {
      username: 'Human'
    }
  } });
  it('should render the Recipe Component', (done) => {
    expect(toJson(connectedRecipe)).toMatchSnapshot();
    done();
  });
});
