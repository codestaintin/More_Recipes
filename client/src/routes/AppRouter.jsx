import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import HomePageComponent from '../components/Homepage.jsx';
import UserRecipeComponent from '../components/UserRecipe.jsx';
import RecipeDetailComponent from '../components/RecipeDetail.jsx';
import ProfileComponent from '../components/Profile.jsx';
import UserFavoriteComponent from '../components/UserFavorite.jsx';
import FavoritesComponent from '../components/Favorite.jsx';
import AddRecipeComponent from '../components/AddRecipe.jsx';
import EditRecipeComponent from '../components/EditRecipe.jsx';
import NotFound from '../components/NotFound.jsx';
import PrivateRoute from "./PrivateRoute.jsx";

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={HomePageComponent} />
        <PrivateRoute exact path="/profile" component={ProfileComponent} />
        <PrivateRoute exact path="/my-favorite" component={UserFavoriteComponent} />
        <PrivateRoute exact path="/favorites" component={FavoritesComponent}/>
        <PrivateRoute exact path="/user-recipes" component={UserRecipeComponent} />
        <PrivateRoute exact path="/addRecipe" component={AddRecipeComponent} />
        <PrivateRoute exact path="/recipes/:recipeId" component={RecipeDetailComponent} />
        <PrivateRoute exact path="/recipes/:recipeId/edit" component={EditRecipeComponent} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
