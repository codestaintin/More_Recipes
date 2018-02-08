import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import { recipeResponseType } from '../../../src/utils/helpers';
import mockStore from '../../__mocks__/mockStore';
import mockData from '../../__mocks__/mockData';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import UserFavorite from '../../../src/components/UserFavorite.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<UserFavorite>', () => {
  const store = mockStore({});
  const connectedUserFavorite = mountWrap(UserFavorite, store, {
    match: {}
  });
  it('should render the Profile Component', (done) => {
    expect(toJson(connectedUserFavorite)).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    const { userFavorites: { favorites } } = mockData;
    connectedUserFavorite.find('UserFavorite').instance().componentWillReceiveProps({
      favoriteState: {
        responseType: recipeResponseType.GET_USER_FAVORITE_SUCCESS,
        pagination: {
          pageCount: 10
        },
        favorites
      },
    });
  });
  it('should simulate setState', (done) => {
    connectedUserFavorite.find('UserFavorite').instance().setState({
      favorites: [],
      pageCount: 1
    });
    done();
  });
});