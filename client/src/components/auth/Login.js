import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../reducers/authReducer";
import TextField from "../common/TextField";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const account = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(account);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextField
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                  value={this.email}
                  onChange={this.onChange}
                ></TextField>
                <div className="form-group">
                  <input
                    type="password"
                    className={`${
                      errors.password ? "is-invalid" : ""
                    } form-control form-control-lg`}
                    placeholder="Password"
                    name="password"
                    autoComplete="true"
                    value={this.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    errors: state.errors
  }),
  { loginUser }
)(Login);
