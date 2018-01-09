import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * 
 * 
 * @export
 * @class UserPanelComponent
 * @extends {React.Component}
 */
export default class UserPanelComponent extends Component {
  /**
   * 
   * 
   * @returns {XML} XML/JSX
   * @memberof UserPanelComponent
   */
  render() {
    return (
      <div className="col-12 col-sm-12 col-md-3 pt-20 shadow-lite bg-white full-height">
        <div className="avatar-area">
          <div className="center-content">
            <img
              src="assets/images/no-avatar.png"
              className="avatar text-center circulate circulate-xlg"
              alt="avatar"/>
          </div>

          <form className="text-center">
            <label className="btn btn-secondary btn-sm mt-2">
              <i className="fa fa-camera" />
                  Choose photo
              <input
                type="file"
                name="file"
                className="hidden avatar-input"
                accept="image/*"/>
            </label>
          </form>
        </div>
        <div className="stat-area light-well row pt-2 shadow-lite">
          <div className="col-4 col-md-4 col-sm-4 col-lg-4 text-center">
            <h6 className="text-muted">Recipes</h6>
            <h6>
              <small>234</small>
            </h6>
          </div>
          <div className="col-4 col-md-4 col-sm-4 col-lg-4 text-center">
            <h6 className="text-muted">Favourites</h6>
            <h6>
              <small>23</small>
            </h6>
          </div>
          <div className="col-4 col-md-4 col-sm-4 col-lg-4 text-center">
            <h6 className="text-muted">Reviews</h6>
            <h6>
              <small>120</small>
            </h6>
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
