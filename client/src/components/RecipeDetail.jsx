import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { bindActionCreators } from 'redux';
import {
  getRecipe,
  deleteRecipe,
  getReview
} from '../actions/recipe/recipeActions';
import { decodeToken } from '../utils/helpers';
import history from '../utils/history';
import Review from './review/Review.jsx';
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
    this.handleDelete = this.handleDelete.bind(this);
  }
  /**
   *
   *
   * @returns {XML} XML/JSX
   * @memberof RecipeDetail
   */
  componentWillMount() {
    const { recipeId } = this.props.match.params;
    this.props.getRecipe(recipeId);
    this.props.getReview(recipeId);
  }
  /**
   *
   * @param  {object} nextProps
   * @returns {XML} XML/JSX
   * @memberof RecipeDetail
   */
  componentWillReceiveProps(nextProps) {
    const { recipeDetailState } = nextProps;
    if (recipeDetailState && recipeDetailState.id) {
      this.setState({ recipe: nextProps.recipeDetailState });
    }
  }
  /**
   * Handles recipe deletion
   * @method handleDelete
   * @return {void}
     */
  handleDelete() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2475a6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'recipe Deletion successful',
          'success'
        );
        this.props.deleteRecipe(this.props.match.params.recipeId);
        history.push('/user-recipes');
      }
    });
  }

  /**
   *Renders RecipeDetail component
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
      image = (imageUrl !== '') ? imageUrl : process.env.DEFAULT_IMAGE,
      ingredientList = ingredient.split(',').map((Ingredient, index) => (
        <li key={index}>{Ingredient}</li>
      ));
    const { userId } = this.state.recipe;
    const decodedId = decodeToken(window.localStorage.token).id;
    return (
      <div>
        <Header/>
        <div className="container">
          <div className="row">
            <ol
              className=
                "breadcrumb mt-50 mb-10 col-md-11 mx-auto bg-white shadow-lite"
            >
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

        <div className=
          "mb-20 col-md-9 mx-auto bg-white recipe-details-container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6 p-10">
              <img className="recipe-big-img" src={image} alt="Recipe Image"/>
              <div className="mt-20">
                <div className="text-left mb-10">
                  <span className="badge badge-info">
                    <i className="fa fa-eye fa-2x"/>&nbsp; {views}
                  </span>&nbsp;&nbsp;
                  <span className="badge badge-success">
                    <i className="fa fa-thumbs-o-up fa-2x"/>
                    &nbsp;  223</span>&nbsp;&nbsp;
                  <span className="badge badge-danger">
                    <i className="fa fa-thumbs-o-down fa-2x"/>
                    &nbsp; 23
                  </span>
                </div>
                <p>
                  <button className=
                    "btn btn-outline-warning btn-sm fav-btn hvr-icon-pop">
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
                {
                  (userId === decodedId) ?
                    <div>
                      <Link to={`/recipes/${id}/edit`}>
                        <button className="btn btn-success">
                          <i className="fa fa-edit" /> Edit</button>
                      </Link> { '\u00A0' }
                      <button className="btn btn-danger"
                        onClick={this.handleDelete} >
                        <i className="fa fa-trash"/>
                        Delete
                      </button>
                    </div>
                    : null
                }
              </div>
              <div className="mt-10">
                <h5>Ingredients</h5>
                <ul className="text-muted">
                  {ingredientList}
                </ul>
                <div>
                  <hr /></div>
                <h5>Procedure</h5>
                <div>
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-20 mb-20 mx-auto">
          <Review
            match={this.props.match}
            reviews={this.props.reviews}
          />
        </div>
        <FooterComponent />
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  getReview: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  reviews: PropTypes.array,
  recipeDetailState: PropTypes.object,
  recipeDelete: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipeDetailState: state.recipeReducer.recipe,
  recipeDelete: state.recipeReducer,
  reviews: state.recipeReducer.review
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRecipe, deleteRecipe, getReview }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
