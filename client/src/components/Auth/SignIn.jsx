import React from 'react';
import PropTypes from 'react-proptypes';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signInAction } from '../../actions/auth/authAction';
import loginValidate from '../../utils/loginValidate';

/**
 *
 * @export
 * @class SignInComponent
 * @extends {React.Component}
 */
export class SignIn extends React.Component {
  /**
   * Creates an instance of SignInComponent.
   * @param {any} props 
   * @memberof SignInComponent
   */
  constructor(props) {
    super(props);
    this.state = {
      loginDetails: {
        email: '',
        password: ''
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.signInAction(this.state.loginDetails);
    }
  }
  /**
     * Check Validity
     *
     * @return {event} event
     * @param {event} event
   */
  checkValidity() {
    const { errors, isValid } = loginValidate(this.state.loginDetails);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * componentWillReceiveProps
   * @param {object }nextProps
   * @return {object} object
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.signInState.success === true) {
      $('.close').click();
    }
  }

  /**
  * Handle change
  * 
  * @return {event} event 
  * @param {event} event
  */
  handleChange(event) {
    const loginDetails = this.state.loginDetails;
    loginDetails[event.target.name] = event.target.value;
    this.setState({ loginDetails });
  }
  /**
    * Renders signUp component
    * 
    * @returns {XML} XML/JSX
*/
  render() {
    const { loginDetails, errors } = this.state;
    const { signInState } = this.props;

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
              <form className="mt-15" onSubmit={this.handleSubmit}>
                { signInState.fails ?
                  <div id="error" className="alert alert-danger alert-dismissible">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">x</span>
                    </button>
                    { signInState.fails }
                  </div> : null
                }
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="text"
                    className={classnames('form-control', { 'is-invalid': errors.email ? !!errors.email : false })}
                    name="email"
                    aria-describedby="email"
                    placeholder="Enter email"
                    onChange={this.handleChange}
                    value={loginDetails.email}
                  />
                  { errors.email ?
                    <span className="invalid-feedback">{ errors.email }</span> : null
                  }
                  <small id="email" className="form-text text-muted">
                    We will never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={classnames('form-control', { 'is-invalid': errors.password ? !!errors.password : false })}
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={loginDetails.password}
                  />
                  { errors.password ?
                    <span className="invalid-feedback">{ errors.password }</span> : null
                  }
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-outline-warning">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  signInState: PropTypes.object.isRequired,
  signInAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signInState: state.signinReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signInAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);