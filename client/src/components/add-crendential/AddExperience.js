import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { addExperience } from "../../actions/profileAction";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newExp = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(newExp, this.props.history);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };
  render() {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      errors
    } = this.state;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past or current
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={this.handleChange}
                  error={errors.company}
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  onChange={this.handleChange}
                  error={errors.date}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={to}
                  onChange={this.handleChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  error={errors.description}
                  info="Some of your responsabilities, etc"
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
AddExperience.propType = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addExperience }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
