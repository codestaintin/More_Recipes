import React from 'react';
import PropTypes from 'react-proptypes';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};

export default PrivateRoute;