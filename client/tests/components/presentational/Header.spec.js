import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import sinon from 'sinon';
import mockStore from '../../__mocks__/mockStore';
import history from '../../../src/utils/history';
import localStorageMock from '../../__mocks__/localStorageMock';
import mockData from "../../__mocks__/mockData";
import mountWrap from '../../__mocks__/utils';
import Header from '../../../src/components/partials/Headers/Header.jsx';

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

configure({ adapter: new Adapter() });

describe('<Header>', () => {
  const store = mockStore({});
  const connectedHeader = mountWrap(Header, store, {});
  it('should render the Header component', (done) => {
    sinon.stub(history, 'push');
    expect(connectedHeader.find('button').at(0).prop('type')).toEqual('button');
    expect(toJson(connectedHeader)).toMatchSnapshot();
    connectedHeader.find('Header').find('Link').at(6).simulate('click');
    done();
  });
});
