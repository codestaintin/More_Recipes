import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import Sticky from '../../../src/components/partials/Sticky.jsx';

configure({ adapter: new Adapter() });

describe('<Sticky>', () => {
  const store = mockStore({});
  const connectedSticky = mountWrap(Sticky, store, { getAll: () => {} });
  it('should render the Sticky', (done) => {
    connectedSticky.find('button').at(0).simulate('click');
    expect(toJson(connectedSticky)).toMatchSnapshot();
    done();
  });
});

