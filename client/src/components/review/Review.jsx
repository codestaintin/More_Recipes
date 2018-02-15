import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import classnames from 'classnames';
import swal from 'sweetalert2';
import { bindActionCreators } from 'redux';
import ReviewList from './ReviewList.jsx';
import { postReview } from '../../actions/recipe/recipeActions';
import reviewValidate from "../../utils/reviewValidate";
import { recipeResponseType, decodeToken } from '../../utils/helpers';

/**
 *
 * @export
 * 
 * @class Review
 * 
 * @extends {React.Component}
 */
export class Review extends Component {
  /**
   * Creates an instance of ReviewComponent.
   * 
   * @param {any} props
   * 
   * @memberof AddReview
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   *
   * @param  {object} nextProps
   * 
   * @memberof RecipeDetail
   * 
   * @returns {XML} XML/JSX
   * 
   */
  componentWillReceiveProps(nextProps) {
    const { responseType } = nextProps.reviewState;
    if (responseType === recipeResponseType.POST_REVIEW_SUCCESS) {
      const reviewInfo = {
        content: this.state.content,
        createdAt: new Date(),
        users: {
          username: decodeToken(localStorage.token).username
        }
      };
      this.props.reviews.unshift(reviewInfo);
      this.setState({ content: '' });
      swal({
        position: 'top-end',
        title: 'Awesome !',
        text: 'Your review was successfully posted !',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  /**
   * Handle change
   *
   * @param {event} event
   * 
   * @return {event} event
   * 
   */
  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  /**
   * Handles review creation
   * 
   * @param { object } event
   * 
   * @method handleSubmit
   * 
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.checkValidity()) {
      this.setState({ errors: {} });
      const { recipeId } = this.props.match.params;
      this.props.postReview(recipeId, this.state.content);
    }
  }

  /** Check validity
   * 
   * @method checkValidity
   * 
   * @return {object} isValid
   */
  checkValidity() {
    const { errors, isValid } = reviewValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   *
   * @memberof AddReview
   * 
   * @returns {XML} XML/JSX
   * 
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <h5 className="text-muted">
              <label htmlFor="review" className="row justify-content-center">
                Please post a review
              </label>
            </h5>
            <textarea className ={
              classnames('form-control',
                {
                  'is-invalid': errors.content ? !!errors.content : false
                })
            }
            rows="3"
            onChange={this.handleChange}
            value={this.state.content}
            placeholder="Kindly enter your review"
            />
            { errors.content ?
              <span className="invalid-feedback">{ errors.content }
              </span> : null
            }
          </div>
          <button type="submit"
            className="btn btn-primary mb-2">
            Submit Review
          </button>
        </form>

        <h5 className="p-5 text-center">Reviews</h5>
        { this.props.reviews.map((review, i) => (
          <ReviewList
            key={i}
            review = {review}/>
        )) }
      </div>
    );
  }
}
Review.propTypes = {
  reviewState: PropTypes.object.isRequired,
  postReview: PropTypes.func.isRequired,
  reviews: PropTypes.array,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  reviewState: state.recipeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ postReview }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Review);