import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import ReviewList from '../../../src/components/review/ReviewList.jsx';

configure({ adapter: new Adapter() });

describe('<ReviewList>', () => {
  const store = mockStore({});
  const connectedReviewList = mountWrap(ReviewList, store, { review: {
    users: {
      username: 'Justice'
    }
  } });
  it('should render the ReviewList Component', (done) => {
    expect(toJson(connectedReviewList)).toMatchSnapshot();
    done();
  });
});
