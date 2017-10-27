import React from 'react';
import ReactDOM from 'react-dom';

/**
 *
 *
 * @export
 * @class ModalComponent
 * @extends {React.Component}
 */
export default class ModalComponent extends React.Component {
    render() {
        return (
            <div
                className="modal fade"
                id="exampleModalLong"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content simplebox blade">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Login/Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        id="home-tab"
                                        data-toggle="tab"
                                        href="#home"
                                        role="tab"
                                        aria-controls="home"
                                        aria-expanded="true">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="profile-tab"
                                        data-toggle="tab"
                                        href="#profile"
                                        role="tab"
                                        aria-controls="profile">Create Account</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <form className="mt-15">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Enter email"/>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password"/>
                                        </div>
                                        <a href="profile.html" className="btn btn-outline-warning" role="button">Submit</a>
                                    </form>
                                </div>
                            </div>

                            <div
                                className="tab-pane fade"
                                id="profile"
                                role="tabpanel"
                                aria-labelledby="profile-tab">
                                <form className="mt-15">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullname"
                                            aria-describedby="fullname"
                                            placeholder="Full name"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            aria-describedby="username"
                                            placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            aria-describedby="email"
                                            placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="mobile"
                                            aria-describedby="mobile"
                                            placeholder="Mobile Number"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirm"
                                            placeholder="Confirm Password"/>
                                    </div>
                                    <button type="submit" className="btn btn-outline-warning">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        )
    }
}