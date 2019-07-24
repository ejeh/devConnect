import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createUserProfile,
  getCurrentProfile
} from "../../actions/profileAction";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to csv
      const skillsCSV = profile.skills.join(",");

      // if profile field dose'nt exist return an empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin
    };
    this.props.createUserProfile(profileData, this.props.history);
  };
  render() {
    const props = this.props;
    console.log(props);
    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      instagram,
      errors
    } = this.state;

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter"
            name="twitter"
            value={twitter}
            error={errors.twitter}
            onChange={this.handleChange}
            icon="fab fa-twitter"
          />
          <InputGroup
            placeholder="Facebook"
            name="facebook"
            value={facebook}
            error={errors.facebook}
            onChange={this.handleChange}
            icon="fab fa-facebook"
          />
          <InputGroup
            placeholder="Instagram"
            name="instagram"
            value={instagram}
            error={errors.instagram}
            onChange={this.handleChange}
            icon="fab fa-instagram"
          />
          <InputGroup
            placeholder="Linkedin"
            name="linkedin"
            value={linkedin}
            error={errors.linkedin}
            onChange={this.handleChange}
            icon="fab fa-linkedin"
          />
        </div>
      );
    }

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={handle}
                  onChange={this.handleChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name,
                    company name, nickname, etc."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={this.handleChange}
                  error={errors.status}
                  options={options}
                  info="Give an idea of where you at in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.handleChange}
                  error={errors.company}
                  info="Could be your company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.handleChange}
                  error={errors.website}
                  info="Could be your website or company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                  error={errors.location}
                  info="City or city & state suggested (e.g. Boston MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={this.handleChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,Javascript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.handleChange}
                  error={errors.githubusername}
                  info="If you want your latest repo and Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={bio}
                  onChange={this.handleChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="button btn.btn-light"
                  >
                    Add Social Networ Link
                  </button>

                  <span className="test-muted"> Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createUserProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createUserProfile, getCurrentProfile }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
