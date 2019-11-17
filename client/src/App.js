import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { SET_CURRENT_USER, logoutUser } from "./reducers/authReducer";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  // decode jwt
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    //redirect to login page
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
