import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../reducers/profileReducer";
import Spiner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    if (profile === null || loading) return <Spiner></Spiner>;
    else {
      console.log(Object.keys(profile).length);
      if (Object.keys(profile).length <= 0)
        return (
          <div className="dashboard">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Dashboard</h1>
                  <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>
                      You have not yet setup a profile, please add some info
                    </p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">
                      Create Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      else
        return (
          <div className="dashboard">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Dashboard</h1>
                  <p className="lead text-muted">Welcome John Doe</p>
                  <div className="btn-group mb-4" role="group">
                    <a href="edit-profile.html" className="btn btn-light">
                      <i className="fas fa-user-circle text-info mr-1"></i> Edit
                      Profile
                    </a>
                    <a href="add-experience.html" className="btn btn-light">
                      <i className="fab fa-black-tie text-info mr-1"></i>
                      Add Experience
                    </a>
                    <a href="add-education.html" className="btn btn-light">
                      <i className="fas fa-graduation-cap text-info mr-1"></i>
                      Add Education
                    </a>
                  </div>

                  <div>
                    <h4 className="mb-2">Experience Credentials</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Title</th>
                          <th>Years</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tech Guy Web Solutions</td>
                          <td>Senior Developer</td>
                          <td>02-03-2009 - 01-02-2014</td>
                          <td>
                            <button className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Traversy Media</td>
                          <td>Instructor & Developer</td>
                          <td>02-03-2015 - Now</td>
                          <td>
                            <button className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="mb-2">Education Credentials</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>School</th>
                          <th>Degree</th>
                          <th>Years</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Northern Essex</td>
                          <td>Associates</td>
                          <td>02-03-2007 - 01-02-2009</td>
                          <td>
                            <button className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginBottom: "60px" }}>
                    <button className="btn btn-danger">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }
}

export default connect(
  state => ({
    profile: state.profile,
    auth: state.auth
  }),
  { getCurrentProfile }
)(Dashboard);
