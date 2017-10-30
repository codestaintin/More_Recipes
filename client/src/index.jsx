import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './routes/AppRouter.jsx';

import './build/assets/css/recipes.scss';
import './build/assets/css/utils.scss';

ReactDOM.render(
  <Provider store={store}><AppRouter/></Provider>, document.getElementById('root'));
