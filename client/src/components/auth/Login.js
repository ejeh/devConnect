import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextFieldGroup from "../common/TextFieldGroup";

const initialState = {
  email: "",
  password: "",
  errors: {}
};

class Login extends Component {
  state = { ...initialState };

  clearState() {
    this.setState({ ...initialState });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dasboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dasboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    const userData = {
      email,
      password
    };
    this.clearState();
    this.props.loginUser(userData);
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      // <!-- Login -->
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
