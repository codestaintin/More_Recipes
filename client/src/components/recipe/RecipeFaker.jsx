import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';

/**
 * recipe
 * @param props
 * @constructor
 */
const RecipeComponent2 = props => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3 align-self-center hvr-float-shadow">
    <div className="col-md-12 recipe">
      <div className="recipe-img" style={{
        backgroundImage: `url(${'http://via.placeholder.com/250x200'})`
      }} />
      <div className="recipe-meta pt-5">
        <h6 className="recipe-name">Suya</h6>
        <h6>
          <small>
            <i className="fa fa-tags" /> African Dishes</small>
        </h6>
        <h6 className="text-muted">
          <small>
            <i className="fa fa-user" /> Mohd</small>
        </h6>
      </div>
      <div className="recipe-met2">
        <hr className="m-1" />
        <p className="text-left">
          <small>
            <span>
              <i className="fa fa-eye text-muted" /> 2334</span> &nbsp;
            <span><i className="fa fa-thumbs-o-up text-muted" /> 211</span>
          </small>
        </p>
      </div>
    </div>
  </div>
);
export default RecipeComponent2;
