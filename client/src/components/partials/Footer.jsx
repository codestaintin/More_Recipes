import React from 'react';

/** 
 * @export
 * @class FooterComponent
 * @extends {React.Component}
 */
export default class FooterComponent extends React.Component {
  /**
     * 
     * 
     * @returns {XML} XML/JSX
     * @memberof FooterComponent
     */
  render() {
    return (
      <footer className="p-10 well well-sm m-0 shadow-lite">
        <div className="text-center text-muted">
          <p className="bold">&copy; 2017 More Recipes</p>
        </div>
      </footer>
    );
  }
}

