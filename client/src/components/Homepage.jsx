import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBoardComponent from './partials/Recipe/RecipeBoard';
import SignInComponent from './partials/User/SignIn';
import SignUpComponent from './partials/User/SignUp';
import HeaderComponent from './partials/Header';
import FooterComponent from './partials/Footer';

/**
 *
 *
 * @class HomePageComponent
 * @extends {React.Component}
 */
export default class HomePageComponent extends React.Component {
  render() {
    return (
      <div>
        <HeaderComponent/>
        <SignInComponent/>
        <SignUpComponent/>
        <div className="container-fluid banner pt-90">
          <div className="row">
            <div className="col-lg-12 text-white">
              <h2 className="text-center">More Recipe</h2>
              <p
                className="lead text-center"
                style={{
                opacity: 0.9
              }}>
                Amazing food recipes at your beck</p>

              <div id="custom-search-input center-content">
                <div className="input-group col-md-6 mx-auto">
                  <input
                    type="text"
                    className="search-query form-control form-control-lg"
                    placeholder="Search recipe"/>
                  <span className="input-group-btn">
                    <button className="btn btn-outline-warning btn-lg" type="button">
                      <span className="fa fa-search"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="container" id="sticky-anchor">
          <div className="row">
            <div className="col-lg-12">
              <ul
                className="nav justify-content-center light-well shadow-lite sticky"
                id="sticky">
                <li className="nav-item">
                  <a className="nav-link active text-black" href="#">
                    <i className="fa fa-list"></i>
                    All</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-black" href="#">
                    <i className="fa fa-star text-warning"></i>
                    Most Favourited</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <RecipeBoardComponent/>
        <FooterComponent/>
      </div>
    );
  }
}
