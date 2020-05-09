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

import ROUTE_ENUM from '../../constants/RouteEnum';

import AboutPage from '../Pages/AboutPage/AboutPage';
import UserPage from '../Pages/UserPage/UserPage';
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
import ForgotPasswordPage from '../Pages/ForgotPasswordPage/ForgotPasswordPage';

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
              <Redirect exact from="/" to={ROUTE_ENUM.HOME} />

              <Route exact path={ROUTE_ENUM.HOME} component={LandingPage} />
              <Route exact path={ROUTE_ENUM.ABOUT} component={AboutPage} />
              <Route
                exact
                path={ROUTE_ENUM.FORGOT}
                component={ForgotPasswordPage}
              />
              <Route
                exact
                path="/forgot/:hex/:user"
                component={ROUTE_ENUM.PASSWORD_RESET}
              />
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.USER}
                component={UserPage}
              />
              {this.props.user.role === 'admin' && (
                <ProtectedRoute
                  exact
                  path={ROUTE_ENUM.ADMIN}
                  component={AdminPage}
                />
              )}
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.LOGIN}
                authRedirect={ROUTE_ENUM.USER}
                component={LoginPage}
              />
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.REGISTRATION}
                authRedirect={ROUTE_ENUM.USER}
                component={RegisterPage}
              />
              <ProtectedRoute
                exact
                path={ROUTE_ENUM.REPORT}
                component={ReportPage}
              />
              <Route
                render={() => (
                  <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1>404</h1>
                    <p>Page not found.</p>
                  </div>
                )}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(mapStoreToProps)(App);
