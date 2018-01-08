import React from 'react';
import PropTypes from 'react-proptypes';

/**
 * Recipe
 * @param { props } props
 * @returns { object } object
 */
const RecipeComponent = props => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3 align-self-center hvr-float-shadow">
    <div className="col-md-12 recipe">
      <div className="recipe-img" style={{
        backgroundImage: `url(${props.recipe.imageUrl})`
      }} />
      <div className="recipe-meta pt-5">
        <h6 className="recipe-name">{props.recipe.name}</h6>
        <h6>
          <small>
            <i className="fa fa-tags" /> African Dishes</small>
        </h6>
        <h6 className="text-muted">
          <small>
            <i className="fa fa-user" /> {props.decodedToken.username}</small>
        </h6>
      </div>
      <div className="recipe-met2">
        <hr className="m-1" />
        <p className="text-left">
          <small>
            <span>
              <i className="fa fa-eye text-muted" /> 2334</span> &nbsp;
            {
              (props.recipe.userId === props.decodedToken.id) ?
                <span><i className="fa fa-thumbs-o-up text-muted" /> 211</span>
                : null
            }
          </small>
        </p>
      </div>
    </div>
  </div>
);

RecipeComponent.propTypes = {
  recipe: PropTypes.object.isRequired,
  decodedToken: PropTypes.object.isRequired,
};

export default RecipeComponent;
