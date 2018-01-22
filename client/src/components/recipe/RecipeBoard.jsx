import React from 'react';
import { Link } from 'react-router-dom';
import RecipeComponent from './Recipe.jsx';

export default class RecipeBoardComponent extends React.Component {
  render() {
    return (
      <div className="container mt-60">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-4 col-lg-3">
            <Link to="/recipe">
              <RecipeComponent/>
            </Link>
          </div>

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

          <div className="col-sm-10 col-md-4 col-lg-3">
            <Link to="/recipe">
              <div className="col-md-12 recipe hvr-float-shadow">
                <div className="recipe-img2 " />
                <div className="recipe-meta pt-5">
                  <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
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
                                                2334</span>
                                            &nbsp;
                      <span>
                        <i className="fa fa-thumbs-o-up text-muted" />
                                                211</span>
                    </small>
                  </p>
                </div>
              </div>
            </Link>
          </div>

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

          <div className="col-sm-10 col-md-4 col-lg-3">
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
          </div>

          <div className="col-sm-10 col-md-4 col-lg-3">
            <div className="col-md-12 recipe hvr-float-shadow">
              <div className="recipe-img2" />
              <div className="recipe-meta pt-5">
                <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
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
                                            2334</span>
                                        &nbsp;
                    <span>
                      <i className="fa fa-thumbs-o-up text-muted" />
                                            211</span>
                  </small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-md-4 col-lg-3">
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
          </div>

          <div className="col-sm-10 col-md-4 col-lg-3">
            <div className="col-md-12 recipe hvr-float-shadow">
              <div className="recipe-img2" />
              <div className="recipe-meta pt-5">
                <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
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
                                            2334</span>
                                        &nbsp;
                    <span>
                      <i className="fa fa-thumbs-o-up text-muted" />
                                            211</span>
                  </small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-md-4 col-lg-3">
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
          </div>

          <div className="col-sm-10 col-md-4 col-lg-3">
            <div className="col-md-12 recipe hvr-float-shadow">
              <div className="recipe-img2" />
              <div className="recipe-meta pt-5">
                <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
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
                                            2334</span>
                                        &nbsp;
                    <span>
                      <i className="fa fa-thumbs-o-up text-muted" />
                                            211</span>
                  </small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-md-4 col-lg-3">
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
          </div>

          <div className="col-sm-10 col-md-4 col-lg-3">
            <div className="col-md-12 recipe hvr-float-shadow">
              <div className="recipe-img2" />
              <div className="recipe-meta pt-5">
                <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
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
                                            2334</span>
                                        &nbsp;
                    <span>
                      <i className="fa fa-thumbs-o-up text-muted" />
                                            211</span>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
