import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mockData from '../../__mocks__/mockData';
import mountWrap from '../../__mocks__/utils';
import localStorageMock from '../../__mocks__/localStorageMock';
import Review from '../../../src/components/review/Review.jsx';

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<Review>', () => {
  const store = mockStore({ recipeReducer: { reviewState: {} } });
  const connectedReview = mountWrap(Review, store, {
    reviews: [],
    reviewState: {},
    match: {
      params: {
        recipeId: 1
      }
    }
  });
  it('should render the Review Component', (done) => {
    expect(connectedReview).toMatchSnapshot();
    done();
  });
  it('should check for componentWillReceiveProps', () => {
    connectedReview.find('Review').instance().componentWillReceiveProps({
      reviewState: {
        responseType: 'POST_REVIEW_SUCCESS',
      },
    });
  });
  it('should simulate handleChange', (done) => {
    connectedReview.find('textarea').at(0).simulate('change');
    done();
  });
  it('should simulate handleClick', (done) => {
    connectedReview.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    connectedReview.find('Review').instance().setState({
      content: 'Amazing'
    });
    connectedReview.find('form').at(0).simulate('submit', {
      preventDefault: () => {}
    });
    done();
  });
});