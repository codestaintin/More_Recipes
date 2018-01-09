import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterComponent from './partials/Footer.jsx';
import UserPanelComponent from './partials/UserPanel.jsx';
import Header from "./partials/Headers/Header.jsx";
/**
 *
 * @export
 * @class ProfileComponent
 * @extends {React.Component}
 */
class ProfileComponent extends Component {
  /**
   * 
   * 
   * @returns {XML} XML/JSX
   * @memberof ProfileComponent
   */
  render() {
    return (
      <div>
        <Header/>
        <div className="wrapper">
          <ol
            className="breadcrumb
            container
            mt-50 mb-10 col-10 col-md-9 col-lg-9
            mx-auto bg-white shadow-lite"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">User</a>
            </li>
            <li className="breadcrumb-item active">Profile</li>
          </ol>
          <div className="mb-20 col-md-9 mx-auto recipe-details-container">
            <div className="row">
              <UserPanelComponent/>
              <div
                className="simplebox blade col-12 col-sm-12 col-md-9 col-lg-9 p-10"
                style={{
                  boxShadow: 'none'
                }}>
                <form className="mt-15">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      value="mohammedisioye@gmail.com"
                      readOnly/>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="inputUserName"
                      aria-describedby="userNameHelp"
                      placeholder="Username"
                      value="@mohzak"
                      readOnly/>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="inputFullName"
                      aria-describedby="fullNameHelp"
                      placeholder="Full name"/>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="inputMobile"
                      aria-describedby="mobileHelp"
                      placeholder="Mobile Number"/>
                  </div>
                  <button type="submit" className="btn btn-outline-warning">Update</button>
                </form>
                <div className="row">
                  <div className="col-4 col-md-4 col-sm-4">
                    <hr/>
                  </div>
                  <div className="col-4 col-md-4 col-sm-4 text-center">
                    <h5 className="text-muted">Change Password</h5>
                  </div>
                  <div className="col-4 col-md-4 col-sm-4">
                    <hr/>
                  </div>
                </div>
                <form className="mt-15">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Current Password"/>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword2"
                      placeholder="New Password"/>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword3"
                      placeholder="Confirm New Password"/>
                  </div>
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
    );
  }
}

export default ProfileComponent;
