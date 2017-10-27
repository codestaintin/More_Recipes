import React from 'react';
import ReactDOM from 'react-dom';
import HeaderComponent from './partials/Header';
import FooterComponent from './partials/Footer';

/**
 *
 *
 * @export
 * @class RecipeDetailComponent
 * @extends {React.Component}
 */
export default class RecipeDetailComponent extends React.Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                <div className="container">
                    <div className="row">
                        <ol className="breadcrumb mt-50 mb-10 col-md-10 mx-auto bg-white shadow-lite">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">African Dishes</a>
                            </li>
                            <li className="breadcrumb-item active">Jollof rice and chicken nuggets</li>
                        </ol>
                    </div>
                </div>

                <div className="mb-20 col-md-9 mx-auto bg-white recipe-details-container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 p-10">
                            <div
                                className="recipe-big-img"
                                style={{
                                objectFit: 'contain'
                            }}></div>
                            <div className="mt-20">
                                <div className="text-left mb-10">
                                    <span className="badge badge-info">
                                        <i className="fa fa-eye"></i>
                                        1000</span>
                                    <span className="badge badge-success">
                                        <i className="fa fa-thumbs-o-up"></i>
                                        223</span>
                                    <span className="badge badge-danger">
                                        <i className="fa fa-thumbs-o-down"></i>
                                        23
                                    </span>
                                </div>
                                <p>
                                    <button className="btn btn-outline-warning btn-sm fav-btn hvr-icon-pop">Favourite</button>
                                    <button className="btn btn-outline-success btn-sm">
                                        <i className="fa fa-thumbs-o-up"></i>
                                        Upvote</button>
                                    <button className="btn btn-outline-danger btn-sm">
                                        <i className="fa fa-thumbs-o-down"></i>
                                        Downvote</button>
                                </p>
                            </div>
                        </div>
                        <div
                            className="simplebox blade col-sm-6 col-md-6 col-lg-6 p-10"
                            style={{
                            boxShadow: 'none'
                        }}>
                            <div className="recipe-name light-well p-15">
                                <h3 className="bold text-muted">Jollof rice and chicken nuggets</h3>
                                <p>
                                    <span className="badge badge-pill badge-secondary">
                                        <i className="fa fa-tags"></i>
                                        African Dishes</span>
                                </p>
                                <p>
                                    <small>
                                        <i className="fa fa-clock-o"></i>
                                        Uploaded 2hours ago</small>
                                </p>
                                <p>
                                    <small>
                                        <a href="add-recipe.html">
                                            Edit</a>
                                    </small>
                                    <small>/
                                        <a href="#">
                                            Delete</a>
                                    </small>
                                </p>
                            </div>
                            <div className="mt-10">
                                <h5>Ingredients</h5>
                                <ul className="text-muted">
                                    <li>4 cups of rice</li>
                                    <li>A bowl of fresh chicken</li>
                                    <li>Coconut oil</li>
                                    <li>45g of water</li>
                                    <li>Pepper and seasoning</li>
                                    <li>A wooden spoon to stir</li>
                                </ul>
                                <div>
                                    <hr/></div>
                                <h5>Description</h5>
                                <div>
                                    It is a long established fact that a reader will be distracted by the readable
                                    content of a page when looking at its layout. The point of using Lorem Ipsum is
                                    that it has a more-or-less normal distribution of letters, as opposed to using
                                    'Content here, content here', making it look like readable English. Many desktop
                                    publishing packages and web page editors now use Lorem Ipsum as their default
                                    model text, and a search for 'lorem ipsum' will uncover many web sites still in
                                    their infancy
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-20 mb-20 mx-auto">
                    <h5 className="p-5 text-center">Reviews</h5>
                    <div className="row justify-content-center">
                        <div className="card mb-10 col-lg-10 p-0">
                            <div className="card-header">
                                Mohammed Isioye
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                                            erat a ante.</small>
                                    </p>
                                    <footer className="blockquote-footer">Posted
                                        <cite title="Source Title">4 days ago</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                        <div className="card mb-10 col-lg-10 p-0">
                            <div className="card-header">
                                Mohammed Isioye
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                                            erat a ante.</small>
                                    </p>
                                    <footer className="blockquote-footer">Posted
                                        <cite title="Source Title">5 mins ago</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}