import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import Favorite from '../../../src/components/Favorite.jsx';
import localStorageMock from '../../__mocks__/localStorageMock';
import mockData from "../../__mocks__/mockData";
import { recipeResponseType } from '../../../src/utils/helpers';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<Favorite>', () => {
  const store = mockStore({});
  const connectedFavorite = mountWrap(Favorite, store, {});

  it('should render Favorite component', (done) => {
    expect(connectedFavorite).toMatchSnapshot();
    done();
  });

  it('should check for componentWillReceiveProps', () => {
    connectedFavorite.find('Favorite').instance().componentWillReceiveProps({
      favoriteState: {
        responseType: recipeResponseType.GET_ALL_FAVORITES_SUCCESS,
        favorites: [],
        pagination: 1
      },
    });
  });
});