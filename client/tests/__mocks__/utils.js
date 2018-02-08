import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

export const mountWrap = (Component, store, props) => mount(
  <Provider store={store}>
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  </Provider>
);

export const shallowWrap = (Component, store, props) => shallow(
  <Provider store={store}>
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  </Provider>
);

export default mountWrap;