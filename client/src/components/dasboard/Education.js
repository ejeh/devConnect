import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileAction";
import PropTypes from "prop-types";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>

        <td>
          <Moment format="YYYY/MM/DD ">{edu.from}</Moment>-
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD ">{edu.to}</Moment>
          )}
        </td>
        <td>{edu.current}</td>
        {/* <td>{edu.title}</td> */}
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credential</h4>
        <table className="table">
          <thead>
            <tr>
              <td>School</td>
              <td>Degree</td>
              <td>Field Of Study</td>
              <td>Years</td>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}
Education.propType = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
