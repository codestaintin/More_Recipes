import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
import swal from 'sweetalert2';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { LocalStorage } from './__mocks__/localStorageMock';

configure({ adapter: new Adapter() });

process.env.NODE_ENV = 'test';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.mockStore = mockStore;
global.$ = $;
global.jQuery = $;
global.swal = swal;
global.navigator = {
  userAgent: 'node.js'
};

const documentRef = document;
