import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { SET_CURRENT_USER, logoutUser } from "./reducers/authReducer";
import { CLEAR_CURRENT_PROFILE } from "./reducers/profileReducer";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import PrivateRoute from "./components/common/PrivateRoute";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  // decode jwt
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch({ type: CLEAR_CURRENT_PROFILE });
    //redirect to login page
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>

          <Footer></Footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
