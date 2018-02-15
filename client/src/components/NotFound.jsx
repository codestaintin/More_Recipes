import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterComponent from './partials/Footer.jsx';
import NotFoundImage from '../build/assets/images/NFound.gif';

/**
 *
 *
 * @class NotFound
 * @extends {React.Component}
 */
export default class NotFound extends Component {
  /**
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof NotFound
   */
  render() {
    return (
      <div>
        <nav
          className="navbar
            navbar-expand-lg navbar-light bg-navbar fixed-top">
          <Link to="/" className="navbar-brand" >MoreRecipe</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent">
          </div>
        </nav>
        <div className="clearfix mb-20" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="/">
                <h2 className="text-center">Go Home</h2>
                <img src={NotFoundImage} style={{ display: 'block', margin: '50px auto' }} alt="Check"/>
              </Link>
            </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
    );
  }
}
