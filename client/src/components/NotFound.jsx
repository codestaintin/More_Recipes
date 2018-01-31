import React, { Component } from 'react';
import SignInComponent from './auth/SignIn.jsx';
import SignUpComponent from './auth/SignUp.jsx';
import FooterComponent from './partials/Footer.jsx';
import Header from './partials/Headers/Header.jsx';

/**
 *
 *
 * @class NotFound
 * @extends {React.Component}
 */
export default class NotFound extends Component {
  /**
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof NotFound
   */
  render() {
    return (
      <div>
        <Header/>
        <SignInComponent/>
        <SignUpComponent/>
        <div className="container-fluid banner pt-90">
          <div className="row">
            <div className="col-lg-12 text-white">
              <h2 className="text-center">More Recipe</h2>
              <h3
                className="lead text-center"
                style={{
                  opacity: 0.9
                }}>
              Amazing food recipes at your beck</h3>
            </div>
          </div>
        </div>
        
        <div className="clearfix mb-20" />
        <div className="container" style={{ paddingTop: '50px' }}>
          <div className="row">
            <div className="jumbotron col-12 col-md-12 col-lg-12">
              <h1 className="text-center">Page Not Found!!!!</h1>
            </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
    );
  }
}
