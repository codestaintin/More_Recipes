import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'react-proptypes';

/**
 * Recipe Card
 * 
 * @param { object } props
 * 
 * @returns { object } object
 */
const Recipe = (props) => {
  const image = (props.recipe.imageUrl !== '') ? props.recipe.imageUrl 
    : process.env.DEFAULT_IMAGE;
  return (
    <div className="col-12 
    col-sm-6 col-md-4 col-lg-3 align-self-center hvr-float-shadow">
      <div className="col-md-12 recipe">
        <div className="recipe-img" style={{
          backgroundImage: `url(${image})`
        }} />
        <div className="recipe-meta pt-5">
          <Link to={`/recipes/${props.recipe.id}/`}>
            <h6 className="recipe-name">{props.recipe.name}</h6>
          </Link>
          <h5 className="text-muted">
            <small>
              <i className="fa fa-user" /> {props.recipe.User ? 
                props.recipe.User.username : ''}
            </small>
          </h5>
        </div>
        <div className="recipe-met2">
          <hr className="m-1" />
          <p className="text-left">
            <small>
              <span>
                <i className="fa fa-eye text-muted" /> {props.recipe.views}
              </span> &nbsp;
              <span>
                <i className="fa fa-thumbs-o-up text-muted" /> 
                {props.recipe.upvotes}
              </span> &nbsp;
              <span>
                <i className="fa fa-thumbs-o-down text-muted" /> 
                {props.recipe.downvotes}
              </span>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default Recipe;
