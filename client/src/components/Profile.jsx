import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'react-proptypes';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getUser from '../actions/auth/getUser';
import { userResponseType, decodeToken } from './../utils/helpers';
import FooterComponent from './partials/Footer.jsx';
import Header from "./partials/Headers/Header.jsx";
import avatar from '../build/assets/images/no-avatar.png';
/**
 *
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof Profile
   */
  componentWillMount() {
    const { id } = decodeToken(window.localStorage.token);
    this.props.getUser(id);
  }
  /**
   *
   * @param  {object} nextProps
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof Profile
   */
  componentWillReceiveProps(nextProps) {
    const { responseType, user } = nextProps.getUserState;
    if (responseType === userResponseType.GET_USER_PROFILE_SUCCESS) {
      this.setState({
        user
      });
    }
  }
  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof Profile
   */
  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      createdAt
    } = this.state.user;
    return (
      <div>
        <Header/>
        <div className="wrapper">
          <ol
            className="breadcrumb
            container
            mt-50
            col-10
            col-md-10
            col-lg-10
            mx-auto
            bg-white
            shadow-lite">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">User</a>
            </li>
            <li className="breadcrumb-item active">Profile</li>
          </ol>
          
          <div className="center-content">
            <img src={avatar}
              className="avatar text-center circulate circulate-xlg"
              alt="avatar" />
          </div>

          <div className="mb-20 col-md-10 mx-auto recipe-details-container">
            <div className="row">
              <div
                className="simplebox
                blade col-12 col-sm-12 col-md-12 col-lg-12 p-10"
                style={{
                  boxShadow: 'none'
                }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p><b>First Name: </b></p>{firstName}
                  </li>
                  <li className="list-group-item">
                    <p><b>Last Name: </b></p>{lastName}
                  </li>
                  <li className="list-group-item">
                    <p><b>Username: </b></p>{username}
                  </li>
                  <li className="list-group-item">
                    <p><b>Email:</b> </p>{email}
                  </li>
                </ul> <br/>
                <h5 className="text-info text-center">
                  You joined this platform {'\u00A0'}
                  {moment.utc(new Date(createdAt)).fromNow()}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape().isRequired,
  getUser: PropTypes.func.isRequired,
  getUserState: PropTypes.object
};

const mapStateToProps = state => ({
  getUserState: state.userReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
