import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import ReactPaginate from 'react-paginate';
import { getAllFavorites } from '../actions/recipe/recipeActions';
import Header from './partials/Headers/Header.jsx';
import FooterComponent from './partials/Footer.jsx';
import FavoriteRecipe from './recipe/FavoriteRecipe.jsx';
import { recipeResponseType } from './../utils/helpers';


/**
 *
 * @class Favorite
 *
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
      favorites: [],
      pageCount: 0,
      page: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @returns {XML} XML/JSX
   *
   * @memberof Favorite
   */
  componentWillMount() {
    this.props.getAllFavorites(this.state.page);
  }
  /**
   *
   * @param  {object} nextProps
   *
   * @returns {XML} XML/JSX
   *
   * @memberof Favorite
   */
  componentWillReceiveProps(nextProps) {
    const { responseType, favorites, pagination } = nextProps.favoriteState;
    if (responseType === recipeResponseType.GET_ALL_FAVORITES_SUCCESS) {
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
    this.props.getAllFavorites(currentPage);
  }
  /**
   *
   * @returns {XML} XML/JSX
   *
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
                <li className="breadcrumb-item active" aria-current="page">
                Most Favourited</li>
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
          />
        </div>
        <FooterComponent/>
      </div>
    );
  }
}

Favorite.propTypes = {
  getAllFavorites: PropTypes.func.isRequired,
  favoriteState: PropTypes.object
};

const mapStateToProps = state => ({
  favoriteState: state.recipeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllFavorites }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);