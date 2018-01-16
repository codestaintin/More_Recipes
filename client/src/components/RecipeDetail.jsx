import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecipe } from '../actions/recipe/recipeActions';
import FooterComponent from './partials/Footer.jsx';
import Header from './partials/Headers/Header.jsx';


/**
 *
 * @export
 * @class RecipeDetailComponent
 * @extends {React.Component}
 */
class RecipeDetail extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        id: '',
        name: '',
        imageUrl: '',
        ingredient: '',
        description: '',
        views: ''
      }
    };
  }
  /**
   *
   *
   * @returns {XML} XML/JSX
   * @memberof RecipeDetail
   */
  componentWillMount() {
    this.props.getRecipe(this.props.match.params.recipeId);
  }
  /**
   *
   * @param  {object} nextProps
   * @returns {XML} XML/JSX
   * @memberof RecipeDetail
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ recipe: nextProps.recipeDetailState });
  }
  /**
   *
   * @returns {XML} XML/JSX
   * @memberof RecipeDetailComponent
   */
  render() {
    const {
        id,
        name,
        imageUrl,
        ingredient,
        description,
        views
      } = this.state.recipe,
      ingredientList = ingredient.split(',').map((Ingredient, index) => (
        <li key={index}>{Ingredient}</li>
      ));
    return (
      <div>
        <Header/>
        <div className="container">
          <div className="row">
            <ol className="breadcrumb mt-50 mb-10 col-md-11 mx-auto bg-white shadow-lite">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">African Dishes</Link>
              </li>
              <li className="breadcrumb-item active">{ name }</li>
            </ol>
          </div>
        </div>

        <div className="mb-20 col-md-9 mx-auto bg-white recipe-details-container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6 p-10">
              <img className="recipe-big-img" src={imageUrl} alt="Recipe Image"/>
              <div className="mt-20">
                <div className="text-left mb-10">
                  <span className="badge badge-info"><i className="fa fa-eye fa-2x"/>&nbsp; {views}
                  </span>&nbsp;&nbsp;
                  <span className="badge badge-success"><i className="fa fa-thumbs-o-up fa-2x"/>
                    &nbsp;  223</span>&nbsp;&nbsp;
                  <span className="badge badge-danger"><i className="fa fa-thumbs-o-down fa-2x"/>
                    &nbsp; 23
                  </span>
                </div>
                <p>
                  <button className="btn btn-outline-warning btn-sm fav-btn hvr-icon-pop">
                    Favourite
                  </button>&nbsp; &nbsp;
                  <button className="btn btn-outline-success btn-sm">
                    <i className="fa fa-thumbs-o-up" />
                    Upvote
                  </button>&nbsp; &nbsp;
                  <button className="btn btn-outline-danger btn-sm">
                    <i className="fa fa-thumbs-o-down" />
                    Downvote
                  </button>
                </p>
              </div>
            </div>
            <div
              className="simplebox blade col-sm-6 col-md-6 col-lg-6 p-10"
              style={{
                boxShadow: 'none'
              }}>
              <div className="recipe-name light-well p-15">
                <h3 className="bold text-muted">{name}</h3>
                <p>
                  <span className="badge badge-pill badge-secondary">
                    <i className="fa fa-tags" />
                    African Dishes</span>
                </p>
                <p>
                  <small>
                    <i className="fa fa-clock-o" />
                    Uploaded 2hours ago
                  </small>
                </p>
                <Link to={`/recipes/${id}/edit`}><button className="btn btn-success">
                  <i className="fa fa-edit" /> Edit</button>
                </Link>&nbsp;&nbsp;
                <button className="btn btn-danger"> <i className="fa fa-trash"></i> Delete</button>
              </div>
              <div className="mt-10">
                <h5>Ingredients</h5>
                <ul className="text-muted">
                  {ingredientList}
                </ul>
                <div>
                  <hr /></div>
                <h5>Description</h5>
                <div>
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-20 mb-20 mx-auto">
          <h5 className="p-5 text-center">Reviews</h5>
          <div className="row justify-content-center">
            <div className="card mb-10 col-lg-11 p-0">
              <div className="card-header">
                Mohammed Isioye
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                      erat a ante.
                    </small>
                  </p>
                  <footer className="blockquote-footer">Posted
                    <cite title="Source Title"> 4 days ago</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="card mb-10 col-lg-11 p-0">
              <div className="card-header">
                Mohammed Isioye
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                      erat a ante.
                    </small>
                  </p>
                  <footer className="blockquote-footer">Posted
                    <cite title="Source Title"> 5 mins ago</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  recipeDetailState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipeDetailState: state.recipeReducer.recipe
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRecipe }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
