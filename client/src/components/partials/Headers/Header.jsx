import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAction } from '../../../actions/auth/signinAction';

/**
 * @export
 * 
 * @class HeaderComponent
 * 
 * @extends {React.Component}
 */
class Header extends Component {
  /**
 * Creates an instance of Header.
 * 
 * @param {any} props 
 * 
 * @memberof Header
 */
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }
  /**
     *
     * @returns {XML} XML/JSX
     * 
     * @memberof HeaderComponent
     */
  logoutUser() {
    this.props.logoutAction();
  }
  /**
   *
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof HeaderComponent
   */
  render() {
    return (
      <div>
        { (window.localStorage.token) ?
          <nav 
            className="navbar navbar-expand-sm
          navbar-light bg-navbar
          fixed-top">
            <Link to="/" className="navbar-brand" id="home">
              More Recipes
            </Link>
            <button className="navbar-toggler"
              type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse"
              id="navbarSupportedContent">
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
                  <div className="dropdown-menu dropdown-menu-right mr-20"
                    aria-labelledby="navbarDropdown">
                    <Link to="/profile" className="dropdown-item">
                      <i className="fa fa-user-circle"/> My Profile
                    </Link>
                    <Link to="/user-recipes" className="dropdown-item">
                      <i className="fa fa-list"/> My Recipes
                    </Link>
                    <Link to="/my-favorite" className="dropdown-item">
                      <i className="fa fa-star" /> My Favorites
                    </Link>
                    <Link to="/addRecipe" className="dropdown-item">
                      <i className="fa fa-plus" /> Add Recipes
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="#"
                      className="dropdown-item"
                      onClick={this.logoutUser}>
                      <i className="fa fa-sign-out" />
                    Log out
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          :
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
              <div className="navbar-nav ml-auto btn-group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#signInModal"
                  id="signin">
                Sign In
                  <i className="fa fa-sign-in" />
                </button>&nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#signUpModal"
                  id="signup">
                Sign Up
                  <i className="fa fa-user-plus" />
                </button>
              </div>
            </div>
          </nav>
        }
      </div>
    );
  }
}

Header.propTypes = {
  logoutAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signInState: state.signinReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);