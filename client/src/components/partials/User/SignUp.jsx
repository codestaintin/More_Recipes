import React from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signupAction from '../../../actions/signupAction';


/**
 *
 *
 * @export
 * @class SignUpComponent
 * @extends {React.Component}
 */
export default class SignUpComponent extends React.Component {
/**
 * Creates an instance of SignUpComponent.
 * @param {any} props 
 * @memberof SignUpComponent
 */
  constructor(props) {
    super(props);
    this.state = {
      regDetails: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {}
    };
  }
  /**
 * 
 * 
 * @returns {obj} obj
 * @memberof SignUpComponent
 */
  render() {
    const { regDetails } = this.state;
    return (
      <div
        className="modal fade"
        id="signUpModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="signUpModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content simplebox blade">
            <div className="modal-header">
              <h5 className="modal-title" id="signUpModalLabel">Sign Up</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="mt-15">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    aria-describedby="fullname"
                    placeholder="Full name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="userName">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="username"
                    placeholder="Username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="email"
                    placeholder="Email"/>
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    aria-describedby="mobile"
                    placeholder="Mobile Number"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"/>
                </div>
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm"
                    placeholder="Confirm Password"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-outline-warning">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUpComponent.PropTypes = {
  signupState: PropTypes.object.isRequired,
  signupAction: PropTypes.func.isRequired
};
