import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import mockStore from '../../__mocks__/mockStore';
import mountWrap from '../../__mocks__/utils';
import SearchComponent from '../../../src/components/partials/SearchComponent.jsx';

configure({ adapter: new Adapter() });

describe('<SearchComponent>', () => {
  const store = mockStore({});
  const connectedSearch = mountWrap(SearchComponent, store, {});
  it('should render the SearchComponent', (done) => {
    connectedSearch.find('input').at(0).simulate('change', {
      target: {
        value: 'Something'
      }
    });
    expect(connectedSearch.find('SearchComponent').instance().state.searchParams).toEqual('Something');
    expect(toJson(connectedSearch)).toMatchSnapshot();
    done();
  });
  it('should simulate handleSearch Method', (done) => {
    connectedSearch.find('button').at(0).simulate('click');
    done();
  });
});
