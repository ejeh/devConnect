import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import { bindActionCreators } from "redux";
import Experience from "../dasboard/Experience";
import ProfileActions from "./ProfileActions";
import Education from "../dasboard/Education";

class Dasboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // User logged in but no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="col-md-12">
            <h1 className="display-4">Dasboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Dasboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getCurrentProfile, deleteAccount }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dasboard);
