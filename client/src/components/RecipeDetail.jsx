import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import {
  getRecipe,
  deleteRecipe,
  getReview,
  createFavourite,
  upvoteRecipe,
  downvoteRecipe
} from '../actions/recipe/recipeActions';
import { decodeToken, recipeResponseType } from '../utils/helpers';
import history from '../utils/history';
import ReviewList from './review/Review.jsx';
import FooterComponent from './partials/Footer.jsx';
import Header from './partials/Headers/Header.jsx';


/**
 *
 * @class RecipeDetailComponent
 * 
 * @extends {React.Component}
 */
class RecipeDetail extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        id: '',
        name: '',
        imageUrl: '',
        ingredient: '',
        upvotes: '',
        downvotes: '',
        description: '',
        views: ''
      },
      reviews: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.createFavourite = this.createFavourite.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }
  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof RecipeDetail
   */
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    this.props.getRecipe(recipeId);
    this.props.getReview(recipeId);
  }
  /**
   *
   * @param  {object} nextProps
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof RecipeDetail
   */
  componentWillReceiveProps(nextProps) {
    const { recipeState } = nextProps;
    const { recipe, reviews } = recipeState;
    if (recipe && recipe.id) {
      this.setState({ recipe });
    }
    if (reviews.length > 0) {
      this.setState({ reviews });
    }

    if (recipeState.responseType === recipeResponseType.CREATE_UPVOTE_SUCCESSFUL) {
      this.setState({
        recipe:
        {
          ...this.state.recipe,
          upvotes: recipeState.upvotes,
          downvotes: recipeState.downvotes
        }
      });
    }
    if (recipeState.responseType === recipeResponseType.CREATE_DOWNVOTE_SUCCESSFUL) {
      this.setState({
        recipe:
        {
          ...this.state.recipe,
          downvotes: recipeState.downvotes,
          upvotes: recipeState.upvotes,
        }
      });
    }
  }
  /**
   * Handles recipe deletion
   * 
   * @method handleDelete
   * 
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
          'Recipe Deletion successful',
          'success'
        );
        this.props.deleteRecipe(this.props.match.params.recipeId);
        history.push('/user-recipes');
      }
    });
  }

  /**
   * Handles favourite creation
   * 
   * @method createFavourites
   * 
   * @return {void}
   */
  createFavourite() {
    const { recipeId } = this.props.match.params;
    this.props.createFavourite(recipeId);
    swal({
      position: 'top-end',
      title: 'Yummy !',
      text: 'This is recipe is now your favorite !',
      type: 'success',
      showConfirmButton: false,
      timer: 1000
    });
  }

  /**
   * Upvote a recipe
   * 
   * @method upvote
   * 
   * @return {void}
   */
  upvote() {
    const { recipeId } = this.props.match.params;
    this.props.upvoteRecipe(recipeId);
  }

  /**
   * Downvote a recipe
   * 
   * @method downvote
   * 
   * @return {void}
   */
  downvote() {
    const { recipeId } = this.props.match.params;
    this.props.downvoteRecipe(recipeId);
  }

  /**
   *Renders RecipeDetail component

   * @returns {XML} XML/JSX
   * 
   * @memberof RecipeDetail
   */
  render() {
    const {
        id,
        name,
        imageUrl,
        ingredient,
        description,
        views,
        upvotes,
        downvotes,
        createdAt
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
        <div className="container-fluid">
          <ol
            className=
              "breadcrumb mt-50 mb-10 col-md-11 mx-auto bg-white shadow-lite"
          >
            <li className="breadcrumb-item">
              <Link to="/">Recipe</Link>
            </li>
            <li className="breadcrumb-item active">{ name }</li>
          </ol>
        </div>

        <div className=
          "mb-20 col-md-11 mx-auto bg-white recipe-details-container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6 p-10">
              <img className="recipe-big-img" src={image} alt="Recipe Image"/>
              <div className="mt-20">
                <div className="text-left mb-10">
                  <span className="badge badge-info">
                    <i className="fa fa-eye fa-2x"/>&nbsp; {views}
                  </span>&nbsp;&nbsp;
                  <span className="badge badge-success btn btn-success btn-sm"
                    onClick={this.upvote}>
                    <i className="fa fa-thumbs-o-up fa-2x"/>
                    &nbsp;  {upvotes}</span>&nbsp;&nbsp;
                  <span className="badge badge-danger btn btn-danger btn-sm"
                    onClick={this.downvote}>
                    <i className="fa fa-thumbs-o-down fa-2x"/>
                    &nbsp; {downvotes}
                  </span> &nbsp;
                  <span
                    className="badge
                    badge-warning btn-sm btn btn-warning text-white fav-btn"
                    onClick={this.createFavourite}>
                    Favourite
                    <i className="fa fa-star-o fa-2x"/>
                  </span>
                </div>
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
                  <small>
                    <i className="fa fa-clock-o" /> &nbsp;
                    Created {moment.utc(new Date(createdAt)).fromNow()}
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
          <ReviewList
            match={this.props.match}
            reviews={this.state.reviews}
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
  recipeState: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  createFavourite: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipeState: state.recipeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRecipe,
    deleteRecipe,
    getReview,
    createFavourite,
    upvoteRecipe,
    downvoteRecipe }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
