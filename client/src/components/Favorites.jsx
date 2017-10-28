import React from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from './partials/Header';
import SignInComponent from './partials/User/SignIn';
import SignUpComponent from './partials/User/SignUp';
import FooterComponent from './partials/Footer';
import UserPanelComponent from './partials/UserPanel';
import PaginateComponent from './partials/Paginate'

/**
 *
 *
 * @export
 * @class FavoriteComponent
 * @extends {React.Component}
 */
export default class FavoriteComponent extends React.Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                <SignInComponent/>
                <SignUpComponent/>
                <div className="wrapper">
                    <ol
                        class="breadcrumb container mt-50 mb-10 col-md-9 mx-auto bg-white shadow-lite">
                        <li class="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#">User</a>
                        </li>
                        <li class="breadcrumb-item active">My Favourites</li>
                    </ol>
                    <div className="container mb-20 col-md-9 mx-auto recipe-details-container">
                        <div className="row">
                            <UserPanelComponent/>
                            <div
                                className="simplebox blade col-12 col-sm-8 col-md-8 col-lg-8 p-10 row"
                                style={{
                                boxShadow: 'none'
                            }}>
                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="col-md-12 recipe">
                                        <div
                                            className="recipe-img"
                                            style={{
                                            backgroundImage: `url(${ 'assets/images/dish.jpg'})`
                                        }}></div>
                                        <div className="recipe-meta pt-5">
                                            <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
                                            <h6>
                                                <small>
                                                    <i className="fa fa-tags"></i>
                                                    African Dishes</small>
                                            </h6>
                                            <h6 className="text-muted">
                                                <small>
                                                    <i className="fa fa-user"></i>
                                                    By Mohammed Isioye</small>
                                            </h6>
                                        </div>
                                        <div className="recipe-met2">
                                            <hr className="m-1"/>
                                            <p className="text-left">
                                                <small>
                                                    <span>
                                                        <i className="fa fa-eye text-muted"></i>
                                                        2334</span>
                                                    &nbsp;
                                                    <span>
                                                        <i className="fa fa-thumbs-o-up text-muted"></i>
                                                        211</span>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="col-md-12 recipe">
                                        <div
                                            className="recipe-img"
                                            style={{
                                            backgroundImage: `url(${ 'assets/images/dish2.jpg'})`
                                        }}></div>
                                        <div className="recipe-meta pt-5">
                                            <h6 className="recipe-name">Rice and Tilapia</h6>
                                            <h6>
                                                <small>
                                                    <i className="fa fa-tags"></i>
                                                    African Dishes</small>
                                            </h6>
                                            <h6 className="text-muted">
                                                <small>
                                                    <i className="fa fa-user"></i>
                                                    By Mohammed Isioye</small>
                                            </h6>
                                        </div>
                                        <div className="recipe-met2">
                                            <hr className="m-1"/>
                                            <p className="text-left">
                                                <small>
                                                    <span>
                                                        <i className="fa fa-eye text-muted"></i>
                                                        23</span>
                                                    &nbsp;
                                                    <span>
                                                        <i className="fa fa-thumbs-o-up text-muted"></i>
                                                        4011</span>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="col-md-12 recipe">
                                        <div
                                            className="recipe-img"
                                            style={{
                                            backgroundImage: `url(${ 'assets/images/dish.jpg'})`
                                        }}></div>
                                        <div className="recipe-meta pt-5">
                                            <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
                                            <h6>
                                                <small>
                                                    <i className="fa fa-tags"></i>
                                                    African Dishes</small>
                                            </h6>
                                            <h6 className="text-muted">
                                                <small>
                                                    <i className="fa fa-user"></i>
                                                    By Mohammed Isioye</small>
                                            </h6>
                                        </div>
                                        <div className="recipe-met2">
                                            <hr className="m-1"/>
                                            <p className="text-left">
                                                <small>
                                                    <span>
                                                        <i className="fa fa-eye text-muted"></i>
                                                        2334</span>
                                                    &nbsp;
                                                    <span>
                                                        <i className="fa fa-thumbs-o-up text-muted"></i>
                                                        211</span>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="col-md-12 recipe">
                                        <div
                                            className="recipe-img"
                                            style={{
                                            backgroundImage: `url(${ 'assets/images/dish2.jpg'})`
                                        }}></div>
                                        <div className="recipe-meta pt-5">
                                            <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
                                            <h6>
                                                <small>
                                                    <i className="fa fa-tags"></i>
                                                    African Dishes</small>
                                            </h6>
                                            <h6 className="text-muted">
                                                <small>
                                                    <i className="fa fa-user"></i>
                                                    By Mohammed Isioye</small>
                                            </h6>
                                        </div>
                                        <div className="recipe-met2">
                                            <hr className="m-1"/>
                                            <p className="text-left">
                                                <small>
                                                    <span>
                                                        <i className="fa fa-eye text-muted"></i>
                                                        2334</span>
                                                    &nbsp;
                                                    <span>
                                                        <i className="fa fa-thumbs-o-up text-muted"></i>
                                                        211</span>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="col-md-12 recipe">
                                        <div
                                            className="recipe-img"
                                            style={{
                                            backgroundImage: `url(${ 'assets/images/dish.jpg'})`
                                        }}></div>
                                        <div className="recipe-meta pt-5">
                                            <h6 className="recipe-name">Rice and Tilapia</h6>
                                            <h6>
                                                <small>
                                                    <i className="fa fa-tags"></i>
                                                    African Dishes</small>
                                            </h6>
                                            <h6 className="text-muted">
                                                <small>
                                                    <i className="fa fa-user"></i>
                                                    By Mohammed Isioye</small>
                                            </h6>
                                        </div>
                                        <div className="recipe-met2">
                                            <hr className="m-1"/>
                                            <p className="text-left">
                                                <small>
                                                    <span>
                                                        <i className="fa fa-eye text-muted"></i>
                                                        23</span>
                                                    &nbsp;
                                                    <span>
                                                        <i className="fa fa-thumbs-o-up text-muted"></i>
                                                        4011</span>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="col-md-12 recipe">

                                        <div
                                            className="recipe-img"
                                            style={{
                                            backgroundImage: `url(${ 'assets/images/dish2.jpg'})`
                                        }}></div>
                                        <div className="recipe-meta pt-5">
                                            <h6 className="recipe-name">Rice/Chicken Nuggets</h6>
                                            <h6>
                                                <small>
                                                    <i className="fa fa-tags"></i>
                                                    African Dishes</small>
                                            </h6>
                                            <h6 className="text-muted">
                                                <small>
                                                    <i className="fa fa-user"></i>
                                                    By Mohammed Isioye</small>
                                            </h6>
                                        </div>
                                        <div className="recipe-met2">
                                            <hr className="m-1"/>
                                            <p className="text-left">
                                                <small>
                                                    <span>
                                                        <i className="fa fa-eye text-muted"></i>
                                                        2334</span>
                                                    &nbsp;
                                                    <span>
                                                        <i className="fa fa-thumbs-o-up text-muted"></i>
                                                        211</span>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <PaginateComponent/>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}