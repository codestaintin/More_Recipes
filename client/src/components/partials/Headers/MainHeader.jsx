import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../utils/helpers';

/**
 * @export
 * @class MainHeader
 * @extends {React.Component}
 */
export default class MainHeader extends React.Component {
  /**
   *
   * @returns {XML} XML/JSX
   * @memberof MainHeader
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
              onClick={logout}>
              Log out <i className="fa fa-sign-out"></i>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
