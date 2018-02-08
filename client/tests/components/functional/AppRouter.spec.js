import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorageMock from '../../__mocks__/localStorageMock';
import AppRouter from '../../../src/routes/AppRouter.jsx';
import PrivateRoute from '../../../src/routes/PrivateRoute.jsx';
import mockData from "../../__mocks__/mockData";

configure({ adapter: new Adapter() });

// noinspection JSAnnotator
window.localStorage = localStorageMock;
window.localStorage.token = mockData.token;

describe('<AppRouter>', () => {
  it('should render AppRouter', () => {
    const wrapRouter = shallow(<AppRouter />);
    expect(wrapRouter).toMatchSnapshot();
  });
  it('should render PrivateRoute', () => {
    const wrapRouter = shallow(<PrivateRoute />);
  });
});
