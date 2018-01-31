import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
/**
 * App class declaration
 */
export default class App extends Component {
  /**
   * Renders the component
   * 
   * @return {XML} XML/JSX
   */
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.array.isRequired
};
