import React from 'react';
import { Link } from 'react-router-dom';


const StickyComponent = () => (
  <div className="container" id="sticky-anchor">
    <div className="row">
      <div className="col-lg-12">
        <ul
          className="nav justify-content-center light-well shadow-lite sticky"
          id="sticky">
          <li className="nav-item">
            <Link className="nav-link active text-black" to="#">
              <i className="fa fa-list"></i>
              All</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="#">
              <i className="fa fa-star text-warning"></i>
              Most Favourited</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default StickyComponent;
