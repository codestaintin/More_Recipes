import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signUpAction from '../../actions/auth/signupAction';
import history from '../../utils/history';
import registerValidate from '../../utils/registerValidate';


/**
 *
 * @export
 * 
 * @class SignUpComponent
 * 
 * @extends {React.Component}
 */
export class SignUp extends Component {
/**
 * Creates an instance of SignUpComponent.
 * 
 * @param {any} props 
 * 
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
  * 
  * @memberof SignUpComponent
  * 
  * @returns {void} void
 */
  componentWillMount() {
    if (window.localStorage.token) {
      this.props.history.push('/');
    }
  }

  /**
   * componentWillReceiveProps
   * 
   * @param {object }nextProps
   * 
   * @return {object} object
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.signUpState.success === true) {
      $('.close').click();
    }
  }

  /**
   * Check Validity
   *
   * @param {event} event
   * 
   * @return {event} event
   * 
   */
  checkValidity() {
    const { errors, isValid } = registerValidate(this.state.regDetails);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
  * Handle submit
  * 
  * @param {event} event
  * 
  * @return {event} event
  * 
  */
  handleSubmit(event) {
    event.preventDefault();
    if (this.checkValidity()) {
      this.setState({ errors: {} });
      this.props.signUpAction(this.state.regDetails);
      this.setState({
        regDetails: {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      });
    }
  }
  /**
  * Handle change
  * 
  * @param {event} event
  * 
  * @return {event} event
  * 
  */
  handleChange(event) {
    const regDetails = this.state.regDetails;
    regDetails[event.target.name] = event.target.value;
    this.setState({ regDetails });
  }
  /**
  * Renders signUp component
  * 
  * @returns {XML} XML/JSX
  */
  render() {
    const { regDetails, errors } = this.state;
    const { signUpState } = this.props;

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
              <button type="button" className="close" data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form className="mt-15" onSubmit={this.handleSubmit}>
              { signUpState.fails ?
                <div id="error"
                  className="alert alert-danger alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert"
                    aria-label="Close">
                    <span aria-hidden="true">x</span>
                  </button>
                  { signUpState.fails }
                </div> : null
              }
              <div className="modal-body">
                <small className="form-text text-muted">
                  All input fields marked 
                  <span className="text-danger">*</span> are required
                </small>
                <div className="form-group">
                  <label htmlFor="firstName">First Name 
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={
                      classnames('form-control',
                        { 'is-invalid': errors.firstName ? !!errors.firstName
                          : false }
                      )
                    }
                    name="firstName"
                    aria-describedby="firstName"
                    placeholder="First name"
                    onChange={this.handleChange}
                    value={regDetails.firstName}
                  />
                  { errors.firstName ?
                    <span className="invalid-feedback">{ errors.firstName }
                    </span> : null
                  }
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={
                      classnames('form-control',
                        { 'is-invalid': errors.lastName ? !!errors.lastName
                          : false }
                      )
                    }
                    name="lastName"
                    aria-describedby="lastName"
                    placeholder="Last name"
                    onChange={this.handleChange}
                    value={regDetails.lastName}
                  />
                  { errors.lastName ?
                    <span className="invalid-feedback">{ errors.lastName }
                    </span> : null
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="userName">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={
                      classnames('form-control',
                        { 'is-invalid': errors.username ? !!errors.username
                          : false }
                      )
                    }
                    name="username"
                    aria-describedby="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    value={regDetails.username}
                  />
                  { errors.username ?
                    <span className="invalid-feedback">{ errors.username }
                    </span> : null
                  }
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={
                      classnames('form-control',
                        { 'is-invalid': errors.email ? !!errors.email : false }
                      )
                    }
                    name="email"
                    id="email"
                    aria-describedby="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={regDetails.email}
                  />
                  { errors.email ?
                    <span className="invalid-feedback">{ errors.email }</span>
                    : null
                  }
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={
                      classnames('form-control',
                        { 'is-invalid': errors.password ? !!errors.password : false }
                      )
                    }
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={regDetails.password}
                  />
                  { errors.password ?
                    <span className="invalid-feedback">{ errors.password }
                    </span> : null
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="passwordConfirm">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className={
                      classnames('form-control',
                        { 'is-invalid': errors.confirmPassword ? !!errors.confirmPassword : false }
                      )
                    }
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    value={regDetails.confirmPassword}
                  />
                  { errors.confirmPassword ?
                    <span className="invalid-feedback">
                      { errors.confirmPassword }</span> : null
                  }
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" id="submitSignUp" className="btn btn-warning">Register me
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUpState: PropTypes.object.isRequired,
  signUpAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signUpState: state.signupReducer,
  signInState: state.signinReducer
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({ signUpAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
