import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { bindActionCreators } from "redux";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  errors: {}
};

class Register extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dasboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };
    this.clearState();

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { name, email, password, password2, errors } = this.state;
    // const {user} = this.props.auth;
    return (
      // <!-- Register -->
      <div className="register">
        {/* {user ? user.name: null} */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />
                
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="Password2"
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={this.handleChange}
                  error={errors.password2}
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
// Get state property into the Component e.g this.props.user.name
const mapStateToprops = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerUser }, dispatch);
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(Register));
