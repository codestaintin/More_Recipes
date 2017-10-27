import React from 'react';
import ReactDOM from 'react-dom';

/**
 *
 *
 * @export
 * @class SignInComponent
 * @extends {React.Component}
 */
export default class SignInComponent extends React.Component {
    render() {
        return (
            <div
                className="modal fade"
                id="signInModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="signInModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content simplebox blade">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signInModalLabel">Sign In</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <a href="profile.html" className="btn btn-outline-warning" role="button">Submit</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}