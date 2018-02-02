import React from 'react';
import PropTypes from 'react-proptypes';
import moment from 'moment';

/**
 * Review
 * @param { object } props
 * @returns { object } object
 */
const ReviewList = props => (
  <div>
    <div className="row justify-content-center">
      <div className="card mb-10 col-lg-11 p-0">
        <div className="card-header">
          {props.review.users.username.toUpperCase()}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
              <small>{props.review.content}</small>
            </p>
            <footer className="blockquote-footer">Posted &nbsp;
              <cite title="Source Title"> 
                {moment.utc(new Date(props.review.createdAt)).fromNow()}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
);

ReviewList.propTypes = {
  review: PropTypes.shape().isRequired,
};

export default ReviewList;