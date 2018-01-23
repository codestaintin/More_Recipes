import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllRecipes } from '../actions/recipe/recipeActions';
import SignInComponent from './auth/SignIn.jsx';
import SignUpComponent from './auth/SignUp.jsx';
import FooterComponent from './partials/Footer.jsx';
import Header from './partials/Headers/Header.jsx';
import SearchComponent from './partials/Search.jsx';
import StickyComponent from './partials/Sticky.jsx';
import RecipeComponent from './recipe/Recipe.jsx';
import { recipeResponseType } from './../utils/helpers';

/**
 *
 *
 * @class HomePage
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
    };
  }
  /**
   *
   *
   * @returns {XML} XML/JSX
   * @memberof HomePage
   */
  componentWillMount() {
    this.props.getAllRecipes();
  }
  /**
   *
   * @param  {object} nextProps
   * @returns {XML} XML/JSX
   * @memberof HomePage
   */
  componentWillReceiveProps(nextProps) {
    const { responseType, recipes } = nextProps.recipeState;
    if (responseType === recipeResponseType.GET_ALL_RECIPES_SUCCESS) {
      this.setState({
        recipes
      });
    }
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
        <SignUpComponent/>
        <SearchComponent/>
        <StickyComponent/>
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
