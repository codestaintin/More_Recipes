import React from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import signUpAction from '../../actions/auth/signupAction';
import history from '../../utils/history';
import registerValidate from '../../utils/registerValidate';


/**
 *
 *
 * @export
 * @class SignUpComponent
 * @extends {React.Component}
 */
export class SignUp extends React.Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
  * 
  * 
  * @memberof SignUpComponent
  * 
  * @returns {void} void
 */
  componentWillMount() {
    if (window.sessionStorage.token) {
      history.push('/');
    }
  }

  /**
   * Check Validity
   *
   * @return {event} event
   * @param {event} event
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
  * @return {event} event 
  * @param {event} event
  */
  handleSubmit(event) {
    event.preventDefault();
    if (this.checkValidity()) {
      this.setState({ errors: {} });
      this.props.signUpAction(this.state.regDetails);
    }
  }
  /**
  * Handle change
  * 
  * @return {event} event 
  * @param {event} event
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

    if (signUpState.success) {
      $('.modal-backdrop').hide();
      return (
        <Redirect to={'/'}/>
      );
    }
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
            <form className="mt-15" onSubmit={this.handleSubmit}>
              { signUpState.fails ?
                <div id="error" className="alert alert-danger alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">x</span>
                  </button>
                  { signUpState.fails }
                </div> : null
              }
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className={classnames('form-control',
                      { 'is-invalid': errors.firstName ? !!errors.firstName : false })
                    }
                    name="firstName"
                    aria-describedby="firstName"
                    placeholder="First name"
                    onChange={this.handleChange}
                    value={regDetails.firstName}
                  />
                  { errors.firstName ?
                    <span className="invalid-feedback">{ errors.firstName }</span> : null
                  }
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className={classnames('form-control',
                      { 'is-invalid': errors.lastName ? !!errors.lastName : false })
                    }
                    name="lastName"
                    aria-describedby="lastName"
                    placeholder="Last name"
                    onChange={this.handleChange}
                    value={regDetails.lastName}
                  />
                  { errors.lastName ?
                    <span className="invalid-feedback">{ errors.lastName }</span> : null
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="userName">Username</label>
                  <input
                    type="text"
                    className={classnames('form-control',
                      { 'is-invalid': errors.username ? !!errors.username : false })
                    }
                    name="username"
                    aria-describedby="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    value={regDetails.username}
                  />
                  { errors.username ?
                    <span className="invalid-feedback">{ errors.username }</span> : null
                  }
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className={classnames('form-control',
                      { 'is-invalid': errors.email ? !!errors.email : false })
                    }
                    name="email"
                    aria-describedby="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={regDetails.email}
                  />
                  { errors.email ?
                    <span className="invalid-feedback">{ errors.email }</span> : null
                  }
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={classnames('form-control',
                      { 'is-invalid': errors.email ? !!errors.email : false })
                    }
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={regDetails.password}
                  />
                  { errors.password ?
                    <span className="invalid-feedback">{ errors.password }</span> : null
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    type="password"
                    className={classnames('form-control',
                      { 'is-invalid': errors.email ? !!errors.email : false })
                    }
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    value={regDetails.confirmPassword}
                  />
                  { errors.confirmPassword ?
                    <span className="invalid-feedback">{ errors.confirmPassword }</span> : null
                  }
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-outline-warning">Submit</button>
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
  signUpState: state.signupReducer
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({ signUpAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
