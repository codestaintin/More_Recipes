import React from 'react';
import { Link } from 'react-router-dom';


const StickyComponent = ({ getAll }) => (
  <div className="container" id="sticky-anchor">
    <div className="row">
      <div className="col-lg-12">
        <ul
          className="nav justify-content-center light-well shadow-lite sticky"
          id="sticky">
          <li className="nav-item" >
            <button className="btn btn-outline-warning btn-sm" onClick={() => {
              getAll({ selected: 1 });
            }}
            style={{ marginTop: '5px' }}
            >
              <i className="fa fa-list" />
              All Recipes
            </button>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/favorites">
              <i className="fa fa-star text-warning" />
              Most Favourited
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default StickyComponent;
