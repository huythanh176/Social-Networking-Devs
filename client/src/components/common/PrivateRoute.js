import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <Component {...props}></Component>
      ) : (
        <Redirect to="/login"></Redirect>
      )
    }
  ></Route>
);

export default connect(state => ({
  auth: state.auth
}))(PrivateRoute);
