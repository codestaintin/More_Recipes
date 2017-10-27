import React from 'react';
import ReactDOM from 'react-dom';
import HomePageComponent from './components/Homepage';
import UserRecipeComponent from './components/UserRecipe';
import RecipeDetailComponent from './components/RecipeDetail';
import ProfileComponent from './components/Profile';
import FavoriteComponent from './components/Favorites';
import AddRecipeComponent from './components/AddRecipe';
import './build/assets/css/recipes.scss';
import './build/assets/css/utils.scss';

// ReactDOM.render(<HomePageComponent/>, document.getElementById('root'));
ReactDOM.render(<RecipeDetailComponent/>, document.getElementById('root'));