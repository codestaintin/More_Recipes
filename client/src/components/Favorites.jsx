import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './partials/Headers/Header.jsx';
import FooterComponent from './partials/Footer.jsx';
import RecipeComponent2 from './recipe/RecipeFaker.jsx';
import PaginateComponent from './partials/Paginate.jsx';

/**
 *
 *
 * @export
 * @class FavoriteComponent
 * @extends {React.Component}
 */
export default class FavoriteComponent extends Component {
  /**
     * 
     * 
     * @returns {XML} XML/JSX
     * @memberof FavoriteComponent
     */
  render() {
    return (
      <div>
        <Header/>
        <div className="wrapper">
          <div className="container">
            <nav aria-label="breadcrumb" className="mt-40 mb-10" >
              <ol className="breadcrumb bg-white">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/profile">User</Link></li>
                <li className="breadcrumb-item active" aria-current="page">My Recipes</li>
              </ol>
            </nav>
          </div>
          <div className="container mb-20 recipe-details-container">
            <div className="row">
              <RecipeComponent2/>
              <RecipeComponent2/>
              <RecipeComponent2/>
              <RecipeComponent2/>
            </div>
          </div>
          <div className="clearfix" />
          <PaginateComponent/>
        </div>
        <FooterComponent/>
      </div>
    );
  }
}