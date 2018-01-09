import React, { Component } from 'react';
import SignInComponent from './Auth/SignIn.jsx';
import SignUpComponent from './Auth/SignUp.jsx';
import FooterComponent from './partials/Footer.jsx';
import Header from './partials/Headers/Header.jsx';
import SearchComponent from './partials/Search.jsx';
import StickyComponent from './partials/Sticky.jsx';
import RecipeComponent2 from './Recipe/RecipeFaker.jsx';

/**
 *
 *
 * @class HomePageComponent
 * @extends {React.Component}
 */
export default class HomePageComponent extends Component {
  /**
   * 
   * 
   * @returns {XML} XML/JSX
   * @memberof HomePageComponent
   */
  render() {
    return (
      <div>
        <Header/>
        <SignInComponent/>
        <SignUpComponent/>
        <SearchComponent/>
        <StickyComponent/>
        <div className='clearfix mb-20'></div>
        <div className='container' style={{ paddingTop: '50px' }}>
          <div className="row">
            <RecipeComponent2/>
            <RecipeComponent2/>
            <RecipeComponent2/>
            <RecipeComponent2/>
          </div>
        </div>
        <FooterComponent/>
      </div>
    );
  }
}
