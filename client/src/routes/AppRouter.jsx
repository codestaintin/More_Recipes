import React from 'react';
// import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import HomePageComponent from '../components/Homepage.jsx';
import UserRecipeComponent from '../components/UserRecipe.jsx';
import RecipeDetailComponent from '../components/RecipeDetail.jsx';
import ProfileComponent from '../components/Profile.jsx';
import FavoriteComponent from '../components/Favorites.jsx';
import AddRecipeComponent from '../components/AddRecipe.jsx';
import App from '../components/App.jsx';

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <App>
          <Route path="/" exact component={HomePageComponent} />
          <Route exact path="/profile" component={ProfileComponent} />
          <Route exact path="/recipes/:recipeId" component={RecipeDetailComponent} />
          <Route exact path="/favorite" component={FavoriteComponent} />
          <Route exact path="/user-recipes" component={UserRecipeComponent} />
          <Route exact path="/addRecipe" component={AddRecipeComponent} />
        </App>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
