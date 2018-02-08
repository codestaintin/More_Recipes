import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchRecipe } from '../../actions/recipe/recipeActions';


/**
 * @export
 * 
 * @class SearchComponent
 * 
 * @extends {React.Component}
 */
export class SearchComponent extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchParams: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * Handles Search
   *
   * @param {string} searchParams
   *
   * @method handleSearch
   *
   * @return {void}
   */
  handleSearch() {
    const { searchParams } = this.state;
    if (searchParams.length > 3) {
      this.props.searchRecipe(searchParams);
    }
  }
  /**
   * Handle change
   * 
   * @param {event} event
   *
   * @method handleChange
   *
   * @return {void}
   */
  handleChange(event) {
    this.setState({ searchParams: event.target.value });
  }
  /**
     * 
     * @memberof SearchComponent
     * 
     * @returns {XML} XML/JSX
     * 
     */
  render() {
    return (
      <div className="container-fluid banner pt-90">
        <div className="row">
          <div className="col-lg-12 text-white">
            <h2 className="text-center">More Recipe</h2>
            <p
              className="lead text-center"
              style={{
                opacity: 0.9
              }}>
              Amazing food recipes at your beck</p>

            <div id="custom-search-input center-content">
              <div className="input-group col-md-6 mx-auto">
                <input
                  type="text"
                  className="search-query form-control form-control-lg"
                  placeholder="Search recipe"
                  name="searchParams"
                  onChange={this.handleChange}
                />

                <span className="input-group-btn">
                  <button className="btn btn-outline-warning btn-lg"
                    type="button"
                    disabled={this.state.searchParams.length < 3}
                    onClick={this.handleSearch}
                  >
                    <span className="fa fa-search" />
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

SearchComponent.propTypes = {
  searchRecipe: PropTypes.func,
  searchState: PropTypes.object
};

const mapStateToProps = state => ({
  searchState: state.recipeReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchRecipe }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
