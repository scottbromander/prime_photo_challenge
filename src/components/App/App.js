import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../Pages/AboutPage/AboutPage';
import UserPage from '../Pages/UserPage/UserPage';
import UploadPage from '../Pages/UploadPage/UploadPage';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';

import 'toastr/build/toastr.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminPage from '../Pages/AdminPage/AdminPage';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './bootstrap.min.css';
import './toastr.min.css';
import './App.css';
import ReportPage from '../Pages/ReportPage/ReportPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="container">
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}

              <Route exact path="/home" component={LandingPage} />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute exact path="/user" component={UserPage} />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute exact path="/upload" component={UploadPage} />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
              {this.props.user.role === 'admin' && (
                <ProtectedRoute exact path="/admin" component={AdminPage} />
              )}
              <ProtectedRoute
                exact
                path="/login"
                authRedirect="/user"
                component={LoginPage}
              />
              <ProtectedRoute
                exact
                path="/registration"
                authRedirect="/user"
                component={RegisterPage}
              />
              <ProtectedRoute exact path="/report" component={ReportPage} />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(mapStoreToProps)(App);
