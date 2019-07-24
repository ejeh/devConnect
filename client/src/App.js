import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "../src/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../src/actions/authAction";
import { clearCurrentProfile } from "../src/actions/profileAction";
import configureStore from "./store";

import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import Landing from "../src/components/layout/Landing";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import Dasboard from "../src/components/dasboard/Dasboard";
import PrivateRoute from "../src/components/common/PrivateRoute";
import CreateProfile from "../src/components/create-profile/CreateProfile";
import EditProfile from "../src/components/edit-profile/EditProfile";
import AddExperience from "../src/components/add-crendential/AddExperience";
import AddEducation from "../src/components/add-crendential/AddEducation";

import "./App.css";

const store = configureStore();
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expire token
  const currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
            </div>
            <div className="container">
              <Route exact path="/login" component={Login} />
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/dasboard" component={Dasboard} />
              </Switch>
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
