import React from 'react';
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
          <Route path="/profile" component={ProfileComponent} />
          <Route path="/recipe" component={RecipeDetailComponent} />
          <Route path="/favorite" component={FavoriteComponent} />
          <Route path="/user" component={UserRecipeComponent} />
          <Route path="/addRecipe" component={AddRecipeComponent} />
        </App>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
