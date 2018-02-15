import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import ReactPaginate from 'react-paginate';
import { getUserFavorites } from '../actions/recipe/recipeActions';
import { decodeToken, recipeResponseType } from '../utils/helpers';
import Header from './partials/Headers/Header.jsx';
import emptyLogo from '../../src/build/assets/images/Empty.png';
import FooterComponent from './partials/Footer.jsx';
import FavoriteRecipe from './recipe/FavoriteRecipe.jsx';

/**
 *
 * @class UserFavorite
 * 
 * @extends {React.Component}
 */
class UserFavorite extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      pageCount: 0,
      page: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @returns {XML} XML/JSX
   * 
   * @memberof UserFavorite
   */
  componentWillMount() {
    const { id } = decodeToken(window.localStorage.token);
    const { page } = this.state;
    this.props.getUserFavorites(id, page);
  }
  /**
   * @param  {object} nextProps
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof UserFavorites
   */
  componentWillReceiveProps(nextProps) {
    const { responseType, favorites, pagination } = nextProps.favoriteState;
    if (responseType === recipeResponseType.GET_USER_FAVORITE_SUCCESS) {
      this.setState({
        favorites,
        pageCount: pagination.pageCount || 0
      });
    }
  }
  /**
   * Handles page change
   *
   * @method handlePageChange
   *
   * @param {event} page
   *
   * @return {void}
   */
  handlePageChange(page) {
    const currentPage = page.selected + 1;
    const { id } = decodeToken(window.localStorage.token);
    this.props.getUserFavorites(id, currentPage);
  }
  /**
     * 
     * @returns {XML} XML/JSX
     * 
     * @memberof UserFavorite
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
                <li className="breadcrumb-item"><Link to="/profile">
                User</Link></li>
                <li className="breadcrumb-item active" aria-current="page">
                My Favorites</li>
              </ol>
            </nav>
          </div>
          <div className="container mb-20 recipe-details-container">
            <div className="row">
              {
                favorites && favorites.length > 0 ?
                  favorites.map((favorite, index) => (
                    <FavoriteRecipe
                      key={index}
                      recipe={favorite.Recipe}
                    />
                  ))
                  :
                  <div className="col col-md-12 text-center">
                    <h1 className="text-info">You have no favorites recipes yet!</h1>
                    <img src={emptyLogo} alt="No Recipe"/>
                  </div>
              }
            </div>
          </div>
          <div className="clearfix" />
          {
            favorites && favorites.length > 0 ?
              <ReactPaginate
                pageCount={this.state.pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={this.handlePageChange}
                containerClassName="pagination justify-content-center"
                subContainerClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="page-item active"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
              /> : null
          }
        </div>
        <FooterComponent/>
      </div>
    );
  }
}

UserFavorite.propTypes = {
  getUserFavorites: PropTypes.func.isRequired,
  favoriteState: PropTypes.object
};

const mapStateToProps = state => ({
  favoriteState: state.recipeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserFavorites }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserFavorite);