import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../utils/helpers';

/**
 * @export
 * @className MainHeader
 * @extends {React.Component}
 */
export default class AuthHeader extends Component {
  /**
   *
   * @returns {XML} XML/JSX
   * @memberof MainHeader
   */
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-navbar fixed-top">
        <a className="navbar-brand" to="#">More Recipes</a>
        <button className="navbar-toggler"
          type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle"
                to="#" id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                My Account
              </Link>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link to="/profile" className="dropdown-item">
                  <i className="fa fa-user-circle"/> My Profile
                </Link>
                <Link to="/user-recipes" className="dropdown-item">
                  <i className="fa fa-list"/> My Recipes
                </Link>
                <Link to="/favorite" className="dropdown-item">
                  <i className="fa fa-star" /> My Favorites
                </Link>
                <Link to="/addRecipe" className="dropdown-item">
                  <i className="fa fa-plus" /> Add Recipes
                </Link>
                <div className="dropdown-divider" />
                <Link
                  className="dropdown-item" to="#" onClick={logout}><i className="fa fa-sign-out" />
                  Log out
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
