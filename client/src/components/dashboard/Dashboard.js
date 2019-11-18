import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../reducers/profileReducer";
import Spiner from "../common/Spinner";
import Experience from "./Experience";
import Education from "./Education";
import ProfileActions from "./ProfileActions";

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
                  <div>
                    <p className="lead text-muted">
                      Welcome{" "}
                      <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                    </p>
                    <ProfileActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div style={{ marginBottom: "60px" }} />
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
