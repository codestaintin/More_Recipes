import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @export
 * @class NavbarComponent
 * @extends {React.Component}
 */
export default class HeaderComponent extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-navbar fixed-top">
                <a className="navbar-brand" href="index.html">MoreRecipe</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent">
                    <div className="navbar-nav ml-auto btn-group">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-toggle="modal"
                            data-target="#exampleModalLong">
                            <i className="fa fa-user-circle"></i>
                            My Account
                        </button>
                    </div>
                </div>
            </nav>
        );
    }
}
