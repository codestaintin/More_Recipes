import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

/**
 *
 *
 * @export
 * @class RecipeComponent
 * @extends {React.Component}
 */
export default class RecipeComponent extends React.Component {
  render() {
    return (
      <div className="col-sm-10 col-md-4 col-lg-3">
        <Link to="/recipe">
          <div className="col-md-12 recipe hvr-float-shadow">
            <div className="recipe-img" />
            <div className="recipe-meta pt-5">
              <h6 className="recipe-name">Rice and Tilapia</h6>
              <h6>
                <small>
                  <i className="fa fa-tags" />
                                    African Dishes</small>
              </h6>
              <h6 className="text-muted">
                <small>
                  <i className="fa fa-user" />
                                    By Mohammed Isioye</small>
              </h6>
            </div>
            <div className="recipe-met2">
              <hr className="m-1"/>
              <p className="text-left">
                <small>
                  <span>
                    <i className="fa fa-eye text-muted" />
                                        23</span>
                                    &nbsp;
                  <span>
                    <i className="fa fa-thumbs-o-up text-muted" />
                                        4011</span>
                </small>
              </p>
            </div>
          </div>
        </Link>

      </div>
    );
  }
}