import React from 'react';
import { Link } from 'react-router-dom';
import SignInComponent from './Auth/SignIn.jsx';
import SignUpComponent from './Auth/SignUp.jsx';
import FooterComponent from './partials/Footer.jsx';

/**
 *
 *
 * @export
 * @class AddRecipeComponent
 * @extends {React.Component}
 */
export default class AddRecipeComponent extends React.Component {
  /**
   * 
   * 
   * @returns {XML} XML/JSX
   * @memberof AddRecipeComponent
   */
  render() {
    return (
      <div>
        <SignInComponent />
        <SignUpComponent />
        <div className="wrapper">
          <ol
            className="breadcrumb container mt-50 mb-10 col-md-9 mx-auto bg-white shadow-lite">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">Recipes</Link>
            </li>
            <li className="breadcrumb-item active">Add new</li>
          </ol>
          <div className="container mb-20 col-md-9 mx-auto recipe-details-container">
            <div className="row">
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-6 p-10 shadow-lite bg-white"
                style={{
                  height: `${400}px`,
                  maxHeight: `${400}px`
                }}>
                <div
                  className="light-well center-content"
                  style={{
                    height: `${100}%`
                  }}>
                  <div className="text-center file-upload full-height full-width center-content">
                    <input
                      type="file"
                      className="recipe-upload text-hide"
                      name="recipe-upload"
                      accept="image/*" />
                  </div>
                </div>
              </div>
              <div
                className="simplebox blade col-12 col-sm-6 col-md-6 col-lg-6 p-10"
                style={{
                  boxShadow: 'none'
                }}>
                <h5>Recipe Details</h5>
                <form className="mt-15 recipe-form">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Recipe Name" />
                  </div>
                  <h6>Description</h6>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Recipe description here"></textarea>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Recipe category" />
                  </div>
                  <h6>Ingredients</h6>
                  <div className="form-group">
                    <textarea className="form-control" rows="4" placeholder="Ingredient"></textarea>
                  </div>
                  <button type="submit" className="btn btn-outline-success">Add Recipe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}
