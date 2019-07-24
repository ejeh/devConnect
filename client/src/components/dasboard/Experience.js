import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileAction";
import PropTypes from "prop-types";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.title}</td>
        <td>{exp.company}</td>
        <td>
          <Moment format="YYYY/MM/DD ">{exp.from}</Moment>-
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD ">{exp.to}</Moment>
          )}
        </td>
        <td>{exp.current}</td>
        <td>{exp.title}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credential</h4>
        <table className="table">
          <thead>
            <tr>
              <td>company</td>
              <td>Title</td>
              <td>Years</td>
              <td />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}
Experience.propType = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
