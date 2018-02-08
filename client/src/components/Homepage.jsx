import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import { getAllRecipes } from '../actions/recipe/recipeActions';
import SignInComponent from './auth/SignIn.jsx';
import SignUpComponent from './auth/SignUp.jsx';
import FooterComponent from './partials/Footer.jsx';
import Header from './partials/Headers/Header.jsx';
import SearchComponent from './partials/SearchComponent.jsx';
import StickyComponent from './partials/Sticky.jsx';
import RecipeComponent from './recipe/Recipe.jsx';
import { recipeResponseType } from './../utils/helpers';

/**
 *
 * @class HomePage
 * 
 * @extends {React.Component}
 */
export class HomePage extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      pageCount: 0,
      page: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof HomePage
   */
  componentWillMount() {
    this.props.getAllRecipes(this.state.page);
  }
  /**
   *
   * @param  {object} nextProps
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof HomePage
   */
  componentWillReceiveProps(nextProps) {
    const { responseType, recipes, pagination } = nextProps.recipeState;
    if (responseType === recipeResponseType.GET_ALL_RECIPES_SUCCESS ||
      responseType === recipeResponseType.SEARCH_RECIPE_SUCCESS) {
      this.setState({
        recipes,
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
    this.props.getAllRecipes(currentPage);
  }
  /**
   * 
   * 
   * @returns {XML} XML/JSX
   * @memberof HomePage
   */
  render() {
    const { recipes } = this.state;
    return (
      <div>
        <Header/>
        <SignInComponent/>
        <SignUpComponent history={this.props.history} />
        <SearchComponent/>
        <StickyComponent getAll={this.handlePageChange}/>
        <div className="clearfix mb-20" />
        <div className="container" style={{ paddingTop: '50px' }}>
          <div className="row">
            {
              recipes.map((recipe, index) => (
                <RecipeComponent
                  key={index}
                  recipe={recipe}
                />
              ))
            }
          </div>
        </div>
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
        <FooterComponent/>
      </div>
    );
  }
}

HomePage.propTypes = {
  getAllRecipes: PropTypes.func,
  recipeState: PropTypes.object
};

const mapStateToProps = state => ({
  recipeState: state.recipeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllRecipes }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
