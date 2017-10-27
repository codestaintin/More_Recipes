import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @export
 * @class SearchComponent
 * @extends {React.Component}
 */
export default class SearchComponent extends React.Component {
    render() {
        return (
            <div className="container-fluid banner pt-90">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-white">
                            <h2 className="text-center">More Recipe</h2>
                            <p className="lead text-center" style="opacity: 0.9;">Amazing food recipes at your beck</p>
                        </div>
                        <div id="custom-search-input center-content">
                            <div className="input-group col-md-6 mx-auto">
                                <input
                                    type="text"
                                    className="search-query form-control form-control-lg"
                                    placeholder="Search recipe"/>
                                <span className="input-group-btn">
                                    <button className="btn btn-outline-warning btn-lg" type="button">
                                        <span className="fa fa-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}