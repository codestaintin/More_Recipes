import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import HomePageComponent from '../components/Homepage.jsx';
import UserRecipeComponent from '../components/UserRecipe.jsx';
import RecipeDetailComponent from '../components/RecipeDetail.jsx';
import ProfileComponent from '../components/Profile.jsx';
import FavoriteComponent from '../components/Favorites.jsx';
import AddRecipeComponent from '../components/AddRecipe.jsx';
import EditRecipeComponent from '../components/EditRecipe.jsx';
import NotFound from '../components/NotFound.jsx';
import App from '../components/App.jsx';

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={HomePageComponent} />
        <Route exact path="/profile" component={ProfileComponent} />
        <Route exact path="/favorite" component={FavoriteComponent} />
        <Route exact path="/user-recipes" component={UserRecipeComponent} />
        <Route exact path="/addRecipe" component={AddRecipeComponent} />
        <Route exact path="/recipes/:recipeId" component={RecipeDetailComponent} />
        <Route exact path="/recipes/:recipeId/edit" component={EditRecipeComponent} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
