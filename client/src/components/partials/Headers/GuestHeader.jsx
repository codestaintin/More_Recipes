import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @export
 * @class HeaderComponent
 * @extends {React.Component}
 */
export default class GuestHeader extends React.Component {
  /**
     *
     * @returns {XML} XML/JSX
     * @memberof HeaderComponent
     */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-navbar fixed-top">
        <Link to="/" className="navbar-brand" >MoreRecipe</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent">
          <div className="navbar-nav ml-auto btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-toggle="modal"
              data-target="#signInModal">
              Sign In
              <i className="fa fa-sign-in"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-toggle="modal"
              data-target="#signUpModal">
              Sign Up
              <i className="fa fa-user-plus"></i>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
