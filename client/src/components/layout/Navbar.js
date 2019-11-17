import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../reducers/authReducer";

class Navbar extends Component {
  onLogout = event => {
    event.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated === false ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={this.onLogout.bind(this)}
                    href=""
                  >
                    <img
                      className="rounded-circle"
                      style={{ width: "25px", marginRight: "10px" }}
                      src={user.avatar}
                      alt={user.name}
                      title="Must have Gravatar"
                    />
                    Log out
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
export default connect(
  state => ({
    auth: state.auth
  }),
  { logoutUser }
)(Navbar);
