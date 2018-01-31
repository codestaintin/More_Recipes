import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import { getUserFavorites } from '../actions/recipe/recipeActions';
import { decodeToken, recipeResponseType } from '../utils/helpers';
import Header from './partials/Headers/Header.jsx';
import FooterComponent from './partials/Footer.jsx';
import FavoriteRecipe from './recipe/FavoriteRecipe.jsx';
import PaginateComponent from './partials/Paginate.jsx';

/**
 *
 *
 * @export
 * @class Favorite
 * @extends {React.Component}
 */
class Favorite extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }
  /**
   *
   *
   * @returns {XML} XML/JSX
   * @memberof Favorite
   */
  componentWillMount() {
    const { token } = window.localStorage;
    const { id } = decodeToken(token);
    this.props.getUserFavorites(id);
  }
  /**
   *
   * @param  {object} nextProps
   * @returns {XML} XML/JSX
   * @memberof HomePage
   */
  componentWillReceiveProps(nextProps) {
    const { responseType, favorites } = nextProps.favoriteState;
    if (responseType === recipeResponseType.GET_USER_FAVORITE_SUCCESS) {
      this.setState({
        favorites
      });
    }
  }
  /**
     * 
     * 
     * @returns {XML} XML/JSX
     * @memberof Favorite
     */
  render() {
    const { favorites } = this.state;
    return (
      <div>
        <Header/>
        <div className="wrapper">
          <div className="container">
            <nav aria-label="breadcrumb" className="mt-40 mb-10" >
              <ol className="breadcrumb bg-white">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/profile">User</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                My Favorites
                </li>
              </ol>
            </nav>
          </div>
          <div className="container mb-20 recipe-details-container">
            <div className="row">
              {
                favorites.map((favorite, index) => (
                  <FavoriteRecipe
                    key={index}
                    recipe={favorite.Recipe}
                  />
                ))
              }
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

Favorite.propTypes = {
  getUserFavorites: PropTypes.func.isRequired,
  favoriteState: PropTypes.object
};

const mapStateToProps = state => ({
  favoriteState: state.recipeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserFavorites }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);