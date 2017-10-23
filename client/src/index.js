import React from 'react';
import ReactDOM from 'react-dom';
import HeaderComponent from './components/partials/Header';
import FooterComponent from './components/partials/Footer';
import './build/assets/css/recipes.scss';
import './build/assets/css/utils.scss';

ReactDOM.render(<HeaderComponent/>, document.getElementById('root'));
ReactDOM.render(<FooterComponent />, document.getElementById('root'));

