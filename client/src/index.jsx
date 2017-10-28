import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePageComponent from './components/Homepage';
import UserRecipeComponent from './components/UserRecipe';
import RecipeDetailComponent from './components/RecipeDetail';
import ProfileComponent from './components/Profile';
import FavoriteComponent from './components/Favorites';
import AddRecipeComponent from './components/AddRecipe';
import './build/assets/css/recipes.scss';
import './build/assets/css/utils.scss';

// ReactDOM.render(<HomePageComponent/>, document.getElementById('root'));
// ReactDOM.render(<RecipeDetailComponent/>, document.getElementById('root'));
const App = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={HomePageComponent}></Route>
            <Route path="/profile" component={ProfileComponent}></Route>
            <Route path="/recipe" component={RecipeDetailComponent}></Route>
            <Route path="/favorite" component={FavoriteComponent}></Route>
            <Route path="/user" component={UserRecipeComponent}></Route>
            <Route path="/addRecipe" component={AddRecipeComponent}></Route>
        </Switch>
    </Router>
);

ReactDOM.render(
    <App/>, document.getElementById('root'));
