import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const reduxLogger = [];
if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    reduxLogger.push(window.devToolsExtension());
  }
}

const store = createStore(reducers, {}, compose(applyMiddleware(thunk), ...reduxLogger));

export default store;
