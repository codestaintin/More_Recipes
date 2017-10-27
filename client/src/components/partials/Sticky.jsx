import React from 'react';
import ReactDOM from 'react-dom';

/**
 *
 *
 * @export
 * @class StickyComponent
 * @extends {React.Component}
 */
export default class StickyComponent extends React.Component {
    render() {
        return (
            <div className="container-fluid" id="sticky-anchor">
                <div className="row">
                    <div className="col-lg-12">
                        <ul
                            className="nav justify-content-center light-well shadow-lite sticky"
                            id="sticky">
                            <li className="nav-item">
                                <a className="nav-link active text-black" href="#">
                                    <i className="fa fa-list"></i>
                                    All</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">
                                    <i className="fa fa-star text-warning"></i>
                                    Most Favourited</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}