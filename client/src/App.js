import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar></Navbar>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
