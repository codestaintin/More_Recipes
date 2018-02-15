import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import ReactPaginate from 'react-paginate';
import Header from './partials/Headers/Header.jsx';
import FooterComponent from './partials/Footer.jsx';
import RecipeComponent from './recipe/Recipe.jsx';
import emptyLogo from '../build/assets/images/Empty.png';
import { getUserRecipes } from '../actions/recipe/recipeActions';
import { decodeToken } from '../utils/helpers';

/**
 *
 * @class UserRecipe
 * 
 * @extends {React.Component}
 */
class UserRecipe extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      page: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof UserRecipe
   */
  componentDidMount() {
    const { id } = decodeToken(window.localStorage.token);
    this.props.getUserRecipes(id, this.state.page);
  }
  /**
   * @param  {object} nextProps
   *
   * @returns {XML} XML/JSX
   *
   * @memberof UserRecipes
   */
  componentWillReceiveProps(nextProps) {
    const {
      userRecipes: {
        pagination: {
          pageCount
        }
      }
    } = nextProps;
    this.setState({
      pageCount
    });
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
    this.props.getUserRecipes(id, currentPage);
  }


  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof UserRecipe
   */
  render() {
    const { getUserRecipesSuccess } = this.props.userRecipes;
    const userRecipes = getUserRecipesSuccess;
    const decodedToken = decodeToken(window.localStorage.token);
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
                My Recipes</li>
              </ol>
            </nav>
          </div>
          <div className="container mb-20 recipe-details-container">
            <div className="row">
              {
                userRecipes.length > 0 ?
                  userRecipes.map((recipe, index) => (
                    <RecipeComponent
                      key={index}
                      recipe={recipe}
                      decodedToken={decodedToken}
                    />
                  ))
                  : <div className="col col-md-12 text-center">
                    <h1 className="text-info">You have no recipes yet!</h1>
                    <img src={emptyLogo} alt="No Recipe"/>
                  </div>
              }
            </div>
          </div>
          <div className="clearfix" />
          {
            userRecipes.length > 0 ?
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
              : null
          }

        </div>
        <FooterComponent/>
      </div>
    );
  }
}

UserRecipe.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  userRecipes: PropTypes.object
};

const mapStateToProps = state => ({
  userRecipes: state.recipeReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserRecipes }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipe);